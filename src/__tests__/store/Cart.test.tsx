import React from "react";
import { render, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "helpers/constants";
import Cart from "routes/Store/Cart/Cart";

describe("Cart component", () => {
  test("displays cart items", async () => {
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

    const routes = [
      {
        path: ROUTES.CART,
        element: <Cart />,
        loader: () => mockCartItems,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: [ROUTES.CART],
    });

    const { getByTestId } = render(
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    );

    const cartPage = await waitFor(() => getByTestId("cart_page"));
    const productCounter = getByTestId("product_counter");
    const cartList = getByTestId("cart_list");

    expect(cartPage).toBeInTheDocument();
    expect(productCounter).toBeInTheDocument();
    expect(cartList).toBeInTheDocument();
    expect(cartList.children.length).toBe(mockCartItems.length);
  });
});
