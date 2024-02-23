import { VariantBase } from "helpers/customTypes";

export async function postVariant({
  newVariantData,
  productId,
}: {
  newVariantData: VariantBase;
  productId: string;
}) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/products/${productId}/variants`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newVariantData),
    }
  );
  const data = await response.json();
  return { data, status: response.status };
}

export async function postVariantImages({
  variantId,
  formData,
}: {
  variantId: string;
  formData: FormData;
}) {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/variants/${variantId}/bulk/images`,
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