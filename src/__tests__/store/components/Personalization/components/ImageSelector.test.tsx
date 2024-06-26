import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import SnackbarProvider from "react-simple-snackbar";
import ImageSelector from "storeComponents/Personalization/components/ImageSelector";
import { PERSONALIZATION_SELECTORS, FILE_CHIP_SELECTORS } from "helpers/test";

describe("ImageSelector", () => {
  const mockImages = [
    { size: 1, name: "image1.jpg" },
    { size: 2, name: "image2.jpg" },
  ];

  const mockOnDeleteOrderItemImages = vi.fn();

  const router = createMemoryRouter([
    {
      index: true,
      element: (
        <ImageSelector
          images={mockImages}
          onChangeOrderItemImages={vi.fn()}
          onDeleteOrderItemImages={mockOnDeleteOrderItemImages}
          index="1"
        />
      ),
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

  it("renders the component with images", () => {
    const wrapper = screen.getByTestId(PERSONALIZATION_SELECTORS.images);
    const fileUploader = screen.getByTestId(
      PERSONALIZATION_SELECTORS.imageUploader
    );
    const imageChips = screen.getAllByTestId(FILE_CHIP_SELECTORS.name);

    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveTextContent("Imagenes");
    expect(fileUploader).toBeInTheDocument();
    expect(imageChips).toHaveLength(2);
    imageChips.forEach((chip, index) => {
      expect(chip).toHaveTextContent(mockImages[index].name);
    });
  });

  it("calls onDeleteOrderItemImages when the delete button is clicked", () => {
    const deleteButton = screen.getAllByTestId(FILE_CHIP_SELECTORS.remove)[0];
    fireEvent.click(deleteButton);

    expect(mockOnDeleteOrderItemImages).toHaveBeenCalledTimes(1);
    expect(mockOnDeleteOrderItemImages).toHaveBeenCalledWith(0);
  });
});
