export type loginData = { email: string; password };
export interface ProductBase {
  name: string;
  price: number;
  description: string;
}
export interface Product extends ProductBase {
  id: number;
  updatedAt: string;
  createdAt: string;
  variants: Variant[];
}
export type Variant = {
  id: number;
  images: Image[];
  name: string;
  productId: number;
  quantity: number;
  updatedAt: string;
  createdAt: string;
};
export type Image = {
  id: number;
  name: string;
  variantId: number;
  updatedAt: string;
  createdAt: string;
};
