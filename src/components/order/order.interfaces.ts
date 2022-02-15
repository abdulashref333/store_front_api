export interface IOrder {
  id: number;
  customer_id: number;
  total: number;
  order_status: string;
  payment_type: string;
  created_at: string;
}

export interface ICreateOrder {
  customer_id: number;
  total: number;
  order_status: string;
  payment_type: string;
}
