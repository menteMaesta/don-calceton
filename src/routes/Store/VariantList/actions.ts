import { ActionFunctionArgs } from "react-router-dom";
import Cookies from "js-cookie";
import { VariantListItem } from "helpers/customTypes";

export const storeActions = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const store = formData.get("store");
  switch (store) {
    case "addVariant":
      return handleAddVariant(formData);
    case "removeVariant":
      return handleRemoveFromCart(formData);
    default:
      break;
  }
};

const addToCart = (item: VariantListItem) => {
  let cart: VariantListItem[] = JSON.parse(Cookies.get("cart") || "[]");
  const itemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);

  if (!cart) {
    cart = [];
  }
  if (itemIndex !== -1) {
    cart[itemIndex].orderQuantity!++;
  } else {
    cart.push({ ...item, orderQuantity: 1 });
  }

  Cookies.set("cart", JSON.stringify(cart), { expires: 100 });
};

const handleRemoveFromCart = (form: FormData) => {
  const formData = Object.fromEntries(form);
  const itemId = Number(formData.id);
  let cart: VariantListItem[] = JSON.parse(Cookies.get("cart") || "[]");
  const itemIndex = cart.findIndex((cartItem) => cartItem.id === itemId);

  if (itemIndex !== -1) {
    if (cart[itemIndex].orderQuantity === 1) {
      cart = cart.filter((cartItem) => cartItem.id !== itemId);
    } else {
      cart[itemIndex].orderQuantity!--;
    }
  }

  Cookies.set("cart", JSON.stringify(cart), { expires: 100 });
  return true;
};

export const handleAddVariant = async (form: FormData) => {
  const formData = Object.fromEntries(form);
  const newVariant = {
    id: Number(formData.id),
    name: formData.name as string,
    productId: Number(formData.productId),
    quantity: Number(formData.quantity),
    productName: formData.productName as string,
    productPrice: Number(formData.productPrice),
    productWholesalePrice: Number(formData.productWholesalePrice),
  } as VariantListItem;
  addToCart(newVariant);
  return true;
};
