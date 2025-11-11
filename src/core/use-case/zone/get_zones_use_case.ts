import { ZoneService } from '@/core/service/zone/zone_service';
import { ReceiveZonesDto, ZoneDto, BannerDto } from '@/core/dto/receive/zone/receive_zones_dto';

export class GetZonesUseCase {
    
    /**
     * Ejecutar caso de uso para obtener zonas con banners
     * @returns Promise con las zonas y sus banners o null si hay error
     */
    public static async execute(): Promise<ReceiveZonesDto | null> {
        return await ZoneService.getZones();
    }

    /**
     * Obtener banners de una zona específica por ID
     * @param zoneId - ID de la zona
     * @returns Promise con los banners de la zona o array vacío
     */
    public static async getBannersByZoneId(zoneId: string): Promise<BannerDto[]> {
        const zonesData = await this.execute();
        
        if (!zonesData || !zonesData.success) {
            return [];
        }

        const zone = zonesData.data.find(z => z.id === zoneId);
        return zone?.banners.filter(b => b.active) || [];
    }

    /**
     * Obtener una zona específica por ID
     * @param zoneId - ID de la zona
     * @returns Promise con la zona o null
     */
    public static async getZoneById(zoneId: string): Promise<ZoneDto | null> {
        const zonesData = await this.execute();
        
        if (!zonesData || !zonesData.success) {
            return null;
        }

        return zonesData.data.find(z => z.id === zoneId) || null;
    }
}

