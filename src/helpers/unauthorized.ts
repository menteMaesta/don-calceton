import { redirect } from "react-router-dom";
import { ROUTES } from "helpers/constants";

export const handleUnauthorized = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("accessTokenExp");
  return redirect(ROUTES.LOGIN);
};
