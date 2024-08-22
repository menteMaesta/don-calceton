import { v4 as uuidv4 } from "uuid";
import {
  PersonalizationType,
  OrderStatus,
  PaypalItem,
} from "helpers/customTypes";
import { PAYPAL_OPTIONS } from "helpers/constants";
import { es } from "helpers/strings";

export async function postOrder({
  variantId,
  quantity,
  customizationId,
  imageSize,
  status,
}: {
  variantId: number;
  quantity: PersonalizationType["quantity"];
  customizationId: PersonalizationType["customizationId"];
  imageSize: PersonalizationType["imageSize"];
  status: OrderStatus;
}) {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/orders`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      variantId,
      quantity,
      customizationId,
      imageSize,
      status,
    }),
  });
  const data = await response.json();
  return { data, status: response.status };
}

export async function postOrderImage({
  orderId,
  formData,
}: {
  orderId: number;
  formData: FormData;
}) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/orders/${orderId}/images`,
    {
      method: "POST",
      body: formData,
    }
  );
  const data = await response.json();
  return { data, status: response.status };
}

export async function verifyOrderStock({
  orders,
}: {
  orders: { variantId: number; quantity: number }[];
}) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/orders/verify_quantity`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ orders }),
    }
  );
  return response.status;
}

export async function generatePaypalAccessToken() {
  const BASE64_ENCODED_CLIENT_ID_AND_SECRET = btoa(
    `${import.meta.env.VITE_PAYPAL_CLIENT_ID}:${
      import.meta.env.VITE_PAYPAL_CLIENT_SECRET
    }`
  );

  const request = await fetch(
    `${import.meta.env.VITE_PAYPAL_BASE_URL}/v1/oauth2/token`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${BASE64_ENCODED_CLIENT_ID_AND_SECRET}`,
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
      }),
    }
  );
  const json = await request.json();
  return json.access_token || "";
}

export async function verifyPaypalAccessToken(
  accessToken: string
): Promise<boolean> {
  const response = await fetch(
    `${import.meta.env.VITE_PAYPAL_BASE_URL}/v1/identity/oauth2/userinfo`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  // If the response status is 200, the token is valid
  if (response.status === 200) {
    return true;
  }

  // If the response status is 401 or another error status, the token is invalid or expired
  return false;
}

const validateAccessToken = async () => {
  let paypalAccessToken = localStorage.getItem("paypalAccessToken") || "";
  let validToken;
  if (paypalAccessToken) {
    validToken = await verifyPaypalAccessToken(paypalAccessToken);
  }
  if (!paypalAccessToken || !validToken) {
    paypalAccessToken = await generatePaypalAccessToken();
    localStorage.setItem("paypalAccessToken", paypalAccessToken);
  }
};

export async function createPaypalOrder(
  totalPrice: number,
  items: PaypalItem[]
) {
  const invoiceId = uuidv4();
  const customId = uuidv4();

  await validateAccessToken();
  const response = await fetch(
    `${import.meta.env.VITE_PAYPAL_BASE_URL}/v2/checkout/orders`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("paypalAccessToken")}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            invoice_id: invoiceId,
            custom_id: customId,
            soft_descriptor: es.paypal.softDescriptor,
            items: items,
            amount: {
              currency_code: PAYPAL_OPTIONS.currency,
              value: totalPrice,
              breakdown: {
                item_total: {
                  currency_code: PAYPAL_OPTIONS.currency,
                  value: totalPrice,
                },
              },
            },
            payee: {
              email_address: import.meta.env.VITE_PAYPAL_EMAIL,
              merchant_id: import.meta.env.VITE_PAYPAL_MERCHANT_ID,
            },
          },
        ],
      }),
    }
  );

  try {
    const data = await response.json();
    return {
      data: { ...data, invoiceId, customId },
      status: response.status,
    };
  } catch (_) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}

export async function capturePaypalOrder(orderId: string) {
  await validateAccessToken();
  const response = await fetch(
    `${
      import.meta.env.VITE_PAYPAL_BASE_URL
    }/v2/checkout/orders/${orderId}/capture`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("paypalAccessToken")}`,
      },
    }
  );
  try {
    const data = await response.json();
    return { data, status: response.status };
  } catch (_) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}
