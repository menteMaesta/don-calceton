import { redirect } from "react-router-dom";
import moment from "moment";
import { ROUTES } from "helpers/constants";

export const hasToken = async () => {
  const token = localStorage.getItem("accessToken");
  const expiration = moment(localStorage.getItem("accessTokenExp")).format(
    "YYYY-MM-DD"
  );
  const today = moment().format("YYYY-MM-DD");
  const hasExpired = moment(expiration).isBefore(today, "day");

  if (hasExpired || !token) {
    return redirect(ROUTES.LOGIN);
  }
  return null;
};
