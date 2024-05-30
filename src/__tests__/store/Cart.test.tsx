import React from "react";
import { render, waitFor } from "@testing-library/react";
import SnackbarProvider from "react-simple-snackbar";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "helpers/constants";
import Cart from "routes/Store/Cart/Cart";

describe("Cart component", () => {
  const mockCartItems = [
    {
      id: 1,
      personalizations: [
        {
          quantity: 3,
          customizationId: 0,
          images: [{}],
          imageSize: 0,
        },
      ],
    },
    {
      id: 2,
      personalizations: [
        {
          quantity: 2,
          customizationId: 0,
          images: [{}],
          imageSize: 0,
        },
      ],
    },
    {
      id: 3,
      personalizations: [
        {
          quantity: 2,
          customizationId: 3,
          images: [],
          imageSize: 15.2,
        },
      ],
    },
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

    const cartPage = await waitFor(() => getByTestId("cart_page"));
    const totalPrice = getByTestId("total-product_price");
    const cartList = getByTestId("cart_list");

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

    const emptyElement = await waitFor(() => getByTestId("empty-state"));
    expect(emptyElement).toBeInTheDocument();
  });
});
