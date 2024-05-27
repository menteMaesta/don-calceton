import { ActionFunctionArgs } from "react-router-dom";
import {
  storeCustomization,
  putCustomization,
  destroyCustomization,
} from "routes/Variants/Variant/components/api";
import { Customization } from "helpers/customTypes";

export const customizationActions = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const variantId = params.variantId || "";
  const action = formData.get("action");
  switch (action) {
    case "store":
      return newCustomization(formData, variantId);
    case "update":
      return updateCustomization(formData, variantId);
    case "destroy":
      return deleteCustomization(formData, variantId);
    default:
      break;
  }
};

const newCustomization = async (formData: FormData, variantId: string) => {
  const newCustomization = {
    title: formData.get("title"),
    minSize: Number(formData.get("minSize")),
    maxSize: Number(formData.get("maxSize")),
  } as Customization;

  const { data, status } = await storeCustomization(
    variantId,
    newCustomization
  );
  if (status !== 200) {
    return data.errors ? data.errors[0] : data;
  } else {
    return true;
  }
};

const updateCustomization = async (formData: FormData, variantId: string) => {
  const updatedCustomization = {
    id: Number(formData.get("id")),
    title: formData.get("title"),
    minSize: Number(formData.get("minSize")),
    maxSize: Number(formData.get("maxSize")),
  } as Customization;

  const { data, status } = await putCustomization(
    variantId,
    updatedCustomization
  );

  if (status !== 200) {
    return data.errors ? data.errors[0] : data;
  } else {
    return true;
  }
};

const deleteCustomization = async (formData: FormData, variantId: string) => {
  const customizationId = formData.get("id");

  const { data, status } = await destroyCustomization(
    variantId,
    customizationId as string
  );

  if (status !== 200) {
    return data.errors ? data.errors[0] : data;
  } else {
    return true;
  }
};
