export interface SendCreateOrderItemDto {
    product_id: number;
    quantity: number;
}

export interface SendCreateOrderDto {
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    items: SendCreateOrderItemDto[];
    notes?: string;
}

// Ejemplo de uso:
// const orderData: SendCreateOrderDto = {
//   customer_name: "Andres Segura",
//   customer_email: "seguraandres508@gmail.com",
//   customer_phone: "3001234567",
//   items: [
//     {
//       product_id: 27,
//       quantity: 1
//     }
//   ],
//   notes: "Entregar en horario de oficina"
// };
