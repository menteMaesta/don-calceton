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
  return response.text();
}

export async function fetchProducts() {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`, {
    method: "GET",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
  });
  console.log("PRODUCTS", response);
}
