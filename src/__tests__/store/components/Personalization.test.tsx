import React from "react";
import { render, within, fireEvent, act } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import Personalization from "storeComponents/Personalization/Personalization";

describe("OrderItem", () => {
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

  const onChange = vi.fn();
  const index = "1";
  const router = createMemoryRouter([
    {
      index: true,
      element: (
        <Personalization
          item={item}
          customizations={customizations}
          maxQuantity={maxQuantity}
          onChange={onChange}
          onChangeOrderItemImages={vi.fn()}
          onDeleteOrderItemImages={vi.fn()}
          index={index}
        />
      ),
    },
  ]);

  it("displays the item details correctly", () => {
    const { getByTestId } = render(
      <React.StrictMode>
        <RouterProvider router={router} />
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

  it("calls the onChange function when a field value is changed", () => {
    const { getByTestId, getByText } = render(
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    );

    const quantity = getByTestId("order-item_quantity");
    const quantitySelector = within(quantity).getByTestId(
      "form-item_label-children"
    ).children[0];
    act(() => fireEvent.keyDown(quantitySelector, { key: "ArrowDown" }));
    act(() => getByText("4").click());
    expect(onChange).toHaveBeenCalledWith("quantity", 4);
  });

  it("enables range input once a customization is selected", () => {
    const customRouter = createMemoryRouter([
      {
        index: true,
        element: (
          <Personalization
            item={{ ...item, customizationId: 0 }}
            customizations={customizations}
            maxQuantity={maxQuantity}
            onChange={onChange}
            onChangeOrderItemImages={vi.fn()}
            onDeleteOrderItemImages={vi.fn()}
            index={index}
          />
        ),
      },
    ]);
    const { getByTestId, getByText } = render(
      <React.StrictMode>
        <RouterProvider router={customRouter} />
      </React.StrictMode>
    );

    const customization = getByTestId("order-item_customization");
    const customizationSelector = within(customization).getByTestId(
      "form-item_label-children"
    ).children[0];
    const sizeInput = getByTestId("order-item_size-input");

    expect(sizeInput).toBeDisabled();
    act(() => fireEvent.keyDown(customizationSelector, { key: "ArrowDown" }));
    act(() => getByText(customizations[0].title).click());
    expect(sizeInput).toBeEnabled();
  });
});
