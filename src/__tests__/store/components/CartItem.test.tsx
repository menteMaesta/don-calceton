import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SnackbarProvider from "react-simple-snackbar";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import CartItem from "src/storeComponents/CartItem";

describe("CartItem", () => {
  const item = {
    id: 1,
    name: "Test Item",
    productId: 1,
    quantity: 20,
    personalizations: [
      {
        quantity: 5,
        customizationId: 1,
        images: [{ name: "img.jpg", size: 20 }],
        imageSize: 0,
      },
    ],
    images: [],
    customizations: [],
  };
  const onRemoveMock = vi.fn();

  const router = createMemoryRouter([
    {
      index: true,
      element: <CartItem item={item} onRemove={onRemoveMock} />,
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
    const variantTitle = screen.getByTestId(`variant-name_${item.id}`);
    const imageSlider = screen.getByTestId("slider-image_default");
    const personalizationList = screen.getByTestId("personalization_list");

    expect(variantTitle).toBeInTheDocument();
    expect(imageSlider).toBeInTheDocument();
    expect(personalizationList).toBeInTheDocument();
    expect(personalizationList.children.length).toBeGreaterThan(
      item.personalizations.length
    );
  });

  it("calls the onRemove function when remove button is clicked", () => {
    const removeButton = screen.getByTestId(`variant-remove_${item.id}`);
    fireEvent.click(removeButton);
    expect(onRemoveMock).toHaveBeenCalledTimes(1);
  });
});
