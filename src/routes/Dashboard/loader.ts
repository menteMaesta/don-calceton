import { redirect } from "react-router-dom";
import moment from "moment";
import { ROUTES } from "helpers/constants";
import { verifyCredentials } from "routes/Dashboard/api";
import { handleUnauthorized } from "helpers/unauthorized";

const handleVerify = async () => {
  const { data: response, status } = await verifyCredentials();
  if (status !== 200) {
    const error = response.errors ? response.errors[0] : response;
    if (error.message === "Unauthorized access") {
      return handleUnauthorized();
    } else {
      return error;
    }
  } else {
    return null;
  }
};

export const hasToken = async () => {
  await handleVerify();
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
