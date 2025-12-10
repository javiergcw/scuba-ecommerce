import { ApiService } from '@/core/standart_service';
import { API_ENDPOINTS } from '@/core/const/api_const';
import { SendInformationProductDto } from '@/core/dto/send/product/send_information_product_dto';
import { ReceiveInformationProductDto } from '@/core/dto/receive/product/receive_information_product_dto';
import { ReceiveProductsDto, ProductDto } from '@/core/dto/receive/product/receive_products_dto';

export class ProductService {
    
    /**
     * Obtener todos los productos públicos
     * @returns Promise con la lista de productos
     */
    public static async getAllProducts(): Promise<ProductDto[] | null> {
        try {
            const response = await fetch(API_ENDPOINTS.PRODUCTS, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store'
            });

            if (!response.ok) {
                console.error('❌ Error al obtener productos:', response.status, response.statusText);
                return null;
            }

            const data: ReceiveProductsDto = await response.json();
            return data.data;
        } catch (error) {
            console.error('❌ Error al obtener productos:', error);
            return null;
        }
    }

    /**
     * Obtener un producto por SKU
     * @param sku - SKU del producto
     * @returns Promise con el producto
     */
    public static async getProductBySku(sku: string): Promise<ProductDto | null> {
        try {
            console.log('🔍 ProductService.getProductBySku - SKU recibido:', sku);
            console.log('🔗 Endpoint:', API_ENDPOINTS.PRODUCT_BY_SKU(sku));
            
            const response = await fetch(API_ENDPOINTS.PRODUCT_BY_SKU(sku), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store'
            });

            console.log('📡 Respuesta del fetch:', response.status, response.statusText);

            if (!response.ok) {
                let errorText = '';
                try {
                    errorText = await response.text();
                } catch (e) {
                    errorText = 'No se pudo leer el error';
                }
                console.error('❌ Error al obtener producto:', response.status, response.statusText);
                console.error('📄 Detalles del error:', errorText);
                return null;
            }

            let data: { success: boolean; data: ProductDto };
            try {
                data = await response.json();
            } catch (e) {
                console.error('❌ Error al parsear JSON de la respuesta:', e);
                return null;
            }
            
            console.log('✅ Producto obtenido exitosamente en ProductService');
            console.log('📦 Estructura de datos:', {
                success: data.success,
                hasData: !!data.data,
                productName: data.data?.name
            });
            
            if (!data.success || !data.data) {
                console.error('❌ Respuesta sin datos válidos:', data);
                return null;
            }
            
            return data.data;
        } catch (error) {
            console.error('❌ Error al obtener producto:', error);
            if (error instanceof Error) {
                console.error('📄 Mensaje de error:', error.message);
                console.error('📄 Stack:', error.stack);
            }
            return null;
        }
    }

    /**
     * @deprecated Usar getProductBySku en su lugar
     * Obtener un producto por ID (mantenido por compatibilidad)
     * @param id - ID del producto (UUID)
     * @returns Promise con el producto
     */
    public static async getProductById(id: string): Promise<ProductDto | null> {
        // Por compatibilidad, intentamos obtener el producto por ID
        // pero recomendamos usar SKU
        console.warn('⚠️ getProductById está deprecado. Usa getProductBySku en su lugar.');
        return this.getProductBySku(id);
    }
    
    /**
     * Obtener información de productos con precios y stock
     * @param productData - Array de productos con sus cantidades
     * @returns Promise con la información detallada de los productos
     */
    public static async getProductInformation(productData: SendInformationProductDto): Promise<ReceiveInformationProductDto | null> {
        const response = await ApiService.request<ReceiveInformationProductDto>({
            method: 'POST',
            url: API_ENDPOINTS.ORDERS_PRODUCT_INFO,
            data: productData
        });

        // Si hay error, devolver null
        if (!response || 'errorType' in response) {
            console.error('❌ Error al obtener información de productos:', response);
            return null;
        }

        return response;
    }

    /**
     * Obtener información de un solo producto
     * @param productId - ID del producto
     * @param quantity - Cantidad del producto
     * @returns Promise con la información del producto
     */
    public static async getSingleProductInformation(productId: number, quantity: number = 1): Promise<ReceiveInformationProductDto | null> {
        const productData: SendInformationProductDto = {
            items: [{ product_id: productId, quantity }]
        };

        return this.getProductInformation(productData);
    }

    /**
     * Validar disponibilidad de productos
     * @param productData - Array de productos con sus cantidades
     * @returns Promise con boolean indicando si todos los productos están disponibles
     */
    public static async validateProductAvailability(productData: SendInformationProductDto): Promise<boolean> {
        const response = await this.getProductInformation(productData);
        
        if (!response) {
            return false;
        }

        // Verificar que todos los productos estén disponibles y tengan stock
        return response.data.products.every(product => 
            product.available && 
            product.has_stock && 
            product.active && 
            product.public
        );
    }
}
