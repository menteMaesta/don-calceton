import { ActionFunctionArgs, redirect } from "react-router-dom";
import { postProduct } from "routes/Products/api";
import { postVariant, postVariantImages } from "routes/Variants/api";
import { storeCustomization } from "routes/Customizations/api";
import { ROUTES } from "helpers/constants";
import { VariantBase, Customization } from "helpers/customTypes";

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
  const variants = JSON.parse(formData.variants as string) as VariantBase[];
  const customizations = JSON.parse(
    formData.customizations as string
  ) as Customization[];

  const { data: response, status } = await postProduct({
    name: formData.name as string,
    price: Number(formData.price),
    wholesalePrice: Number(formData.wholesalePrice),
    description: formData.description as string,
  });

  if (status !== 200) {
    return response.errors ? response.errors[0] : response;
  } else {
    for (let i = 0; i < variants.length; i++) {
      const images = form.getAll(`images${i}[]`);
      const { error: variantError, id: variantId } = await handleCreateVariants(
        variants[i],
        response.id
      );
      if (variantError) {
        return variantError;
      }
      const imagesError = await handleCreateVariantImages(
        variantId,
        images as File[]
      );
      if (imagesError) {
        return imagesError;
      }
    }

    const customizationsError = await handleCreateCustomizations(
      response.id,
      customizations
    );
    if (customizationsError) {
      return customizationsError;
    }
    return redirect(ROUTES.DASHBOARD);
  }
};

const handleCreateVariants = async (
  variant: VariantBase,
  productId: string
) => {
  const response = { error: "", id: "" };
  const { data, status } = await postVariant({
    newVariantData: { ...variant, quantity: Number(variant.quantity) },
    productId,
  });
  if (status !== 200) {
    response.error = data.errors ? data.errors[0] : data;
  }
  response.id = data.id;
  return response;
};

const handleCreateVariantImages = async (variantId: string, images: File[]) => {
  const formData = new FormData();

  for (const image of images) {
    formData.append("images[]", image, image.name);
  }

  const { data, status } = await postVariantImages({ variantId, formData });
  if (status !== 200) {
    return data.errors ? data.errors[0] : data;
  }
};

const handleCreateCustomizations = async (
  productId: string,
  customizations: Customization[]
) => {
  for (const customization of customizations) {
    const newCustomization = {
      ...customization,
      minSize: Number(customization.minSize),
      maxSize: Number(customization.maxSize),
    } as Customization;

    const { data, status } = await storeCustomization(
      productId,
      newCustomization
    );
    if (status !== 200) {
      return data.errors ? data.errors[0] : data;
    }
  }
};
