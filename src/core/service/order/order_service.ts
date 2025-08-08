import { ApiService } from '@/core/standart_service';
import { API_ENDPOINTS } from '@/core/const/api_const';
import { SendCreateOrderDto } from '@/core/dto/send/order/send_create_order_dto';
import { ReceiveCreateOrderDto } from '@/core/dto/receive/order/receive_create_order_dto';
import { ReceiveStatusOrderDto } from '@/core/dto/receive/order/receive_status_order_dto';
import { ReceiveOrderByIdDto } from '@/core/dto/receive/order/receive_order_by_id';

export class OrderService {
    
    /**
     * Crear una nueva orden
     * @param orderData - Datos de la orden a crear
     * @returns Promise con la respuesta de la creación de la orden
     */
    public static async createOrder(orderData: SendCreateOrderDto): Promise<ReceiveCreateOrderDto | null> {
        const response = await ApiService.request<ReceiveCreateOrderDto>({
            method: 'POST',
            url: API_ENDPOINTS.ORDERS,
            data: orderData
        });

        // Si hay error, devolver null
        if (!response || 'errorType' in response) {
            console.error('❌ Error al crear orden:', response);
            return null;
        }

        return response;
    }

    /**
     * Obtener una orden por código de tracking
     * @param trackingCode - Código de tracking de la orden
     * @returns Promise con la información de la orden
     */
    public static async getOrderByTracking(trackingCode: string): Promise<ReceiveStatusOrderDto | null> {
        const response = await ApiService.request<ReceiveStatusOrderDto>({
            method: 'GET',
            url: API_ENDPOINTS.ORDERS_TRACKING(trackingCode)
        });

        // Si hay error, devolver null
        if (!response || 'errorType' in response) {
            console.error('❌ Error al obtener orden por tracking:', response);
            return null;
        }

        return response;
    }

    /**
     * Obtener órdenes por email del cliente
     * @param email - Email del cliente
     * @returns Promise con las órdenes del cliente
     */
    public static async getOrdersByEmail(email: string): Promise<ReceiveOrderByIdDto | null> {
        const response = await ApiService.request<ReceiveOrderByIdDto>({
            method: 'GET',
            url: API_ENDPOINTS.ORDERS_BY_EMAIL(email)
        });

        // Si hay error, devolver null
        if (!response || 'errorType' in response) {
            console.error('❌ Error al obtener órdenes por email:', response);
            return null;
        }

        return response;
    }
}
