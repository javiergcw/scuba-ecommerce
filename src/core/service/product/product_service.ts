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
     * Obtener un producto por ID
     * @param id - ID del producto (UUID)
     * @returns Promise con el producto
     */
    public static async getProductById(id: string): Promise<ProductDto | null> {
        try {
            const response = await fetch(API_ENDPOINTS.PRODUCT_BY_ID(id), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store'
            });

            if (!response.ok) {
                console.error('❌ Error al obtener producto:', response.status, response.statusText);
                return null;
            }

            const data: { success: boolean; data: ProductDto } = await response.json();
            return data.data;
        } catch (error) {
            console.error('❌ Error al obtener producto:', error);
            return null;
        }
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
