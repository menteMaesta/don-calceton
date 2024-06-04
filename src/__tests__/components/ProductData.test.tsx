import { StrictMode, act } from "react";
import { render, screen, waitFor } from "@testing-library/react";
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
import { PRODUCT, VARIANT, PRODUCT_DATA } from "helpers/test";

const mockProduct = {
  ...PRODUCT,
  variants: [VARIANT],
};

describe("ProductData", () => {
  it("renders productData component", () => {
    render(
      <MemoryRouter>
        <ProductData product={mockProduct} />
      </MemoryRouter>
    );

    const productName = screen.getByTestId(PRODUCT_DATA.name);
    const productPrice = screen.getByTestId(PRODUCT_DATA.price);
    const productWholesalePrice = screen.getByTestId(
      PRODUCT_DATA.wholesalePrice
    );
    const productDescription = screen.getByTestId(PRODUCT_DATA.description);
    const productShowHide = screen.getByTestId(PRODUCT_DATA.showHide);

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

    const productDescription = screen.getByTestId(PRODUCT_DATA.description);
    const productShowHide = screen.getByTestId(PRODUCT_DATA.showHide);

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
      initialEntries: [ROUTES.PRODUCT.replace(":productId", "4")],
    });

    render(
      <StrictMode>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </StrictMode>
    );

    const editProduct = await waitFor(() =>
      screen.getByTestId(PRODUCT_DATA.edit)
    );

    expect(editProduct).toBeInTheDocument();
    expect(editProduct.getAttribute("href")).toEqual(
      ROUTES.EDIT_PRODUCT.replace(":productId", `${mockProduct.id}`)
    );

    await userEvent.click(editProduct);

    await waitFor(() => screen.getByTestId("edit-product_page"));
    expect(screen.getByTestId(PRODUCT_DATA.form)).toBeInTheDocument();
  });
});
