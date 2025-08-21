# 🔍 Página de Seguimiento de Órdenes

## Descripción
Esta página permite a los usuarios buscar y ver el estado de sus órdenes utilizando un código de tracking único.

## Funcionalidades

### 🔍 Buscador de Órdenes
- **Input de búsqueda**: Campo para ingresar el código de tracking
- **Validación**: Verifica que se ingrese un código antes de buscar
- **Búsqueda con Enter**: Permite buscar presionando Enter
- **Estados de carga**: Muestra spinner durante la búsqueda
- **Manejo de errores**: Muestra mensajes claros si no se encuentra la orden

### 📋 Información Mostrada
Cuando se encuentra una orden, se muestra:

#### Información del Cliente
- Nombre completo
- Email de contacto

#### Información de la Orden
- ID de la orden
- Código de tracking
- Fecha de creación

#### Estados
- **Estado de la orden**: Completada, Pendiente, Cancelada, etc.
- **Estado de pago**: Pagada, Pendiente, Fallida, etc.
- **Chips visuales**: Con colores e iconos según el estado

#### Productos del Curso
- Nombre del producto
- SKU del producto
- Cantidad
- Precio unitario y total

#### Información Financiera
- **Total confirmado**: Monto total de la orden
- **Formato de moneda**: En pesos colombianos (COP)

#### Estado de Contratos
- Contratos totales
- Contratos firmados
- Contratos pendientes
- Alertas si hay contratos pendientes

## 🛠️ Arquitectura

### DTOs (Data Transfer Objects)
- `ReceiveTrackingOrderDto`: Interfaz para la respuesta del API
- `TrackingOrderDto`: Estructura de datos de la orden
- `TrackingOrderItemDto`: Estructura de los productos

### Servicios
- `OrderService.getOrderByTrackingCode()`: Método para obtener orden por tracking
- Manejo de errores y respuestas del API

### Casos de Uso
- `OrderUseCase.getOrderByTrackingCode()`: Lógica de negocio para tracking
- Callbacks para éxito y error
- Manejo de estados de carga

## 🎨 Diseño y UX

### Branding Guidelines
- **Colores principales**: 
  - Azul marino (#051b35)
  - Amarillo (#ffd701)
  - Verde éxito (#4caf50)
- **Fondo**: Imagen de fondo con overlay azul
- **Tipografía**: Consistente con el resto de la aplicación

### Responsive Design
- **Móvil**: Layout de una columna
- **Tablet**: Layout adaptativo
- **Desktop**: Layout de dos columnas para mejor organización

### Estados Visuales
- **Éxito**: Verde con iconos de check
- **Pendiente**: Amarillo con iconos de espera
- **Error**: Rojo con iconos de cancelación
- **Carga**: Spinner animado

## 🔗 Endpoint Utilizado
```
GET {{base_url}}/api/v2/orders/tracking/{{tracking_code}}
```

### Respuesta del API
```json
{
  "data": {
    "order_id": 58,
    "tracking_code": "5GT2V5FV",
    "customer_name": "Juan Gomez Sanchez",
    "customer_email": "juanjosegomezsanche@gmail.com",
    "total_amount": 350000,
    "status": "pending",
    "payment_status": "pending",
    "items": [
      {
        "product_id": 30,
        "product_sku": "curso-refresh",
        "product_name": "Curso Refresh",
        "quantity": 1,
        "unit_price": 0,
        "total_price": 350000
      }
    ],
    "created_at": "2025-08-19T18:12:19.551953Z",
    "contracts_total": 0,
    "contracts_signed": 0,
    "contracts_pending": 0,
    "has_pending_contracts": false
  },
  "message": "Pedido encontrado"
}
```

## 🚀 Uso

### Navegación
1. Acceder desde el navbar: "Seguimiento"
2. URL directa: `/tracking`

### Búsqueda
1. Ingresar código de tracking en el campo de búsqueda
2. Hacer clic en "Buscar" o presionar Enter
3. Ver resultados en tiempo real

### Información Mostrada
- **Orden encontrada**: Muestra todos los detalles
- **Orden no encontrada**: Mensaje claro de error
- **Error de red**: Mensaje de error con opción de reintentar

## 🔧 Mantenimiento

### Agregar Nuevos Estados
Para agregar nuevos estados de orden o pago:

1. Actualizar `getStatusColor()` en el componente
2. Actualizar `getStatusIcon()` para nuevos iconos
3. Actualizar `getStatusText()` para traducciones

### Modificar Diseño
- Los estilos están en Material-UI con `sx` props
- Colores definidos en variables CSS
- Responsive breakpoints estándar de MUI

### Agregar Nuevos Campos
1. Actualizar interfaces DTO
2. Agregar campos en el componente
3. Actualizar lógica de formateo si es necesario
