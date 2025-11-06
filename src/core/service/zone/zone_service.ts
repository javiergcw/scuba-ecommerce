import { API_ENDPOINTS } from '@/core/const/api_const';
import { ReceiveZonesDto } from '@/core/dto/receive/zone/receive_zones_dto';

export class ZoneService {
    
    /**
     * Obtener todas las zonas con sus banners desde el API de Oceano
     * (usando API Route de Next.js para evitar problemas de CORS)
     * @returns Promise con las zonas y sus banners
     */
    public static async getZones(): Promise<ReceiveZonesDto | null> {
        try {
            const response = await fetch(API_ENDPOINTS.ZONES, {
                method: 'GET',
                cache: 'no-store'
            });

            if (!response.ok) {
                console.error('❌ Error al obtener zonas:', response.status);
                return null;
            }

            const data = await response.json();
            return data as ReceiveZonesDto;
        } catch (error) {
            console.error('❌ Error al obtener zonas:', error);
            return null;
        }
    }
}

