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

export interface IOrderProduct {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  created_at: string;
}

export interface ICreateOrderProduct {
  product_id: number;
  quantity: number;
  order_id: number;
}
