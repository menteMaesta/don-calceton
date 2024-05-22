export const ROUTES = {
  DASHBOARD: "/admin",
  LOGIN: "/login",
  // REGISTER: "/register",
  // REGISTER_ADMIN: "/register_admin",
  NEW_PRODUCT: "/admin/products/new",
  PRODUCT: "/admin/products/:productId",
  EDIT_PRODUCT: "/admin/products/:productId/edit",
  NEW_VARIANT: "/admin/products/:productId/variant/new",
  VARIANT: "/variant/:variantId",
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
