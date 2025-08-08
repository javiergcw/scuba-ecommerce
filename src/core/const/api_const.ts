export const API_ENDPOINTS = {
  // Órdenes - Información de producto
  ORDERS_PRODUCT_INFO: '/api/v2/orders/product-info',
  
  // Órdenes - Endpoint base
  ORDERS: '/api/v2/orders/',
  
  // Órdenes - Seguimiento por código de tracking
  ORDERS_TRACKING: (trackingCode: string) => `/api/v2/orders/tracking/${trackingCode}`,
  
  // Órdenes - Buscar por email
  ORDERS_BY_EMAIL: (email: string) => `/api/v2/orders/by-email?email=${email}`,
} as const;
