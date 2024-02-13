import { fetchProducts } from "./api";

export const getProducts = async () => {
  const { status, data } = await fetchProducts();
  if (status !== 200) {
    throw data.errors[0];
  }
  return data;
};
