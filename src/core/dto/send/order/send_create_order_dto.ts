export interface SendCreateOrderItemDto {
    product_id: string;
    quantity: number;
}

export interface SendCreateOrderDto {
    company_id: string;
    person_name: string;
    person_phone: string;
    person_email: string;
    person_document_number: string;
    operation_date: string;
    items: SendCreateOrderItemDto[];
    tax?: number;
    discount?: number;
    notes?: string;
    create_wompi_transaction: boolean;
    redirect_url: string;
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
