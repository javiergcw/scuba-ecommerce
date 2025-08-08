import { ProductService } from '@/core/service/product/product_service';
import { HandleVerifyType } from '@/core/handle_verify_type';
import { SendInformationProductDto } from '@/core/dto/send/product/send_information_product_dto';
import { ReceiveInformationProductDto } from '@/core/dto/receive/product/receive_information_product_dto';

export class ProductUseCase {
    
    /**
     * Obtener información de productos con acciones personalizadas
     * @param productData - Datos de los productos a consultar
     * @param onSuccess - Acción a ejecutar cuando se obtiene la información exitosamente
     * @param onError - Acción a ejecutar cuando hay error
     */
    public static async getProductInformation(
        productData: SendInformationProductDto,
        onSuccess: (data: ReceiveInformationProductDto) => void,
        onError: (error: any) => void
    ): Promise<void> {
        const serviceResponse = await ProductService.getProductInformation(productData);
        
        HandleVerifyType.handle(serviceResponse, {
            onSuccess: (data) => {
                onSuccess(data);
            },
            onError: (error) => {
                onError(error);
            },
            successMessage: "Información de productos obtenida exitosamente",
            errorMessage: "Error al obtener información de productos"
        });
    }
    
    /**
     * Obtener información de un solo producto con acciones personalizadas
     * @param productId - ID del producto
     * @param quantity - Cantidad del producto
     * @param onSuccess - Acción a ejecutar cuando se obtiene la información exitosamente
     * @param onError - Acción a ejecutar cuando hay error
     */
    public static async getSingleProductInformation(
        productId: number,
        quantity: number,
        onSuccess: (data: ReceiveInformationProductDto) => void,
        onError: (error: any) => void
    ): Promise<void> {
        const serviceResponse = await ProductService.getSingleProductInformation(productId, quantity);
        
        HandleVerifyType.handle(serviceResponse, {
            onSuccess: (data) => {
                onSuccess(data);
            },
            onError: (error) => {
                onError(error);
            },
            successMessage: `Información del producto ${productId} obtenida exitosamente`,
            errorMessage: `Error al obtener información del producto ${productId}`
        });
    }
    
    /**
     * Validar disponibilidad de productos con acciones personalizadas
     * @param productData - Datos de los productos a validar
     * @param onAvailable - Acción a ejecutar cuando todos los productos están disponibles
     * @param onNotAvailable - Acción a ejecutar cuando algunos productos no están disponibles
     * @param onError - Acción a ejecutar cuando hay error en la consulta
     */
    public static async validateProductAvailability(
        productData: SendInformationProductDto,
        onAvailable: (data: ReceiveInformationProductDto) => void,
        onNotAvailable: (data: ReceiveInformationProductDto) => void,
        onError: (error: any) => void
    ): Promise<void> {
        const serviceResponse = await ProductService.getProductInformation(productData);
        
        HandleVerifyType.handle(serviceResponse, {
            onSuccess: (data) => {
                // Verificar disponibilidad de todos los productos
                const allAvailable = data.data.products.every(product => 
                    product.available && 
                    product.has_stock && 
                    product.active && 
                    product.public
                );
                
                if (allAvailable) {
                    onAvailable(data);
                } else {
                    onNotAvailable(data);
                }
            },
            onError: (error) => {
                onError(error);
            },
            successMessage: "Validación de disponibilidad completada",
            errorMessage: "Error al validar disponibilidad de productos"
        });
    }
    
    /**
     * Obtener información de productos con toast/notificaciones predefinidas
     * @param productData - Datos de los productos
     * @param showSuccessToast - Función para mostrar toast de éxito
     * @param showErrorToast - Función para mostrar toast de error
     */
    public static async getProductInformationWithToast(
        productData: SendInformationProductDto,
        showSuccessToast: (message: string, data?: ReceiveInformationProductDto) => void,
        showErrorToast: (message: string, error?: any) => void
    ): Promise<void> {
        const serviceResponse = await ProductService.getProductInformation(productData);
        
        const toastActions = HandleVerifyType.createToastActions(
            showSuccessToast,
            showErrorToast
        );
        
        HandleVerifyType.handle(serviceResponse, {
            ...toastActions,
            successMessage: "Información de productos cargada",
            errorMessage: "Error al cargar productos"
        });
    }
    
    /**
     * Validar disponibilidad de productos para carrito de compras
     * @param productData - Productos del carrito
     * @param onValidCart - Acción cuando el carrito es válido
     * @param onInvalidCart - Acción cuando hay productos no disponibles
     * @param onError - Acción cuando hay error
     */
    public static async validateCartProducts(
        productData: SendInformationProductDto,
        onValidCart: (data: ReceiveInformationProductDto, totalAmount: number) => void,
        onInvalidCart: (unavailableProducts: string[]) => void,
        onError: (error: any) => void
    ): Promise<void> {
        const serviceResponse = await ProductService.getProductInformation(productData);
        
        HandleVerifyType.handle(serviceResponse, {
            onSuccess: (data) => {
                const unavailableProducts: string[] = [];
                
                data.data.products.forEach(product => {
                    if (!product.available || !product.has_stock || !product.active || !product.public) {
                        unavailableProducts.push(product.product_name);
                    }
                });
                
                if (unavailableProducts.length === 0) {
                    onValidCart(data, data.data.total_amount);
                } else {
                    onInvalidCart(unavailableProducts);
                }
            },
            onError: (error) => {
                onError(error);
            },
            successMessage: "Validación de carrito completada",
            errorMessage: "Error al validar productos del carrito"
        });
    }
    
    /**
     * Ejemplo de uso silencioso para obtener precios
     * @param productData - Datos de productos
     * @returns Información de productos o null
     */
    public static async getProductPricesSilently(productData: SendInformationProductDto): Promise<ReceiveInformationProductDto | null> {
        const serviceResponse = await ProductService.getProductInformation(productData);
        
        const result = HandleVerifyType.handle(serviceResponse, {
            ...HandleVerifyType.createSilentActions<ReceiveInformationProductDto>(),
            successMessage: "Precios obtenidos silenciosamente",
            errorMessage: "Error al obtener precios silenciosamente"
        });
        
        return result.success ? result.data! : null;
    }
}
