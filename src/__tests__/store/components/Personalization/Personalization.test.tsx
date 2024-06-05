import React from "react";
import { render, within } from "@testing-library/react";
import { Accordion, AccordionItem } from "@reach/accordion";
import SnackbarProvider from "react-simple-snackbar";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import Personalization from "storeComponents/Personalization/Personalization";
import {
  CUSTOMIZATION,
  PERSONALIZATION,
  PERSONALIZATION_SELECTORS,
  SELECTORS,
} from "helpers/test";

describe("Personalization", () => {
  const customizations = [CUSTOMIZATION];

  const maxQuantity = 10;
  const cartItemId = 1;
  const router = createMemoryRouter([
    {
      index: true,
      element: (
        <Accordion>
          <AccordionItem className="relative">
            <Personalization
              id={1}
              personalization={PERSONALIZATION}
              cartItemId={cartItemId}
              customizations={customizations}
              maxQuantity={maxQuantity}
            />
          </AccordionItem>
        </Accordion>
      ),
    },
  ]);

  it("displays the item details correctly", () => {
    const { getByTestId } = render(
      <React.StrictMode>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </React.StrictMode>
    );

    const quantity = getByTestId(PERSONALIZATION_SELECTORS.quantity);
    const quantitySelector = within(quantity).getByTestId(
      SELECTORS.formItemChildren
    ).children[0];
    const images = getByTestId(PERSONALIZATION_SELECTORS.images);
    const imageUploader = getByTestId(PERSONALIZATION_SELECTORS.imageUploader);
    const customization = getByTestId(PERSONALIZATION_SELECTORS.customization);
    const customizationSelector = within(customization).getByTestId(
      SELECTORS.formItemChildren
    ).children[0];
    const size = getByTestId(PERSONALIZATION_SELECTORS.size);
    const sizeInput = getByTestId(PERSONALIZATION_SELECTORS.sizeInput);

    expect(quantity).toBeInTheDocument();
    expect(quantitySelector).toBeInTheDocument();
    expect(images).toBeInTheDocument();
    expect(imageUploader).toBeInTheDocument();
    expect(customization).toBeInTheDocument();
    expect(customizationSelector).toBeInTheDocument();
    expect(size).toBeInTheDocument();
    expect(sizeInput).toBeInTheDocument();
  });
});
