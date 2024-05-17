import { ActionFunctionArgs } from "react-router-dom";
import { openDB } from "idb";
import { OrderItem } from "helpers/customTypes";
import { EMPTY_ORDER_ITEM } from "helpers/constants";

export const storeActions = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const store = formData.get("store");
  switch (store) {
    case "addVariant":
      return handleAddVariant(formData);
    case "updateVariantItem":
      return handleUpdateVariantItem(formData);
    case "updateVariantItemImages":
      return handleUpdateVariantItemImages(formData);
    case "removeVariantItemImage":
      return handleRemoveVariantItemImage(formData);
    case "removeVariant":
      return handleRemoveFromCart(formData);
    default:
      break;
  }
};

const handleRemoveFromCart = async (form: FormData) => {
  const formData = Object.fromEntries(form);
  const itemId = Number(formData.id);
  const db = await openDB("don-calceton-cart", 1);
  await db.delete("orderItems", itemId);
  return true;
};

export const handleAddVariant = async (form: FormData) => {
  const formData = Object.fromEntries(form);
  const itemId = Number(formData.id);
  const db = await openDB("don-calceton-cart", 1);
  const transaction = db.transaction("orderItems", "readwrite");

  await Promise.all([
    transaction.store.put({
      id: itemId,
      personalizations: [{ ...EMPTY_ORDER_ITEM, quantity: 1 }],
    }),
    transaction.done,
  ]);

  return true;
};

export const handleUpdateVariantItem = async (form: FormData) => {
  const formData = Object.fromEntries(form);
  const itemId = Number(formData.id);

  const orderId = Number(formData.orderId);
  const field = formData.field as keyof Omit<OrderItem, "images">;
  const newValue = Number(formData.newValue);

  const db = await openDB("don-calceton-cart", 1);
  const oldOrderItem = await db.get("orderItems", itemId);
  const transaction = db.transaction("orderItems", "readwrite");

  if (oldOrderItem) {
    oldOrderItem.personalizations[orderId][field] = newValue;
    await Promise.all([
      transaction.store.put({
        id: itemId,
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
  const orderId = Number(formData.orderId);

  const db = await openDB("don-calceton-cart", 1);
  const oldOrderItem = await db.get("orderItems", itemId);
  const transaction = db.transaction("orderItems", "readwrite");

  if (oldOrderItem) {
    oldOrderItem.personalizations[orderId].images = form.getAll("images[]");
    await Promise.all([
      transaction.store.put({
        id: itemId,
        personalizations: oldOrderItem.personalizations,
      }),
      transaction.done,
    ]);
  }
  return { isLoading: false, index: `${itemId}-${orderId}` };
};

export const handleRemoveVariantItemImage = async (form: FormData) => {
  const formData = Object.fromEntries(form);
  const itemId = Number(formData.id);
  const orderId = Number(formData.orderId);

  const db = await openDB("don-calceton-cart", 1);
  const oldOrderItem = await db.get("orderItems", itemId);
  const transaction = db.transaction("orderItems", "readwrite");

  if (oldOrderItem) {
    oldOrderItem.personalizations[orderId].images = form.getAll("images[]");
    await Promise.all([
      transaction.store.put({
        id: itemId,
        personalizations: oldOrderItem.personalizations,
      }),
      transaction.done,
    ]);
  }
  return true;
};
