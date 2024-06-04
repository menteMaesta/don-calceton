import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import SnackbarProvider from "react-simple-snackbar";
import NewProduct from "routes/Products/NewProduct";
import { PRODUCT_DATA } from "helpers/test";
import { es } from "helpers/strings";

import { ROUTES } from "helpers/constants";

describe("NewProduct", () => {
  test("renders the product form", () => {
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

    const productFormElement = screen.getByTestId(PRODUCT_DATA.form);
    expect(productFormElement).toBeInTheDocument();
    expect(screen.getByTestId(PRODUCT_DATA.formTitle).innerHTML).toEqual(
      es.products.new
    );
  });
});
