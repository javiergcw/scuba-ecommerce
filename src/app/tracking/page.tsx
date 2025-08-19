"use client";

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Card,
  CardContent,
  Divider,
  Alert,
  Chip,
  Container,
  CircularProgress,
  IconButton,
  InputAdornment
} from '@mui/material';
import {
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Pending as PendingIcon,
  Payment as PaymentIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  Receipt as ReceiptIcon,
  LocalShipping as ShippingIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';
import { OrderUseCase } from '@/core/use-case/order/order_use_case';
import { ReceiveTrackingOrderDto } from '@/core/dto/receive/order/receive_tracking_order_dto';

export default function TrackingPage() {
  const [trackingCode, setTrackingCode] = useState('');
  const [orderData, setOrderData] = useState<ReceiveTrackingOrderDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'paid':
        return <CheckCircleIcon />;
      case 'pending':
        return <PendingIcon />;
      case 'cancelled':
      case 'failed':
        return <CancelIcon />;
      default:
        return <PendingIcon />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'Completada';
      case 'paid':
        return 'Pagada';
      case 'pending':
        return 'Pendiente';
      case 'cancelled':
        return 'Cancelada';
      case 'failed':
        return 'Fallida';
      default:
        return status;
    }
  };

  const handleSearch = async () => {
    if (!trackingCode.trim()) {
      setError('Por favor ingresa un código de tracking');
      return;
    }

    setLoading(true);
    setError(null);
    setOrderData(null);
    setHasSearched(true);

    try {
      await OrderUseCase.getOrderByTrackingCode(
        trackingCode.trim(),
        (data) => {
          setOrderData(data);
          setLoading(false);
        },
        (error) => {
          setError(error.message || 'No se encontró la orden con ese código de tracking');
          setLoading(false);
        }
      );
    } catch (error) {
      setError('Error inesperado al buscar la orden');
      setLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box
              sx={{
          minHeight: '100vh',
          py: { md: 10, xs: 2 },
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #3b91e1 0%, #051b35 100%)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at 20% 80%, rgba(59, 145, 225, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
            zIndex: 1,
          },
        }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
        {/* Header */}
                  <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h2" gutterBottom sx={{
              color: '#fff',
              fontWeight: 300,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              mb: 3,
              letterSpacing: '-0.02em',
              textShadow: '0 2px 20px rgba(0,0,0,0.1)'
            }}>
              Seguimiento de Órdenes
            </Typography>
            <Typography variant="h5" sx={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: { xs: '1.2rem', md: '1.4rem' },
              maxWidth: 600,
              mx: 'auto',
              fontWeight: 300,
              lineHeight: 1.6
            }}>
              Ingresa tu código de tracking para ver el estado de tu orden y los detalles de tu curso de buceo
            </Typography>
          </Box>

        {/* Buscador */}
        <Paper sx={{
          p: { xs: 3, sm: 4, md: 5 },
          mb: 5,
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.05)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
            borderRadius: '24px 24px 0 0'
          }
        }}>
          <Typography variant="h4" gutterBottom sx={{
            fontWeight: 400,
            color: '#1d1d1f',
            textAlign: 'center',
            mb: 4,
            fontSize: { xs: '1.8rem', md: '2.2rem' },
            letterSpacing: '-0.01em'
          }}>
            Buscar Orden
          </Typography>
          
                      <Box sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 3,
              alignItems: 'center',
              maxWidth: 600,
              mx: 'auto'
            }}>
              <TextField
                fullWidth
                label="Código de Tracking"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ej: 5GT2V5FV"
                InputProps={{
                  startAdornment: (
                                      <InputAdornment position="start">
                    <ShippingIcon sx={{ color: '#3b91e1' }} />
                  </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                    backgroundColor: '#f5f5f7',
                    border: 'none',
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    height: { xs: '56px', sm: '60px' },
                    '&:hover': {
                      backgroundColor: '#f0f0f2',
                    },
                    '&.Mui-focused': {
                      backgroundColor: '#fff',
                      boxShadow: '0 0 0 3px rgba(59,145,225,0.1)',
                    }
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none'
                  }
                }}
              />
              <Button
                variant="contained"
                onClick={handleSearch}
                disabled={loading}
                sx={{
                  background: 'linear-gradient(135deg, #3b91e1 0%, #2d7dd2 100%)',
                  color: '#fff',
                  fontWeight: 500,
                  borderRadius: '16px',
                  minWidth: { xs: '100%', sm: '160px' },
                  height: { xs: '56px', sm: '60px' },
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  textTransform: 'none',
                  boxShadow: '0 8px 20px rgba(59,145,225,0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #2d7dd2 0%, #1e6bc2 100%)',
                    boxShadow: '0 12px 24px rgba(59,145,225,0.4)',
                    transform: 'translateY(-1px)'
                  },
                  '&:disabled': {
                    background: 'linear-gradient(135deg, #8E8E93 0%, #C7C7CC 100%)',
                    boxShadow: 'none',
                    transform: 'none'
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <>
                  <SearchIcon sx={{ mr: 1 }} />
                  Buscar
                </>
              )}
            </Button>
          </Box>

                      {error && (
              <Alert severity="error" sx={{ 
                mt: 3, 
                maxWidth: 600, 
                mx: 'auto',
                borderRadius: '12px',
                backgroundColor: 'rgba(255,59,48,0.1)',
                border: '1px solid rgba(255,59,48,0.2)',
                '& .MuiAlert-icon': {
                  color: '#FF3B30'
                }
              }}>
                {error}
              </Alert>
            )}
        </Paper>

        {/* Resultado de la búsqueda */}
        {hasSearched && !loading && !error && !orderData && (
          <Paper sx={{
            p: { xs: 3, sm: 4 },
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 16px 32px rgba(0,0,0,0.1), 0 6px 12px rgba(0,0,0,0.05)',
            textAlign: 'center'
          }}>
            <CancelIcon sx={{ fontSize: 80, color: '#FF3B30', mb: 3 }} />
            <Typography variant="h5" gutterBottom sx={{ 
              color: '#1d1d1f', 
              fontWeight: 500,
              mb: 2
            }}>
              Orden no encontrada
            </Typography>
            <Typography variant="body1" sx={{ 
              color: '#86868b',
              fontSize: '1.1rem',
              lineHeight: 1.5
            }}>
              No se encontró ninguna orden con el código de tracking: <strong style={{ color: '#1d1d1f' }}>{trackingCode}</strong>
            </Typography>
          </Paper>
        )}

        {/* Detalles de la orden */}
        {orderData && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, md: 4 } }}>
            {/* Header de orden encontrada */}
            <Paper sx={{
              p: { xs: 3, sm: 4, md: 5 },
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.05)',
              textAlign: 'center',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                borderRadius: '24px 24px 0 0'
              }
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <CheckCircleIcon sx={{ 
                  fontSize: { xs: 40, sm: 48 }, 
                  color: '#4caf50', 
                  mr: 3,
                  filter: 'drop-shadow(0 2px 8px rgba(76, 175, 80, 0.3))'
                }} />
                <Typography variant="h4" sx={{ 
                  fontWeight: 400, 
                  color: '#1d1d1f',
                  fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                  letterSpacing: '-0.01em'
                }}>
                  Orden Encontrada
                </Typography>
              </Box>
            </Paper>

            {/* Primera fila: Información del cliente y orden */}
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
              gap: 3
            }}>
              {/* Información del cliente */}
              <Paper sx={{
                p: { xs: 3, sm: 4 },
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.2)',
                height: '100%',
                boxShadow: '0 16px 32px rgba(0,0,0,0.1), 0 6px 12px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.15), 0 8px 16px rgba(0,0,0,0.1)'
                }
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 3,
                  pb: 2,
                  borderBottom: '1px solid rgba(0,0,0,0.1)'
                }}>
                  <PersonIcon sx={{ 
                    color: '#007AFF', 
                    mr: 2, 
                    fontSize: { xs: 24, sm: 28 },
                    filter: 'drop-shadow(0 2px 4px rgba(0,122,255,0.2))'
                  }} />
                  <Typography variant="h6" sx={{ 
                    fontWeight: 500, 
                    color: '#1d1d1f',
                    fontSize: { xs: '1.1rem', sm: '1.2rem' },
                    letterSpacing: '-0.01em'
                  }}>
                    Información del Cliente
                  </Typography>
                </Box>
                
                                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 2,
                      backgroundColor: '#f5f5f7',
                      borderRadius: '12px',
                      border: '1px solid rgba(0,0,0,0.05)',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: '#f0f0f2',
                        transform: 'scale(1.02)'
                      }
                    }}>
                      <Typography variant="body2" sx={{ 
                        fontWeight: 500,
                        color: '#86868b',
                        fontSize: '0.9rem'
                      }}>
                        Nombre:
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        fontWeight: 600, 
                        color: '#1d1d1f',
                        fontSize: '1rem'
                      }}>
                        {orderData.data.customer_name}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 2,
                      backgroundColor: '#f5f5f7',
                      borderRadius: '12px',
                      border: '1px solid rgba(0,0,0,0.05)',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: '#f0f0f2',
                        transform: 'scale(1.02)'
                      }
                    }}>
                      <Typography variant="body2" sx={{ 
                        fontWeight: 500,
                        color: '#86868b',
                        fontSize: '0.9rem'
                      }}>
                        Email:
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        fontWeight: 600, 
                        color: '#1d1d1f',
                        fontSize: '1rem'
                      }}>
                        {orderData.data.customer_email}
                      </Typography>
                    </Box>
                  </Box>
              </Paper>

              {/* Información de la orden */}
              <Paper sx={{
                p: { xs: 3, sm: 4 },
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.2)',
                height: '100%',
                boxShadow: '0 16px 32px rgba(0,0,0,0.1), 0 6px 12px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.15), 0 8px 16px rgba(0,0,0,0.1)'
                }
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 3,
                  pb: 2,
                  borderBottom: '1px solid rgba(0,0,0,0.1)'
                }}>
                  <ReceiptIcon sx={{ 
                    color: '#FF9500', 
                    mr: 2, 
                    fontSize: { xs: 24, sm: 28 },
                    filter: 'drop-shadow(0 2px 4px rgba(255,149,0,0.2))'
                  }} />
                  <Typography variant="h6" sx={{ 
                    fontWeight: 500, 
                    color: '#1d1d1f',
                    fontSize: { xs: '1.1rem', sm: '1.2rem' },
                    letterSpacing: '-0.01em'
                  }}>
                    Información de la Orden
                  </Typography>
                </Box>
                
                                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 2,
                      backgroundColor: '#f5f5f7',
                      borderRadius: '12px',
                      border: '1px solid rgba(0,0,0,0.05)',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: '#f0f0f2',
                        transform: 'scale(1.02)'
                      }
                    }}>
                      <Typography variant="body2" sx={{ 
                        fontWeight: 500,
                        color: '#86868b',
                        fontSize: '0.9rem'
                      }}>
                        ID de Orden:
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        fontWeight: 600, 
                        color: '#1d1d1f',
                        fontSize: '1rem'
                      }}>
                        #{orderData.data.order_id}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 2,
                      backgroundColor: '#f5f5f7',
                      borderRadius: '12px',
                      border: '1px solid rgba(0,0,0,0.05)',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: '#f0f0f2',
                        transform: 'scale(1.02)'
                      }
                    }}>
                      <Typography variant="body2" sx={{ 
                        fontWeight: 500,
                        color: '#86868b',
                        fontSize: '0.9rem'
                      }}>
                        Código de Tracking:
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        fontWeight: 600, 
                        fontFamily: 'SF Mono, Monaco, Inconsolata, Roboto Mono, monospace',
                        color: '#3b91e1',
                        backgroundColor: 'rgba(59,145,225,0.1)',
                        px: 2,
                        py: 1,
                        borderRadius: '8px',
                        border: '1px solid rgba(59,145,225,0.2)',
                        fontSize: '0.9rem'
                      }}>
                        {orderData.data.tracking_code}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 2,
                      backgroundColor: '#f5f5f7',
                      borderRadius: '12px',
                      border: '1px solid rgba(0,0,0,0.05)',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: '#f0f0f2',
                        transform: 'scale(1.02)'
                      }
                    }}>
                      <Typography variant="body2" sx={{ 
                        fontWeight: 500,
                        color: '#86868b',
                        fontSize: '0.9rem'
                      }}>
                        Fecha de Creación:
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        fontWeight: 600, 
                        color: '#1d1d1f',
                        fontSize: '1rem'
                      }}>
                        {formatDate(orderData.data.created_at)}
                      </Typography>
                    </Box>
                  </Box>
              </Paper>
            </Box>

            {/* Segunda fila: Estados y productos */}
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' },
              gap: 3
            }}>
              {/* Estados */}
              <Paper sx={{
                p: { xs: 3, sm: 4 },
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.2)',
                height: '100%',
                boxShadow: '0 16px 32px rgba(0,0,0,0.1), 0 6px 12px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.15), 0 8px 16px rgba(0,0,0,0.1)'
                }
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 3,
                  pb: 2,
                  borderBottom: '1px solid rgba(0,0,0,0.1)'
                }}>
                  <VisibilityIcon sx={{ 
                    color: '#5856D6', 
                    mr: 2, 
                    fontSize: { xs: 24, sm: 28 },
                    filter: 'drop-shadow(0 2px 4px rgba(88,86,214,0.2))'
                  }} />
                  <Typography variant="h6" sx={{ 
                    fontWeight: 500, 
                    color: '#1d1d1f',
                    fontSize: { xs: '1.1rem', sm: '1.2rem' },
                    letterSpacing: '-0.01em'
                  }}>
                    Estados
                  </Typography>
                </Box>
                
                                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: { xs: 'column', sm: 'row' },
                      justifyContent: 'space-between',
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      p: 2,
                      backgroundColor: '#f5f5f7',
                      borderRadius: '12px',
                      border: '1px solid rgba(0,0,0,0.05)',
                      gap: 2,
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: '#f0f0f2',
                        transform: 'scale(1.02)'
                      }
                    }}>
                      <Typography variant="body2" sx={{ 
                        fontWeight: 500, 
                        color: '#86868b',
                        fontSize: '0.9rem'
                      }}>
                        Estado de la Orden:
                      </Typography>
                      <Chip
                        icon={getStatusIcon(orderData.data.status)}
                        label={getStatusText(orderData.data.status)}
                                                 sx={{
                           backgroundColor: getStatusColor(orderData.data.status) === 'success' ? 'rgba(76, 175, 80, 0.1)' :
                                            getStatusColor(orderData.data.status) === 'warning' ? 'rgba(255, 215, 1, 0.1)' :
                                            getStatusColor(orderData.data.status) === 'error' ? 'rgba(244, 67, 54, 0.1)' :
                                            'rgba(142, 142, 147, 0.1)',
                           color: getStatusColor(orderData.data.status) === 'success' ? '#4caf50' :
                                  getStatusColor(orderData.data.status) === 'warning' ? '#ffd701' :
                                  getStatusColor(orderData.data.status) === 'error' ? '#f44336' :
                                  '#8E8E93',
                           border: `1px solid ${
                             getStatusColor(orderData.data.status) === 'success' ? 'rgba(76, 175, 80, 0.3)' :
                             getStatusColor(orderData.data.status) === 'warning' ? 'rgba(255, 215, 1, 0.3)' :
                             getStatusColor(orderData.data.status) === 'error' ? 'rgba(244, 67, 54, 0.3)' :
                             'rgba(142, 142, 147, 0.3)'
                           }`,
                          borderRadius: '12px',
                          fontWeight: 500,
                          fontSize: '0.85rem'
                        }}
                        size="small"
                      />
                    </Box>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: { xs: 'column', sm: 'row' },
                      justifyContent: 'space-between',
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      p: 2,
                      backgroundColor: '#f5f5f7',
                      borderRadius: '12px',
                      border: '1px solid rgba(0,0,0,0.05)',
                      gap: 2,
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: '#f0f0f2',
                        transform: 'scale(1.02)'
                      }
                    }}>
                      <Typography variant="body2" sx={{ 
                        fontWeight: 500, 
                        color: '#86868b',
                        fontSize: '0.9rem'
                      }}>
                        Estado de Pago:
                      </Typography>
                      <Chip
                        icon={<PaymentIcon />}
                        label={getStatusText(orderData.data.payment_status)}
                        sx={{
                          backgroundColor: getStatusColor(orderData.data.payment_status) === 'success' ? 'rgba(76, 175, 80, 0.1)' :
                                           getStatusColor(orderData.data.payment_status) === 'warning' ? 'rgba(255, 215, 1, 0.1)' :
                                           getStatusColor(orderData.data.payment_status) === 'error' ? 'rgba(244, 67, 54, 0.1)' :
                                           'rgba(142, 142, 147, 0.1)',
                          color: getStatusColor(orderData.data.payment_status) === 'success' ? '#4caf50' :
                                 getStatusColor(orderData.data.payment_status) === 'warning' ? '#ffd701' :
                                 getStatusColor(orderData.data.payment_status) === 'error' ? '#f44336' :
                                 '#8E8E93',
                          border: `1px solid ${
                            getStatusColor(orderData.data.payment_status) === 'success' ? 'rgba(76, 175, 80, 0.3)' :
                            getStatusColor(orderData.data.payment_status) === 'warning' ? 'rgba(255, 215, 1, 0.3)' :
                            getStatusColor(orderData.data.payment_status) === 'error' ? 'rgba(244, 67, 54, 0.3)' :
                            'rgba(142, 142, 147, 0.3)'
                          }`,
                          borderRadius: '12px',
                          fontWeight: 500,
                          fontSize: '0.85rem'
                        }}
                        size="small"
                      />
                    </Box>
                  </Box>
              </Paper>

              {/* Productos */}
              <Paper sx={{
                p: { xs: 3, sm: 4 },
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.2)',
                height: '100%',
                boxShadow: '0 16px 32px rgba(0,0,0,0.1), 0 6px 12px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.15), 0 8px 16px rgba(0,0,0,0.1)'
                }
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 3,
                  pb: 2,
                  borderBottom: '1px solid rgba(0,0,0,0.1)'
                }}>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 500, 
                    color: '#1d1d1f',
                    fontSize: { xs: '1.1rem', sm: '1.2rem' },
                    letterSpacing: '-0.01em'
                  }}>
                    🏊‍♂️ Productos del Curso
                  </Typography>
                </Box>
                
                                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {orderData.data.items.map((item, index) => (
                      <Card key={index} sx={{ 
                        borderRadius: '16px', 
                        border: '1px solid rgba(0,0,0,0.05)',
                        backgroundColor: '#f5f5f7',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                          backgroundColor: '#f0f0f2'
                        }
                      }}>
                        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                          <Box sx={{ 
                            display: 'flex', 
                            flexDirection: { xs: 'column', sm: 'row' },
                            justifyContent: 'space-between',
                            alignItems: { xs: 'flex-start', sm: 'center' },
                            gap: { xs: 2, sm: 3 }
                          }}>
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="h6" sx={{ 
                                fontWeight: 600, 
                                color: '#1d1d1f',
                                fontSize: { xs: '1rem', sm: '1.1rem' },
                                mb: 1,
                                letterSpacing: '-0.01em'
                              }}>
                                {item.product_name}
                              </Typography>
                              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                <Typography variant="body2" sx={{ 
                                  color: '#86868b',
                                  fontSize: { xs: '0.85rem', sm: '0.9rem' },
                                  fontWeight: 500
                                }}>
                                  SKU: {item.product_sku}
                                </Typography>
                                <Typography variant="body2" sx={{ 
                                  color: '#86868b',
                                  fontSize: { xs: '0.85rem', sm: '0.9rem' },
                                  fontWeight: 500
                                }}>
                                  Cantidad: {item.quantity}
                                </Typography>
                              </Box>
                            </Box>
                            
                            <Box sx={{ 
                              textAlign: { xs: 'left', sm: 'right' },
                              minWidth: { xs: 'auto', sm: '120px' }
                            }}>
                              <Typography variant="h6" sx={{ 
                                fontWeight: 600, 
                                color: '#4caf50',
                                fontSize: { xs: '1rem', sm: '1.1rem' },
                                letterSpacing: '-0.01em'
                              }}>
                                {formatPrice(item.total_price)}
                              </Typography>
                              {item.unit_price > 0 && (
                                <Typography variant="body2" sx={{ 
                                  color: '#86868b',
                                  fontSize: { xs: '0.85rem', sm: '0.9rem' },
                                  fontWeight: 500
                                }}>
                                  {formatPrice(item.unit_price)} c/u
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
              </Paper>
            </Box>

            {/* Tercera fila: Total y contratos */}
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
              gap: 3
            }}>
              {/* Total */}
              <Paper sx={{
                p: { xs: 3, sm: 4 }, 
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 16px 32px rgba(0,0,0,0.1), 0 6px 12px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.15), 0 8px 16px rgba(0,0,0,0.1)'
                }
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 3,
                  pb: 2,
                  borderBottom: '1px solid rgba(0,0,0,0.1)'
                }}>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 500, 
                    color: '#1d1d1f',
                    fontSize: { xs: '1.1rem', sm: '1.2rem' },
                    letterSpacing: '-0.01em'
                  }}>
                    💰 Total de la Orden
                  </Typography>
                </Box>
                
                                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between',
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    p: 3,
                    background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
                    borderRadius: '16px',
                    color: '#fff',
                    gap: 2,
                    boxShadow: '0 8px 24px rgba(76, 175, 80, 0.3)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '1px',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                      borderRadius: '16px 16px 0 0'
                    }
                  }}>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 500,
                      fontSize: { xs: '1.1rem', sm: '1.2rem' },
                      letterSpacing: '-0.01em'
                    }}>
                      Total Confirmado:
                    </Typography>
                    <Typography variant="h4" sx={{ 
                      fontWeight: 600,
                      fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                      letterSpacing: '-0.02em',
                      textShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                      {formatPrice(orderData.data.total_amount)}
                    </Typography>
                  </Box>
              </Paper>

              {/* Contratos */}
              <Paper sx={{
                p: { xs: 3, sm: 4 },
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 16px 32px rgba(0,0,0,0.1), 0 6px 12px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.15), 0 8px 16px rgba(0,0,0,0.1)'
                }
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 3,
                  pb: 2,
                  borderBottom: '1px solid rgba(0,0,0,0.1)'
                }}>
                  <AssignmentIcon sx={{ 
                    color: '#3b91e1', 
                    mr: 2, 
                    fontSize: { xs: 24, sm: 28 },
                    filter: 'drop-shadow(0 2px 4px rgba(59,145,225,0.2))'
                  }} />
                  <Typography variant="h6" sx={{ 
                    fontWeight: 500, 
                    color: '#1d1d1f',
                    fontSize: { xs: '1.1rem', sm: '1.2rem' },
                    letterSpacing: '-0.01em'
                  }}>
                    Estado de Contratos
                  </Typography>
                </Box>
                
                                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 2,
                      backgroundColor: '#f5f5f7',
                      borderRadius: '12px',
                      border: '1px solid rgba(0,0,0,0.05)',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: '#f0f0f2',
                        transform: 'scale(1.02)'
                      }
                    }}>
                      <Typography variant="body2" sx={{ 
                        fontWeight: 500, 
                        color: '#86868b',
                        fontSize: '0.9rem'
                      }}>
                        Contratos Totales:
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        fontWeight: 600, 
                        color: '#1d1d1f',
                        fontSize: '1rem'
                      }}>
                        {orderData.data.contracts_total}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 2,
                      backgroundColor: '#f5f5f7',
                      borderRadius: '12px',
                      border: '1px solid rgba(0,0,0,0.05)',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: '#f0f0f2',
                        transform: 'scale(1.02)'
                      }
                    }}>
                      <Typography variant="body2" sx={{ 
                        fontWeight: 500, 
                        color: '#86868b',
                        fontSize: '0.9rem'
                      }}>
                        Contratos Firmados:
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        fontWeight: 600, 
                        color: '#4caf50',
                        fontSize: '1rem'
                      }}>
                        {orderData.data.contracts_signed}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 2,
                      backgroundColor: '#f5f5f7',
                      borderRadius: '12px',
                      border: '1px solid rgba(0,0,0,0.05)',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: '#f0f0f2',
                        transform: 'scale(1.02)'
                      }
                    }}>
                      <Typography variant="body2" sx={{ 
                        fontWeight: 500, 
                        color: '#86868b',
                        fontSize: '0.9rem'
                      }}>
                        Contratos Pendientes:
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        fontWeight: 600, 
                        color: '#ffd701',
                        fontSize: '1rem'
                      }}>
                        {orderData.data.contracts_pending}
                      </Typography>
                    </Box>
                    
                    {orderData.data.has_pending_contracts && (
                      <Alert severity="warning" sx={{ 
                        mt: 2, 
                        fontSize: { xs: '0.85rem', sm: '0.9rem' },
                        borderRadius: '12px',
                        backgroundColor: 'rgba(255,215,1,0.1)',
                        border: '1px solid rgba(255,215,1,0.2)',
                        '& .MuiAlert-icon': {
                          color: '#ffd701'
                        }
                      }}>
                        Tienes contratos pendientes de firma. Por favor revisa tu email.
                      </Alert>
                    )}
                  </Box>
              </Paper>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}
