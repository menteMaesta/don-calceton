import { ActionFunctionArgs } from "react-router-dom";
import Cookies from "js-cookie";
import { VariantListItem } from "helpers/customTypes";

export const storeActions = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const store = formData.get("store");
  switch (store) {
    case "addVariant":
      return handleAddVariant(formData);
    default:
      break;
  }
};

const addToCart = (item: VariantListItem) => {
  let cart: VariantListItem[] = JSON.parse(Cookies.get("cart") || "[]");

  if (!cart) {
    cart = [];
  }

  cart.push(item);
  Cookies.set("cart", JSON.stringify(cart), { expires: 100 });
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
