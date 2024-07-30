import React from "react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import SnackbarProvider from "react-simple-snackbar";
import { render, screen, waitFor } from "@testing-library/react";
import Orders from "routes/Orders/Orders";
import { ROUTES } from "helpers/constants";
import { ORDER, ORDER_SELECTORS, SELECTORS } from "helpers/test";

describe("Orders", () => {
  test("renders the order cards", async () => {
    const routes = [
      {
        path: ROUTES.ORDERS,
        element: <Orders />,
        loader: () => [ORDER],
        action: () => true,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: [ROUTES.ORDERS],
    });

    render(
      <React.StrictMode>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </React.StrictMode>
    );

    const orderList = await waitFor(() =>
      screen.getByTestId(ORDER_SELECTORS.orderGrid)
    );

    expect(orderList).toBeInTheDocument();
    expect(orderList.children.length).toBeGreaterThan(0);
    expect(orderList).toHaveClass("sm:grid-cols-3", "grid-cols-1", "grid");
  });

  test("displays empty state when no orders are available", async () => {
    const routes = [
      {
        path: ROUTES.ORDERS,
        element: <Orders />,
        loader: () => [],
        action: () => true,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: [ROUTES.ORDERS],
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
});
