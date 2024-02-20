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
  images,
}: {
  variantId: string;
  images: any[];
}) {
  const token = localStorage.getItem("accessToken");
  //   var formData = new FormData();
  //   formData.append("images", images);

  const formData = new FormData();

  formData.append("image", images[0]);

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/variants/${variantId}/images`,
    {
      method: "POST",
      headers: {
        // "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );
  const data = await response.json();
  return { data, status: response.status };
}
