import { LoaderFunctionArgs } from "react-router-dom";
import { getVariant } from "./api";

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
