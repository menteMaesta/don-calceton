import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SnackbarProvider from "react-simple-snackbar";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import CartItem from "src/storeComponents/CartItem";
import {
  CART_ITEM,
  ELEMENT_CARD,
  SLIDER_IMAGE_CARD,
  CUSTOMIZATION_SELECTORS,
} from "helpers/test";

describe("CartItem", () => {
  const onRemoveMock = vi.fn();

  const router = createMemoryRouter([
    {
      index: true,
      element: <CartItem item={CART_ITEM} onRemove={onRemoveMock} />,
    },
  ]);

  beforeEach(() => {
    render(
      <React.StrictMode>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </React.StrictMode>
    );
  });

  it("renders the VariantImageSlider component", () => {
    const variantTitle = screen.getByTestId(
      ELEMENT_CARD.cardName
        .replace("{type}", "variant")
        .replace("{id}", `${CART_ITEM.id}`)
    );
    const imageSlider = screen.getByTestId(
      SLIDER_IMAGE_CARD.image.replace("{id}", "default")
    );
    const personalizationList = screen.getByTestId(
      CUSTOMIZATION_SELECTORS.personalizationList
    );

    expect(variantTitle).toBeInTheDocument();
    expect(imageSlider).toBeInTheDocument();
    expect(personalizationList).toBeInTheDocument();
    expect(personalizationList.children.length).toBeGreaterThan(
      CART_ITEM.personalizations.length
    );
  });

  it("calls the onRemove function when remove button is clicked", () => {
    const removeButton = screen.getByTestId(
      ELEMENT_CARD.remove
        .replace("{type}", "variant")
        .replace("{id}", `${CART_ITEM.id}`)
    );
    fireEvent.click(removeButton);
    expect(onRemoveMock).toHaveBeenCalledTimes(1);
  });
});
