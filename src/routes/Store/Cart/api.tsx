import { PersonalizationType, OrderStatus } from "helpers/customTypes";

export async function postOrder({
  variantId,
  quantity,
  customizationId,
  imageSize,
  status,
}: {
  variantId: number;
  quantity: PersonalizationType["quantity"];
  customizationId: PersonalizationType["customizationId"];
  imageSize: PersonalizationType["imageSize"];
  status: OrderStatus;
}) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/orders`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      variantId,
      quantity,
      customizationId,
      imageSize,
      status,
    }),
  });
  const data = await response.json();
  return { data, status: response.status };
}

export async function postOrderImage({
  orderId,
  formData,
}: {
  orderId: number;
  formData: FormData;
}) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/orders/${orderId}/images`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );
  const data = await response.json();
  return { data, status: response.status };
}
