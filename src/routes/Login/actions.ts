import { ActionFunctionArgs, redirect } from "react-router-dom";
import {
  login,
  register,
  generateForgotPassword,
  updatePassword,
} from "routes/Login/loginApi";
import { LoginData, RegisterData, ResetPassword } from "helpers/customTypes";
import { ROUTES } from "helpers/constants";

export const loginActions = async ({ request }: ActionFunctionArgs) => {
  let formData = await request.formData();
  let user = formData.get("user");
  switch (user) {
    case "login":
      return handleLogin(formData);
    case "register":
      return handleRegister(formData);
    case "forgot_password":
      return handleForgotPassword(formData);
    case "change_password":
      return handleChangePassword(formData);
    default:
      break;
  }
};

const handleLogin = async (formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  } as LoginData;

  const { data: response, status } = await login(data);
  if (status !== 200) {
    return response.errors ? response.errors[0] : response;
  } else {
    localStorage.setItem("accessToken", response.token);
    localStorage.setItem("accessTokenExp", response.expiresAt);
    return redirect(ROUTES.DASHBOARD);
  }
};

const handleRegister = async (formData: FormData) => {
  const data = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
    admin: new Boolean(formData.get("admin")),
  } as RegisterData;

  const { data: response, status } = await register(data);
  if (status !== 200) {
    return response.errors ? response.errors[0] : response;
  } else {
    return redirect(ROUTES.LOGIN);
  }
};

const handleForgotPassword = async (formData: FormData) => {
  const data = {
    email: formData.get("email"),
  } as { email: string };

  const { data: response, status } = await generateForgotPassword(data);
  if (status !== 200) {
    return response.errors ? response.errors[0] : response;
  } else {
    return redirect(ROUTES.GO_TO_MAIL);
  }
};

const handleChangePassword = async (formData: FormData) => {
  const data = {
    forgot_token: formData.get("forgot_token"),
    new_password: formData.get("new_password"),
  } as ResetPassword;

  const { data: response, status } = await updatePassword(data);
  if (status !== 200) {
    return response.errors ? response.errors[0] : response;
  } else {
    return redirect(ROUTES.LOGIN);
  }
};
