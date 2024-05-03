import Cookies from "js-cookie";
import { getProducts } from "routes/Products/loader";
import { fetchAllVariants } from "routes/Variants/loader";
import { Product, VariantListItem } from "helpers/customTypes";

export const fetchStorefrontData = async () => {
  const variants = await fetchAllVariants();
  const products = await getProducts();
  const cart = await getCartItems();
  const productOptions = products
    .filter((product: Product) => product.variants.length > 0)
    .map((product: Product) => ({
      value: product.id,
      label: product.name,
    }));
  return { variants, productOptions, cart };
};

export const getCartItems = async () => {
  const cart = JSON.parse(Cookies.get("cart") || "[]") as VariantListItem[];
  return cart;
};
