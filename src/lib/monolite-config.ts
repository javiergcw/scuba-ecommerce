import { configManager } from 'monolite-saas';

// Configurar la URL base y la clave de licencia desde las variables de entorno
(configManager as any).baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://gateway.makerstech.co';
(configManager as any).licenseKey = process.env.NEXT_PUBLIC_LICENSE_KEY || 'AAAAAAAAAAAAAAAAEvvVEw0tkvEhkG7hUirrMZTWQJeKzW4cskKUFv/agA==';

export { configManager }; 