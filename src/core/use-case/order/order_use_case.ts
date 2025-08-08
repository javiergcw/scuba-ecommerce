import { OrderService } from '@/core/service/order/order_service';
import { HandleVerifyType } from '@/core/handle_verify_type';
import { SendCreateOrderDto } from '@/core/dto/send/order/send_create_order_dto';
import { ReceiveCreateOrderDto } from '@/core/dto/receive/order/receive_create_order_dto';
import { ReceiveStatusOrderDto } from '@/core/dto/receive/order/receive_status_order_dto';
import { ReceiveOrderByIdDto } from '@/core/dto/receive/order/receive_order_by_id';

export class OrderUseCase {
    
    /**
     * Crear una nueva orden con manejo de acciones personalizadas
     * @param orderData - Datos de la orden a crear
     * @param onSuccess - Acción a ejecutar cuando se crea exitosamente
     * @param onError - Acción a ejecutar cuando hay error
     */
    public static async createOrder(
        orderData: SendCreateOrderDto,
        onSuccess: (data: ReceiveCreateOrderDto) => void,
        onError: (error: any) => void
    ): Promise<void> {
        const serviceResponse = await OrderService.createOrder(orderData);
        
        HandleVerifyType.handle(serviceResponse, {
            onSuccess: (data) => {
                onSuccess(data);
            },
            onError: (error) => {
                onError(error);
            },
            successMessage: "Orden creada exitosamente",
            errorMessage: "Error al crear la orden"
        });
    }
    
    /**
     * Obtener orden por tracking code con acciones personalizadas
     * @param trackingCode - Código de tracking
     * @param onSuccess - Acción a ejecutar cuando se encuentra la orden
     * @param onError - Acción a ejecutar cuando hay error
     */
    public static async getOrderByTracking(
        trackingCode: string,
        onSuccess: (data: ReceiveStatusOrderDto) => void,
        onError: (error: any) => void
    ): Promise<void> {
        const serviceResponse = await OrderService.getOrderByTracking(trackingCode);
        
        HandleVerifyType.handle(serviceResponse, {
            onSuccess: (data) => {
                onSuccess(data);
            },
            onError: (error) => {
                onError(error);
            },
            successMessage: `Orden encontrada con tracking: ${trackingCode}`,
            errorMessage: `Error al buscar orden con tracking: ${trackingCode}`
        });
    }
    
    /**
     * Obtener órdenes por email con acciones personalizadas
     * @param email - Email del cliente
     * @param onSuccess - Acción a ejecutar cuando se encuentran las órdenes
     * @param onError - Acción a ejecutar cuando hay error
     */
    public static async getOrdersByEmail(
        email: string,
        onSuccess: (data: ReceiveOrderByIdDto) => void,
        onError: (error: any) => void
    ): Promise<void> {
        const serviceResponse = await OrderService.getOrdersByEmail(email);
        
        HandleVerifyType.handle(serviceResponse, {
            onSuccess: (data) => {
                onSuccess(data);
            },
            onError: (error) => {
                onError(error);
            },
            successMessage: `Órdenes encontradas para el email: ${email}`,
            errorMessage: `Error al buscar órdenes para el email: ${email}`
        });
    }
    
    /**
     * Crear orden con toast/notificaciones predefinidas
     * @param orderData - Datos de la orden
     * @param showSuccessToast - Función para mostrar toast de éxito
     * @param showErrorToast - Función para mostrar toast de error
     */
    public static async createOrderWithToast(
        orderData: SendCreateOrderDto,
        showSuccessToast: (message: string, data?: ReceiveCreateOrderDto) => void,
        showErrorToast: (message: string, error?: any) => void
    ): Promise<void> {
        const serviceResponse = await OrderService.createOrder(orderData);
        
        const toastActions = HandleVerifyType.createToastActions(
            showSuccessToast,
            showErrorToast
        );
        
        HandleVerifyType.handle(serviceResponse, {
            ...toastActions,
            successMessage: "Orden creada exitosamente",
            errorMessage: "Error al crear la orden"
        });
    }
    
    /**
     * Ejemplo de uso silencioso (solo logs)
     * @param trackingCode - Código de tracking
     * @returns Resultado de la operación
     */
    public static async getOrderSilently(trackingCode: string): Promise<ReceiveStatusOrderDto | null> {
        const serviceResponse = await OrderService.getOrderByTracking(trackingCode);
        
        const result = HandleVerifyType.handle(serviceResponse, {
            ...HandleVerifyType.createSilentActions<ReceiveStatusOrderDto>(),
            successMessage: "Orden obtenida silenciosamente",
            errorMessage: "Error al obtener orden silenciosamente"
        });
        
        return result.success ? result.data! : null;
    }
}
