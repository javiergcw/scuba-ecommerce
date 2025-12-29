"use client";

import { useState, useEffect } from "react";
import { IconButton, Zoom, Drawer, Box, Typography, Button, Divider, Chip } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WaterIcon from "@mui/icons-material/Water";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function FloatingCartButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { cartItems, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();
  
  // Evitar problemas de hidratación esperando a que el componente se monte
  useEffect(() => {
    setMounted(true);
  }, []);
  const router = useRouter();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckout = () => {
    setIsOpen(false);
    router.push('/finalizar-compra');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(price);
  };

  return (
    <>
      <Zoom in>
        <IconButton
          sx={{
            height: 65,
            width: 65,
            position: "fixed",
            bottom: 24,
            right: 100,
            zIndex: 1000,
            background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
            color: "white",
            boxShadow: "0 8px 25px rgba(25, 118, 210, 0.4)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)",
              transform: "translateY(-2px)",
              boxShadow: "0 12px 35px rgba(25, 118, 210, 0.5)",
            },
          }}
          onClick={toggleDrawer}
          aria-label="Carrito de compras"
        >
          <ShoppingCartIcon sx={{ fontSize: 28 }} />
          {mounted && totalItems > 0 && (
            <Box
              sx={{
                position: "absolute",
                top: -6,
                right: -6,
                background: "linear-gradient(135deg, #f44336 0%, #d32f2f 100%)",
                color: "white",
                borderRadius: "50%",
                width: 26,
                height: 26,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: "bold",
                boxShadow: "0 4px 12px rgba(244, 67, 54, 0.4)",
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%": { transform: "scale(1)" },
                  "50%": { transform: "scale(1.1)" },
                  "100%": { transform: "scale(1)" },
                },
              }}
            >
              {totalItems}
            </Box>
          )}
        </IconButton>
      </Zoom>

      <Drawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: 420,
            maxWidth: "90vw",
            background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
            borderLeft: "1px solid #e2e8f0",
          },
        }}
      >
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          {/* Header mejorado */}
          <Box 
            sx={{ 
              p: 3, 
              background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
              color: "white",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                right: 0,
                width: "100px",
                height: "100px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: 0,
                transform: "translate(30px, -30px)",
              }
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 0.5 }}>
                  🛒 Carrito de Compras
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {totalItems} {totalItems === 1 ? 'producto' : 'productos'} agregado{totalItems !== 1 ? 's' : ''}
                </Typography>
              </Box>
              <IconButton 
                onClick={toggleDrawer}
                sx={{ 
                  color: "white",
                  borderRadius: 0,
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" }
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Cart Items */}
          <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
            {cartItems.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 6 }}>
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: 0,
                    background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px",
                  }}
                >
                  <ShoppingCartIcon sx={{ fontSize: 48, color: "#1976d2" }} />
                </Box>
                <Typography variant="h6" color="grey.700" sx={{ mb: 1, fontWeight: "600" }}>
                  Tu carrito está vacío
                </Typography>
                <Typography variant="body2" color="grey.500">
                  ¡Explora nuestros cursos de buceo y comienza tu aventura!
                </Typography>
              </Box>
            ) : (
              cartItems.map((item) => (
                <Box 
                  key={item.id} 
                  sx={{ 
                    mb: 2, 
                    p: 2.5, 
                    background: "white",
                    borderRadius: 0,
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
                      transform: "translateY(-1px)",
                    }
                  }}
                >
                  <Box sx={{ display: "flex", gap: 1.5 }}>
                    {/* Imagen del curso mejorada */}
                    <Box sx={{ flexShrink: 0, position: "relative" }}>
                      <Image
                        src={item.image || "/assets/images/courses/course-1-1.jpg"}
                        alt={item.name}
                        width={70}
                        height={70}
                        style={{
                          borderRadius: 0,
                          objectFit: "cover",
                          border: "2px solid #e2e8f0"
                        }}
                      />
                      <Chip
                        label={`x${item.quantity}`}
                        size="small"
                        sx={{
                          position: "absolute",
                          top: -4,
                          right: -4,
                          background: "#ffd701",
                          color: "#000",
                          fontWeight: "bold",
                          fontSize: "10px",
                          height: "16px",
                          borderRadius: 0,
                          minWidth: "20px",
                          "& .MuiChip-label": {
                            padding: "0 4px",
                          }
                        }}
                      />
                    </Box>
                    
                    {/* Información del curso mejorada */}
                    <Box sx={{ flex: 1 }}>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          fontWeight: "bold", 
                          mb: 1,
                          color: "#1a202c",
                          lineHeight: 1.3,
                          fontSize: "14px"
                        }}
                      >
                        {item.name}
                      </Typography>
                      
                      {/* Chips de información */}
                      <Box sx={{ display: "flex", gap: 0.5, mb: 1.5, flexWrap: "wrap" }}>
                        {item.courseDuration && (
                          <Chip
                            icon={<AccessTimeIcon sx={{ fontSize: 14 }} />}
                            label={`${item.courseDuration} días`}
                            size="small"
                            sx={{
                              background: "linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)",
                              color: "#2e7d32",
                              fontWeight: "500",
                              fontSize: "11px",
                              height: "20px",
                              borderRadius: 0,
                            }}
                          />
                        )}
                        
                        {item.numberOfDives && (
                          <Chip
                            icon={<WaterIcon sx={{ fontSize: 14 }} />}
                            label={`${item.numberOfDives} inmersiones`}
                            size="small"
                            sx={{
                              background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
                              color: "#1565c0",
                              fontWeight: "500",
                              fontSize: "11px",
                              height: "20px",
                              borderRadius: 0,
                            }}
                          />
                        )}
                      </Box>
                      
                      {/* Controles de cantidad mejorados */}
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center", background: "#f8fafc", borderRadius: 0, p: 0.5, border: "1px solid #e2e8f0" }}>
                          <Button
                            size="small"
                            variant="text"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            sx={{ 
                              minWidth: 28, 
                              height: 28,
                              borderRadius: 0,
                              color: "#64748b",
                              fontSize: "12px",
                              "&:hover": { 
                                backgroundColor: "#ffd701",
                                color: "#000"
                              }
                            }}
                          >
                            -
                          </Button>
                          <Typography sx={{ 
                            minWidth: 24, 
                            textAlign: "center",
                            fontWeight: "bold",
                            color: "#1e293b",
                            fontSize: "13px"
                          }}>
                            {item.quantity}
                          </Typography>
                          <Button
                            size="small"
                            variant="text"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            sx={{ 
                              minWidth: 28, 
                              height: 28,
                              borderRadius: 0,
                              color: "#64748b",
                              fontSize: "12px",
                              "&:hover": { 
                                backgroundColor: "#ffd701",
                                color: "#000"
                              }
                            }}
                          >
                            +
                          </Button>
                        </Box>
                      </Box>
                      
                      {/* Precio debajo */}
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          fontWeight: "bold", 
                          color: "#1976d2",
                          fontSize: "15px"
                        }}
                      >
                        {formatPrice(item.price * item.quantity)}
                      </Typography>
                    </Box>
                    
                    {/* Botón eliminar mejorado */}
                    <Box sx={{ alignSelf: "flex-start" }}>
                      <IconButton 
                        size="small" 
                        onClick={() => removeFromCart(item.id)}
                        sx={{ 
                          color: "#ef4444",
                          background: "#fef2f2",
                          width: 32,
                          height: 32,
                          borderRadius: 0,
                          "&:hover": { 
                            backgroundColor: "#ffd701",
                            color: "#000"
                          },
                          transition: "all 0.2s ease"
                        }}
                      >
                        <DeleteIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              ))
            )}
          </Box>

          {/* Footer mejorado */}
          {cartItems.length > 0 && (
            <Box 
              sx={{ 
                p: 3, 
                background: "white",
                borderTop: "1px solid #e2e8f0",
                boxShadow: "0 -4px 6px rgba(0, 0, 0, 0.05)"
              }}
            >
              <Box sx={{ mb: 3 }}>
                <Box sx={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center",
                  p: 2,
                  background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                  borderRadius: 0,
                  mb: 2
                }}>
                  <Typography variant="h6" sx={{ fontWeight: "600", color: "#1e293b" }}>
                    Total a pagar:
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1976d2" }}>
                    {formatPrice(totalPrice)}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handleCheckout}
                  sx={{ 
                    background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                    borderRadius: 0,
                    py: 1.5,
                    fontSize: "16px",
                    fontWeight: "bold",
                    textTransform: "none",
                    boxShadow: "0 8px 25px rgba(25, 118, 210, 0.3)",
                    transition: "all 0.3s ease",
                    "&:hover": { 
                      background: "#ffd701",
                      color: "#000",
                      transform: "translateY(-2px)",
                      boxShadow: "0 12px 35px rgba(255, 215, 1, 0.4)",
                    }
                  }}
                >
                  🚀 Proceder al Pago
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
} 