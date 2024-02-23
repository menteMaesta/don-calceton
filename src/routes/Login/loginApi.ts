import { LoginData, RegisterData, ResetPassword } from "helpers/customTypes";

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

export async function generateForgotPassword({ email }: { email: string }) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/forgot_password`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    }
  );
  const data = await response.json();
  return { data, status: response.status };
}

export async function updatePassword({
  new_password,
  forgot_token,
}: ResetPassword) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/update_password`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        new_password,
        forgot_token,
      }),
    }
  );
  const data = await response.json();
  return { data, status: response.status };
}
