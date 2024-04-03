import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import VariantData from "components/VariantData";

describe("VariantData", () => {
  const variant = {
    id: 2,
    name: "Playera roja",
    productId: 4,
    quantity: 20,
    createdAt: "2024-03-25T21:02:00.452+00:00",
    updatedAt: "2024-03-25T21:02:00.452+00:00",
    images: [
      {
        id: 2,
        name: "image.png",
        variantId: 2,
        createdAt: "2024-03-25T21:02:00.478+00:00",
        updatedAt: "2024-03-25T21:02:00.478+00:00",
      },
    ],
  };

  const onEditDataMock = vi.fn();

  it("should render the VariantData component", () => {
    render(
      <BrowserRouter>
        <VariantData variant={variant} onEditData={onEditDataMock} />
      </BrowserRouter>
    );

    const variantEdit = screen.getByTestId("variant-data_edit");
    const variantName = screen.getByTestId("variant-data_name");
    const variantQuantity = screen.getByTestId("variant-data_quantity");

    const variantNameEdit = screen.queryByTestId("variant-data_name-input");
    const variantQuantityEdit = screen.queryByTestId(
      "variant-data_quantity-input"
    );

    expect(variantEdit).toBeInTheDocument();
    expect(variantName).toBeInTheDocument();
    expect(variantQuantity).toBeInTheDocument();
    expect(variantNameEdit).not.toBeInTheDocument();
    expect(variantQuantityEdit).not.toBeInTheDocument();
  });

  it("should render edit elements when edit button is pressed", () => {
    render(
      <BrowserRouter>
        <VariantData variant={variant} onEditData={onEditDataMock} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByTestId("variant-data_edit"));

    const variantNameEdit = screen.queryByTestId("variant-data_name-input");
    const variantQuantityEdit = screen.queryByTestId(
      "variant-data_quantity-input"
    );
    const variantName = screen.queryByTestId("variant-data_name");
    const variantQuantity = screen.queryByTestId("variant-data_quantity");

    expect(variantNameEdit).toBeInTheDocument();
    expect(variantQuantityEdit).toBeInTheDocument();
    expect(variantName).not.toBeInTheDocument();
    expect(variantQuantity).not.toBeInTheDocument();
  });

  it("should call onEditData when save button is pressed", () => {
    render(
      <BrowserRouter>
        <VariantData variant={variant} onEditData={onEditDataMock} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByTestId("variant-data_edit"));
    const variantSave = screen.getByTestId("variant-data_save");

    expect(variantSave).toBeInTheDocument();
    fireEvent.click(variantSave);
    expect(onEditDataMock).toHaveBeenCalledTimes(1);
  });
});
