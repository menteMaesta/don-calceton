import { LoaderFunctionArgs } from "react-router-dom";
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
