import { ActionFunctionArgs } from "react-router-dom";
import { openDB } from "idb";
import { postOrder, postOrderImage } from "routes/Store/Cart/api";
import {
  PersonalizationType,
  OrderImage,
  CartItemType,
} from "helpers/customTypes";
import { EMPTY_ORDER_ITEM, STATUS } from "helpers/constants";
import { es } from "helpers/strings";

export const storeActions = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const store = formData.get("store");
  switch (store) {
    case "addVariant":
      return handleAddVariant(formData);
    case "updateVariantItem":
      return handleUpdateVariantItem(formData);
    case "addVariantPersonalization":
      return handleAddVariantPersonalization(formData);
    case "removeVariantPersonalization":
      return handleRemoveVariantPersonalization(formData);
    case "updateVariantItemImages":
      return handleUpdateVariantItemImages(formData);
    case "removeVariantItemImage":
      return handleRemoveVariantItemImage(formData);
    case "removeVariant":
      return handleRemoveFromCart(formData);
    case "submitOrder":
      return handleSubmitOrder();
    default:
      break;
  }
};

const handleRemoveFromCart = async (form: FormData) => {
  const formData = Object.fromEntries(form);
  const itemId = Number(formData.id);
  const db = await openDB("don-calceton-cart");
  await db.delete("orderItems", itemId);
  return true;
};

export const handleAddVariant = async (form: FormData) => {
  const formData = Object.fromEntries(form);
  const itemId = Number(formData.id);
  const productPrice = Number(formData.productPrice);
  const productWholesalePrice = Number(formData.productWholesalePrice);
  const db = await openDB("don-calceton-cart");
  const transaction = db.transaction("orderItems", "readwrite");

  await Promise.all([
    transaction.store.put({
      id: itemId,
      productPrice,
      productWholesalePrice,
      personalizations: [{ ...EMPTY_ORDER_ITEM, quantity: 1 }],
    }),
    transaction.done,
  ]);

  return true;
};

export const handleAddVariantPersonalization = async (form: FormData) => {
  const formData = Object.fromEntries(form);
  const itemId = Number(formData.id);
  const db = await openDB("don-calceton-cart");
  const oldOrderItem = await db.get("orderItems", itemId);
  const transaction = db.transaction("orderItems", "readwrite");

  await Promise.all([
    transaction.store.put({
      ...oldOrderItem,
      personalizations: [
        ...oldOrderItem.personalizations,
        { ...EMPTY_ORDER_ITEM, quantity: 1 },
      ],
    }),
    transaction.done,
  ]);

  return true;
};

export const handleRemoveVariantPersonalization = async (form: FormData) => {
  const formData = Object.fromEntries(form);
  const itemId = Number(formData.id);
  const personalizationId = Number(formData.personalizationId);
  const db = await openDB("don-calceton-cart");
  const oldOrderItem = await db.get("orderItems", itemId);
  const transaction = db.transaction("orderItems", "readwrite");

  if (oldOrderItem) {
    await Promise.all([
      transaction.store.put({
        ...oldOrderItem,
        personalizations: oldOrderItem.personalizations.filter(
          (_: PersonalizationType, index: number) => index !== personalizationId
        ),
      }),
      transaction.done,
    ]);
  }

  return true;
};

export const handleUpdateVariantItem = async (form: FormData) => {
  const formData = Object.fromEntries(form);
  const itemId = Number(formData.id);

  const personalizationId = Number(formData.personalizationId);
  const field = formData.field as keyof Omit<PersonalizationType, "images">;
  const newValue = Number(formData.newValue);

  const db = await openDB("don-calceton-cart");
  const oldOrderItem = await db.get("orderItems", itemId);
  const transaction = db.transaction("orderItems", "readwrite");

  if (oldOrderItem) {
    oldOrderItem.personalizations[personalizationId][field] = newValue;
    await Promise.all([
      transaction.store.put({
        ...oldOrderItem,
        personalizations: oldOrderItem.personalizations,
      }),
      transaction.done,
    ]);
  }
  return true;
};

export const handleUpdateVariantItemImages = async (form: FormData) => {
  const formData = Object.fromEntries(form);
  const itemId = Number(formData.id);
  const personalizationId = Number(formData.personalizationId);

  const db = await openDB("don-calceton-cart");
  const oldOrderItem = await db.get("orderItems", itemId);
  const transaction = db.transaction("orderItems", "readwrite");

  if (oldOrderItem) {
    oldOrderItem.personalizations[personalizationId].images =
      form.getAll("images[]");
    await Promise.all([
      transaction.store.put({
        ...oldOrderItem,
        personalizations: oldOrderItem.personalizations,
      }),
      transaction.done,
    ]);
  }
  return { isLoading: false, index: `${itemId}-${personalizationId}` };
};

export const handleRemoveVariantItemImage = async (form: FormData) => {
  const formData = Object.fromEntries(form);
  const itemId = Number(formData.id);
  const personalizationId = Number(formData.personalizationId);
  const imageIndex = Number(formData.imageIndex);

  const db = await openDB("don-calceton-cart");
  const oldOrderItem = await db.get("orderItems", itemId);
  const transaction = db.transaction("orderItems", "readwrite");
  const newImages = oldOrderItem.personalizations[
    personalizationId
  ].images.filter((_: OrderImage, index: number) => index !== imageIndex);

  if (oldOrderItem) {
    oldOrderItem.personalizations[personalizationId].images = newImages;
    await Promise.all([
      transaction.store.put({
        ...oldOrderItem,
        personalizations: oldOrderItem.personalizations,
      }),
      transaction.done,
    ]);
  }
  return true;
};

const checkForEmpty = (orderItems: CartItemType[]) => {
  return orderItems.findIndex((item) => {
    const personalizations = item.personalizations || [];
    return personalizations.find(
      (personalization: PersonalizationType) =>
        personalization.quantity === 0 ||
        personalization.customizationId === 0 ||
        personalization.images?.length === 0 ||
        personalization.imageSize === 0
    );
  });
};

const sendOrderImages = async (
  personalization: PersonalizationType,
  orderId: number
) => {
  // send order images to server
  for (const image of personalization.images || []) {
    const formData = new FormData();
    const file = image as File;
    formData.append("image", file, file.name);
    const { data: orderImageData, status: orderImageStatus } =
      await postOrderImage({
        orderId,
        formData,
      });
    if (orderImageStatus !== 200) {
      return orderImageData.errors ? orderImageData.errors[0] : orderImageData;
    }
  }
};

const deleteOrderItems = async () => {
  const db = await openDB("don-calceton-cart");
  const transaction = db.transaction("orderItems", "readwrite");
  await Promise.all([transaction.store.clear(), transaction.done]);
};

const handleSubmitOrder = async () => {
  const db = await openDB("don-calceton-cart");
  const orderItems = await db.getAll("orderItems");
  const hasEmptyValues = checkForEmpty(orderItems);

  if (hasEmptyValues === -1) {
    // send order to server
    for (const item of orderItems) {
      const personalizations = item.personalizations || [];
      for (const personalization of personalizations) {
        const { data, status } = await postOrder({
          variantId: item.id,
          quantity: personalization.quantity,
          customizationId: personalization.customizationId,
          imageSize: personalization.imageSize,
          status: STATUS.IN_PROCESS,
        });
        if (status !== 200) {
          return data.errors ? data.errors[0] : data;
        } else {
          await sendOrderImages(personalization, data.id);
        }
      }
    }
    //delete all order items
    await deleteOrderItems();
    return { message: es.orders.sendSuccess };
  }
  return {
    message: es.orders.emptyFields,
  };
};
