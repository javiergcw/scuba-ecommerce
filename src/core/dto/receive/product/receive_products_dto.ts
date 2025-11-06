export interface ProductDto {
  id: string;
  name: string;
  short_description: string;
  long_description: string;
  photo: string;
  price: number;
  dives_only: number;
  days_course: number;
  category_id: string;
  category_name: string;
  subcategory_id: string;
  subcategory_name: string;
}

export interface ReceiveProductsDto {
  success: boolean;
  data: ProductDto[];
}

