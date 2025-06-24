"use client";

import React, { useState } from 'react';
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
  Cancel as CancelIcon
} from '@mui/icons-material';

const steps = ['Resumen de Compra', 'Información Personal', 'Método de Pago'];

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentResult, setPaymentResult] = useState<'success' | 'failed' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
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
              <Paper key={item.id} sx={{ p: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
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
                    <Typography variant="h6">
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
              <Card sx={{ mt: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
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
                  backgroundColor: '#1976d2',
                  '&:hover': { backgroundColor: '#1565c0' }
                }}
              >
                Volver al Inicio
              </Button>
              {paymentResult === 'failed' && (
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => setPaymentResult(null)}
                  sx={{ borderColor: '#1976d2', color: '#1976d2' }}
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
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <ShoppingCartIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Tu carrito está vacío
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          No hay productos en tu carrito para proceder al checkout.
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => router.push('/courses')}
          sx={{ backgroundColor: '#1976d2' }}
        >
          Explorar Cursos
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', py: 4 }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>
        <Typography variant="h3" gutterBottom textAlign="center" sx={{ mb: 4 }}>
          Checkout
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Paper sx={{ p: 4, mb: 2 }}>
          {renderStepContent(activeStep)}
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Atrás
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={activeStep === 1 && !isFormValid()}
            sx={{ 
              backgroundColor: '#1976d2',
              '&:hover': { backgroundColor: '#1565c0' }
            }}
          >
            {activeStep === steps.length - 1 ? 'Procesar Pago' : 'Siguiente'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
} 