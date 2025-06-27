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
  CardContent
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

const steps = ['Resumen de Compra', 'Información Personal', 'Método de Pago'];

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart, addToCart } = useCart();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentResult, setPaymentResult] = useState<'success' | 'failed' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'Colombia',
    zipCode: '',
    paymentMethod: 'credit'
  });

  // Referencias para el Swiper
  const swiperRef = useRef<any>(null);
  const [isSwiperReady, setIsSwiperReady] = useState(false);

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
    if (activeStep === steps.length - 1) {
      // Simular proceso de pago
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        // Simular éxito o fallo aleatorio (80% éxito, 20% fallo)
        const isSuccess = Math.random() > 0.2;
        setPaymentResult(isSuccess ? 'success' : 'failed');
        if (isSuccess) {
          clearCart();
        }
      }, 3000);
    } else {
      setActiveStep(prev => prev + 1);
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
      numberOfDives: 2   // Valor por defecto
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

  const isFormValid = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city'];
    return requiredFields.every(field => formData[field as keyof typeof formData].trim() !== '');
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Resumen de Compra
            </Typography>
            {cartItems.map((item) => (
              <Paper
                key={item.id}
                sx={{
                  p: 2,
                  mb: 2,
                  borderRadius: 0,
                  border: '1px solid #e0e0e0',
                  boxShadow: 'none',
                  backgroundColor: '#fafafa'
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#051b35' }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      Cantidad: {item.quantity}
                    </Typography>
                    {item.courseDuration && (
                      <Typography variant="body2" color="text.secondary">
                        Duración: {item.courseDuration} días
                      </Typography>
                    )}
                    {item.numberOfDives && (
                      <Typography variant="body2" color="text.secondary">
                        Inmersiones: {item.numberOfDives}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#051b35' }}>
                      {formatPrice(item.price * item.quantity)}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            ))}
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5">Total:</Typography>
              <Typography variant="h4" color="primary" fontWeight="bold">
                {formatPrice(totalPrice)}
              </Typography>
            </Box>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Información Personal
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <TextField
                  sx={{ flex: 1, minWidth: '250px' }}
                  label="Nombre"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                />
                <TextField
                  sx={{ flex: 1, minWidth: '250px' }}
                  label="Apellido"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                />
              </Box>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <TextField
                  sx={{ flex: 1, minWidth: '250px' }}
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
                <TextField
                  sx={{ flex: 1, minWidth: '250px' }}
                  label="Teléfono"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </Box>
              <TextField
                fullWidth
                label="Dirección"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                required
              />
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <TextField
                  sx={{ flex: 1, minWidth: '250px' }}
                  label="Ciudad"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  required
                />
                <TextField
                  sx={{ flex: 1, minWidth: '250px' }}
                  label="Código Postal"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                />
              </Box>
            </Box>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Método de Pago
            </Typography>
            <FormControl component="fieldset">
              <FormLabel component="legend">Selecciona tu método de pago</FormLabel>
              <RadioGroup
                value={formData.paymentMethod}
                onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
              >
                <FormControlLabel
                  value="credit"
                  control={<Radio />}
                  label="Tarjeta de Crédito/Débito"
                />
                <FormControlLabel
                  value="transfer"
                  control={<Radio />}
                  label="Transferencia Bancaria"
                />
                <FormControlLabel
                  value="cash"
                  control={<Radio />}
                  label="Efectivo (Pago en el centro)"
                />
              </RadioGroup>
            </FormControl>

            {formData.paymentMethod === 'credit' && (
              <Card sx={{
                mt: 2,
                borderRadius: 0,
                border: '1px solid #e0e0e0',
                boxShadow: 'none',
                backgroundColor: '#fafafa'
              }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#051b35' }}>
                    Información de la Tarjeta
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                      fullWidth
                      label="Número de Tarjeta"
                      placeholder="1234 5678 9012 3456"
                    />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <TextField
                        sx={{ flex: 1 }}
                        label="Fecha de Vencimiento"
                        placeholder="MM/AA"
                      />
                      <TextField
                        sx={{ flex: 1 }}
                        label="CVV"
                        placeholder="123"
                      />
                    </Box>
                    <TextField
                      fullWidth
                      label="Nombre en la Tarjeta"
                    />
                  </Box>
                </CardContent>
              </Card>
            )}

            {formData.paymentMethod === 'transfer' && (
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body1" gutterBottom>
                  <strong>Datos Bancarios:</strong>
                </Typography>
                <Typography variant="body2">
                  Banco: Banco de Bogotá<br />
                  Cuenta: 123-456789-01<br />
                  Titular: Oceano Scuba S.A.S<br />
                  Tipo: Cuenta Corriente
                </Typography>
              </Alert>
            )}

            {formData.paymentMethod === 'cash' && (
              <Alert severity="info" sx={{ mt: 2 }}>
                Puedes pagar en efectivo cuando llegues al centro de buceo.
                Te contactaremos para coordinar los detalles.
              </Alert>
            )}
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
              Procesando tu pago...
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Por favor espera mientras procesamos tu transacción
            </Typography>
          </div>
        </Box>
      </Box>
    );
  }

  // Pantalla de resultado del pago
  if (paymentResult) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', py: 4 }}>
        <Box sx={{ maxWidth: 800, mx: 'auto', px: 2 }}>
          <div className="flex flex-col items-center justify-center h-[85vh] space-y-6">
            {paymentResult === 'success' ? (
              <>
                <CheckCircleIcon sx={{ fontSize: 120, color: '#4caf50' }} />
                <Typography variant="h3" gutterBottom color="success.main">
                  ¡Pago Exitoso!
                </Typography>
                <Typography variant="h5" textAlign="center" sx={{ mb: 2 }}>
                  🐠 ¡Bienvenido al mundo submarino! 🐠
                </Typography>
                <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
                  Tu reserva ha sido confirmada exitosamente.<br />
                  Recibirás un email con todos los detalles de tu curso de buceo.
                </Typography>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" gutterBottom>
                    Próximos pasos:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • Revisa tu email para confirmar los detalles<br />
                    • Llega 15 minutos antes de tu clase<br />
                    • Trae ropa cómoda y una toalla<br />
                    • ¡Prepárate para una aventura increíble!
                  </Typography>
                </Box>
              </>
            ) : (
              <>
                <CancelIcon sx={{ fontSize: 120, color: '#f44336' }} />
                <Typography variant="h3" gutterBottom color="error.main">
                  Pago Rechazado
                </Typography>
                <Typography variant="h5" textAlign="center" sx={{ mb: 2 }}>
                  🌊 No te preocupes, podemos intentarlo de nuevo 🌊
                </Typography>
                <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
                  Hubo un problema procesando tu pago.<br />
                  Verifica los datos de tu tarjeta o intenta con otro método de pago.
                </Typography>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" gutterBottom>
                    Posibles causas:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • Datos de tarjeta incorrectos<br />
                    • Fondos insuficientes<br />
                    • Tarjeta bloqueada<br />
                    • Problema temporal del sistema
                  </Typography>
                </Box>
              </>
            )}

            <Box sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleReturnHome}
                sx={{
                  backgroundColor: '#ffd701',
                  color: '#051b35',
                  fontWeight: 'bold',
                  borderRadius: 0,
                  minWidth: '180px',
                  height: '55px',
                  '&:hover': {
                    backgroundColor: '#3b91e1',
                    color: '#fff'
                  }
                }}
              >
                Volver al Inicio
              </Button>
              {paymentResult === 'failed' && (
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => setPaymentResult(null)}
                  sx={{
                    borderColor: '#ffd701',
                    color: '#ffd701',
                    fontWeight: 'bold',
                    borderRadius: 0,
                    minWidth: '180px',
                    height: '55px',
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
          </div>
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
          p: 4,
          mb: 2,
          background: 'rgba(255,255,255,0.95)',
          borderRadius: 0,
          border: '1px solid #e0e0e0',
          boxShadow: 'none'
        }}>
          {renderStepContent(activeStep)}
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="contained"
            sx={{
              backgroundColor: '#ffd701',
              color: '#051b35',
              fontWeight: 'bold',
              borderRadius: 0,
              minWidth: '150px',
              height: '50px',
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
              minWidth: '150px',
              height: '50px',
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
            {activeStep === steps.length - 1 ? 'Procesar Pago' : 'Siguiente'}
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
    </Box>
  );
}