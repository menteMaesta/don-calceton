import { LoaderFunctionArgs } from "react-router-dom";
import { fetchCustomizations } from "src/routes/Customizations/api";

export const getCustomizations = async ({ params }: LoaderFunctionArgs) => {
  const { status, data } = await fetchCustomizations(params.variantId || "");

  if (status !== 200) {
    throw data.errors[0];
  }
  return data;
};
