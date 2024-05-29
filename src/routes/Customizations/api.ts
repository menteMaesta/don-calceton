import { Customization } from "helpers/customTypes";
export async function fetchCustomizations(productId: string) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/products/${productId}/customizations`,
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
  productId: string,
  newCustomization: Customization
) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/products/${productId}/customizations`,
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
  productId: string,
  updatedCustomization: Customization
) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/products/${productId}/customizations/${
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

export async function destroyCustomization(
  productId: string,
  customizationId: string
) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${
      import.meta.env.VITE_BACKEND_URL
    }/products/${productId}/customizations/${customizationId}`,
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return { data, status: response.status };
}
