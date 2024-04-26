import { StrictMode } from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  MemoryRouter,
  createMemoryRouter,
  RouterProvider,
} from "react-router-dom";
import SnackbarProvider from "react-simple-snackbar";
import Product from "routes/Products/Product";
import EditProduct from "routes/Products/EditProduct";
import ProductData from "components/ProductData";
import { ROUTES } from "helpers/constants";

const mockProduct = {
  id: 4,
  name: "Playera",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  price: 100,
  wholesalePrice: 80,
  createdAt: "2024-03-25T20:58:31.805+00:00",
  updatedAt: "2024-03-25T20:58:31.805+00:00",
  variants: [
    {
      id: 2,
      name: "Playera roja",
      productId: 4,
      quantity: 20,
      createdAt: "2024-03-25T21:02:00.452+00:00",
      updatedAt: "2024-03-25T21:02:00.452+00:00",
      images: [],
    },
  ],
};

describe("ProductData", () => {
  it("renders productData component", () => {
    render(
      <MemoryRouter>
        <ProductData product={mockProduct} />
      </MemoryRouter>
    );

    const productName = screen.getByTestId("product-data_name");
    const productPrice = screen.getByTestId("product-data_price");
    const productWholesalePrice = screen.getByTestId(
      "product-data_wholesale-price"
    );
    const productDescription = screen.getByTestId("product-data_description");
    const productShowHide = screen.getByTestId("product-data_show-hide");

    expect(productName).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
    expect(productDescription).toBeInTheDocument();
    expect(productWholesalePrice).toBeInTheDocument();
    expect(productShowHide).toBeInTheDocument();

    expect(productName).toHaveTextContent(mockProduct.name);
    expect(productPrice).toHaveTextContent(
      `Precio base: $${mockProduct.price}`
    );
    expect(productWholesalePrice).toHaveTextContent(
      `Mayoreo: $${mockProduct.wholesalePrice}`
    );
    expect(productDescription).toHaveTextContent(mockProduct.description);
  });

  it("should show/hide description", async () => {
    render(
      <MemoryRouter>
        <ProductData product={mockProduct} />
      </MemoryRouter>
    );

    const productDescription = screen.getByTestId("product-data_description");
    const productShowHide = screen.getByTestId("product-data_show-hide");

    expect(productDescription).toHaveClass("line-clamp-2");

    await act(async () => productShowHide.click());

    await waitFor(() => {
      expect(productDescription).not.toHaveClass("line-clamp-2");
    });
  });

  it("should redirect to edit product", async () => {
    const routes = [
      {
        path: ROUTES.PRODUCT,
        element: <Product />,
        loader: () => mockProduct,
      },
      {
        path: ROUTES.EDIT_PRODUCT,
        loader: () => mockProduct,
        element: <EditProduct />,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ["/products/4"],
    });

    render(
      <StrictMode>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </StrictMode>
    );

    const editProduct = await waitFor(() =>
      screen.getByTestId("product-data_edit")
    );

    expect(editProduct).toBeInTheDocument();
    expect(editProduct.getAttribute("href")).toEqual(
      ROUTES.EDIT_PRODUCT.replace(":productId", `${mockProduct.id}`)
    );

    await userEvent.click(editProduct);

    await waitFor(() => screen.getByTestId("edit-product_page"));
    expect(screen.getByTestId("product-form")).toBeInTheDocument();
  });
});
