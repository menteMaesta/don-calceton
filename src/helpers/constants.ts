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

export const EMPTY_ORDER_ITEM = {
  quantity: 0,
  customizationId: 0,
  images: [],
  imageSize: 0,
};

export const KB = 1024;
