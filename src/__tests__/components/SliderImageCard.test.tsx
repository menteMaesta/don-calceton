import { act } from "react";
import { render, waitFor } from "@testing-library/react";
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

  it("renders the SliderImageCard component without images", () => {
    const onRemove = vi.fn();
    const { getByTestId } = render(
      <BrowserRouter>
        <SliderImageCard
          elementId="1"
          images={[]}
          title="Slider Card"
          onRemove={onRemove}
          type="product"
          footer={<p>Footer</p>}
          route={ROUTES.PRODUCT.replace(":productId", "1")}
        />
      </BrowserRouter>
    );
    const defaultImage = getByTestId(
      SLIDER_IMAGE_CARD.image.replace("{id}", "default")
    );

    expect(defaultImage).toBeInTheDocument();
  });

  it("renders the next images images", async () => {
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

    const prevButton = getByTestId(SLIDER_IMAGE_CARD.prevImage);
    const nextButton = getByTestId(SLIDER_IMAGE_CARD.nextImage);

    expect(
      getByTestId(SLIDER_IMAGE_CARD.image.replace("{id}", `${IMAGES[0].id}`))
    ).toBeInTheDocument();
    act(() => prevButton.click());
    await waitFor(() =>
      expect(
        getByTestId(
          SLIDER_IMAGE_CARD.image.replace(
            "{id}",
            `${IMAGES[IMAGES.length - 1].id}`
          )
        )
      ).toBeInTheDocument()
    );
    act(() => nextButton.click());
    await waitFor(() =>
      expect(
        getByTestId(SLIDER_IMAGE_CARD.image.replace("{id}", `${IMAGES[0].id}`))
      ).toBeInTheDocument()
    );
    act(() => nextButton.click());
    await waitFor(() =>
      expect(
        getByTestId(SLIDER_IMAGE_CARD.image.replace("{id}", `${IMAGES[1].id}`))
      ).toBeInTheDocument()
    );
  });
});
