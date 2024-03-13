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

export async function getVariants(productId: string) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/products/${productId}/variants`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return { data, status: response.status };
}

export async function getVariant(productId: string, variantId: string) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${
      import.meta.env.VITE_BACKEND_URL
    }/products/${productId}/variants/${variantId}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return { data, status: response.status };
}

export async function removeVariantImage({
  variantId,
  imageId,
}: {
  variantId: string;
  imageId: string;
}) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${
      import.meta.env.VITE_BACKEND_URL
    }/variants/${variantId}/images/${imageId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.text();
  return { data, status: response.status };
}
