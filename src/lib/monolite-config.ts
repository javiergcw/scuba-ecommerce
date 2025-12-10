import { configManager } from 'monolite-saas';
import { API_CONFIG } from '@/core/const/api_const';

// Configurar la URL base y la clave de licencia desde las variables de entorno
(configManager as any).baseURL = API_CONFIG.BASE_URL;
(configManager as any).licenseKey = API_CONFIG.LICENSE_KEY;

export { configManager }; 