import { ChangeEvent, useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProductForm from "components/ProductForm";
import { ProductBase } from "helpers/customTypes";

describe("ProductForm", () => {
  test("renders the form with initial data", () => {
    const data = {
      name: "Product 1",
      price: 10,
      wholesalePrice: 9,
      description: "Description",
    } as ProductBase;

    render(
      <BrowserRouter>
        <ProductForm
          data={data}
          onChange={vi.fn()}
          onSubmit={vi.fn()}
          cancelLink="/"
        />
      </BrowserRouter>
    );

    expect(screen.getByLabelText("Nombre")).toHaveValue("Product 1");
    expect(screen.getByLabelText("Precio base")).toHaveValue(10);
    expect(screen.getByLabelText("Precio a mayoreo")).toHaveValue(9);
    expect(screen.getByLabelText("Descripción")).toHaveValue("Description");
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

    fireEvent.change(screen.getByTestId("name_input"), {
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

    fireEvent.submit(screen.getByTestId("product-form"));

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

    expect(screen.getByLabelText("Nombre")).toHaveAttribute(
      "placeholder",
      "Playera"
    );
    expect(screen.getByLabelText("Precio base")).toHaveAttribute(
      "placeholder",
      "150.30"
    );
    expect(screen.getByLabelText("Precio a mayoreo")).toHaveAttribute(
      "placeholder",
      "130"
    );
    expect(screen.getByLabelText("Descripción")).toHaveAttribute(
      "placeholder",
      "de algodón cuello redondo holgada"
    );
  });
});
