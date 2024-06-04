import { ChangeEvent, useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProductForm from "components/ProductForm";
import { ProductBase } from "helpers/customTypes";
import { PRODUCT, PRODUCT_DATA } from "helpers/test";
import { es } from "helpers/strings";

describe("ProductForm", () => {
  test("renders the form with initial data", () => {
    render(
      <BrowserRouter>
        <ProductForm
          data={PRODUCT}
          onChange={vi.fn()}
          onSubmit={vi.fn()}
          cancelLink="/"
        />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(es.name)).toHaveValue(PRODUCT.name);
    expect(
      screen.getByLabelText(es.products.basePrice.replace(": ", ""))
    ).toHaveValue(PRODUCT.price);
    expect(screen.getByLabelText(es.products.wholesalePriceLabel)).toHaveValue(
      PRODUCT.wholesalePrice
    );
    expect(screen.getByLabelText(es.products.description)).toHaveValue(
      PRODUCT.description
    );
  });

  test("calls onChange when input values change", async () => {
    type props = {
      onChange: (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => void;
    };
    const onChange = vi.fn();

    const NewProductForm = ({ onChange }: props) => {
      const [data, setData] = useState<ProductBase>();
      const handleChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        setData(
          (prev) =>
            ({
              ...prev,
              [event.target.name]: event.target.value,
            } as ProductBase)
        );
        onChange(event);
      };

      return (
        <ProductForm
          data={data as ProductBase}
          onChange={handleChange}
          onSubmit={vi.fn()}
          cancelLink="/"
        />
      );
    };

    render(
      <BrowserRouter>
        <NewProductForm onChange={onChange} />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByTestId(PRODUCT_DATA.nameInput), {
      target: { name: "name", value: "New Product" },
    });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          name: "name",
          value: "New Product",
        }),
      })
    );
  });

  test("calls onSubmit when form is submitted", () => {
    const onSubmit = vi.fn();

    render(
      <BrowserRouter>
        <ProductForm onChange={vi.fn()} onSubmit={onSubmit} cancelLink="/" />
      </BrowserRouter>
    );

    fireEvent.submit(screen.getByTestId(PRODUCT_DATA.form));

    expect(onSubmit).toHaveBeenCalled();
  });

  test("renders input placeholders correctly", () => {
    render(
      <BrowserRouter>
        <ProductForm
          data={undefined}
          onChange={vi.fn()}
          onSubmit={vi.fn()}
          cancelLink="/"
        />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(es.name)).toHaveAttribute(
      "placeholder",
      es.products.namePlaceholder
    );
    expect(
      screen.getByLabelText(es.products.basePrice.replace(": ", ""))
    ).toHaveAttribute("placeholder", es.products.pricePlaceholder);
    expect(
      screen.getByLabelText(es.products.wholesalePriceLabel)
    ).toHaveAttribute("placeholder", es.products.wholesalePricePlaceholder);
    expect(screen.getByLabelText(es.products.description)).toHaveAttribute(
      "placeholder",
      es.products.descriptionPlaceholder
    );
  });
});
