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

export const IMAGE = { id: 1, name: "Test Image", src: "test-image.jpg" };
export const IMAGES = [
  { name: "image1.jpg", id: 1 },
  { name: "image2.jpg", id: 2 },
  { name: "image3.jpg", id: 3 },
];

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
};

export const SELECTORS = {
  loader: "loader",
  searchBar: "search-bar",
  sectionDivider: "section-divider",
};
