"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Alert,
  Snackbar,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  AddShoppingCart as AddShoppingCartIcon
} from '@mui/icons-material';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "@/styles/carousel.css";
import Link from "next/link";
import SwiperNavigationButtons from "@/components/containers/SwiperNavigationButtons";
import { ProductService } from "@/core/service/product/product_service";
import { ProductDto } from "@/core/dto/receive/product/receive_products_dto";
import { ProductUseCase } from "@/core/use-case/product/product_use_case";
import { SendInformationProductDto } from "@/core/dto/send/product/send_information_product_dto";
import { ReceiveInformationProductDto } from "@/core/dto/receive/product/receive_information_product_dto";
import { BookingService } from '@/core/service/booking/booking_service';
import { BookingCapacityDto } from '@/core/dto/receive/booking/receive_booking_capacity_dto';
import { ReceiveCreateSaleDto } from '@/core/dto/receive/order/receive_create_sale_dto';

const steps = ['Resumen de Compra', 'Información Personal', 'URL de Pago'];

// Variable para controlar si las compras están habilitadas (false = en construcción)
export const ENABLE_SHOPPING = false;

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart, addToCart } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentResult, setPaymentResult] = useState<'success' | 'failed' | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductDto[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const [realTotalPrice, setRealTotalPrice] = useState<number>(0);
  const [loadingRealPrice, setLoadingRealPrice] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'Colombia',
    zipCode: '',
    operationDate: '',
    documentNumber: ''
  });
  
  // Estado para capacidad de reserva
  const [bookingCapacity, setBookingCapacity] = useState<BookingCapacityDto | null>(null);
  const [checkingCapacity, setCheckingCapacity] = useState(false);
  const [capacityError, setCapacityError] = useState<string | null>(null);
  
  // Estado para el proceso de pago
  const [processingPayment, setProcessingPayment] = useState(false);
  const [wompiError, setWompiError] = useState<string | null>(null);
  
  // Company ID - debe venir de configuración o productos
  const COMPANY_ID = 'e62af0c2-92e1-45b1-bb7b-0b3e6a386cc3';

  // Referencias para el Swiper
  const swiperRef = useRef<any>(null);
  const [isSwiperReady, setIsSwiperReady] = useState(false);

  // Obtener precio real de los productos en el carrito
  useEffect(() => {
    const fetchRealPrice = async () => {
      if (cartItems.length === 0) {
        setRealTotalPrice(0);
        return;
      }

      try {
        setLoadingRealPrice(true);
        
        // Convertir items del carrito al formato requerido por el caso de uso
        const productData: SendInformationProductDto = {
          items: cartItems.map(item => ({
            product_id: item.id, // item.id es UUID (string)
            quantity: item.quantity
          }))
        };



        await ProductUseCase.getProductInformation(
          productData,
          (data: ReceiveInformationProductDto) => {
            setRealTotalPrice(data.data.total_amount);
          },
          (error) => {
            console.error('❌ Error al obtener precio real:', error);
            // En caso de error, usar el precio calculado localmente
            setRealTotalPrice(totalPrice);
          }
        );
      } catch (error) {
        console.error('❌ Error en fetchRealPrice:', error);
        setRealTotalPrice(totalPrice);
      } finally {
        setLoadingRealPrice(false);
      }
    };

    fetchRealPrice();
  }, [cartItems, totalPrice]);

  // Obtener productos relacionados basados en la categoría de los productos en el carrito
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setLoadingRelated(true);

        const allProducts = await ProductService.getAllProducts();
        
        if (!allProducts) {
          console.error('❌ No se pudieron obtener productos de la API');
          setRelatedProducts([]);
          return;
        }

        // Obtener categorías únicas de los productos en el carrito
        const cartCategories = [...new Set(cartItems.map(item => {
          // Extraer categoría del nombre del producto (asumiendo formato: "Categoría - Nombre")
          const categoryMatch = item.name.match(/^([^-]+)/);
          const category = categoryMatch ? categoryMatch[1].trim() : 'General';
          return category;
        }))];

        // Filtrar productos relacionados (misma categoría pero no en el carrito)
        const related = allProducts.filter(product => {
          const productCategory = product.category_name || 'General';
          const isInCart = cartItems.some(cartItem => cartItem.id === product.id || cartItem.sku === product.sku);
          const isRelated = cartCategories.includes(productCategory) && !isInCart;

          return isRelated;
        });

        // Si no hay productos relacionados por categoría, mostrar productos aleatorios
        if (related.length === 0) {
          const randomProducts = allProducts
            .filter(product => !cartItems.some(cartItem => cartItem.id === product.id || cartItem.sku === product.sku))
            .sort(() => Math.random() - 0.5)
            .slice(0, 6);
          setRelatedProducts(randomProducts);
        } else {
          // Limitar a 6 productos relacionados
          setRelatedProducts(related.slice(0, 6));
        }
      } catch (error) {
        console.error('❌ Error al cargar productos relacionados:', error);
        setRelatedProducts([]);
      } finally {
        setLoadingRelated(false);
      }
    };

    if (cartItems.length > 0) {
      fetchRelatedProducts();
    } else {
      setRelatedProducts([]);
    }
  }, [cartItems]);

  // Evitar problemas de hidratación esperando a que el componente se monte
  useEffect(() => {
    setMounted(true);
  }, []);

  // Limpiar el Swiper cuando el componente se desmonte
  useEffect(() => {
    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy(true, true);
      }
    };
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(price);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Si estamos en el último paso, redirigir al pago
      handleProceedToPayment();
    } else {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleProceedToPayment = async () => {
    // Validar que el formulario esté completo
    if (!isFormValid()) {
      setWompiError('Por favor completa todos los campos requeridos');
      return;
    }

    setProcessingPayment(true);
    setWompiError(null);

    try {
      // Validar que todos los items tengan un UUID válido como product_id
      // Un UUID tiene el formato: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx (36 caracteres con guiones)
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      
      const itemsWithProductId = cartItems.map(item => {
        // Verificar que item.id existe y es un string
        if (!item.id || typeof item.id !== 'string') {
          throw new Error(`El producto "${item.name}" no tiene un ID válido (UUID)`);
        }
        
        // Verificar que item.id es un UUID válido, no un SKU
        if (!uuidRegex.test(item.id)) {
          console.error(`⚠️ El producto "${item.name}" tiene un ID que no es UUID:`, item.id);
          console.error('⚠️ SKU del producto:', item.sku);
          throw new Error(`El producto "${item.name}" no tiene un UUID válido. ID encontrado: "${item.id}". Por favor, elimina este producto del carrito y vuelve a agregarlo.`);
        }
        
        return {
          product_id: item.id, // UUID del producto (ej: "128ae418-5a43-4a21-ae39-aa8ce3369ccd")
          quantity: item.quantity
        };
      });

      // Preparar datos para la venta
      const saleData = {
        company_id: COMPANY_ID,
        person_name: `${formData.firstName} ${formData.lastName}`,
        person_email: formData.email,
        person_phone: formData.phone,
        person_document_number: formData.documentNumber,
        operation_date: formData.operationDate,
        items: itemsWithProductId,
        // Campos fijos que no cambian
        tax: 0,
        discount: 0,
        notes: 'Sitio web',
        create_wompi_transaction: true,
        redirect_url: 'https://oceanoscuba.com.co/payment/result'
      };

      console.log('🛒 Creando venta con datos:', saleData);
      console.log('📋 Product IDs (UUIDs):', itemsWithProductId.map(item => item.product_id));

      // Llamar a la API de sales
      const response = await fetch('/api/v1/sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(saleData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al crear la venta');
      }

      const result: ReceiveCreateSaleDto = await response.json();
      console.log('✅ Respuesta de la API:', result);

      // Verificar si la venta está habilitada (campo enabled o success)
      if (result.enabled === false || (result.success === false && result.enabled !== true)) {
        const errorMessage = result.message || 'La venta no está habilitada en este momento. Por favor contacta al soporte.';
        console.error('❌ Venta no habilitada:', errorMessage);
        setWompiError(errorMessage);
        setProcessingPayment(false);
        return;
      }

      // Verificar si hay error de Wompi (puede venir en el nivel superior)
      if (result.wompi_error) {
        console.error('❌ Error de Wompi:', result.wompi_error);
        setWompiError(result.wompi_error);
        setProcessingPayment(false);
        return;
      }

      // Verificar si hay URL de redirección
      if (result.data?.wompi_redirect_url) {
        console.log('🔗 Redirigiendo a Wompi:', result.data.wompi_redirect_url);
        window.location.href = result.data.wompi_redirect_url;
      } else {
        throw new Error('No se recibió la URL de redirección de Wompi. Por favor contacta al soporte.');
      }
    } catch (error) {
      console.error('❌ Error al procesar el pago:', error);
      setWompiError(error instanceof Error ? error.message : 'Error al procesar el pago. Por favor intenta nuevamente.');
      setProcessingPayment(false);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleReturnHome = () => {
    router.push('/');
  };

  const handleAddToCart = (product: ProductDto) => {
    const courseItem = {
      id: product.id, // UUID del producto (usado para crear orden)
      sku: product.sku, // SKU del producto (para APIs que lo requieran)
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.photo,
      courseDuration: product.days_course,
      numberOfDives: product.dives_only,
      subcategory_name: product.subcategory_name
    };

    addToCart(courseItem);
    setShowSuccess(true);

    // Redirigir a checkout después de un breve delay
    setTimeout(() => {
      router.push('/finalizar-compra');
    }, 1000);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };


  // Función para consultar capacidad cuando cambia la fecha
  const handleDateChange = async (date: string) => {
    handleInputChange('operationDate', date);
    
    if (!date) {
      setBookingCapacity(null);
      setCapacityError(null);
      return;
    }
    
    // Formatear fecha a YYYY-MM para la API
    const dateObj = new Date(date);
    const yearMonth = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`;
    
    setCheckingCapacity(true);
    setCapacityError(null);
    
    try {
      const capacityResponse = await BookingService.getBookingCapacity(COMPANY_ID, yearMonth);
      
      if (capacityResponse && capacityResponse.success && capacityResponse.data) {
        setBookingCapacity(capacityResponse.data);
        console.log('✅ Capacidad obtenida:', capacityResponse.data);
        
        // Validar capacidad
        const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        const availableSlots = capacityResponse.data.max_persons - capacityResponse.data.reserved_persons;
        
        if (availableSlots < totalQuantity) {
          setCapacityError(`No hay suficiente capacidad. Disponible: ${availableSlots}, Solicitado: ${totalQuantity}`);
        } else {
          setCapacityError(null);
        }
      } else {
        setCapacityError('Error al consultar la capacidad de reserva');
        setBookingCapacity(null);
      }
    } catch (error) {
      console.error('❌ Error al consultar capacidad:', error);
      setCapacityError('Error al consultar la capacidad de reserva');
      setBookingCapacity(null);
    } finally {
      setCheckingCapacity(false);
    }
  };

  const isFormValid = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'operationDate', 'documentNumber'];
    const basicValid = requiredFields.every(field => formData[field as keyof typeof formData].trim() !== '');
    
    // Validar que haya capacidad suficiente
    if (bookingCapacity) {
      const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      const availableSlots = bookingCapacity.max_persons - bookingCapacity.reserved_persons;
      return basicValid && availableSlots >= totalQuantity && !capacityError;
    }
    
    return basicValid && !checkingCapacity;
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h5" gutterBottom sx={{
              fontSize: { xs: '1.3rem', sm: '1.5rem' },
              fontWeight: 600,
              color: '#051b35'
            }}>
              Resumen de Compra
            </Typography>
            {mounted && cartItems.map((item) => (
              <Paper
                key={item.id}
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  mb: 2,
                  borderRadius: 0,
                  border: '1px solid #e0e0e0',
                  boxShadow: 'none',
                  backgroundColor: '#fafafa'
                }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: 'space-between', 
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  gap: { xs: 1, sm: 0 }
                }}>
                  <Box sx={{ flex: 1, width: '100%' }}>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600, 
                      color: '#051b35',
                      fontSize: { xs: '1rem', sm: '1.1rem' },
                      mb: 0.5
                    }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ 
                      mt: 0.5,
                      fontSize: { xs: '0.8rem', sm: '0.875rem' }
                    }}>
                      Cantidad: {item.quantity}
                    </Typography>
                    {item.courseDuration && (
                      <Typography variant="body2" color="text.secondary" sx={{
                        fontSize: { xs: '0.8rem', sm: '0.875rem' }
                      }}>
                        Duración: {item.courseDuration} días
                      </Typography>
                    )}
                    {item.numberOfDives && (
                      <Typography variant="body2" color="text.secondary" sx={{
                        fontSize: { xs: '0.8rem', sm: '0.875rem' }
                      }}>
                        Inmersiones: {item.numberOfDives}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ 
                    textAlign: { xs: 'left', sm: 'right' },
                    mt: { xs: 1, sm: 0 },
                    width: { xs: '100%', sm: 'auto' }
                  }}>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 700, 
                      color: '#051b35',
                      fontSize: { xs: '1.1rem', sm: '1.2rem' }
                    }}>
                      {formatPrice(item.price * item.quantity)}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            ))}
            <Divider sx={{ my: 2 }} />
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between', 
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: { xs: 1, sm: 0 }
            }}>
              <Typography variant="h5" sx={{
                fontSize: { xs: '1.3rem', sm: '1.5rem' },
                fontWeight: 600,
                color: '#051b35'
              }}>
                Total:
              </Typography>
              <Box sx={{ 
                textAlign: { xs: 'left', sm: 'right' },
                width: { xs: '100%', sm: 'auto' }
              }}>
                {loadingRealPrice ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <img
                      src="/assets/images/Animation - 1746715748714.gif"
                      alt="Calculando precio..."
                      style={{ width: 20, height: 20 }}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}>
                      Calculando...
                    </Typography>
                  </Box>
                ) : (
                  <Typography variant="h4" color="primary" fontWeight="bold" sx={{
                    fontSize: { xs: '1.5rem', sm: '2rem' }
                  }}>
                    {formatPrice(realTotalPrice > 0 ? realTotalPrice : totalPrice)}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h5" gutterBottom sx={{
              fontSize: { xs: '1.3rem', sm: '1.5rem' },
              fontWeight: 600,
              color: '#051b35'
            }}>
              Información Personal
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.5, sm: 2 } }}>
              <Box sx={{ 
                display: 'flex', 
                gap: { xs: 1, sm: 2 }, 
                flexWrap: 'wrap',
                flexDirection: { xs: 'column', sm: 'row' }
              }}>
                <TextField
                  sx={{ 
                    flex: { sm: 1 },
                    minWidth: { xs: '100%', sm: '250px' },
                    '& .MuiInputBase-root': {
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    }
                  }}
                  label="Nombre"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                  size="small"
                />
                <TextField
                  sx={{ 
                    flex: { sm: 1 },
                    minWidth: { xs: '100%', sm: '250px' },
                    '& .MuiInputBase-root': {
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    }
                  }}
                  label="Apellido"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                  size="small"
                />
              </Box>
              <Box sx={{ 
                display: 'flex', 
                gap: { xs: 1, sm: 2 }, 
                flexWrap: 'wrap',
                flexDirection: { xs: 'column', sm: 'row' }
              }}>
                <TextField
                  sx={{ 
                    flex: { sm: 1 },
                    minWidth: { xs: '100%', sm: '250px' },
                    '& .MuiInputBase-root': {
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    }
                  }}
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  size="small"
                />
                <TextField
                  sx={{ 
                    flex: { sm: 1 },
                    minWidth: { xs: '100%', sm: '250px' },
                    '& .MuiInputBase-root': {
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    }
                  }}
                  label="Teléfono"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                  size="small"
                />
              </Box>
              <TextField
                fullWidth
                label="Dirección"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                required
                size="small"
                sx={{
                  '& .MuiInputBase-root': {
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }
                }}
              />
              <Box sx={{ 
                display: 'flex', 
                gap: { xs: 1, sm: 2 }, 
                flexWrap: 'wrap',
                flexDirection: { xs: 'column', sm: 'row' }
              }}>
                <TextField
                  sx={{ 
                    flex: { sm: 1 },
                    minWidth: { xs: '100%', sm: '250px' },
                    '& .MuiInputBase-root': {
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    }
                  }}
                  label="Fecha de Operación"
                  type="date"
                  value={formData.operationDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                  required
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled={checkingCapacity}
                />
                <TextField
                  sx={{ 
                    flex: { sm: 1 },
                    minWidth: { xs: '100%', sm: '250px' },
                    '& .MuiInputBase-root': {
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    }
                  }}
                  label="Número de Documento"
                  value={formData.documentNumber}
                  onChange={(e) => handleInputChange('documentNumber', e.target.value)}
                  required
                  size="small"
                />
              </Box>
              
              {/* Mostrar información de capacidad */}
              {checkingCapacity && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  Consultando capacidad de reserva...
                </Alert>
              )}
              
              {bookingCapacity && !checkingCapacity && (
                <Alert 
                  severity={capacityError ? "error" : "success"} 
                  sx={{ mt: 2 }}
                >
                  {capacityError ? (
                    capacityError
                  ) : (
                    <>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        Capacidad disponible:
                      </Typography>
                      <Typography variant="body2">
                        Disponibles: {bookingCapacity.max_persons - bookingCapacity.reserved_persons} personas
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 0.5 }}>
                        Solicitado: {cartItems.reduce((sum, item) => sum + item.quantity, 0)} personas
                      </Typography>
                    </>
                  )}
                </Alert>
              )}
            </Box>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h5" gutterBottom sx={{
              fontSize: { xs: '1.3rem', sm: '1.5rem' },
              fontWeight: 600,
              color: '#051b35',
              mb: 3
            }}>
              Proceder con el Pago
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, gap: 2 }}>
              {wompiError && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    width: '100%',
                    maxWidth: { xs: '100%', sm: '600px' }
                  }}
                  onClose={() => setWompiError(null)}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Error al procesar el pago:
                  </Typography>
                  <Typography variant="body2">
                    {wompiError}
                  </Typography>
                </Alert>
              )}
              
              <Button
                variant="contained"
                size="large"
                onClick={handleProceedToPayment}
                disabled={processingPayment}
                sx={{
                  backgroundColor: '#ffd701',
                  color: '#051b35',
                  fontWeight: 'bold',
                  borderRadius: 0,
                  minWidth: { xs: '100%', sm: '300px' },
                  height: { xs: '50px', sm: '55px' },
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  '&:hover': {
                    backgroundColor: '#3b91e1',
                    color: '#fff'
                  },
                  '&:disabled': {
                    backgroundColor: 'rgba(255, 215, 1, 0.5)',
                    color: 'rgba(5, 27, 53, 0.5)'
                  }
                }}
              >
                {processingPayment ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <img
                      src="/assets/images/Animation - 1746715748714.gif"
                      alt="Procesando..."
                      style={{ width: 20, height: 20 }}
                    />
                    <span>Procesando pago...</span>
                  </Box>
                ) : (
                  'Proceder con el Pago'
                )}
              </Button>
            </Box>

            <Card sx={{
              borderRadius: 0,
              border: '1px solid #e0e0e0',
              boxShadow: 'none',
              backgroundColor: '#fafafa',
              p: { xs: 1.5, sm: 2 }
            }}>
              <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
                <Typography variant="h6" gutterBottom sx={{ 
                  fontWeight: 600, 
                  color: '#051b35',
                  fontSize: { xs: '1.1rem', sm: '1.2rem' }
                }}>
                  Resumen de tu Orden
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  gap: 1.5
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 1
                  }}>
                    <Typography variant="body2" sx={{
                      fontSize: { xs: '0.85rem', sm: '0.875rem' },
                      fontWeight: 500
                    }}>
                      Productos:
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" sx={{
                      fontSize: { xs: '0.85rem', sm: '0.875rem' }
                    }}>
                      {cartItems.length} {cartItems.length === 1 ? 'curso' : 'cursos'}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 1
                  }}>
                    <Typography variant="body2" sx={{
                      fontSize: { xs: '0.85rem', sm: '0.875rem' },
                      fontWeight: 500
                    }}>
                      Cliente:
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" sx={{
                      fontSize: { xs: '0.85rem', sm: '0.875rem' }
                    }}>
                      {formData.firstName} {formData.lastName}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 1
                  }}>
                    <Typography variant="body2" sx={{
                      fontSize: { xs: '0.85rem', sm: '0.875rem' },
                      fontWeight: 500
                    }}>
                      Email:
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" sx={{
                      fontSize: { xs: '0.85rem', sm: '0.875rem' }
                    }}>
                      {formData.email}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 1
                  }}>
                    <Typography variant="body2" sx={{
                      fontSize: { xs: '0.85rem', sm: '0.875rem' },
                      fontWeight: 500
                    }}>
                      Total:
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" color="primary" sx={{
                      fontSize: { xs: '0.85rem', sm: '0.875rem' }
                    }}>
                      {formatPrice(realTotalPrice > 0 ? realTotalPrice : totalPrice)}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        );

      default:
        return null;
    }
  };

  // Verificar si las compras están habilitadas
  if (!ENABLE_SHOPPING) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          py: { md: 10, xs: 2 },
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url(/assets/images/shapes/video-2-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.5,
            zIndex: 1,
          },
          '::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(6, 58, 122, 0.8)',
            zIndex: 2,
          },
        }}
      >
        <Box sx={{ maxWidth: 800, mx: 'auto', px: 2, position: 'relative', zIndex: 3, textAlign: 'center' }}>
          <Typography variant="h2" gutterBottom sx={{ color: '#fff', fontWeight: 700, mb: 3 }}>
            🚧 En Construcción
          </Typography>
          <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.9)', mb: 2 }}>
            Estamos trabajando para mejorar tu experiencia de compra
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 4 }}>
            Pronto podrás realizar tus compras de manera más fácil y segura. 
            Mientras tanto, puedes explorar nuestros cursos y contactarnos para más información.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => router.push('/cursos')}
            sx={{
              backgroundColor: '#ffd701',
              color: '#051b35',
              fontWeight: 'bold',
              borderRadius: 0,
              minWidth: '200px',
              height: '55px',
              fontSize: '1.1rem',
              '&:hover': {
                backgroundColor: '#3b91e1',
                color: '#fff'
              }
            }}
          >
            Explorar Cursos
          </Button>
        </Box>
      </Box>
    );
  }

  // Evitar problemas de hidratación - no renderizar contenido que depende de cartItems hasta que se monte
  if (!mounted) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          p: 4,
          textAlign: 'center',
          backgroundColor: '#f5f5f5'
        }}
      >
        <Typography variant="h6" sx={{ color: '#051b35', mb: 2 }}>
          Cargando...
        </Typography>
      </Box>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          py: { md: 10, xs: 2 },
          position: 'relative',
          overflow: 'hidden',
          '::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url(/assets/images/shapes/video-2-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.5,
            zIndex: 1,
          },
          '::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(6, 58, 122, 0.8)', // azul #063a7a
            zIndex: 2,
          },
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2, position: 'relative', zIndex: 3 }}>
          <div className="flex flex-col items-center justify-center h-[85vh] space-y-6">
            <ShoppingCartIcon sx={{ fontSize: 120, color: 'rgba(255,255,255,0.8)' }} />
            <Typography variant="h3" gutterBottom sx={{ color: '#fff', fontWeight: 700, textAlign: 'center' }}>
              Tu carrito está vacío
            </Typography>
            <Typography variant="h5" textAlign="center" sx={{ mb: 2, color: 'rgba(255,255,255,0.9)' }}>
              🌊 No hay productos en tu carrito para proceder al checkout 🌊
            </Typography>
            <Typography variant="body1" textAlign="center" sx={{ mb: 4, color: 'rgba(255,255,255,0.8)' }}>
              Explora nuestros increíbles cursos de buceo y comienza tu aventura submarina
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push('/cursos')}
              sx={{
                backgroundColor: '#ffd701',
                color: '#051b35',
                fontWeight: 'bold',
                borderRadius: 0,
                minWidth: '200px',
                height: '55px',
                fontSize: '1.1rem',
                '&:hover': {
                  backgroundColor: '#3b91e1',
                  color: '#fff'
                }
              }}
            >
              Explorar Cursos
            </Button>
          </div>
        </Box>
      </Box>
    );
  }

  // Fondo con imagen y overlay azul
  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: { md: 10, xs: 2 },
        position: 'relative',
        overflow: 'hidden',
        '::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/assets/images/shapes/video-2-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.5,
          zIndex: 1,
        },
        '::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(6, 58, 122, 0.8)', // azul #063a7a
          zIndex: 2,
        },
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2, position: 'relative', zIndex: 3 }}>
        <Typography variant="h3" gutterBottom textAlign="center" sx={{
          mb: 4,
          color: '#fff',
          fontWeight: 700,
          fontSize: { xs: '1.5rem', md: '2rem' },
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}>
          Checkout
        </Typography>

        <Stepper
          activeStep={activeStep}
          sx={{
            mb: 6,
            '& .MuiStepLabel-root': {
              '& .MuiStepLabel-label': {
                color: '#fff',
                fontWeight: 500,
                fontSize: '1rem',
                textShadow: '0 1px 3px rgba(0,0,0,0.3)'
              },
              '& .MuiStepLabel-label.Mui-active': {
                color: '#fff',
                fontWeight: 600
              },
              '& .MuiStepLabel-label.Mui-completed': {
                color: '#fff',
                fontWeight: 600
              }
            },
            '& .MuiStepIcon-root': {
              color: 'rgba(255,255,255,0.7)',
              fontSize: '2rem'
            },
            '& .MuiStepIcon-root.Mui-active': {
              color: '#ffd701',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
            },
            '& .MuiStepIcon-root.Mui-completed': {
              color: '#ffd701',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
            },
            '& .MuiStepConnector-root': {
              '& .MuiStepConnector-line': {
                borderColor: 'rgba(255,255,255,0.5)',
                borderTopWidth: 3
              }
            },
            '& .MuiStepConnector-root.Mui-active': {
              '& .MuiStepConnector-line': {
                borderColor: '#ffd701'
              }
            },
            '& .MuiStepConnector-root.Mui-completed': {
              '& .MuiStepConnector-line': {
                borderColor: '#ffd701'
              }
            }
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Paper sx={{
          p: { xs: 2, sm: 3, md: 4 },
          mb: 2,
          background: 'rgba(255,255,255,0.95)',
          borderRadius: 0,
          border: '1px solid #e0e0e0',
          boxShadow: 'none',
          maxWidth: '100%',
          overflow: 'hidden'
        }}>
          {renderStepContent(activeStep)}
        </Paper>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: { xs: 1, sm: 2 },
          flexDirection: { xs: 'column', sm: 'row' },
          mt: { xs: 2, sm: 0 }
        }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="contained"
            sx={{
              backgroundColor: '#ffd701',
              color: '#051b35',
              fontWeight: 'bold',
              borderRadius: 0,
              minWidth: { xs: '100%', sm: '150px' },
              height: { xs: '45px', sm: '50px' },
              fontSize: { xs: '0.9rem', sm: '1rem' },
              '&:hover': {
                backgroundColor: '#3b91e1',
                color: '#fff'
              },
              '&:disabled': {
                backgroundColor: 'rgba(255, 215, 1, 0.5)',
                color: 'rgba(5, 27, 53, 0.5)'
              }
            }}
          >
            Atrás
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={(activeStep === 1 && !isFormValid()) || processingPayment}
            sx={{
              backgroundColor: '#ffd701',
              color: '#051b35',
              fontWeight: 'bold',
              borderRadius: 0,
              minWidth: { xs: '100%', sm: '150px' },
              height: { xs: '45px', sm: '50px' },
              fontSize: { xs: '0.9rem', sm: '1rem' },
              '&:hover': {
                backgroundColor: '#3b91e1',
                color: '#fff'
              },
              '&:disabled': {
                backgroundColor: 'rgba(255, 215, 1, 0.5)',
                color: 'rgba(5, 27, 53, 0.5)'
              }
            }}
          >
            {activeStep === steps.length - 1 ? 'Proceder con el Pago' : 'Siguiente'}
          </Button>
        </Box>

        {/* Cursos relacionados dependiendo a la subcategoria que esta en el curso que se esta comprando */}
        {mounted && cartItems.length > 0 && (
          <Box sx={{ mt: 8, position: 'relative', zIndex: 3 }}>
            <Typography variant="h4" textAlign="center" sx={{
              mb: 4,
              color: '#fff',
              fontWeight: 700,
              fontSize: { xs: '1.5rem', md: '2rem' },
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              Cursos Relacionados
            </Typography>
            <Typography variant="body1" textAlign="center" sx={{
              mb: 6,
              color: 'rgba(255,255,255,0.9)',
              fontSize: '1.1rem',
              maxWidth: 600,
              mx: 'auto'
            }}>
              Descubre otros cursos que podrían interesarte basados en tu selección actual
            </Typography>

            {loadingRelated ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <img
                  src="/assets/images/Animation - 1746715748714.gif"
                  alt="Cargando cursos relacionados..."
                  style={{ width: 100, height: 100 }}
                />
                <Typography variant="body1" sx={{ mt: 2, color: 'rgba(255,255,255,0.8)' }}>
                  Cargando cursos relacionados...
                </Typography>
              </Box>
            ) : relatedProducts.length > 0 ? (
              <Box sx={{ position: 'relative' }} className="course-group">
                <Swiper
                  modules={[Navigation]}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    setIsSwiperReady(true);
                  }}
                  spaceBetween={30}
                  slidesPerView={3}
                  loop={true}
                  navigation={{
                    prevEl: ".swiper-button-prev",
                    nextEl: ".swiper-button-next",
                  }}
                  breakpoints={{
                    0: { slidesPerView: 1 },
                    767: { slidesPerView: 2 },
                    991: { slidesPerView: 2 },
                    1199: { slidesPerView: 3 },
                  }}
                >
                  {relatedProducts.map((product) => (
                    <SwiperSlide key={product.sku}>
                      <div
                        className="course-one__single w-full flex flex-col justify-between"
                        style={{ height: "100%", minHeight: 520, background: "#fff" }}
                      >
                        <div className="course-one__image w-full">
                          <Link href={`/cursos/${product.sku}`} className="course-one__cat">
                            {product.category_name}
                          </Link>
                          <div className="course-one__image-inner w-full">
                            {product.photo ? (
                              <img
                                src={product.photo}
                                alt={product.name}
                                style={{
                                  width: "100%",
                                  height: "333px",
                                  objectFit: "cover",
                                  display: "block",
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: "100%",
                                  height: "333px",
                                  backgroundColor: "#f0f0f0",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <span>Imagen no disponible</span>
                              </div>
                            )}
                            <Link href={`/cursos/${product.sku}`}>
                              <i className="scubo-icon-plus-symbol"></i>
                            </Link>
                          </div>
                        </div>

                        <div
                          className="course-one__content hvr-sweep-to-bottom w-full px-4 py-3 flex-grow flex flex-col justify-between"
                          style={{ backgroundColor: "#fff" }}
                        >
                          <h3 className="text-base font-bold leading-tight text-center">
                            <Link href={`/cursos/${product.sku}`}>{product.name}</Link>
                          </h3>
                          <p className="text-sm text-gray-600 text-center mt-2">
                            {product.short_description || "Descripción no disponible"}
                          </p>
                        </div>

                        <button
                          onClick={() => handleAddToCart(product)}
                          className="course-one__book-link block w-full text-center mt-auto py-2 transition-colors duration-200 hover:bg-blue-500 hover:text-white cursor-pointer"
                          style={{ 
                            borderTop: "1px solid #f0f0f0",
                            backgroundColor: "#ffd701",
                            color: "#051b35",
                            fontWeight: "bold",
                            border: "none"
                          }}
                        >
                          Agregar Curso
                        </button>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Botones de navegación del Swiper */}
                <SwiperNavigationButtons 
                  swiperRef={swiperRef} 
                  isSwiperReady={isSwiperReady} 
                />

              </Box>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  No se encontraron cursos relacionados en este momento.
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => router.push('/cursos')}
                  sx={{
                    mt: 2,
                    backgroundColor: '#ffd701',
                    color: '#051b35',
                    fontWeight: 'bold',
                    borderRadius: 0,
                    '&:hover': {
                      backgroundColor: '#3b91e1',
                      color: '#fff'
                    }
                  }}
                >
                  Explorar Todos los Cursos
                </Button>
              </Box>
            )}
          </Box>
        )}
      </Box>

      {/* Snackbar de confirmación */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          sx={{ width: '100%' }}
        >
          ¡Producto agregado al carrito! Redirigiendo al checkout...
        </Alert>
      </Snackbar>

    </Box>
  );
}