export interface Product {
  product_id: number;
  product_sku: string;
  product_name: string;
  description: string;
  image_url: string;
  price: number;
  stock: number;
  has_stock: boolean;
  active: boolean;
  public: boolean;
  available: boolean;
  quantity: number;
  total_price: number;
}

export interface ProductData {
  products: Product[];
  total_amount: number;
}

export interface ReceiveInformationProductDto {
  data: ProductData;
  message: string;
}
