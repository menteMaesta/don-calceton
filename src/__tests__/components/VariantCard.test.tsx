import { render, screen, fireEvent } from "@testing-library/react";
import VariantCard from "components/VariantCard";
import { BrowserRouter } from "react-router-dom";
import {
  VARIANT,
  IMAGE,
  VARIANT_SELECTORS,
  SLIDER_IMAGE_CARD,
  ELEMENT_CARD,
} from "src/helpers/test";

describe("VariantCard", () => {
  const variant = {
    ...VARIANT,
    images: [IMAGE],
  };

  const onRemoveMock = vi.fn();

  it("renders variant name, description and image", () => {
    render(
      <BrowserRouter>
        <VariantCard variant={variant} onRemove={onRemoveMock} />
      </BrowserRouter>
    );

    const variantName = screen.getByTestId(
      VARIANT_SELECTORS.name.replace("{id}", `${variant.id}`)
    );
    const variantQuantity = screen.getByTestId(
      VARIANT_SELECTORS.quantity.replace("{id}", `${variant.id}`)
    );
    const variantImage = screen.getByTestId(
      SLIDER_IMAGE_CARD.image.replace("{id}", `${variant.images[0].id}`)
    );

    expect(
      screen.queryByTestId(
        ELEMENT_CARD.cardName
          .replace("{type}", "variant")
          .replace("{id}", `${variant.id}`)
      )
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
    const variantImage = screen.getByTestId(
      SLIDER_IMAGE_CARD.image.replace("{id}", "default")
    );

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
      SLIDER_IMAGE_CARD.image.replace("{id}", `${variant.images[0].id}`)
    );
    const prevButton = screen.getByTestId(SLIDER_IMAGE_CARD.prevImage);
    const nextButton = screen.getByTestId(SLIDER_IMAGE_CARD.nextImage);

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

    const removeButton = screen.getByTestId(
      ELEMENT_CARD.remove
        .replace("{type}", "variant")
        .replace("{id}", `${variant.id}`)
    );
    fireEvent.click(removeButton);
    expect(onRemoveMock).toHaveBeenCalledTimes(1);
  });
});
