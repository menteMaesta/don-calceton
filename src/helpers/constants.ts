export const ROUTES = {
  DASHBOARD: "/admin",
  LOGIN: "/login",
  // REGISTER: "/register",
  // REGISTER_ADMIN: "/register_admin",
  NEW_PRODUCT: "/admin/products/new",
  PRODUCT: "/admin/products/:productId",
  EDIT_PRODUCT: "/admin/products/:productId/edit",
  NEW_VARIANT: "/admin/products/:productId/variant/new",
  ORDERS: "/orders",
  VARIANT: "/variant/:variantId",
  CUSTOMIZATIONS: "/customizations",
  FORGOT_PASSWORD: "/forgot_password",
  GO_TO_MAIL: "/to_mail",
  CHANGE_PASSWORD: "/:forgotToken/change_password",
  STORE: "/",
  CART: "/cart",
};

export const ORDER_ITEM_FIELDS = {
  QUANTITY: "quantity",
  CUSTOMIZATION_ID: "customizationId",
  IMAGES: "images",
  IMAGE_SIZE: "imageSize",
};

export const EMPTY_ORDER_ITEM = {
  [ORDER_ITEM_FIELDS.QUANTITY]: 0,
  [ORDER_ITEM_FIELDS.CUSTOMIZATION_ID]: 0,
  [ORDER_ITEM_FIELDS.IMAGES]: [],
  [ORDER_ITEM_FIELDS.IMAGE_SIZE]: 0,
} as const;

export const KB = 1024;

export const EMPTY_CUSTOMIZATION = {
  title: "",
  maxSize: "",
  minSize: "",
};

export const STATUS = {
  IN_PROCESS: "IN_PROCESS",
  DELIVERED: "DELIVERED",
  CANCELED: "CANCELED",
} as const;

export const EMPTY_VARIANT = { name: "", quantity: "", images: [] };

export const PAYPAL_OPTIONS = {
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
  merchantId: import.meta.env.VITE_PAYPAL_MERCHANT_ID,
  currency: "MXN",
  locale: "es_MX",
  components: "buttons",
};

export const PHYSICAL_GOODS = "PHYSICAL_GOODS";

export const WHOLESALE_THRESHOLD = 12;
export const SHIPPING_COST = 50;
export const SHIPPING_ZONE = {
  COUNTRY: "MX",
  POSTAL_CODE: "29160",
  STATE: "CHIS",
  CITIES: ["tuxtla gutierrez", "chiapa de corzo"],
};
