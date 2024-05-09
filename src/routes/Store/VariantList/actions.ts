import { ActionFunctionArgs } from "react-router-dom";
import Cookies from "js-cookie";
import { CartItem } from "helpers/customTypes";

const emptyOrderItem = {
  quantity: 0,
  type: 0,
  images: [],
};
export const storeActions = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const store = formData.get("store");
  switch (store) {
    case "addVariant":
      return handleAddVariant(formData);
    case "addVariantItem":
      return handleAddVariantItem(formData);
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
      personalizations: [{ ...emptyOrderItem, quantity: 1 }],
    });
  }

  Cookies.set("cart", JSON.stringify(cart), { expires: 100 });
  return true;
};

export const handleAddVariantItem = async (form: FormData) => {
  const formData = Object.fromEntries(form);
  const itemId = Number(formData.id);
  const quantity = Number(formData.quantity);
  const personalizationId = Number(formData.personalizationId);
  const cart: CartItem[] = JSON.parse(Cookies.get("cart") || "[]");
  const itemIndex = cart.findIndex((cartItem) => cartItem.id === itemId);

  if (itemIndex !== -1) {
    cart[itemIndex].personalizations![personalizationId].quantity = quantity;
  }

  Cookies.set("cart", JSON.stringify(cart), { expires: 100 });
  return true;
};
