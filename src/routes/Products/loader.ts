import { LoaderFunctionArgs } from "react-router-dom";
import { handleUnauthorized } from "helpers/unauthorized";
import { fetchProducts, fetchProduct } from "./api";

export const getProducts = async () => {
  const { status, data } = await fetchProducts();
  if (status !== 200) {
    if (data.errors[0].message === "Unauthorized access") {
      handleUnauthorized();
    } else {
      throw data.errors[0];
    }
  }
  return data;
};

export const getProduct = async ({ params }: LoaderFunctionArgs) => {
  const { status, data } = await fetchProduct(params.productId || "");
  if (status !== 200) {
    if (data.errors[0].message === "Unauthorized access") {
      handleUnauthorized();
    } else {
      throw data.errors[0];
    }
  }
  return data;
};
