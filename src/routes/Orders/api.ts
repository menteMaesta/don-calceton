import { OrderStatus } from "helpers/customTypes";

export async function getOrders(status?: OrderStatus) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/orders/all`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    }
  );
  const data = await response.json();
  return { data, status: response.status };
}
