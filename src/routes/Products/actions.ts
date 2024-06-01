import { ActionFunctionArgs, redirect } from "react-router-dom";
import { postProduct, deleteProduct, putProduct } from "routes/Products/api";
import { removeVariant } from "routes/Variants/api";
import { ROUTES } from "helpers/constants";

export const productsActions = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const products = formData.get("products");
  switch (products) {
    case "create":
      return handleNewProduct(formData);
    case "editProduct":
      return handleEditProduct(formData);
    case "deleteProduct":
      return handleDeleteProduct(formData);
    case "deleteVariant":
      return handleDeleteVariant(formData);
    default:
      break;
  }
};

export const handleNewProduct = async (form: FormData) => {
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

export const handleEditProduct = async (form: FormData) => {
  const formData = Object.fromEntries(form);

  const { data: response, status } = await putProduct(
    {
      name: formData.name as string,
      price: Number(formData.price),
      wholesalePrice: Number(formData.wholesalePrice),
      description: formData.description as string,
    },
    formData.productId as string
  );

  if (status !== 200) {
    return response.errors ? response.errors[0] : response;
  } else {
    return redirect(
      ROUTES.PRODUCT.replace(":productId", `${formData.productId}`)
    );
  }
};

export const handleDeleteProduct = async (form: FormData) => {
  const formData = Object.fromEntries(form);

  const { data: response, status } = await deleteProduct(
    formData.productId as string
  );
  if (status !== 200) {
    return response.errors ? response.errors[0] : response;
  } else {
    return { ...response, statusText: "200", id: formData.productId };
  }
};

export const handleDeleteVariant = async (form: FormData) => {
  const formData = Object.fromEntries(form);

  const { data: response, status } = await removeVariant({
    variantId: formData.variantId as string,
    productId: formData.productId as string,
  });

  if (status !== 200) {
    return response.errors ? response.errors[0] : response;
  } else {
    return { ...response, statusText: "200", id: formData.variantId };
  }
};
