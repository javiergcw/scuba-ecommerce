# Categorías y Subcategorías - Mockup

Este archivo contiene la información sobre el mockup de categorías y subcategorías implementado en el proyecto.

## Estructura de Datos

Las categorías y subcategorías están definidas en el archivo `src/utils/categories-mockup.ts` con la siguiente estructura:

### Categorías y Subcategorías

1. **Entrenamientos**
   - ¿Aún no eres buzo?
   - ¡Formación PADI a otro nivel!
   - Snorkeling / Acompañante

2. **Ya soy buzo**
   - Solo en Oceano Scuba
   - Solo para profesionales

## Uso

Las categorías están hardcodeadas (quemadas) en el archivo `categories-mockup.ts` y se importan en el componente de navbar.

### Archivos Modificados

1. **src/utils/categories-mockup.ts** (nuevo archivo)
   - Define la estructura de categorías y subcategorías
   - Proporciona funciones helper para trabajar con las categorías

2. **src/components/navbar/navbar.tsx**
   - Actualizado para usar las categorías mockeadas
   - Muestra las categorías con sus subcategorías en el dropdown de navegación
   - Soporte para mobile y desktop

3. **src/app/(courses)/courses/page.tsx**
   - Actualizado para filtrar por categoría y subcategoría
   - Soporte para los parámetros `category` y `subcategory` en la URL

## Funcionalidades

### Navbar
- Muestra un dropdown "Entrenamiento" con las categorías
- Cada categoría puede tener subcategorías
- Las subcategorías se muestran como elementos anidados con indentación

### Filtrado de Cursos
- Los cursos se pueden filtrar por categoría
- Los cursos se pueden filtrar por subcategoría
- La combinación de ambos filtros es posible

## Ejemplo de URL

```
/courses?category=Entrenamientos&subcategory=Snorkeling / Acompañante
/courses?category=Ya soy buzo
/courses?category=Ya soy buzo&subcategory=Solo para profesionales
```

## Notas

- Las categorías y subcategorías están **hardcodeadas** (no se obtienen de la API)
- Para agregar o modificar categorías, editar el archivo `src/utils/categories-mockup.ts`
- Los productos de la API deben tener los campos `category_name` y `subcategory_name` para que el filtrado funcione correctamente

