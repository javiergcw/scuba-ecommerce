export const API_ENDPOINTS = {
  // Productos - Obtener todos los productos públicos (a través de API Route para evitar CORS)
  PRODUCTS: '/api/products',
  
  // Productos - Obtener producto por ID (a través de API Route para evitar CORS)
  PRODUCT_BY_ID: (id: string) => `/api/products/${id}`,
  
  // Órdenes - Información de producto
  ORDERS_PRODUCT_INFO: '/api/v2/orders/product-info',
  
  // Órdenes - Endpoint base
  ORDERS: '/api/v2/orders/',
  
  // Órdenes - Seguimiento por código de tracking
  ORDERS_TRACKING: (trackingCode: string) => `/api/v2/orders/tracking/${trackingCode}`,
  
  // Órdenes - Buscar por email
  ORDERS_BY_EMAIL: (email: string) => `/api/v2/orders/by-email?email=${email}`,
  
  // Zonas - Obtener zonas con banners (a través de API Route para evitar CORS)
  ZONES: '/api/zones',
} as const;
