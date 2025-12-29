export interface ReceiveCreateSaleDto {
  success?: boolean;
  message?: string;
  enabled?: boolean; // Campo que habilita o inhabilita la venta
  data?: {
    sale?: {
      id: string;
      company_id: string;
      person_id: string;
      person_name: string;
      person_email: string;
      person_phone: string;
      person_document_number: string;
      status: string;
      total_amount: number;
      subtotal: number;
      tax: number;
      discount: number;
      reference: string;
      wompi_transaction_id: string | null;
      payment_method: string | null;
      notes: string | null;
      paid_at: string | null;
      items: Array<{
        id: string;
        product_id: string;
        quantity: number;
        unit_price: number;
        total_price: number;
        product_name: string;
        product_sku: string;
      }>;
      created_at: string;
      updated_at: string;
    };
    wompi_redirect_url?: string;
  };
  wompi_error?: string;
}

