import { render, waitFor, act, fireEvent } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import SnackbarProvider from "react-simple-snackbar";
import Customizations from "routes/Customizations/Customizations";
import { ROUTES } from "helpers/constants";

describe("Customizations", () => {
  const customization = {
    id: 1,
    title: "Al frente",
    maxSize: 20,
    minSize: 0,
  };
  test("renders Customizations component", async () => {
    const routes = [
      {
        path: `${ROUTES.PRODUCT}${ROUTES.CUSTOMIZATIONS}`,
        element: <Customizations />,
        loader: () => [customization],
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
      getByTestId("customizations_tab-content")
    );
    const newCustomizationButton = getByTestId("new-customization");
    const customizationsGrid = getByTestId("customizations_grid");

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
        loader: () => [customization],
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
        loader: () => [customization],
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
      getByTestId("new-customization")
    );

    act(() => {
      fireEvent.click(newCustomizationButton);
    });
    expect(getByTestId("customization_card-")).toBeInTheDocument();
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

    const emptyStateElement = await waitFor(() => getByTestId("empty-state"));
    expect(emptyStateElement).toBeInTheDocument();
  });
});
