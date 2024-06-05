import React from "react";
import { render, waitFor } from "@testing-library/react";
import SnackbarProvider from "react-simple-snackbar";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "helpers/constants";
import Cart from "routes/Store/Cart/Cart";
import { CART_ITEM, CART_SELECTORS, SELECTORS } from "helpers/test";

describe("Cart component", () => {
  const mockCartItems = [
    { ...CART_ITEM, id: 1 },
    { ...CART_ITEM, id: 2 },
    { ...CART_ITEM, id: 3 },
  ];

  test("displays cart items", async () => {
    const loaderData = { cart: mockCartItems, totalPrice: 5 };
    const routes = [
      {
        path: ROUTES.CART,
        element: <Cart />,
        loader: () => loaderData,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: [ROUTES.CART],
    });

    const { getByTestId } = render(
      <React.StrictMode>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </React.StrictMode>
    );

    const cartPage = await waitFor(() => getByTestId(CART_SELECTORS.page));
    const totalPrice = getByTestId(CART_SELECTORS.totalPrice);
    const cartList = getByTestId(CART_SELECTORS.list);

    expect(cartPage).toBeInTheDocument();
    expect(totalPrice).toBeInTheDocument();
    expect(totalPrice.textContent).toBe(
      `Precio total $${loaderData.totalPrice}`
    );
    expect(cartList).toBeInTheDocument();
    expect(cartList.children.length).toBe(mockCartItems.length);
  });

  test("displays empty view", async () => {
    const loaderData = { cart: [], totalPrice: 5 };
    const routes = [
      {
        path: ROUTES.CART,
        element: <Cart />,
        loader: () => loaderData,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: [ROUTES.CART],
    });

    const { getByTestId } = render(
      <React.StrictMode>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </React.StrictMode>
    );

    const emptyElement = await waitFor(() => getByTestId(SELECTORS.emptyState));
    expect(emptyElement).toBeInTheDocument();
  });
});
