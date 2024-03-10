import { LoaderFunctionArgs } from "react-router-dom";
import { handleUnauthorized } from "helpers/unauthorized";
import { getVariant } from "./api";

export const fetchVariant = async ({ params }: LoaderFunctionArgs) => {
  const { status, data } = await getVariant(
    params.productId || "",
    params.variantId || ""
  );

  if (status !== 200) {
    if (data.errors[0].message === "Unauthorized access") {
      return handleUnauthorized();
    } else {
      throw data.errors[0];
    }
  }
  return data;
};
