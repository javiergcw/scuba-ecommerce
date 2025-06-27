"use client";

import React from 'react';
import RelatedCoursesSlider from './RelatedCoursesSlider';

// Ejemplo de uso del componente RelatedCoursesSlider
export default function RelatedCoursesExample() {
  return (
    <div>
      {/* Uso básico del componente */}
      <RelatedCoursesSlider />
      
      {/* Uso con título personalizado */}
      <RelatedCoursesSlider 
        title="Cursos Recomendados para Ti" 
      />
      
      {/* Uso sin botón de añadir al carrito */}
      <RelatedCoursesSlider 
        title="Cursos Similares" 
        showAddToCartButton={false} 
      />
    </div>
  );
} 