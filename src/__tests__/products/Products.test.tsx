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
import {
  PRODUCT,
  VARIANT,
  IMAGE,
  SELECTORS,
  PRODUCT_PAGE,
  PRODUCT_DATA,
  ELEMENT_CARD,
} from "helpers/test";

const products = [
  {
    ...PRODUCT,
    variants: [
      {
        ...VARIANT,
        images: [IMAGE],
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
      screen.getByTestId(SELECTORS.searchBar)
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

    const productList = await waitFor(() =>
      screen.getByTestId(PRODUCT_PAGE.productList)
    );
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
      screen.getByTestId(SELECTORS.emptyState)
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
      screen.getByTestId(
        ELEMENT_CARD.elementCard
          .replace("{type}", "product")
          .replace("{id}", `${products[0].id}`)
      )
    );

    expect(productCard).toBeInTheDocument();
    expect(productCard.getAttribute("href")).toEqual(
      ROUTES.PRODUCT.replace(":productId", `${products[0].id}`)
    );
    await userEvent.click(productCard);

    await waitFor(() => screen.getByTestId(PRODUCT_PAGE.name));
    expect(screen.getByTestId(PRODUCT_DATA.name).innerHTML).toEqual(
      products[0].name
    );
  });
});
