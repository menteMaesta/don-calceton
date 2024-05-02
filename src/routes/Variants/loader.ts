import { LoaderFunctionArgs } from "react-router-dom";
import { getProducts } from "routes/Products/loader";
import { Product } from "helpers/customTypes";
import { getVariant, getAllVariants } from "./api";

export const fetchVariant = async ({ params }: LoaderFunctionArgs) => {
  const { status, data } = await getVariant(
    params.productId || "",
    params.variantId || ""
  );

  if (status !== 200) {
    throw data.errors[0];
  }
  return data;
};

export const fetchAllVariants = async () => {
  const { status, data } = await getAllVariants();

  if (status !== 200) {
    throw data.errors[0];
  }
  return data;
};

export const fetchStorefrontData = async () => {
  const variants = await fetchAllVariants();
  const products = await getProducts();
  const productOptions = products
    .filter((product: Product) => product.variants.length > 0)
    .map((product: Product) => ({
      value: product.id,
      label: product.name,
    }));
  return { variants, productOptions };
};
