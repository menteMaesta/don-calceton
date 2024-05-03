import Cookies from "js-cookie";
import { getProducts } from "routes/Products/loader";
import { fetchAllVariants } from "routes/Variants/loader";
import { Product, VariantListItem } from "helpers/customTypes";

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

const getTotalCartItems = async (cart: VariantListItem[]) => {
  const totalItems = cart.reduce((acc: number, item: VariantListItem) => {
    acc += item.orderQuantity || 0;
    return acc;
  }, 0);
  return totalItems;
};

export const getCartItems = async () => {
  const cart = JSON.parse(Cookies.get("cart") || "[]") as VariantListItem[];
  const totalItems = await getTotalCartItems(cart);
  return { cart, totalItems };
};
