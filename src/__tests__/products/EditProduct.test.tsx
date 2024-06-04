import React from "react";
import { render, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import SnackbarProvider from "react-simple-snackbar";
import { ROUTES } from "helpers/constants";
import EditProduct from "routes/Products/EditProduct";
import { PRODUCT, VARIANT, IMAGE, PRODUCT_DATA } from "helpers/test";
import { es } from "helpers/strings";

describe("EditProduct", () => {
  const product = {
    ...PRODUCT,
    variants: [{ ...VARIANT, images: [IMAGE] }],
  };
  test("renders the EditProduct component", async () => {
    const routes = [
      {
        path: ROUTES.EDIT_PRODUCT,
        element: <EditProduct />,
        loader: () => product,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: [
        ROUTES.EDIT_PRODUCT.replace(":productId", `${product.id}`),
      ],
    });

    const { getByTestId, getByText } = render(
      <React.StrictMode>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </React.StrictMode>
    );

    const editProductPage = await waitFor(() =>
      getByTestId(PRODUCT_DATA.editProduct)
    );
    const editProductTitle = getByText(es.products.edit);
    const productForm = getByTestId(PRODUCT_DATA.form);

    expect(editProductPage).toBeInTheDocument();
    expect(editProductTitle).toBeInTheDocument();
    expect(editProductTitle).toHaveClass(
      "mt-9 font-semibold",
      "text-center text-lg"
    );
    expect(productForm).toBeInTheDocument();
  });
});
