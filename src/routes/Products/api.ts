import { ProductBase } from "helpers/customTypes";

export async function fetchProducts() {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return { data, status: response.status };
}

export async function postProduct(newProductData: ProductBase) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newProductData),
  });
  const data = await response.json();
  return { data, status: response.status };
}

export async function fetchProduct(productId: string) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/products/${productId}`,
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

export async function deleteProduct(productId: string) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/products/${productId}`,
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
