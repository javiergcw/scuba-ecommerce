export interface OrderItemDto {
  product_id: number;
  product_sku: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface OrderDto {
  order_id: number;
  tracking_code: string;
  customer_name: string;
  customer_email: string;
  total_amount: number;
  status: string;
  payment_status: string;
  items: OrderItemDto[];
  created_at: string;
  paid_at?: string; // Campo opcional ya que no todas las órdenes están pagadas
}

export interface ReceiveOrderByIdDto {
  data: OrderDto[];
  message: string;
}
