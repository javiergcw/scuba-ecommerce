export interface OrderItem {
  product_id: number;
  product_sku: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface OrderData {
  order_id: number;
  tracking_code: string;
  customer_name: string;
  customer_email: string;
  total_amount: number;
  status: string;
  payment_status: string;
  items: OrderItem[];
  created_at: string;
}

export interface ReceiveStatusOrderDto {
  data: OrderData;
  message: string;
}
