import { API_ENDPOINTS } from '@/core/const/api_const';
import { ReceiveContractDto, ReceiveContractStatusDto } from '@/core/dto/receive/contract/receive_contract_dto';
import { SendSignContractDto, SignContractResponseDto } from '@/core/dto/send/contract/send_sign_contract_dto';

export class ContractService {
    
    /**
     * Obtener un contrato por token
     * @param token - Token del contrato
     * @returns Promise con el contrato
     */
    public static async getContractByToken(token: string): Promise<ReceiveContractDto | null> {
        try {
            const response = await fetch(API_ENDPOINTS.CONTRACT_BY_TOKEN(token), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store'
            });

            if (!response.ok) {
                console.error('❌ Error al obtener contrato:', response.status, response.statusText);
                return null;
            }

            const data: ReceiveContractDto = await response.json();
            return data;
        } catch (error) {
            console.error('❌ Error al obtener contrato:', error);
            return null;
        }
    }

    /**
     * Obtener el status de un contrato por token
     * @param token - Token del contrato
     * @returns Promise con el status del contrato
     */
    public static async getContractStatus(token: string): Promise<ReceiveContractStatusDto | null> {
        try {
            const response = await fetch(API_ENDPOINTS.CONTRACT_STATUS(token), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store'
            });

            if (!response.ok) {
                console.error('❌ Error al obtener status del contrato:', response.status, response.statusText);
                return null;
            }

            const data: ReceiveContractStatusDto = await response.json();
            return data;
        } catch (error) {
            console.error('❌ Error al obtener status del contrato:', error);
            return null;
        }
    }

    /**
     * Firmar un contrato
     * @param token - Token del contrato
     * @param signData - Datos de la firma
     * @returns Promise con la respuesta de la firma
     */
    public static async signContract(token: string, signData: SendSignContractDto): Promise<SignContractResponseDto | null> {
        try {
            console.log('📤 Enviando firma al backend:', {
                hasSignature: !!signData.fields.signature,
                signatureLength: signData.fields.signature?.length || 0,
                signatureStart: signData.fields.signature?.substring(0, 50) || 'N/A',
                allFields: Object.keys(signData.fields)
            });

            const jsonBody = JSON.stringify(signData);
            console.log('📦 Tamaño del JSON:', jsonBody.length, 'caracteres');

            const response = await fetch(API_ENDPOINTS.CONTRACT_SIGN(token), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonBody,
                cache: 'no-store'
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ Error en respuesta del servidor:', response.status, response.statusText, errorText);
                return {
                    success: false,
                    error: `Error ${response.status}: ${response.statusText}`
                };
            }

            const data: SignContractResponseDto = await response.json();
            console.log('✅ Respuesta del backend:', {
                success: data.success,
                hasSignature: !!data.data,
                signature: data.data ? (data.data as any).signature : 'N/A'
            });
            
            return data;
        } catch (error) {
            console.error('❌ Error al firmar contrato:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Error desconocido'
            };
        }
    }
}

