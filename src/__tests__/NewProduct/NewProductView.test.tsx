import React from "react";
import { render, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import SnackbarProvider from "react-simple-snackbar";
import NewProductView from "routes/NewProduct/NewProductView";
import { NEW_PRODUCT_PAGE, PRODUCT_PAGE, CART_SELECTORS } from "helpers/test";
import { ROUTES } from "helpers/constants";

describe("NewProductView", () => {
  test("renders the component", async () => {
    const routes = [
      {
        path: ROUTES.PRODUCT,
        element: <NewProductView />,
        action: () => true,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: [ROUTES.NEW_PRODUCT],
    });

    const { getByTestId } = render(
      <React.StrictMode>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </React.StrictMode>
    );

    const page = await waitFor(() => getByTestId(NEW_PRODUCT_PAGE.newProduct));
    const productData = getByTestId(NEW_PRODUCT_PAGE.newProductData);
    const tabs = getByTestId(NEW_PRODUCT_PAGE.tabs);
    const variantTabHeader = getByTestId(PRODUCT_PAGE.variantTabHeader);
    const variantTabPanel = getByTestId(PRODUCT_PAGE.variantTabPanel);
    const customizationTabHeader = getByTestId(
      PRODUCT_PAGE.customizationTabHeader
    );
    const customizationTabPanel = getByTestId(
      PRODUCT_PAGE.customizationTabPanel
    );
    const bottomBar = getByTestId(CART_SELECTORS.bottomBar);
    const cancel = getByTestId(NEW_PRODUCT_PAGE.cancel);
    const save = getByTestId(NEW_PRODUCT_PAGE.save);

    expect(page).toBeInTheDocument();
    expect(productData).toBeInTheDocument();
    expect(tabs).toBeInTheDocument();
    expect(variantTabHeader).toBeInTheDocument();
    expect(variantTabPanel).toBeInTheDocument();
    expect(customizationTabHeader).toBeInTheDocument();
    expect(customizationTabPanel).toBeInTheDocument();
    expect(bottomBar).toBeInTheDocument();
    expect(cancel).toBeInTheDocument();
    expect(save).toBeInTheDocument();
  });
});
