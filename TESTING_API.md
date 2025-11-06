# 🧪 Guía de Testing - API de Productos

## 🚀 Paso 1: Iniciar el servidor

```bash
npm run dev
```

## 🔍 Paso 2: Verificar los productos disponibles

Abre en tu navegador:
```
http://localhost:3000/api/debug-products
```

Verás una lista con todos los productos, sus IDs (UUIDs) y las URLs para acceder a ellos.

Ejemplo de respuesta:
```json
{
  "totalProducts": 2,
  "products": [
    {
      "id": "32165c7b-fcc5-46a0-a9c3-fbf3868efd8b",
      "name": "Curso Open Water Divers",
      "detailUrl": "/courses/32165c7b-fcc5-46a0-a9c3-fbf3868efd8b",
      "apiUrl": "/api/products/32165c7b-fcc5-46a0-a9c3-fbf3868efd8b",
      "category": "Aventuras",
      "subcategory": "¿Aún no eres buzo?",
      "price": 299.99
    },
    {
      "id": "906dd4fd-2be6-4683-a426-c2658e101303",
      "name": "camisa",
      "detailUrl": "/courses/906dd4fd-2be6-4683-a426-c2658e101303",
      "apiUrl": "/api/products/906dd4fd-2be6-4683-a426-c2658e101303",
      "category": "Aventuras",
      "subcategory": "¿Aún no eres buzo?",
      "price": 30
    }
  ]
}
```

## 🎯 Paso 3: Probar un producto específico

### Opción A: Ver JSON crudo de la API
```
http://localhost:3000/api/products/32165c7b-fcc5-46a0-a9c3-fbf3868efd8b
```

### Opción B: Ver la página de detalle del producto
```
http://localhost:3000/courses/32165c7b-fcc5-46a0-a9c3-fbf3868efd8b
```

## 📊 Paso 4: Verificar logs

### En el Terminal (servidor):
Deberías ver logs como:
```
🔍 Obteniendo productos desde: https://api.oceanoscuba.com.co/api/v1/public/products
📡 Respuesta de API productos: 200 OK
✅ 2 productos obtenidos exitosamente

🔍 Intentando obtener producto: https://api.oceanoscuba.com.co/api/v1/public/products/32165c7b-fcc5-46a0-a9c3-fbf3868efd8b
📡 Respuesta de API: 200 OK
✅ Producto obtenido exitosamente
```

### En la Consola del Navegador (F12):
Deberías ver logs como:
```
🔍 Buscando curso con ID: 32165c7b-fcc5-46a0-a9c3-fbf3868efd8b
✅ Curso encontrado: Curso Open Water Divers
```

## 🐛 Troubleshooting

### Error: "Failed to fetch" o "Network Error"
1. Verifica que el servidor esté corriendo (`npm run dev`)
2. Verifica que estés accediendo a `http://localhost:3000` (no `https`)
3. Limpia el caché: `rm -rf .next && npm run dev`

### Error: "404 Not Found"
1. Verifica que el ID sea correcto (debe ser un UUID válido)
2. Consulta `/api/debug-products` para ver los IDs disponibles
3. Verifica que la API externa esté funcionando

### Error: "Curso no encontrado"
1. El ID no existe en la API
2. La API externa está caída
3. Revisa los logs del terminal para más detalles

## ✅ URLs de Prueba Rápida

### API Routes (JSON crudo):
- Todos los productos: http://localhost:3000/api/products
- Debug productos: http://localhost:3000/api/debug-products
- Producto específico: http://localhost:3000/api/products/32165c7b-fcc5-46a0-a9c3-fbf3868efd8b

### Páginas de Usuario:
- Home: http://localhost:3000/
- Lista de cursos: http://localhost:3000/courses
- Detalle del curso: http://localhost:3000/courses/32165c7b-fcc5-46a0-a9c3-fbf3868efd8b

## 🎯 Flujo de Usuario Normal

1. Visita http://localhost:3000/
2. Haz clic en "Ver detalles" de cualquier producto en el carousel
3. Serás redirigido a `/courses/{UUID}`
4. Verás todos los detalles del producto

---

**Nota:** Si haces cambios en las API Routes, necesitas reiniciar el servidor para que se apliquen.

