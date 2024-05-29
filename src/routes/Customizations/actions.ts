import { ActionFunctionArgs } from "react-router-dom";
import {
  storeCustomization,
  putCustomization,
  destroyCustomization,
} from "src/routes/Customizations/api";
import { Customization } from "helpers/customTypes";

export const customizationActions = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const productId = params.productId || "";
  const action = formData.get("action");
  switch (action) {
    case "store":
      return newCustomization(formData, productId);
    case "update":
      return updateCustomization(formData, productId);
    case "destroy":
      return deleteCustomization(formData, productId);
    default:
      break;
  }
};

const newCustomization = async (formData: FormData, productId: string) => {
  const newCustomization = {
    title: formData.get("title"),
    minSize: Number(formData.get("minSize")),
    maxSize: Number(formData.get("maxSize")),
  } as Customization;

  const { data, status } = await storeCustomization(
    productId,
    newCustomization
  );
  if (status !== 200) {
    return data.errors ? data.errors[0] : data;
  } else {
    return true;
  }
};

const updateCustomization = async (formData: FormData, productId: string) => {
  const updatedCustomization = {
    id: Number(formData.get("id")),
    title: formData.get("title"),
    minSize: Number(formData.get("minSize")),
    maxSize: Number(formData.get("maxSize")),
  } as Customization;

  const { data, status } = await putCustomization(
    productId,
    updatedCustomization
  );

  if (status !== 200) {
    return data.errors ? data.errors[0] : data;
  } else {
    return true;
  }
};

const deleteCustomization = async (formData: FormData, productId: string) => {
  const customizationId = formData.get("id");

  const { data, status } = await destroyCustomization(
    productId,
    customizationId as string
  );

  if (status !== 200) {
    return data.errors ? data.errors[0] : data;
  } else {
    return true;
  }
};
