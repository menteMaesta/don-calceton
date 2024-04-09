import React from "react";
import { render, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import SnackbarProvider from "react-simple-snackbar";
import { ROUTES } from "helpers/constants";
import EditProduct from "routes/Products/EditProduct";

describe("EditProduct", () => {
  const product = {
    id: 4,
    name: "Playera",
    description: "Lorem ipsum dolor sit amet",
    price: 100,
    variants: [
      {
        id: 3,
        name: "Playera azul",
        productId: 4,
        quantity: 20,
        images: [
          {
            id: 3,
            name: "image.png",
            variantId: 3,
          },
        ],
      },
    ],
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
      getByTestId("edit-product_page")
    );
    const editProductTitle = getByText("Editar producto");
    const productForm = getByTestId("product-form");

    expect(editProductPage).toBeInTheDocument();
    expect(editProductTitle).toBeInTheDocument();
    expect(editProductTitle).toHaveClass(
      "mt-9 font-semibold",
      "text-center text-lg"
    );
    expect(productForm).toBeInTheDocument();
  });
});
