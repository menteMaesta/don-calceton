import React from "react";
import { render, within } from "@testing-library/react";
import { Accordion, AccordionItem } from "@reach/accordion";
import SnackbarProvider from "react-simple-snackbar";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import Personalization from "storeComponents/Personalization/Personalization";

describe("Personalization", () => {
  const item = {
    quantity: 2,
    customizationId: 1,
    images: [],
    imageSize: 20,
  };

  const customizations = [
    {
      id: 1,
      title: "Al frente",
      maxSize: 20,
      minSize: 0,
    },
  ];

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
              personalization={item}
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

    const quantity = getByTestId("order-item_quantity");
    const quantitySelector = within(quantity).getByTestId(
      "form-item_label-children"
    ).children[0];
    const images = getByTestId("order-item_images");
    const imageUploader = getByTestId("variant-image-uploader");
    const customization = getByTestId("order-item_customization");
    const customizationSelector = within(customization).getByTestId(
      "form-item_label-children"
    ).children[0];
    const size = getByTestId("order-item_size");
    const sizeInput = getByTestId("order-item_size-input");

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
