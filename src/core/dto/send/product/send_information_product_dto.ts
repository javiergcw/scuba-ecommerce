export interface ProductItem {
  product_id: number;
  quantity: number;
}

export interface SendInformationProductDto {
  items: ProductItem[];
}
