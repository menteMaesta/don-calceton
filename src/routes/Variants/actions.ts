import { ActionFunctionArgs, redirect } from "react-router-dom";
import { postVariant, postVariantImages } from "routes/Variants/api";
import { ROUTES } from "helpers/constants";
import { VariantBase } from "helpers/customTypes";

export const variantActions = async ({ request }: ActionFunctionArgs) => {
  let formData = await request.formData();
  let variant = formData.get("variant");
  switch (variant) {
    case "create":
      return handleNewVariant(formData);
    default:
      break;
  }
};

const handleNewVariant = async (form: FormData) => {
  const formData = Object.fromEntries(form);
  const variantData = JSON.parse(formData.data as string) as VariantBase;

  const newVariantData: VariantBase = {
    name: variantData.name,
    productId: Number(formData.productId),
    quantity: Number(variantData.quantity),
  };

  const { data: response, status } = await postVariant({
    newVariantData,
    productId: formData.productId as string,
  });

  if (status !== 200) {
    //TODO: Implement snackbar instead
    throw response.errors[0];
  } else {
    const { data: bulkImageResponse, status: imageStatus } =
      await postVariantImages({
        variantId: response.id,
        formData: form,
      });
    if (imageStatus !== 200) {
      //TODO: Implement snackbar instead
      throw bulkImageResponse.errors[0];
    } else {
      return redirect(
        `${ROUTES.PRODUCT.replace(":productId", `${formData.productId}`)}`
      );
    }
  }
};
