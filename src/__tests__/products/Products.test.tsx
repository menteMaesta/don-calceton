import React from "react";
import SnackbarProvider from "react-simple-snackbar";
import { describe } from "vitest";
import {
  createMemoryRouter,
  RouterProvider,
  LoaderFunctionArgs,
} from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Products from "routes/Products/Products";
import ProductDetails from "routes/Products/Product";

import { ROUTES } from "helpers/constants";

const products = [
  {
    id: 4,
    name: "Playera",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    price: 100,
    wholesalePrice: 80,
    variants: [
      {
        id: 3,
        name: "Playera azul",
        productId: 4,
        quantity: 20,
        images: [
          {
            id: 3,
            name: "znmjcbhhrote59v2jnivy7gu.png",
            variantId: 3,
          },
        ],
      },
    ],
  },
];

describe("Products", () => {
  test("renders the search bar", async () => {
    const routes = [
      {
        path: ROUTES.DASHBOARD,
        element: <Products />,
        loader: () => [],
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: [ROUTES.DASHBOARD],
    });

    render(
      <React.StrictMode>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </React.StrictMode>
    );

    const searchBarElement = await waitFor(() =>
      screen.getByTestId("search-bar")
    );
    expect(searchBarElement).toBeInTheDocument();
  });

  test("renders the product cards", async () => {
    const routes = [
      {
        path: ROUTES.DASHBOARD,
        element: <Products />,
        loader: () => products,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: [ROUTES.DASHBOARD],
    });

    render(
      <React.StrictMode>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </React.StrictMode>
    );

    const productList = await waitFor(() => screen.getByTestId("product-list"));
    const productCards = screen.getAllByTestId(/product-link_/);

    expect(productList).toBeInTheDocument();
    expect(productList).toHaveClass(
      "sm:grid-cols-2",
      "md:grid-cols-3",
      "lg:grid-cols-5"
    );
    expect(productCards.length).toBeGreaterThan(0);
  });

  test("displays empty state when no products are available", async () => {
    const routes = [
      {
        path: ROUTES.DASHBOARD,
        element: <Products />,
        loader: () => [],
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: [ROUTES.DASHBOARD],
    });

    render(
      <React.StrictMode>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </React.StrictMode>
    );

    const emptyStateElement = await waitFor(() =>
      screen.getByTestId("empty-state")
    );

    expect(emptyStateElement).toBeInTheDocument();
  });

  test("navigates to the product details page when a product card is clicked", async () => {
    const routes = [
      {
        path: ROUTES.DASHBOARD,
        element: <Products />,
        loader: () => products,
      },
      {
        path: ROUTES.PRODUCT,
        loader: ({ params }: LoaderFunctionArgs) =>
          products.find((product) => `${product.id}` === params.productId) ||
          {},
        element: <ProductDetails />,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: [ROUTES.DASHBOARD],
    });

    render(
      <React.StrictMode>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </React.StrictMode>
    );
    const productCard = await waitFor(() =>
      screen.getByTestId(`product-link_${products[0].id}`)
    );

    expect(productCard).toBeInTheDocument();
    expect(productCard.getAttribute("href")).toEqual(
      ROUTES.PRODUCT.replace(":productId", `${products[0].id}`)
    );
    await userEvent.click(productCard);

    await waitFor(() => screen.getByTestId("product-page"));
    expect(screen.getByTestId("product-data_name").innerHTML).toEqual(
      products[0].name
    );
  });
});
