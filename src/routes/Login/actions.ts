import { ActionFunctionArgs, redirect } from "react-router-dom";
import { login, register, updatePassword } from "routes/Login/loginApi";
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
    //TODO: Probably better to instead show a snackbar and not throw anything
    throw response.errors[0];
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
    //TODO: Probably better to instead show a snackbar and not throw anything
    throw response.errors[0];
  } else {
    return redirect(ROUTES.LOGIN);
  }
};

const handleChangePassword = async (formData: FormData) => {
  const data = {
    forgot_token: formData.get("forgot_token"),
    new_password: formData.get("new_password"),
  } as ResetPassword;

  const { data: response, status } = await updatePassword(data);
  if (status !== 200) {
    //TODO: Probably better to instead show a snackbar and not throw anything
    throw response.errors[0];
  } else {
    return redirect(ROUTES.LOGIN);
  }
};
