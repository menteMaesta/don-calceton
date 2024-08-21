import React from "react";
import { render, waitFor } from "@testing-library/react";
import SnackbarProvider from "react-simple-snackbar";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { ROUTES, PAYPAL_OPTIONS } from "helpers/constants";
import Cart from "routes/Store/Cart/Cart";
import { CART_ITEM, CART_SELECTORS, SELECTORS } from "helpers/test";
import { es } from "helpers/strings";

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
        <PayPalScriptProvider options={PAYPAL_OPTIONS}>
          <SnackbarProvider>
            <RouterProvider router={router} />
          </SnackbarProvider>
        </PayPalScriptProvider>
      </React.StrictMode>
    );

    const cartPage = await waitFor(() => getByTestId(CART_SELECTORS.page));
    const totalPrice = getByTestId(CART_SELECTORS.totalPrice);
    const cartList = getByTestId(CART_SELECTORS.list);
    const bottomBar = getByTestId(CART_SELECTORS.bottomBar);

    expect(cartPage).toBeInTheDocument();
    expect(totalPrice).toBeInTheDocument();
    expect(totalPrice.textContent).toBe(
      `${es.orders.totalPrice}${loaderData.totalPrice}`
    );
    expect(cartList).toBeInTheDocument();
    expect(cartList.children.length).toBe(mockCartItems.length);
    expect(bottomBar).toBeInTheDocument();
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
        <PayPalScriptProvider options={PAYPAL_OPTIONS}>
          <SnackbarProvider>
            <RouterProvider router={router} />
          </SnackbarProvider>
        </PayPalScriptProvider>
      </React.StrictMode>
    );

    const emptyElement = await waitFor(() => getByTestId(SELECTORS.emptyState));
    expect(emptyElement).toBeInTheDocument();
  });

  test("displays buy bottom bar", async () => {
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
        <PayPalScriptProvider options={PAYPAL_OPTIONS}>
          <SnackbarProvider>
            <RouterProvider router={router} />
          </SnackbarProvider>
        </PayPalScriptProvider>
      </React.StrictMode>
    );

    const bottomBar = await waitFor(() =>
      getByTestId(CART_SELECTORS.bottomBar)
    );
    const totalPriceText = getByTestId(CART_SELECTORS.totalPrice);
    expect(bottomBar).toBeInTheDocument();
    expect(totalPriceText).toBeInTheDocument();
    expect(totalPriceText).toHaveTextContent(
      es.orders.totalPrice + loaderData.totalPrice
    );
  });
});
