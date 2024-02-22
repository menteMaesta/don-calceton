import { LoginData, RegisterData } from "helpers/customTypes";

export async function login({ email, password }: LoginData) {
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
  const data = await response.json();
  return { data, status: response.status };
}

export async function register({
  fullName,
  email,
  password,
  admin,
}: RegisterData) {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      fullName,
      email,
      password,
      admin,
    }),
  });
  const data = await response.json();
  return { data, status: response.status };
}
