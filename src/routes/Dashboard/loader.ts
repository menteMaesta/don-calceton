import { redirect } from "react-router-dom";
import moment from "moment";

export const hasToken = async () => {
  const token = localStorage.getItem("accessToken");
  const expiration = localStorage.getItem("accessTokenExp");
  const isAfter = moment().isAfter(expiration);
  if (isAfter || !token) {
    return redirect("/login");
  }
  return null;
};
