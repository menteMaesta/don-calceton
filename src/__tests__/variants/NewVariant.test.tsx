import React from "react";
import { render, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import SnackbarProvider from "react-simple-snackbar";
import NewVariant from "routes/Variants/NewVariant";
import { ROUTES } from "helpers/constants";

describe("NewVariant", () => {
  const routes = [
    {
      path: ROUTES.NEW_VARIANT,
      element: <NewVariant />,
      action: () => [],
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: [ROUTES.NEW_VARIANT],
  });

  test("renders the component", async () => {
    const { getByTestId, getByText } = render(
      <React.StrictMode>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </React.StrictMode>
    );

    const newVariantComponent = await waitFor(() =>
      getByTestId("new-variant_page")
    );
    const newVariantTitle = getByText("Nueva variante");
    const variantNameInput = getByTestId("new-variant-name_input");
    const variantQuantityInput = getByTestId("new-variant-quantity_input");
    const variantImagesInput = getByTestId("variant-image-uploader");
    const submitButton = getByTestId("new-variant-submit_button");
    const cancelButton = getByTestId("new-variant-cancel_button");

    expect(newVariantComponent).toBeInTheDocument();
    expect(newVariantTitle).toBeInTheDocument();
    expect(variantNameInput).toBeInTheDocument();
    expect(variantQuantityInput).toBeInTheDocument();
    expect(variantImagesInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
    expect(cancelButton).toBeInTheDocument();
  });
});
