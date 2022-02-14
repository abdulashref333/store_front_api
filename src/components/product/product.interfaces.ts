export interface IProduct {
  id: number;
  title: string;
  image_url: string;
  created_at: string;
  summary: string;
  price: number;
}

export interface ICreateProduct {
  title: string;
  image_url: string;
  summary: string;
  price: number;
}
