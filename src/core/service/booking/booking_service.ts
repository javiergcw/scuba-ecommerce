import { API_ENDPOINTS } from '@/core/const/api_const';
import { ReceiveBookingCapacityDto } from '@/core/dto/receive/booking/receive_booking_capacity_dto';

export class BookingService {
    /**
     * Obtener capacidad de reserva para una fecha específica
     * @param companyId - ID de la compañía
     * @param date - Fecha en formato YYYY-MM (ejemplo: "2024-12")
     * @returns Promise con la capacidad de reserva
     */
    public static async getBookingCapacity(companyId: string, date: string): Promise<ReceiveBookingCapacityDto | null> {
        try {
            const apiUrl = `/api/booking-capacity?company_id=${companyId}&date=${date}`;
            console.log('🔍 Consultando capacidad de reserva:', apiUrl);
            
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store'
            });

            if (!response.ok) {
                console.error('❌ Error al obtener capacidad:', response.status, response.statusText);
                return null;
            }

            const data: ReceiveBookingCapacityDto = await response.json();
            console.log('✅ Capacidad obtenida:', data);
            return data;
        } catch (error) {
            console.error('❌ Error al obtener capacidad de reserva:', error);
            return null;
        }
    }
}

