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
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  AddShoppingCart as AddShoppingCartIcon
} from '@mui/icons-material';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "@/styles/carousel.css";
import Link from "next/link";
import { services, Product } from "monolite-saas";
import SwiperNavigationButtons from "@/components/containers/SwiperNavigationButtons";
import { ProductUseCase } from "@/core/use-case/product/product_use_case";
import { OrderUseCase } from "@/core/use-case/order/order_use_case";
import { SendInformationProductDto } from "@/core/dto/send/product/send_information_product_dto";
import { ReceiveInformationProductDto } from "@/core/dto/receive/product/receive_information_product_dto";
import { SendCreateOrderDto } from "@/core/dto/send/order/send_create_order_dto";
import { ReceiveCreateOrderDto } from "@/core/dto/receive/order/receive_create_order_dto";

const steps = ['Resumen de Compra', 'Información Personal', 'URL de Pago'];

// Variable para controlar si estamos en producción o desarrollo
const isProduction = false; // Cambiar a true cuando esté en producción

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart, addToCart } = useCart();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentResult, setPaymentResult] = useState<'success' | 'failed' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const [showDevPopup, setShowDevPopup] = useState(false);
  const [realTotalPrice, setRealTotalPrice] = useState<number>(0);
  const [loadingRealPrice, setLoadingRealPrice] = useState(false);
  const [orderResult, setOrderResult] = useState<ReceiveCreateOrderDto | null>(null);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [orderTotalAmount, setOrderTotalAmount] = useState<number>(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'Colombia',
    zipCode: ''
  });

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
            product_id: parseInt(item.id),
            quantity: item.quantity
          }))
        };

        console.log('🛒 Obteniendo precio real para productos:', productData);

        await ProductUseCase.getProductInformation(
          productData,
          (data: ReceiveInformationProductDto) => {
            console.log('✅ Precio real obtenido:', data.data.total_amount);
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
        console.log('🛒 Productos en carrito:', cartItems);

        const allProducts = await services.products.getProducts();
        console.log('📦 Todos los productos:', allProducts.length);

        // Obtener categorías únicas de los productos en el carrito
        const cartCategories = [...new Set(cartItems.map(item => {
          // Extraer categoría del nombre del producto (asumiendo formato: "Categoría - Nombre")
          const categoryMatch = item.name.match(/^([^-]+)/);
          const category = categoryMatch ? categoryMatch[1].trim() : 'General';
          console.log(`Categoría extraída de "${item.name}": ${category}`);
          return category;
        }))];

        console.log('📋 Categorías del carrito:', cartCategories);

        // Filtrar productos relacionados (misma categoría pero no en el carrito)
        const related = allProducts.filter(product => {
          const productCategory = product.category_name || 'General';
          const isInCart = cartItems.some(cartItem => cartItem.id === product.id.toString());
          const isRelated = cartCategories.includes(productCategory) && !isInCart;

          console.log(`Producto "${product.name}": categoría="${productCategory}", en carrito=${isInCart}, relacionado=${isRelated}`);

          return isRelated;
        });

        console.log('🎯 Productos relacionados encontrados:', related.length);

        // Si no hay productos relacionados por categoría, mostrar productos aleatorios
        if (related.length === 0) {
          console.log('⚠️ No hay productos relacionados por categoría, mostrando productos aleatorios');
          const randomProducts = allProducts
            .filter(product => !cartItems.some(cartItem => cartItem.id === product.id.toString()))
            .sort(() => Math.random() - 0.5)
            .slice(0, 6);
          setRelatedProducts(randomProducts);
        } else {
          // Limitar a 6 productos relacionados
          setRelatedProducts(related.slice(0, 6));
        }
      } catch (error) {
        console.error('❌ Error al cargar productos relacionados:', error);
        // En caso de error, mostrar productos aleatorios
        try {
          const allProducts = await services.products.getProducts();
          const randomProducts = allProducts
            .filter(product => !cartItems.some(cartItem => cartItem.id === product.id.toString()))
            .sort(() => Math.random() - 0.5)
            .slice(0, 6);
          setRelatedProducts(randomProducts);
        } catch (fallbackError) {
          console.error('❌ Error en fallback:', fallbackError);
        }
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
    // Si no estamos en producción, mostrar popup de desarrollo
    // if (!isProduction) {
    //   setShowDevPopup(true);
    //   return;
    // }

    if (activeStep === steps.length - 1) {
      // Crear orden usando el caso de uso
      handleCreateOrder();
    } else {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleCreateOrder = async () => {
    if (!isFormValid()) {
      return;
    }

    setIsProcessing(true);
    setOrderError(null);

    try {
      // Preparar datos de la orden
      const orderData: SendCreateOrderDto = {
        customer_name: `${formData.firstName} ${formData.lastName}`,
        customer_email: formData.email,
        customer_phone: formData.phone,
        items: cartItems.map(item => ({
          product_id: parseInt(item.id),
          quantity: item.quantity
        })),
        notes: `Dirección: ${formData.address}, ${formData.city}, ${formData.country} ${formData.zipCode}`
      };

      console.log('🛒 Creando orden:', orderData);

              await OrderUseCase.createOrder(
          orderData,
          (data: ReceiveCreateOrderDto) => {
            console.log('✅ Orden creada exitosamente:', data);
            setOrderResult(data);
            setOrderTotalAmount(data.data.total_amount);
            setIsProcessing(false);
            // Limpiar carrito solo si la orden se creó exitosamente
            clearCart();
          },
        (error) => {
          console.error('❌ Error al crear orden:', error);
          setOrderError(error.message || 'Error al crear la orden');
          setIsProcessing(false);
        }
      );
    } catch (error) {
      console.error('❌ Error en handleCreateOrder:', error);
      setOrderError('Error inesperado al crear la orden');
      setIsProcessing(false);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleReturnHome = () => {
    router.push('/');
  };

  const handleAddToCart = (product: Product) => {
    const courseItem = {
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image_url,
      courseDuration: 4, // Valor por defecto
      numberOfDives: 2,   // Valor por defecto
      subcategory_name: product.subcategory_name
    };

    addToCart(courseItem);
    setShowSuccess(true);

    // Redirigir a checkout después de un breve delay
    setTimeout(() => {
      router.push('/checkout');
    }, 1000);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  const handleCloseDevPopup = () => {
    setShowDevPopup(false);
  };

  const isFormValid = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city'];
    return requiredFields.every(field => formData[field as keyof typeof formData].trim() !== '');
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
            {cartItems.map((item) => (
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
                  label="Ciudad"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
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
                  label="Código Postal"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  size="small"
                />
              </Box>
            </Box>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h5" gutterBottom sx={{
              fontSize: { xs: '1.3rem', sm: '1.5rem' },
              fontWeight: 600,
              color: '#051b35'
            }}>
              URL de Pago
            </Typography>
            <Typography variant="body1" sx={{ 
              mb: 3, 
              color: 'text.secondary',
              fontSize: { xs: '0.9rem', sm: '1rem' },
              lineHeight: 1.6
            }}>
              Al hacer clic en "Crear Orden", se generará un enlace de pago seguro que te permitirá completar tu transacción de forma segura.
            </Typography>
            
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="body1" gutterBottom sx={{
                fontSize: { xs: '0.95rem', sm: '1rem' },
                fontWeight: 600
              }}>
                <strong>¿Cómo funciona?</strong>
              </Typography>
              <Typography variant="body2" sx={{
                fontSize: { xs: '0.85rem', sm: '0.875rem' },
                lineHeight: 1.6
              }}>
                • Se creará tu orden con todos los datos ingresados<br />
                • Recibirás un enlace de pago seguro y confiable<br />
                • Podrás pagar con tarjeta, transferencia o efectivo<br />
                • El pago se procesará de forma segura
              </Typography>
            </Alert>

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
                  {orderTotalAmount > 0 && (
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: 1
                    }}>
                      <Typography variant="body2" color="success.main" sx={{
                        fontSize: { xs: '0.85rem', sm: '0.875rem' },
                        fontWeight: 500
                      }}>
                        Total Confirmado:
                      </Typography>
                      <Typography variant="body2" fontWeight="bold" color="success.main" sx={{
                        fontSize: { xs: '0.85rem', sm: '0.875rem' }
                      }}>
                        {formatPrice(orderTotalAmount)}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Box>
        );

      default:
        return null;
    }
  };

  // Pantalla de procesamiento de pago
  if (isProcessing) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', py: 4 }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>
          <div className="flex flex-col items-center justify-center h-[85vh] space-y-4">
            <img
              src="/assets/images/Animation - 1746715748714.gif"
              alt="Procesando pago..."
              style={{ width: 200, height: 200 }}
            />
            <Typography variant="h4" gutterBottom>
              Generando tu link de pago...
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Por favor espera mientras procesamos tu compra
            </Typography>
          </div>
        </Box>
      </Box>
    );
  }

  // Pantalla de resultado del pago
  if (orderResult || orderError) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        backgroundColor: '#f5f5f5', 
        py: { xs: 2, md: 4 },
        px: { xs: 1, md: 2 }
      }}>
        <Box sx={{ 
          maxWidth: 900, 
          mx: 'auto', 
          px: { xs: 1, sm: 2, md: 3 },
          position: 'relative',
          zIndex: 3
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '85vh',
            gap: { xs: 3, md: 4 }
          }}>
            {orderResult ? (
              <>
                <CheckCircleIcon sx={{ 
                  fontSize: { xs: 80, sm: 100, md: 120 }, 
                  color: '#4caf50' 
                }} />
                
                <Typography variant="h3" gutterBottom color="success.main" sx={{
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                  textAlign: 'center',
                  fontWeight: 700
                }}>
                  ¡Orden Creada Exitosamente!
                </Typography>
                
                <Typography variant="h5" textAlign="center" sx={{ 
                  mb: 2,
                  fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                  color: '#051b35'
                }}>
                  🐠 ¡Bienvenido al mundo submarino! 🐠
                </Typography>
                
                <Card sx={{ 
                  p: { xs: 2, sm: 3 }, 
                  mb: 3, 
                  borderRadius: 0, 
                  border: '2px solid #4caf50',
                  backgroundColor: '#f8fff8',
                  width: '100%',
                  maxWidth: 600
                }}>
                  <Typography variant="h6" gutterBottom sx={{ 
                    fontWeight: 'bold', 
                    color: '#051b35',
                    fontSize: { xs: '1.1rem', sm: '1.3rem' }
                  }}>
                    Detalles de tu Orden:
                  </Typography>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 1,
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: 1
                    }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        ID de Orden:
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#051b35' }}>
                        #{orderResult.data.order_id}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: 1
                    }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        Código de Tracking:
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#051b35' }}>
                        {orderResult.data.tracking_code}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: 1
                    }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        Total:
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#051b35', fontWeight: 'bold' }}>
                        {formatPrice(orderResult.data.total_amount)}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: 1
                    }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                        Total Confirmado:
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 'bold' }}>
                        {formatPrice(orderResult.data.total_amount)}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: 1
                    }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        Estado:
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#051b35' }}>
                        {orderResult.data.status}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: 1
                    }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        Estado de Pago:
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#051b35' }}>
                        {orderResult.data.payment_status}
                      </Typography>
                    </Box>
                  </Box>
                </Card>

                {orderResult.data.payment_url && (
                  <Box sx={{ 
                    textAlign: 'center', 
                    mb: 3,
                    width: '100%',
                    maxWidth: 600
                  }}>
                    <Typography variant="h6" gutterBottom sx={{ 
                      fontWeight: 'bold', 
                      color: '#051b35',
                      fontSize: { xs: '1.1rem', sm: '1.3rem' }
                    }}>
                      🔗 Enlace de Pago:
                    </Typography>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => window.open(orderResult.data.payment_url, '_blank')}
                      sx={{
                        backgroundColor: '#ffd701',
                        color: '#051b35',
                        fontWeight: 'bold',
                        borderRadius: 0,
                        minWidth: { xs: '180px', sm: '200px' },
                        height: { xs: '50px', sm: '55px' },
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        '&:hover': {
                          backgroundColor: '#3b91e1',
                          color: '#fff'
                        }
                      }}
                    >
                      Ir al Pago
                    </Button>
                  </Box>
                )}

                <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ 
                  mb: 4,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  maxWidth: 600,
                  px: { xs: 1, sm: 2 }
                }}>
                  Tu orden ha sido creada exitosamente.<br />
                  Recibirás un email con todos los detalles de tu curso de buceo.
                </Typography>
                
                <Box sx={{ 
                  textAlign: 'center',
                  maxWidth: 600,
                  px: { xs: 1, sm: 2 }
                }}>
                  <Typography variant="h6" gutterBottom sx={{
                    fontSize: { xs: '1.1rem', sm: '1.3rem' },
                    fontWeight: 'bold',
                    color: '#051b35'
                  }}>
                    Próximos pasos:
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    lineHeight: 1.6
                  }}>
                    • Completa el pago usando el enlace proporcionado<br />
                    • Revisa tu email para confirmar los detalles<br />
                    • Llega 15 minutos antes de tu clase<br />
                    • Trae ropa cómoda y una toalla<br />
                    • ¡Prepárate para una aventura increíble!
                  </Typography>
                </Box>
              </>
            ) : (
              <>
                <CancelIcon sx={{ 
                  fontSize: { xs: 80, sm: 100, md: 120 }, 
                  color: '#f44336' 
                }} />
                
                <Typography variant="h3" gutterBottom color="error.main" sx={{
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                  textAlign: 'center',
                  fontWeight: 700
                }}>
                  Error al Crear Orden
                </Typography>
                
                <Typography variant="h5" textAlign="center" sx={{ 
                  mb: 2,
                  fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                  color: '#051b35'
                }}>
                  🌊 No te preocupes, podemos intentarlo de nuevo 🌊
                </Typography>
                
                <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ 
                  mb: 4,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  maxWidth: 600,
                  px: { xs: 1, sm: 2 }
                }}>
                  {orderError || 'Hubo un problema creando tu orden.'}<br />
                  Verifica los datos ingresados e intenta nuevamente.
                </Typography>
                
                <Box sx={{ 
                  textAlign: 'center',
                  maxWidth: 600,
                  px: { xs: 1, sm: 2 }
                }}>
                  <Typography variant="h6" gutterBottom sx={{
                    fontSize: { xs: '1.1rem', sm: '1.3rem' },
                    fontWeight: 'bold',
                    color: '#051b35'
                  }}>
                    Posibles causas:
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    lineHeight: 1.6
                  }}>
                    • Datos de contacto incorrectos<br />
                    • Productos no disponibles<br />
                    • Problema temporal del sistema<br />
                    • Error de conexión
                  </Typography>
                </Box>
              </>
            )}

            <Box sx={{ 
              mt: 4, 
              display: 'flex', 
              gap: { xs: 1, sm: 2 }, 
              flexWrap: 'wrap', 
              justifyContent: 'center',
              width: '100%',
              maxWidth: 600
            }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleReturnHome}
                sx={{
                  backgroundColor: '#ffd701',
                  color: '#051b35',
                  fontWeight: 'bold',
                  borderRadius: 0,
                  minWidth: { xs: '150px', sm: '180px' },
                  height: { xs: '50px', sm: '55px' },
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  '&:hover': {
                    backgroundColor: '#3b91e1',
                    color: '#fff'
                  }
                }}
              >
                Volver al Inicio
              </Button>
              {orderError && (
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => {
                    setOrderError(null);
                    setOrderResult(null);
                  }}
                  sx={{
                    borderColor: '#ffd701',
                    color: '#ffd701',
                    fontWeight: 'bold',
                    borderRadius: 0,
                    minWidth: { xs: '150px', sm: '180px' },
                    height: { xs: '50px', sm: '55px' },
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    '&:hover': {
                      borderColor: '#3b91e1',
                      color: '#3b91e1',
                      backgroundColor: 'rgba(59, 145, 225, 0.1)'
                    }
                  }}
                >
                  Intentar de Nuevo
                </Button>
              )}
            </Box>
          </Box>
        </Box>
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
              onClick={() => router.push('/courses')}
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
            disabled={activeStep === 1 && !isFormValid()}
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
            {activeStep === steps.length - 1 ? 'Crear Orden' : 'Siguiente'}
          </Button>
        </Box>

        {/* Cursos relacionados dependiendo a la subcategoria que esta en el curso que se esta comprando */}
        {cartItems.length > 0 && (
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
                    <SwiperSlide key={product.id}>
                      <div
                        className="course-one__single w-full flex flex-col justify-between"
                        style={{ height: "100%", minHeight: 520, background: "#fff" }}
                      >
                        <div className="course-one__image w-full">
                          <Link href={`/courses/${product.id}`} className="course-one__cat">
                            {product.category_name}
                          </Link>
                          <div className="course-one__image-inner w-full">
                            {product.image_url ? (
                              <img
                                src={product.image_url}
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
                            <Link href={`/courses/${product.id}`}>
                              <i className="scubo-icon-plus-symbol"></i>
                            </Link>
                          </div>
                        </div>

                        <div
                          className="course-one__content hvr-sweep-to-bottom w-full px-4 py-3 flex-grow flex flex-col justify-between"
                          style={{ backgroundColor: "#fff" }}
                        >
                          <h3 className="text-base font-bold leading-tight text-center">
                            <Link href={`/courses/${product.id}`}>{product.name}</Link>
                          </h3>
                          <p className="text-sm text-gray-600 text-center mt-2">
                            {product.description || "Descripción no disponible"}
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
                  onClick={() => router.push('/courses')}
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

      {/* Popup de desarrollo */}
      <Dialog
        open={showDevPopup}
        onClose={handleCloseDevPopup}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 0,
            border: '2px solid #ffd701'
          }
        }}
      >
        <DialogTitle sx={{
          backgroundColor: '#051b35',
          color: '#fff',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1.5rem'
        }}>
          🚧 Sitio en Desarrollo 🚧
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <Box sx={{ textAlign: 'center' }}>
            <img
              src="/assets/images/Animation - 1746715748714.gif"
              alt="En desarrollo"
              style={{ width: 120, height: 120, margin: '0 auto 20px' }}
            />
            <Typography variant="h5" gutterBottom sx={{ color: '#051b35', fontWeight: 'bold' }}>
              ¡Estamos trabajando en esto!
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
              Esta funcionalidad está en desarrollo y estará disponible pronto.
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              🌊 Mientras tanto, puedes explorar nuestros cursos de buceo disponibles 🌊
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{
          backgroundColor: '#f5f5f5',
          px: 3,
          py: 2,
          justifyContent: 'center'
        }}>
          <Button
            onClick={handleCloseDevPopup}
            variant="contained"
            sx={{
              backgroundColor: '#ffd701',
              color: '#051b35',
              fontWeight: 'bold',
              borderRadius: 0,
              minWidth: '150px',
              height: '45px',
              '&:hover': {
                backgroundColor: '#3b91e1',
                color: '#fff'
              }
            }}
          >
            Entendido
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}