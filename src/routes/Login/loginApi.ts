import { loginData } from "helpers/customTypes";

export async function login({ email, password }: loginData) {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = response.json();
  return data;
}
