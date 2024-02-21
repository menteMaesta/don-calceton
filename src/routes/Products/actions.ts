import { ActionFunctionArgs, redirect } from "react-router-dom";
import { postProduct } from "routes/Products/api";
import { handleUnauthorized } from "helpers/unauthorized";
import { ROUTES } from "helpers/constants";

export const productsActions = async ({ request }: ActionFunctionArgs) => {
  let formData = await request.formData();
  let products = formData.get("products");
  switch (products) {
    case "create":
      return handleNewProduct(formData);
    default:
      break;
  }
};

export const handleNewProduct = async (form: FormData) => {
  const formData = Object.fromEntries(form);

  const { data: response, status } = await postProduct({
    name: formData.name as string,
    price: Number(formData.price),
    description: formData.description as string,
  });
  if (status !== 200) {
    //TODO: Implement snackbar instead
    if (response.errors[0].message === "Unauthorized access") {
      handleUnauthorized();
    } else {
      throw response.errors[0];
    }
  } else {
    return redirect(ROUTES.DASHBOARD);
  }
};
