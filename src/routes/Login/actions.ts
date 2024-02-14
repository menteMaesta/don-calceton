import { ActionFunctionArgs, redirect } from "react-router-dom";
import { login } from "routes/Login/loginApi";
import { loginData } from "helpers/customTypes";
import { ROUTES } from "helpers/constants";

export const handleLogin = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  } as loginData;

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
