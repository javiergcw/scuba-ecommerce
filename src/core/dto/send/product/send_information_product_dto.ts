export interface ProductItem {
  product_id: number | string; // Acepta tanto number como string (UUID)
  quantity: number;
}

export interface SendInformationProductDto {
  items: ProductItem[];
}
