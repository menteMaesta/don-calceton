import { ActionFunctionArgs } from "react-router-dom";
import { verifyCredentials } from "routes/Dashboard/api";
import { handleUnauthorized } from "helpers/unauthorized";

export const dashboardActions = async ({ request }: ActionFunctionArgs) => {
  let formData = await request.formData();
  let dashboard = formData.get("dashboard");
  switch (dashboard) {
    case "verify":
      return handleVerify();
    default:
      break;
  }
};

export const handleVerify = async () => {
  const { data: response, status } = await verifyCredentials();
  if (status !== 200) {
    const error = response.errors ? response.errors[0] : response;
    if (error.message === "Unauthorized access") {
      return handleUnauthorized();
    } else {
      return error;
    }
  } else {
    return response;
  }
};
