import { render, screen, fireEvent } from "@testing-library/react";
import VariantCard from "../components/VariantCard";
import { BrowserRouter } from "react-router-dom";

describe("VariantCard", () => {
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
        name: "first.png",
        variantId: 2,
        createdAt: "2024-03-25T21:02:00.478+00:00",
        updatedAt: "2024-03-25T21:02:00.478+00:00",
      },
    ],
  };

  const onRemoveMock = vi.fn();

  it("renders variant name, description and image", () => {
    render(
      <BrowserRouter>
        <VariantCard variant={variant} onRemove={onRemoveMock} />
      </BrowserRouter>
    );

    const variantName = screen.getByTestId(`variant-card-name_${variant.id}`);
    const variantQuantity = screen.getByTestId(
      `variant-quantity_${variant.id}`
    );
    const variantImage = screen.getByTestId(
      `variant-image_${variant.images[0].id}`
    );

    expect(
      screen.queryByTestId(`variant-name_${variant.id}`)
    ).not.toBeInTheDocument();
    expect(variantName).toBeInTheDocument();
    expect(variantName).toHaveTextContent(variant.name);
    expect(variantQuantity).toBeInTheDocument();
    expect(variantQuantity).toHaveTextContent(`stock: ${variant.quantity}`);
    expect(variantImage).toBeInTheDocument();
  });

  it("renders variant default image", () => {
    render(
      <BrowserRouter>
        <VariantCard
          variant={{ ...variant, images: [] }}
          onRemove={onRemoveMock}
        />
      </BrowserRouter>
    );
    const variantImage = screen.getByTestId("variant-image_default");

    expect(variantImage).toBeInTheDocument();
    expect(variantImage).toHaveAttribute("src", "/src/assets/default-pic.png");
  });

  it("renders previous and next buttons when variant has multiple images", () => {
    const currentVariant = {
      ...variant,
      images: [
        ...variant.images,
        { ...variant.images[0], id: 3, name: "second.png" },
      ],
    };
    render(
      <BrowserRouter>
        <VariantCard variant={currentVariant} onRemove={onRemoveMock} />
      </BrowserRouter>
    );

    const variantImage = screen.getByTestId(
      `variant-image_${currentVariant.images[0].id}`
    );
    const prevButton = screen.getByTestId("variant-card_prev-image");
    const nextButton = screen.getByTestId("variant-card_next-image");

    expect(variantImage).toBeInTheDocument();
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();

    expect(variantImage).toHaveAttribute(
      "src",
      expect.stringMatching(new RegExp(`${currentVariant.images[0].name}$`))
    );

    fireEvent.click(nextButton);

    expect(variantImage).toHaveAttribute(
      "src",
      expect.stringMatching(new RegExp(`${currentVariant.images[1].name}$`))
    );

    fireEvent.click(prevButton);

    expect(variantImage).toHaveAttribute(
      "src",
      expect.stringMatching(new RegExp(`${currentVariant.images[0].name}$`))
    );
  });

  it("calls onRemove when remove button is clicked", () => {
    render(
      <BrowserRouter>
        <VariantCard variant={variant} onRemove={onRemoveMock} />
      </BrowserRouter>
    );

    const removeButton = screen.getByTestId(`variant-remove_${variant.id}`);
    fireEvent.click(removeButton);
    expect(onRemoveMock).toHaveBeenCalledTimes(1);
  });
});
