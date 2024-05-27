import { Customization } from "helpers/customTypes";
export async function fetchCustomizations(variantId: string) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/variants/${variantId}/customizations`,
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

export async function storeCustomization(
  variantId: string,
  newCustomization: Customization
) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/variants/${variantId}/customizations`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...newCustomization }),
    }
  );
  const data = await response.json();
  return { data, status: response.status };
}

export async function putCustomization(
  variantId: string,
  updatedCustomization: Customization
) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/variants/${variantId}/customizations/${
      updatedCustomization.id
    }`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...updatedCustomization }),
    }
  );
  const data = await response.json();
  return { data, status: response.status };
}
