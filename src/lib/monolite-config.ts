import { configManager } from 'monolite-saas';

// Configurar la URL base y la clave de licencia desde las variables de entorno
(configManager as any).baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://api.oceanoscuba.com.co';
(configManager as any).licenseKey = process.env.NEXT_PUBLIC_LICENSE_KEY || '5cef21be9f78ab3844598129e69f14f8f8b4a23e9dcce403a69b6e3e85d1a673';

export { configManager }; 