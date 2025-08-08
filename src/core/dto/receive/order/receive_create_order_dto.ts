export interface ReceiveCreateOrderDto {
  data: {
    order_id: number;
    tracking_code: string;
    total_amount: number;
    payment_url: string;
    status: string;
    payment_status: string;
    created_at: string;
  };
  message: string;
}
