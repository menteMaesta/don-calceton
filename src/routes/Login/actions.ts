import { ActionFunctionArgs } from "react-router-dom";
import { login } from "routes/Login/loginApi";
import { loginData } from "helpers/customTypes";

export const handleLogin = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  } as loginData;
  const response = await login(data);
  localStorage.setItem("accessToken", response.token);
  localStorage.setItem("accessTokenExp", response.expiresAt);
  return;
};
