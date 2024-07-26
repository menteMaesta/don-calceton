import { getOrders } from "routes/Orders/api";

export const fetchAllOrders = async () => {
  const { status, data } = await getOrders();
  if (status !== 200) {
    throw data.errors[0];
  }
  return data;
};
