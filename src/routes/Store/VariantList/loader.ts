import { openDB } from "idb";
import { getAllCartVariants } from "routes/Variants/api";
import { getProducts } from "routes/Products/loader";
import { fetchAllVariants } from "routes/Variants/loader";
import {
  Product,
  CartItemType,
  PersonalizationType,
} from "helpers/customTypes";

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

const getTotalCartItems = async (cart: CartItemType[]) => {
  const totalItems = cart.reduce((acc: number, item: CartItemType) => {
    acc +=
      item.personalizations?.reduce(
        (total: number, element: PersonalizationType) => {
          total += element.quantity || 0;
          return total;
        },
        0
      ) || 0;
    return acc;
  }, 0);
  return totalItems;
};

const getProductPrice = (cart: CartItemType[]) => {
  const totalPrice = cart.reduce((acc: number, item: CartItemType) => {
    const totalItems =
      item.personalizations?.reduce(
        (total: number, element: PersonalizationType) => {
          total += element.quantity || 0;
          return total;
        },
        0
      ) || 0;
    if (totalItems >= 12) {
      acc +=
        totalItems * (item.productWholesalePrice || item.productPrice || 0);
    } else {
      acc += totalItems * (item.productPrice || 0);
    }
    return acc;
  }, 0);
  return totalPrice || 0;
};

export const getCartItems = async () => {
  const db = await openDB("don-calceton-cart", 1);
  const all = await db.getAll("orderItems");

  const totalItems = await getTotalCartItems(all);
  return { cart: all, totalItems };
};

export const getAllCartItems = async () => {
  const db = await openDB("don-calceton-cart", 1);
  const cart = await db.getAll("orderItems");
  const cartIds = cart.map((item) => `${item.id}`);
  const { status, data } = await getAllCartVariants({ variantIds: cartIds });
  const totalPrice = getProductPrice(cart);

  if (status !== 200) {
    throw data.errors[0];
  }
  const cartItems = data.map((item: CartItemType) => ({
    ...item,
    ...cart.find((cartItem) => cartItem.id === item.id),
  }));
  return { cart: cartItems || [], totalPrice };
};
