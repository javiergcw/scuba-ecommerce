"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  id: string; // UUID del producto (usado para crear orden)
  sku?: string; // SKU del producto (opcional, para compatibilidad con APIs que lo requieran)
  name: string;
  price: number;
  quantity: number;
  image?: string;
  courseDuration?: number;
  numberOfDives?: number;
  subcategory_name?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

const CART_STORAGE_KEY = 'scuba-ecommerce-cart';

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // Función para cargar el carrito desde localStorage
  const loadCartFromStorage = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        return JSON.parse(savedCart);
      }
    } catch (error) {
      console.error('Error al cargar el carrito desde localStorage:', error);
    }
    return [];
  };

  // Inicializar el estado vacío para evitar problemas de hidratación
  // Los datos se cargarán en useEffect solo en el cliente después de la hidratación
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Lazy initialization: solo en cliente, pero después de que el componente se monte
    // Retornar array vacío inicialmente para que servidor y cliente coincidan
    return [];
  });
  const [isInitialized, setIsInitialized] = useState(false);

  // Cargar el carrito desde localStorage al montar el componente (solo en cliente)
  useEffect(() => {
    // Solo ejecutar en el cliente, después de la hidratación
    if (typeof window !== 'undefined') {
      const savedCart = loadCartFromStorage();
      if (savedCart.length > 0) {
        setCartItems(savedCart);
      }
      setIsInitialized(true);
    }
  }, []);

  // Guardar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
      } catch (error) {
        console.error('Error al guardar el carrito en localStorage:', error);
      }
    }
  }, [cartItems, isInitialized]);

  const addToCart = (newItem: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === newItem.id);
      
      if (existingItem) {
        // Si el item ya existe, incrementar la cantidad
        return prevItems.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si es un item nuevo, agregarlo al carrito
        return [...prevItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    // Limpiar también el localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(CART_STORAGE_KEY);
      } catch (error) {
        console.error('Error al limpiar el carrito del localStorage:', error);
      }
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 