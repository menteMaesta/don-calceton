import { LoaderFunctionArgs } from "react-router-dom";
import { fetchProducts, fetchProduct } from "./api";
import { getVariants } from "routes/Variants/api";

export const getProducts = async () => {
  const { status, data } = await fetchProducts();
  if (status !== 200) {
    throw data.errors[0];
  }
  return data;
};

export const getProduct = async ({ params }: LoaderFunctionArgs) => {
  const { status, data } = await fetchProduct(params.productId || "");
  const { status: variantStatus, data: variants } = await getVariants(
    params.productId || ""
  );
  if (status !== 200) {
    throw data.errors[0];
  }
  if (variantStatus !== 200) {
    throw data.errors[0];
  }
  return { ...data, variants: [...variants] };
};
