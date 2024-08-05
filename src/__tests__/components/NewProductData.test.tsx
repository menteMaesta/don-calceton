import { ChangeEvent, useState } from "react";
import { render, fireEvent } from "@testing-library/react";
import { NEW_PRODUCT_PAGE } from "helpers/test";
import { es } from "helpers/strings";
import NewProductData from "components/NewProductData";

describe("NewProductData", () => {
  it("renders the component correctly", () => {
    const NewProductHeader = ({
      onChange,
    }: {
      onChange: (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => void;
    }) => {
      const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        wholesalePrice: "",
        description: "",
      });

      const handleNewProductChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        event.preventDefault();
        setNewProduct((prev) => ({
          ...prev,
          [event.target.name]: event.target.value,
        }));
        onChange(event);
      };
      return (
        <NewProductData data={newProduct} onChange={handleNewProductChange} />
      );
    };
    const { getByTestId } = render(<NewProductHeader onChange={vi.fn()} />);

    const nameInput = getByTestId(NEW_PRODUCT_PAGE.nameInput);
    const priceInput = getByTestId(NEW_PRODUCT_PAGE.priceInput);
    const wholesalePriceInput = getByTestId(
      NEW_PRODUCT_PAGE.wholesalePriceInput
    );
    const descriptionInput = getByTestId(NEW_PRODUCT_PAGE.descriptionInput);

    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toHaveAttribute(
      "placeholder",
      es.products.namePlaceholder
    );
    expect(priceInput).toBeInTheDocument();
    expect(priceInput).toHaveAttribute(
      "placeholder",
      es.products.pricePlaceholder
    );
    expect(wholesalePriceInput).toBeInTheDocument();
    expect(wholesalePriceInput).toHaveAttribute(
      "placeholder",
      es.products.wholesalePricePlaceholder
    );
    expect(descriptionInput).toBeInTheDocument();
    expect(descriptionInput).toHaveAttribute(
      "placeholder",
      es.products.descriptionPlaceholder
    );
  });

  it("triggers onChange event when input value changes", () => {
    const mockOnChange = vi.fn();
    const NewProductHeader = ({
      onChange,
    }: {
      onChange: (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => void;
    }) => {
      const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        wholesalePrice: "",
        description: "",
      });

      const handleNewProductChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        event.preventDefault();
        setNewProduct((prev) => ({
          ...prev,
          [event.target.name]: event.target.value,
        }));
        onChange(event);
      };
      return (
        <NewProductData data={newProduct} onChange={handleNewProductChange} />
      );
    };
    const { getByTestId } = render(
      <NewProductHeader onChange={mockOnChange} />
    );

    const nameInput = getByTestId(NEW_PRODUCT_PAGE.nameInput);
    fireEvent.change(nameInput, {
      target: { name: "name", value: "New Title" },
    });

    // Assert that the onChange function is called with the correct event
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: "New Title",
        }),
      })
    );
  });
});
