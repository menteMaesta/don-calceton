import Cookies from "js-cookie";
import { getAllCartVariants } from "routes/Variants/api";
import { getProducts } from "routes/Products/loader";
import { fetchAllVariants } from "routes/Variants/loader";
import { Product, CartItem, OrderItem } from "helpers/customTypes";

export const fetchStorefrontData = async () => {
  const variants = await fetchAllVariants();
  const products = await getProducts();
  const { cart = [] } = await getCartItems();
  const productOptions = products
    .filter((product: Product) => product.variants.length > 0)
    .map((product: Product) => ({
      value: product.id,
      label: product.name,
    }));
  return { variants, productOptions, cart };
};

const getTotalCartItems = async (cart: CartItem[]) => {
  const totalItems = cart.reduce((acc: number, item: CartItem) => {
    acc +=
      item.personalizations?.reduce((total: number, element: OrderItem) => {
        total += element.quantity || 0;
        return total;
      }, 0) || 0;
    return acc;
  }, 0);
  return totalItems;
};

export const getCartItems = async () => {
  const cart = JSON.parse(Cookies.get("cart") || "[]") as CartItem[];
  const totalItems = await getTotalCartItems(cart);
  return { cart, totalItems };
};

export const getAllCartItems = async () => {
  const cart = JSON.parse(Cookies.get("cart") || "[]") as CartItem[];
  const cartIds = cart.map((item) => `${item.id}`);
  const { status, data } = await getAllCartVariants({ variantIds: cartIds });

  if (status !== 200) {
    throw data.errors[0];
  }
  const cartItems = data.map((item: CartItem) => ({
    ...item,
    ...cart.find((cartItem) => cartItem.id === item.id),
  }));
  return cartItems || [];
};
