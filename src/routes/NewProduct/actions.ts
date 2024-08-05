import { ActionFunctionArgs, redirect } from "react-router-dom";
import { postProduct } from "routes/Products/api";
import { ROUTES } from "helpers/constants";

export const newProductActions = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const action = formData.get("action");
  switch (action) {
    case "createProduct":
      return handleCreateProduct(formData);
    default:
      break;
  }
};

const handleCreateProduct = async (form: FormData) => {
  const formData = Object.fromEntries(form);

  const { data: response, status } = await postProduct({
    name: formData.name as string,
    price: Number(formData.price),
    wholesalePrice: Number(formData.wholesalePrice),
    description: formData.description as string,
  });

  if (status !== 200) {
    return response.errors ? response.errors[0] : response;
  } else {
    return redirect(ROUTES.DASHBOARD);
  }
};
