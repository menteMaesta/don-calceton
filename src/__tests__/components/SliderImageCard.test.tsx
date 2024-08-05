import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SliderImageCard from "components/SliderImageCard";
import { ROUTES } from "helpers/constants";
import { IMAGES, ELEMENT_CARD, SLIDER_IMAGE_CARD } from "helpers/test";

describe("SliderImageCard", () => {
  it("renders the SliderImageCard component with images", () => {
    const onRemove = vi.fn();
    const { getByTestId } = render(
      <BrowserRouter>
        <SliderImageCard
          elementId="1"
          images={IMAGES}
          title="Slider Card"
          onRemove={onRemove}
          type="product"
          footer={<p>Footer</p>}
          route={ROUTES.PRODUCT.replace(":productId", "1")}
        />
      </BrowserRouter>
    );

    const card = getByTestId(
      ELEMENT_CARD.elementCard.replace("{type}", "product").replace("{id}", "1")
    );
    const prevButton = getByTestId(SLIDER_IMAGE_CARD.prevImage);
    const nextButton = getByTestId(SLIDER_IMAGE_CARD.nextImage);
    const firstImage = getByTestId(
      SLIDER_IMAGE_CARD.image.replace("{id}", `${IMAGES[0].id}`)
    );

    expect(card).toBeInTheDocument();
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(firstImage).toBeInTheDocument();
  });
});
