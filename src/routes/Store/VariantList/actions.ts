import { ActionFunctionArgs } from "react-router-dom";
import Cookies from "js-cookie";
import { CartItem, OrderItem } from "helpers/customTypes";
import { EMPTY_ORDER_ITEM } from "helpers/constants";

export const storeActions = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const store = formData.get("store");
  switch (store) {
    case "addVariant":
      return handleAddVariant(formData);
    case "updateVariantItem":
      return handleUpdateVariantItem(formData);
    case "removeVariant":
      return handleRemoveFromCart(formData);
    default:
      break;
  }
};

const handleRemoveFromCart = (form: FormData) => {
  const formData = Object.fromEntries(form);
  const itemId = Number(formData.id);
  let cart: CartItem[] = JSON.parse(Cookies.get("cart") || "[]");
  const itemIndex = cart.findIndex((cartItem) => cartItem.id === itemId);

  if (itemIndex !== -1) {
    cart = cart.filter((cartItem) => cartItem.id !== itemId);
  }

  Cookies.set("cart", JSON.stringify(cart), { expires: 100 });
  return true;
};

export const handleAddVariant = async (form: FormData) => {
  const formData = Object.fromEntries(form);
  const itemId = Number(formData.id);
  let cart: CartItem[] = JSON.parse(Cookies.get("cart") || "[]");
  const itemIndex = cart.findIndex((cartItem) => cartItem.id === itemId);

  if (!cart) {
    cart = [];
  }
  if (itemIndex !== -1) {
    if (cart[itemIndex].personalizations?.length) {
      cart[itemIndex].personalizations![0].quantity++;
    }
  } else {
    cart.push({
      id: itemId,
      personalizations: [{ ...EMPTY_ORDER_ITEM, quantity: 1 }],
    });
  }

  Cookies.set("cart", JSON.stringify(cart), { expires: 100 });
  return true;
};

export const handleUpdateVariantItem = async (form: FormData) => {
  const formData = Object.fromEntries(form);
  const itemId = Number(formData.id);
  const orderId = Number(formData.orderId);
  const field = formData.field as keyof Omit<OrderItem, "images">;
  const newValue = Number(formData.newValue);
  const cart: CartItem[] = JSON.parse(Cookies.get("cart") || "[]");
  const itemIndex = cart.findIndex((cartItem) => cartItem.id === itemId);

  if (itemIndex !== -1) {
    cart[itemIndex].personalizations![orderId][field] = newValue;
  }

  Cookies.set("cart", JSON.stringify(cart), { expires: 100 });
  return true;
};
