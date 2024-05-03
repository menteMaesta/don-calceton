import React from "react";
import { render, waitFor } from "@testing-library/react";
import SnackbarProvider from "react-simple-snackbar";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import VariantList from "routes/Store/VariantList/VariantList";
import Store from "routes/Store/Store";
import { ROUTES } from "helpers/constants";

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
    const emptyState = await waitFor(() => getByTestId("empty-state"));
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
              id: 1,
              name: "Playera rosa",
              productId: 1,
              quantity: 40,
              images: {
                id: 1,
                name: "sxfqazosknhlfivfpredg3af.png",
              },
              productName: "Playera",
              productPrice: 150,
              productWholesalePrice: 130,
            },
            {
              id: 2,
              name: "Playera roja",
              productId: 1,
              quantity: 20,
              images: {
                id: 2,
                name: "izuuuhbsxgt2n4q69humca8m.png",
              },
              productName: "Playera",
              productPrice: 150,
              productWholesalePrice: 130,
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

    const variantList = await waitFor(() => getByTestId("variant-item_list"));
    expect(variantList).toBeInTheDocument();
    expect(variantList.children).toHaveLength(2);
  });

  test("cart tag is the same as the total items in the cart", async () => {
    const cart = [
      {
        id: 1,
        orderQuantity: 2,
      },
    ];
    const routes = [
      {
        path: ROUTES.STORE,
        element: <Store />,
        loader: () => ({ cart, totalItems: cart[0].orderQuantity }),
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

    const variantList = await waitFor(() => getByTestId("variant-item_list"));
    const addButton = getByTestId("add-products_button");
    const addItemButton = getByTestId("add-item-to-cart");
    const cartTag = getByTestId("cart-total_badge");

    expect(variantList).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveTextContent("2");
    expect(queryByTestId("add-to-cart")).not.toBeInTheDocument();
    expect(addItemButton).toBeInTheDocument();
    expect(cartTag).toBeInTheDocument();
    expect(cartTag).toHaveTextContent("2");
  });
});
