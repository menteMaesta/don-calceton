export async function login() {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email: "pala0920@hotmail.com",
      password: "123456",
    }),
  });
  const data = response.json();
  return data;
}

export async function fetchProducts() {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`, {
    method: "GET",
    credentials: "include",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("accessToken") || "",
    },
  });
  console.log("PRODUCTS", response);
}
