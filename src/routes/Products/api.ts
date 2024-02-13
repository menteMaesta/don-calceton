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
