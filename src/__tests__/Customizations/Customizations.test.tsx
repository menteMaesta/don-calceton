import { act } from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import SnackbarProvider from "react-simple-snackbar";
import Customizations from "routes/Customizations/Customizations";
import { ROUTES } from "helpers/constants";
import {
  CUSTOMIZATION,
  CUSTOMIZATION_SELECTORS,
  SELECTORS,
} from "helpers/test";

describe("Customizations", () => {
  test("renders Customizations component", async () => {
    const routes = [
      {
        path: `${ROUTES.PRODUCT}${ROUTES.CUSTOMIZATIONS}`,
        element: <Customizations />,
        loader: () => [CUSTOMIZATION],
        action: () => true,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: [`${ROUTES.PRODUCT}${ROUTES.CUSTOMIZATIONS}`],
    });

    const { getByTestId } = render(
      <SnackbarProvider>
        <RouterProvider router={router} />
      </SnackbarProvider>
    );

    // Assert that the Customizations component is rendered
    const customizationsElement = await waitFor(() =>
      getByTestId(CUSTOMIZATION_SELECTORS.tabContent)
    );
    const newCustomizationButton = getByTestId(CUSTOMIZATION_SELECTORS.new);
    const customizationsGrid = getByTestId(CUSTOMIZATION_SELECTORS.grid);

    expect(customizationsElement).toBeInTheDocument();
    expect(newCustomizationButton).toBeInTheDocument();
    expect(customizationsGrid).toBeInTheDocument();
    expect(customizationsGrid.children.length).toBe(1);
  });

  test("renders CustomizationCard component", async () => {
    const routes = [
      {
        path: `${ROUTES.PRODUCT}${ROUTES.CUSTOMIZATIONS}`,
        element: <Customizations />,
        loader: () => [CUSTOMIZATION],
        action: () => true,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: [`${ROUTES.PRODUCT}${ROUTES.CUSTOMIZATIONS}`],
    });

    const { getAllByTestId } = render(
      <SnackbarProvider>
        <RouterProvider router={router} />
      </SnackbarProvider>
    );

    const customizationCardElements = await waitFor(() =>
      getAllByTestId(/customization_card-/)
    );
    expect(customizationCardElements).toHaveLength(1);
  });

  test("renders new CustomizationCard component", async () => {
    const routes = [
      {
        path: `${ROUTES.PRODUCT}${ROUTES.CUSTOMIZATIONS}`,
        element: <Customizations />,
        loader: () => [CUSTOMIZATION],
        action: () => true,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: [`${ROUTES.PRODUCT}${ROUTES.CUSTOMIZATIONS}`],
    });

    const { getByTestId } = render(
      <SnackbarProvider>
        <RouterProvider router={router} />
      </SnackbarProvider>
    );

    const newCustomizationButton = await waitFor(() =>
      getByTestId(CUSTOMIZATION_SELECTORS.new)
    );

    act(() => {
      fireEvent.click(newCustomizationButton);
    });
    expect(
      getByTestId(CUSTOMIZATION_SELECTORS.card.replace("{id}", ""))
    ).toBeInTheDocument();
  });

  test("renders EmptyState component when customizations list is empty", async () => {
    const routes = [
      {
        path: `${ROUTES.PRODUCT}${ROUTES.CUSTOMIZATIONS}`,
        element: <Customizations />,
        loader: () => [],
        action: () => true,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: [`${ROUTES.PRODUCT}${ROUTES.CUSTOMIZATIONS}`],
    });

    const { getByTestId } = render(
      <SnackbarProvider>
        <RouterProvider router={router} />
      </SnackbarProvider>
    );

    const emptyStateElement = await waitFor(() =>
      getByTestId(SELECTORS.emptyState)
    );
    expect(emptyStateElement).toBeInTheDocument();
  });
});
