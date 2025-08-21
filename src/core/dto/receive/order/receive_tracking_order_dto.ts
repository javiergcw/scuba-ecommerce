export interface TrackingOrderItemDto {
  product_id: number;
  product_sku: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface TrackingOrderDto {
  order_id: number;
  tracking_code: string;
  customer_name: string;
  customer_email: string;
  total_amount: number;
  status: string;
  payment_status: string;
  items: TrackingOrderItemDto[];
  created_at: string;
  contracts_total: number;
  contracts_signed: number;
  contracts_pending: number;
  has_pending_contracts: boolean;
}

export interface ReceiveTrackingOrderDto {
  data: TrackingOrderDto;
  message: string;
}
