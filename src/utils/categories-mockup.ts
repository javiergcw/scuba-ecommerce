export interface Subcategory {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

// Mockup de categorías y subcategorías hardcodeadas
export const MOCKUP_CATEGORIES: Category[] = [
  {
    id: '2',
    name: 'Ya soy buzo',
    subcategories: [
      {
        id: '2-1',
        name: '¡Formación PADI a otro nivel!'
      },
      {
        id: '2-2',
        name: 'Solo para profesionales'
      }
    ]
  },
  {
    id: '1',
    name: 'Entrenamientos',
    subcategories: [
      {
        id: '1-1',
        name: '¿Aún no eres buzo?'
      },
      {
        id: '1-2',
        name: 'Solo en Oceano Scuba'
      },
      {
        id: '1-3',
        name: 'Snorkeling / Acompañante'
      }
    ]
  }
];

// Función helper para obtener todas las subcategorías de una categoría
export const getSubcategoriesByCategory = (categoryName: string): Subcategory[] => {
  const category = MOCKUP_CATEGORIES.find(cat => cat.name === categoryName);
  return category?.subcategories || [];
};

// Función helper para obtener todas las categorías
export const getAllCategories = (): Category[] => {
  return MOCKUP_CATEGORIES;
};

// Función helper para obtener todas las subcategorías planas
export const getAllSubcategories = (): Subcategory[] => {
  return MOCKUP_CATEGORIES.flatMap(category => category.subcategories);
};

// Función helper para obtener el nombre de la categoría de una subcategoría
export const getCategoryBySubcategory = (subcategoryName: string): string | undefined => {
  for (const category of MOCKUP_CATEGORIES) {
    if (category.subcategories.some(sub => sub.name === subcategoryName)) {
      return category.name;
    }
  }
  return undefined;
};

