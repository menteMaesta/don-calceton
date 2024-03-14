import { ActionFunctionArgs, redirect } from "react-router-dom";
import {
  postVariant,
  postVariantImages,
  removeVariantImage,
  putVariant,
} from "routes/Variants/api";
import { ROUTES } from "helpers/constants";
import { VariantBase } from "helpers/customTypes";

export const variantActions = async ({ request }: ActionFunctionArgs) => {
  let formData = await request.formData();
  let variant = formData.get("variant");
  switch (variant) {
    case "create":
      return handleNewVariant(formData);
    case "editVariant":
      return handleEditVariant(formData);
    case "createImages":
      return handleAddImages(formData);
    case "delete":
      return handleRemoveImage(formData);
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
    return response.errors ? response.errors[0] : response;
  } else {
    const { data: bulkImageResponse, status: imageStatus } =
      await postVariantImages({
        variantId: response.id,
        formData: form,
      });
    if (imageStatus !== 200) {
      return bulkImageResponse.errors
        ? bulkImageResponse.errors[0]
        : bulkImageResponse;
    } else {
      return redirect(
        `${ROUTES.PRODUCT.replace(":productId", `${formData.productId}`)}`
      );
    }
  }
};

const handleEditVariant = async (form: FormData) => {
  console.log("PASA");
  const formData = Object.fromEntries(form);
  const variantData = JSON.parse(formData.data as string);

  const editData: VariantBase = {
    name: variantData.name,
    productId: Number(formData.productId),
    quantity: Number(variantData.quantity),
  };

  const { data: response, status } = await putVariant(
    formData.productId as string,
    formData.variantId as string,
    editData
  );

  if (status !== 200) {
    return response.errors ? response.errors[0] : response;
  } else {
    return response;
  }
};

const handleAddImages = async (form: FormData) => {
  const formData = Object.fromEntries(form);

  const { data: response, status } = await postVariantImages({
    variantId: formData.variantId as string,
    formData: form,
  });

  if (status !== 200) {
    return response.errors ? response.errors[0] : response;
  } else {
    return response.message;
  }
};

const handleRemoveImage = async (form: FormData) => {
  const formData = Object.fromEntries(form);
  const removeImageData = formData as {
    variantId: string;
    imageId: string;
  };

  const { data: response, status } = await removeVariantImage(removeImageData);

  if (status !== 200) {
    return response.errors ? response.errors[0] : response;
  } else {
    return response.message;
  }
};
