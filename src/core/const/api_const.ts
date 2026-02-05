// Configuración de API
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.oceanoscuba.com.co',
  LICENSE_KEY: process.env.NEXT_PUBLIC_LICENSE_KEY || 'bee0f6a4642a2864d688a660fe897dbfc74962704a69d52d2c7d33eaffe78554',
} as const;

export const API_ENDPOINTS = {
  // Productos - Obtener todos los productos públicos (a través de API Route para evitar CORS)
  PRODUCTS: '/api/products',
  
  // Productos - Obtener producto por SKU (a través de API Route para evitar CORS)
  PRODUCT_BY_SKU: (sku: string) => `/api/products/${sku}`,
  
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
  
  // Contratos - Descargar PDF de contrato por token
  CONTRACT_PDF: (token: string) => `/api/contracts/${token}/pdf`,
  
  // Contratos - Obtener contrato por token (a través de API Route para evitar CORS)
  CONTRACT_BY_TOKEN: (token: string) => `/api/contracts/${token}`,
  
  // Contratos - Obtener status del contrato por token
  CONTRACT_STATUS: (token: string) => `/api/contracts/${token}/status`,
  
  // Contratos - Firmar Formulario por token
  CONTRACT_SIGN: (token: string) => `/api/contracts/${token}/sign`,
  
  // Contratos - Obtener plantillas de contratos (templates)
  CONTRACT_TEMPLATES: '/api/contracts/templates',
  
  // Contratos - Obtener contrato por producto (endpoint público, sin token)
  CONTRACT_BY_PRODUCT: (companyName: string, sku: string) => `/api/v1/public/contracts/by-product?company_name=${companyName}&sku=${sku}`,
  
  // Contratos - Firmar contrato público por producto (endpoint público, sin token)
  CONTRACT_SIGN_PUBLIC: '/api/v1/public/contracts/sign',
  
  // Booking - Capacidad de reserva (a través de API Route para evitar CORS)
  BOOKING_CAPACITY: (companyId: string, date: string) => `/api/booking-capacity?company_id=${companyId}&date=${date}`,
} as const;
