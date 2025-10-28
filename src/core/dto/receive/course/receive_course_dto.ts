export interface ReceiveCourseDto {
  nombre: string;
  descripcion_larga: string; // HTML text with formatting
  descripcion_corta: string;
  foto: string;
  precio: string; // Price in string format (e.g., "$99", "$375")
  categoria: string;
  subcategoria: string;
  cuantos_dives_only: number | string; // Can be number or "mas 20", "mas 10", etc.
  cuantos_days_course: number | string; // Can be number or "mas 15", "mas 14", etc.
}

export interface ReceiveCourseDataDto {
  courses: ReceiveCourseDto[];
  total: number;
}

