import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import SnackbarProvider from "react-simple-snackbar";
import NewProduct from "routes/Products/NewProduct";

import { ROUTES } from "helpers/constants";

describe("NewProduct", () => {
  test.only("renders the product form", () => {
    const routes = [
      {
        path: ROUTES.NEW_PRODUCT,
        element: <NewProduct />,
        action: () => {
          return { message: "Product created successfully" };
        },
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: [ROUTES.NEW_PRODUCT],
    });
    render(
      <SnackbarProvider>
        <RouterProvider router={router} />
      </SnackbarProvider>
    );

    const productFormElement = screen.getByTestId("product-form");
    expect(productFormElement).toBeInTheDocument();
    expect(screen.getByTestId("product-form-title").innerHTML).toEqual(
      "Nuevo producto"
    );
  });
});
