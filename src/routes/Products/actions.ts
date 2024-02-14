import { ActionFunctionArgs, redirect } from "react-router-dom";
import { postProduct } from "routes/Products/api";
import { ROUTES } from "helpers/constants";

export const handleNewProduct = async ({ request }: ActionFunctionArgs) => {
  const formData = Object.fromEntries(await request.formData());

  const { data: response, status } = await postProduct({
    name: formData.name as string,
    price: Number(formData.price),
    description: formData.description as string,
  });
  if (status !== 200) {
    //TODO: Implement snackbar instead
    throw response.errors[0];
  } else {
    return redirect(ROUTES.PRODUCTS);
  }
};
