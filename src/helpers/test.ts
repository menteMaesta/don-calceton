export const PRODUCT = {
  id: 1,
  name: "Test Product",
  price: 100,
  wholesalePrice: 80,
  description: "Test Description",
  updatedAt: "2021-10-10",
  createdAt: "2021-10-10",
  variants: [],
};

export const VARIANT = {
  id: 2,
  name: "Playera roja",
  productId: 4,
  quantity: 20,
  createdAt: "2024-03-25T21:02:00.452+00:00",
  updatedAt: "2024-03-25T21:02:00.452+00:00",
  images: [],
};

export const VARIANT_LIST_ITEM = {
  id: 1,
  name: "Playera rosa",
  productId: 1,
  quantity: 40,
  images: {
    id: 1,
    name: "image.png",
  },
  productName: "Playera",
  productPrice: 150,
  productWholesalePrice: 130,
};

export const IMAGE = {
  id: 1,
  name: "Test Image",
  src: "test-image.jpg",
  variantId: 2,
};

export const IMAGES = [
  { name: "image1.jpg", id: 1 },
  { name: "image2.jpg", id: 2 },
  { name: "image3.jpg", id: 3 },
];

export const FILE = new File(["dummy content"], "test.png", {
  type: "image/png",
});

export const CUSTOMIZATION = {
  id: 1,
  title: "Al frente",
  maxSize: 20,
  minSize: 0,
};

export const PERSONALIZATION = {
  quantity: 3,
  customizationId: 1,
  images: [{ name: "img.jpg", size: 20 }],
  imageSize: 0,
};

export const CART_ITEM = {
  id: 1,
  name: "Test Item",
  productId: 1,
  quantity: 20,
  personalizations: [PERSONALIZATION],
  images: [],
  customizations: [],
};

export const ELEMENT_CARD = {
  elementCard: `{type}-link_{id}`,
  remove: `{type}-remove_{id}`,
  cardName: `{type}-name_{id}`,
};

export const IMAGE_CARD = {
  image: `image_{id}`,
  remove: `remove-button_{id}`,
};

export const SLIDER_IMAGE_CARD = {
  nextImage: "next-image_button",
  prevImage: "prev-image_button",
  image: "slider-image_{id}",
};

export const PRODUCT_CARD = {
  name: "product-name_{id}",
  price: "price_{id}",
  wholesalePrice: "wholesale-price_{id}",
  description: "product-description_{id}",
};

export const PRODUCT_DATA = {
  name: "product-data_name",
  price: "product-data_price",
  wholesalePrice: "product-data_wholesale-price",
  description: "product-data_description",
  showHide: "product-data_show-hide",
  edit: "product-data_edit",
  form: "product-form",
  nameInput: "name_input",
  editProduct: "edit-product_page",
  formTitle: "product-form-title",
};

export const PRODUCT_PAGE = {
  name: "product-page",
  productData: "product-data_{id}",
  productTabs: "product_tabs",
  variantTabHeader: "variant_tab-header",
  variantTabPanel: "variant_tab-panel",
  customizationTabHeader: "customization_tab-header",
  customizationTabPanel: "customization_tab-panel",
  customizationTabContent: "customizations_tab-content",
  variantList: "variant-list",
  productList: "product-list",
};

export const SELECTORS = {
  loader: "loader",
  searchBar: "search-bar",
  sectionDivider: "section-divider",
  emptyState: "empty-state",
};

export const VARIANT_SELECTORS = {
  quantity: "variant-quantity_{id}",
  name: "variant-card-name_{id}",
  edit: "variant-data_edit",
  save: "variant-data_save",
  dataName: "variant-data_name",
  dataQuantity: "variant-data_quantity",
  nameInput: "variant-data_name-input",
  quantityInput: "variant-data_quantity-input",
  imageUploader: "variant-image-uploader",
  variantList: "variant-item_list",
  addProduct: "add-products_button",
  removeProduct: "remove-products_button",
};

export const CUSTOMIZATION_SELECTORS = {
  card: "customization_card-{id}",
  remove: "remove-customization",
  edit: "edit-customization",
  save: "save-customization_{id}",
  title: "title-{id}",
  minSize: "min-size-{id}",
  maxSize: "max-size-{id}",
  editTitle: "title-edit_{id}",
  editMinSize: "min-size-edit_{id}",
  editMaxSize: "max-size-edit_{id}",
  tabContent: "customizations_tab-content",
  new: "new-customization",
  grid: "customizations_grid",
  personalizationList: "personalization_list",
};

export const AUTH_SELECTORS = {
  changePassword: "change-password_component",
  changeTitle: "change-password_title",
  passwordInput: "change-password_input",
  passwordConfirmInput: "change-password_confirm_input",
  changeSubmit: "change-password_submit",
  forgotPassword: "forgot-password-component",
  forgotTitle: "forgot-password_title",
  forgotDescription: "forgot-password_description",
  forgotSubmit: "forgot-password_submit",
  toMailTitle: "to-mail_title",
  toMailDescription: "to-mail_description",
  toMailLink: "to-mail_link",
};

export const CART_SELECTORS = {
  page: "cart_page",
  totalPrice: "total-product_price",
  list: "cart_list",
  add: "add-to-cart",
  remove: "remove-from-cart",
  cartTag: "cart-total_badge",
};
