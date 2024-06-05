import React from "react";
import { render, waitFor } from "@testing-library/react";
import SnackbarProvider from "react-simple-snackbar";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import VariantList from "routes/Store/VariantList/VariantList";
import Store from "routes/Store/Store";
import { ROUTES } from "helpers/constants";
import {
  VARIANT_LIST_ITEM,
  PERSONALIZATION,
  SELECTORS,
  VARIANT_SELECTORS,
  CART_SELECTORS,
} from "helpers/test";

describe("VariantList", () => {
  test("renders empty state when no variants are available", async () => {
    const routes = [
      {
        path: ROUTES.STORE,
        element: <VariantList />,
        loader: () => [],
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: [ROUTES.STORE],
    });

    const { getByTestId } = render(
      <React.StrictMode>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </React.StrictMode>
    );
    const emptyState = await waitFor(() => getByTestId(SELECTORS.emptyState));
    expect(emptyState).toBeInTheDocument();
  });

  test("renders variant items when variants are available", async () => {
    const routes = [
      {
        path: ROUTES.STORE,
        element: <VariantList />,
        loader: () => ({
          variants: [
            {
              ...VARIANT_LIST_ITEM,
            },
            {
              ...VARIANT_LIST_ITEM,
              id: 2,
            },
          ],
          cart: [],
        }),
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: [ROUTES.STORE],
    });

    const { getByTestId } = render(
      <React.StrictMode>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </React.StrictMode>
    );

    const variantList = await waitFor(() =>
      getByTestId(VARIANT_SELECTORS.variantList)
    );
    expect(variantList).toBeInTheDocument();
    expect(variantList.children).toHaveLength(2);
  });

  test("cart tag is the same as the total items in the cart", async () => {
    const cart = [
      {
        id: 1,
        personalizations: [PERSONALIZATION, PERSONALIZATION],
      },
    ];
    const routes = [
      {
        path: ROUTES.STORE,
        element: <Store />,
        loader: () => ({ cart, totalItems: 2 }),
        children: [
          {
            index: true,
            element: <VariantList />,
            loader: () => ({
              variants: [{ id: 1 }],
              cart,
            }),
            action: () => true,
          },
        ],
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: [ROUTES.STORE],
    });
    const { getByTestId, queryByTestId } = render(
      <React.StrictMode>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </React.StrictMode>
    );

    const variantList = await waitFor(() =>
      getByTestId(VARIANT_SELECTORS.variantList)
    );
    const addButtonContainer = getByTestId(VARIANT_SELECTORS.addProduct);
    const removeItem = getByTestId(CART_SELECTORS.remove);
    const cartTag = getByTestId(CART_SELECTORS.cartTag);

    expect(variantList).toBeInTheDocument();
    expect(addButtonContainer).toBeInTheDocument();
    expect(queryByTestId("add-to-cart")).not.toBeInTheDocument();
    expect(removeItem).toBeInTheDocument();
    expect(cartTag).toBeInTheDocument();
    expect(cartTag).toHaveTextContent("2");
  });
});
