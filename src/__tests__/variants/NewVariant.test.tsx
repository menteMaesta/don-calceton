import React from "react";
import { render, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import SnackbarProvider from "react-simple-snackbar";
import NewVariant from "routes/Variants/NewVariant";
import { ROUTES } from "helpers/constants";
import { VARIANT_SELECTORS } from "helpers/test";
import { es } from "helpers/strings";

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
    const newVariantTitle = getByText(es.variants.new);
    const variantNameInput = getByTestId(VARIANT_SELECTORS.newName);
    const variantQuantityInput = getByTestId(VARIANT_SELECTORS.newQuantity);
    const variantImagesInput = getByTestId(VARIANT_SELECTORS.imageUploader);
    const submitButton = getByTestId(VARIANT_SELECTORS.newSubmit);
    const cancelButton = getByTestId(VARIANT_SELECTORS.newCancel);

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
