"use client";

import { useState } from "react";
import { IconButton, Zoom, Drawer, Box, Typography, Button, Divider } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function FloatingCartButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();
  const router = useRouter();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckout = () => {
    setIsOpen(false);
    router.push('/checkout');
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
            height: 60,
            width: 60,
            position: "fixed",
            bottom: 24,
            right: 100, // Posicionado a la izquierda del botón de WhatsApp
            zIndex: 1000,
            backgroundColor: "#1976d2",
            color: "white",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          }}
          onClick={toggleDrawer}
          aria-label="Carrito de compras"
        >
          <ShoppingCartIcon sx={{ fontSize: 35 }} />
          {totalItems > 0 && (
            <Box
              sx={{
                position: "absolute",
                top: -8,
                right: -8,
                backgroundColor: "#f44336",
                color: "white",
                borderRadius: "50%",
                width: 24,
                height: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: "bold",
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
            width: 400,
            maxWidth: "90vw",
          },
        }}
      >
        <Box sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column" }}>
          {/* Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Carrito de Compras
            </Typography>
            <IconButton onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Cart Items */}
          <Box sx={{ flex: 1, overflow: "auto" }}>
            {cartItems.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <ShoppingCartIcon sx={{ fontSize: 64, color: "grey.400", mb: 2 }} />
                <Typography variant="h6" color="grey.500">
                  Tu carrito está vacío
                </Typography>
                <Typography variant="body2" color="grey.400">
                  Agrega algunos productos para comenzar
                </Typography>
              </Box>
            ) : (
              cartItems.map((item) => (
                <Box key={item.id} sx={{ mb: 2, p: 2, border: "1px solid #e0e0e0", borderRadius: 1 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="grey.600">
                        {formatPrice(item.price)}
                      </Typography>
                      {item.courseDuration && (
                        <Typography variant="body2" color="grey.500">
                          Duración: {item.courseDuration} días
                        </Typography>
                      )}
                      {item.numberOfDives && (
                        <Typography variant="body2" color="grey.500">
                          Inmersiones: {item.numberOfDives}
                        </Typography>
                      )}
                    </Box>
                    <IconButton 
                      size="small" 
                      onClick={() => removeFromCart(item.id)}
                      sx={{ color: "error.main" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      sx={{ minWidth: 32, height: 32 }}
                    >
                      -
                    </Button>
                    <Typography sx={{ mx: 2, minWidth: 20, textAlign: "center" }}>
                      {item.quantity}
                    </Typography>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      sx={{ minWidth: 32, height: 32 }}
                    >
                      +
                    </Button>
                    <Typography sx={{ ml: "auto", fontWeight: "bold" }}>
                      {formatPrice(item.price * item.quantity)}
                    </Typography>
                  </Box>
                </Box>
              ))
            )}
          </Box>

          {/* Footer */}
          {cartItems.length > 0 && (
            <>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {formatPrice(totalPrice)}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handleCheckout}
                  sx={{ 
                    backgroundColor: "#1976d2",
                    "&:hover": { backgroundColor: "#1565c0" }
                  }}
                >
                  Proceder al Pago
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
} 