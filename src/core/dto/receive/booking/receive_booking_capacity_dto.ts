export interface BookingCapacityDto {
  available_slots: number;
  company_id: string;
  date: string;
  default_capacity: boolean;
  has_operation: boolean;
  max_persons: number;
  reserved_persons: number;
}

export interface ReceiveBookingCapacityDto {
  success: boolean;
  data: BookingCapacityDto;
}

