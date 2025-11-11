export interface SubcategoryDto {
  id: string;
  name: string;
  description: string;
}

export interface CategoryDto {
  id: string;
  name: string;
  description: string;
  subcategories: SubcategoryDto[];
}

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
  category: CategoryDto;
  subcategory_id: string;
  subcategory_name: string;
  subcategory: SubcategoryDto;
  created_at?: string;
  updated_at?: string;
}

export interface ReceiveProductsDto {
  success: boolean;
  data: ProductDto[];
}

