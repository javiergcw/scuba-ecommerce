import { PublicContractService } from '@/core/service/contract/public_contract_service';
import { HandleVerifyType } from '@/core/handle_verify_type';
import { ReceiveContractByProductDto } from '@/core/dto/receive/contract/receive_contract_by_product_dto';

export class PublicContractUseCase {
    
    /**
     * Obtener contrato por producto con acciones personalizadas
     * @param companyName - Nombre de la empresa
     * @param sku - SKU del producto
     * @param onSuccess - Acción a ejecutar cuando se obtiene el contrato exitosamente
     * @param onError - Acción a ejecutar cuando hay error
     */
    public static async getContractByProduct(
        companyName: string,
        sku: string,
        onSuccess: (data: ReceiveContractByProductDto) => void,
        onError: (error: any) => void
    ): Promise<void> {
        const serviceResponse = await PublicContractService.getContractByProduct(companyName, sku);
        
        HandleVerifyType.handle(serviceResponse, {
            onSuccess: (data) => {
                onSuccess(data);
            },
            onError: (error) => {
                onError(error);
            },
            successMessage: "Contrato obtenido exitosamente",
            errorMessage: "Error al obtener contrato por producto"
        });
    }
    
    /**
     * Obtener contrato por producto de forma silenciosa
     * @param companyName - Nombre de la empresa
     * @param sku - SKU del producto
     * @returns Contrato o null
     */
    public static async getContractByProductSilently(
        companyName: string,
        sku: string
    ): Promise<ReceiveContractByProductDto | null> {
        const serviceResponse = await PublicContractService.getContractByProduct(companyName, sku);
        
        const result = HandleVerifyType.handle(serviceResponse, {
            ...HandleVerifyType.createSilentActions<ReceiveContractByProductDto>(),
            successMessage: "Contrato obtenido silenciosamente",
            errorMessage: "Error al obtener contrato silenciosamente"
        });
        
        return result.success ? result.data! : null;
    }
}
