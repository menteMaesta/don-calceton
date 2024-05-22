export type LoginData = { email: string; password: string };
export type RegisterData = {
  fullName: string;
  email: string;
  password: string;
  admin: boolean;
};
export type ResetPassword = {
  forgotToken: string;
  newPassword: string;
};
export interface ProductBase {
  name: string;
  price: number;
  wholesalePrice: number;
  description: string;
}
export interface Product extends ProductBase {
  id: number;
  updatedAt: string;
  createdAt: string;
  variants: Variant[];
}
export interface ProductListItem extends ProductBase {
  id: number;
  updatedAt: string;
  createdAt: string;
  variants: Image[];
}
export interface VariantBase {
  name: string;
  productId: number;
  quantity: number;
}
export interface Variant extends VariantBase {
  id: number;
  images: Image[];
  customizations?: Customization[];
  updatedAt: string;
  createdAt: string;
}
export interface VariantListItem extends VariantBase {
  id: number;
  images?: Pick<Image, "id" | "name">;
  productName: string;
  productPrice: number;
  productWholesalePrice: number;
  orderQuantity?: number;
}
export interface Image {
  id: number;
  name: string;
  variantId: number;
  updatedAt?: string;
  createdAt?: string;
}
export type Blob = { src: string; name: string; file: File };
export type ErrorType = { statusText: string; message: string };
export type SliderImage = { id: number; name: string };
export type Option = { value: number; label: string };
export type CartItemType = {
  id: number;
  personalizations?: PersonalizationType[];
} & Partial<Variant>;

export type PersonalizationType = {
  quantity: number;
  customizationId?: number;
  images?: OrderImage[];
  imageSize: number;
};

export interface OrderImage {
  name: string;
  size: number;
}

export type Customization = {
  id: number;
  title: string;
  maxSize: number;
  minSize: number;
  updatedAt?: string;
  createdAt?: string;
};
