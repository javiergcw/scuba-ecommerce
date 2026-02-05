import { API_ENDPOINTS } from '@/core/const/api_const';
import { ReceiveContractByProductDto } from '@/core/dto/receive/contract/receive_contract_by_product_dto';
import { SendSignPublicContractDto, SignPublicContractResponseDto } from '@/core/dto/send/contract/send_sign_public_contract_dto';

export class PublicContractService {
    
    /**
     * Obtener un contrato por producto (SKU y company_name) - Endpoint público sin token
     * @param companyName - Nombre de la empresa
     * @param sku - SKU del producto
     * @returns Promise con el contrato del producto
     */
    public static async getContractByProduct(
        companyName: string,
        sku: string
    ): Promise<ReceiveContractByProductDto | null> {
        try {
            console.log('🔍 PublicContractService - Llamando a:', API_ENDPOINTS.CONTRACT_BY_PRODUCT(companyName, sku));
            
            const response = await fetch(API_ENDPOINTS.CONTRACT_BY_PRODUCT(companyName, sku), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store'
            });

            console.log('📡 PublicContractService - Respuesta:', response.status, response.statusText);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ Error al obtener contrato por producto:', response.status, response.statusText, errorText);
                return null;
            }

            const data: ReceiveContractByProductDto = await response.json();
            console.log('✅ PublicContractService - Contrato obtenido:', data);
            return data;
        } catch (error) {
            console.error('❌ Error al obtener contrato por producto:', error);
            return null;
        }
    }

    /**
     * Firmar un contrato público por producto (SKU y company_name) - Endpoint público sin token
     * @param signData - Datos de la firma incluyendo company_name, sku y fields
     * @returns Promise con la respuesta de la firma
     */
    public static async signContract(
        signData: SendSignPublicContractDto
    ): Promise<SignPublicContractResponseDto | null> {
        try {
            console.log('🔍 PublicContractService.signContract - Llamando a:', API_ENDPOINTS.CONTRACT_SIGN_PUBLIC);
            console.log('📤 Datos a enviar:', JSON.stringify(signData, null, 2));
            
            const response = await fetch(API_ENDPOINTS.CONTRACT_SIGN_PUBLIC, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signData),
                cache: 'no-store'
            });

            console.log('📡 PublicContractService.signContract - Respuesta:', response.status, response.statusText);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ Error al firmar contrato público:', response.status, response.statusText, errorText);
                try {
                    const errorData = JSON.parse(errorText);
                    return {
                        success: false,
                        error: errorData.error || 'Error al firmar el contrato'
                    };
                } catch {
                    return {
                        success: false,
                        error: errorText || 'Error al firmar el contrato'
                    };
                }
            }

            const data: SignPublicContractResponseDto = await response.json();
            console.log('✅ PublicContractService.signContract - Contrato firmado:', data);
            return data;
        } catch (error) {
            console.error('❌ Error al firmar contrato público:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Error desconocido al firmar el contrato'
            };
        }
    }
}
