import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import VariantData from "components/VariantData";
import { VARIANT, IMAGE, VARIANT_SELECTORS } from "helpers/test";

describe("VariantData", () => {
  const variant = {
    ...VARIANT,
    images: [IMAGE],
  };

  const onEditDataMock = vi.fn();

  it("should render the VariantData component", () => {
    render(
      <BrowserRouter>
        <VariantData variant={variant} onEditData={onEditDataMock} />
      </BrowserRouter>
    );

    const variantEdit = screen.getByTestId(VARIANT_SELECTORS.edit);
    const variantName = screen.getByTestId(VARIANT_SELECTORS.dataName);
    const variantQuantity = screen.getByTestId(VARIANT_SELECTORS.dataQuantity);

    const variantNameEdit = screen.queryByTestId(VARIANT_SELECTORS.nameInput);
    const variantQuantityEdit = screen.queryByTestId(
      VARIANT_SELECTORS.quantityInput
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

    fireEvent.click(screen.getByTestId(VARIANT_SELECTORS.edit));

    const variantNameEdit = screen.queryByTestId(VARIANT_SELECTORS.nameInput);
    const variantQuantityEdit = screen.queryByTestId(
      VARIANT_SELECTORS.quantityInput
    );
    const variantName = screen.queryByTestId(VARIANT_SELECTORS.dataName);
    const variantQuantity = screen.queryByTestId(
      VARIANT_SELECTORS.dataQuantity
    );

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

    fireEvent.click(screen.getByTestId(VARIANT_SELECTORS.edit));
    const variantSave = screen.getByTestId(VARIANT_SELECTORS.save);

    expect(variantSave).toBeInTheDocument();
    fireEvent.click(variantSave);
    expect(onEditDataMock).toHaveBeenCalledTimes(1);
  });
});
