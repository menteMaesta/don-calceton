import { ActionFunctionArgs, redirect } from "react-router-dom";
import { postVariant, postVariantImages } from "routes/Variants/api";
import { ROUTES } from "helpers/constants";
import { VariantBase, Blob } from "helpers/customTypes";

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
  const newVariantData: VariantBase = {
    name: formData.name as string,
    productId: Number(formData.productId),
    quantity: Number(formData.quantity),
  };
  const images = JSON.parse(formData.images as string) as Blob[];
  const files: File[] = [];
  images.map((image) => files.push(new File([image.src], image.name)));

  const { data: bulkImageResponse, status } = await postVariantImages({
    variantId: "1",
    images: files,
  });
  console.log("RESPONSE", bulkImageResponse);
  if (status !== 200) {
    //TODO: Implement snackbar instead
    throw bulkImageResponse.errors[0];
  } else {
    return redirect(ROUTES.DASHBOARD);
  }
  // const { data: response, status } = await postVariant({
  //   newVariantData,
  //   productId: formData.productId as string,
  // });
  // if (status !== 200) {
  //   //TODO: Implement snackbar instead
  //   throw response.errors[0];
  // } else {
  //   return redirect(ROUTES.DASHBOARD);
  // }
};
