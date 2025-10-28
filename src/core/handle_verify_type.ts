interface ApiError {
    errorType: "network-error" | "unauthorized" | "other";
    message: string;
}

interface HandleVerifyOptions<T> {
    /**
     * Acción a ejecutar cuando la respuesta es exitosa
     * @param data - Los datos recibidos del servicio
     */
    onSuccess: (data: T) => void;
    
    /**
     * Acción a ejecutar cuando hay un error
     * @param error - El error recibido del servicio
     */
    onError: (error: ApiError | null) => void;
    
    /**
     * Mensaje personalizado para logs de éxito (opcional)
     */
    successMessage?: string;
    
    /**
     * Mensaje personalizado para logs de error (opcional)
     */
    errorMessage?: string;
}

interface HandleVerifyResult<T> {
    success: boolean;
    data?: T;
    error?: ApiError | null;
}

export class HandleVerifyType {
    
    /**
     * Maneja la respuesta de un servicio y ejecuta las acciones correspondientes
     * @param serviceResponse - Respuesta del servicio (puede ser data, error o null)
     * @param options - Opciones con las acciones a ejecutar
     * @returns Resultado estructurado con success, data y error
     */
    public static handle<T>(
        serviceResponse: T | ApiError | null,
        options: HandleVerifyOptions<T>
    ): HandleVerifyResult<T> {
        
        // Verificar si la respuesta es null
        if (serviceResponse === null) {
            const error: ApiError = {
                errorType: "other",
                message: "Respuesta nula del servicio"
            };
            
            this.logError(options.errorMessage || "Error en servicio", error);
            options.onError(error);
            
            return {
                success: false,
                error: error
            };
        }
        
        // Verificar si la respuesta es un error
        if (this.isApiError(serviceResponse)) {
            this.logError(options.errorMessage || "Error en servicio", serviceResponse);
            options.onError(serviceResponse);
            
            return {
                success: false,
                error: serviceResponse
            };
        }
        
        // La respuesta es exitosa
        this.logSuccess(options.successMessage || "Operación exitosa", serviceResponse);
        options.onSuccess(serviceResponse);
        
        return {
            success: true,
            data: serviceResponse
        };
    }
    
    /**
     * Versión simplificada que solo retorna el resultado sin ejecutar acciones
     * @param serviceResponse - Respuesta del servicio
     * @returns Resultado estructurado
     */
    public static verify<T>(serviceResponse: T | ApiError | null): HandleVerifyResult<T> {
        if (serviceResponse === null) {
            return {
                success: false,
                error: {
                    errorType: "other",
                    message: "Respuesta nula del servicio"
                }
            };
        }
        
        if (this.isApiError(serviceResponse)) {
            return {
                success: false,
                error: serviceResponse
            };
        }
        
        return {
            success: true,
            data: serviceResponse
        };
    }
    
    /**
     * Crear acciones predefinidas para mostrar toast/notificaciones
     * @param successToast - Función para mostrar toast de éxito
     * @param errorToast - Función para mostrar toast de error
     * @returns Opciones con acciones de toast
     */
    public static createToastActions<T>(
        successToast: (message: string, data?: T) => void,
        errorToast: (message: string, error?: ApiError | null) => void
    ) {
        return {
            onSuccess: (data: T) => {
                successToast("Operación completada exitosamente", data);
            },
            onError: (error: ApiError | null) => {
                const message = error?.message || "Ha ocurrido un error inesperado";
                errorToast(message, error);
            }
        };
    }
    
    /**
     * Crear acciones predefinidas para manejo silencioso (solo logs)
     */
    public static createSilentActions<T>() {
        return {
            onSuccess: (data: T) => {
                // Solo logging, sin acciones adicionales
            },
            onError: (error: ApiError | null) => {
                // Solo logging, sin acciones adicionales
            }
        };
    }
    
    /**
     * Verificar si la respuesta es un error de API
     */
    private static isApiError<T>(response: T | ApiError): response is ApiError {
        return response !== null && 
               typeof response === 'object' && 
               'errorType' in response && 
               'message' in response;
    }
    
    /**
     * Log de éxito
     */
    private static logSuccess<T>(message: string, data: T): void {
        console.log(`✅ ${message}`, data);
    }
    
    /**
     * Log de error
     */
    private static logError(message: string, error: ApiError | null): void {
        console.error(`❌ ${message}`, error);
    }
}
