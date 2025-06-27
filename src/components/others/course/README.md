# RelatedCoursesSlider Component

Componente React con TypeScript que muestra cursos relacionados en un slider Swiper basado en las subcategorías de los productos en el carrito.

## Características

- **Filtrado inteligente**: Muestra cursos relacionados basados en las subcategorías del carrito
- **Responsivo**: 3 slides en desktop, 2 en tablet, 1 en móvil
- **Navegación**: Botones prev/next para el slider
- **Integración con carrito**: Función para añadir productos al carrito
- **Estados de carga**: Animación mientras carga
- **Mensajes dinámicos**: Texto según el número de subcategorías

## Props

```typescript
interface RelatedCoursesSliderProps {
  title?: string;              // Título del componente (default: "Cursos Relacionados")
  showAddToCartButton?: boolean; // Mostrar botón de añadir al carrito (default: true)
}
```

## Uso

```tsx
import RelatedCoursesSlider from '@/components/others/course/RelatedCoursesSlider';

// Uso básico
<RelatedCoursesSlider />

// Con título personalizado
<RelatedCoursesSlider title="Cursos Recomendados" />

// Sin botón de añadir al carrito
<RelatedCoursesSlider showAddToCartButton={false} />
```

## Funcionalidad

### Lógica de Filtrado
1. Extrae subcategorías únicas del carrito
2. Filtra productos del backend que coincidan con esas subcategorías
3. Excluye productos que ya están en el carrito
4. Si no hay subcategorías, no muestra el componente

### Textos Dinámicos
- **Con subcategorías**: "Basado en tus cursos seleccionados de: {X, Y, Z}"
- **Sin subcategorías**: "Descubre otros cursos que podrían interesarte"

### Estados
- **Cargando**: Animación + "Buscando cursos relacionados..."
- **Con resultados**: Slider con productos relacionados
- **Sin resultados**: Mensaje amable + botón para explorar
- **Carrito vacío**: No muestra el componente

## Dependencias

- `@mui/material`: Componentes de UI
- `swiper/react`: Slider responsivo
- `@/context/CartContext`: Contexto del carrito
- `monolite-saas`: Servicios del backend
- `@/components/containers/SwiperNavigationButtons`: Botones de navegación

## Responsividad

```typescript
breakpoints={{
  0: { slidesPerView: 1 },      // Móvil
  767: { slidesPerView: 2 },    // Tablet
  991: { slidesPerView: 2 },    // Tablet grande
  1199: { slidesPerView: 3 },   // Desktop
}}
```

## Integración

- Usa `useCart()` hook para acceder al carrito
- Función `addToCart()` para añadir productos
- Mapeo automático de `Product` a `CartItem`
- Notificación de éxito con Snackbar
- Redirección automática al checkout 