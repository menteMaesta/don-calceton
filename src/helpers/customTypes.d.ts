export type LoginData = { email: string; password: string };
export type RegisterData = {
  fullName: string;
  email: string;
  password: string;
  admin: boolean;
};
export type ResetPassword = {
  forgot_token: string;
  new_password: string;
};
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
export interface VariantBase {
  name: string;
  productId: number;
  quantity: number;
}
export interface Variant extends VariantBase {
  id: number;
  images: Image[];
  updatedAt: string;
  createdAt: string;
}
export type Image = {
  id: number;
  name: string;
  variantId: number;
  updatedAt: string;
  createdAt: string;
};
export type Blob = { src: string; name: string; file: File };
export type ErrorType = { statusText: string; message: string };
