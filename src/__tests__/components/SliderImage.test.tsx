import { act } from "react";
import { render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SliderImage from "components/SliderImage";
import { IMAGES, SLIDER_IMAGE_CARD } from "helpers/test";

describe("SliderImage", () => {
  it("renders the SliderImage component with images", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <SliderImage images={IMAGES} type="product" />
      </BrowserRouter>
    );

    const prevButton = getByTestId(SLIDER_IMAGE_CARD.prevImage);
    const nextButton = getByTestId(SLIDER_IMAGE_CARD.nextImage);
    const firstImage = getByTestId(
      SLIDER_IMAGE_CARD.image.replace("{id}", `${IMAGES[0].id}`)
    );

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(firstImage).toBeInTheDocument();
  });

  it("renders SliderImage component without images", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <SliderImage images={[]} type="product" />
      </BrowserRouter>
    );
    const defaultImage = getByTestId(
      SLIDER_IMAGE_CARD.image.replace("{id}", "default")
    );

    expect(defaultImage).toBeInTheDocument();
  });

  it("renders the next image", async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <SliderImage images={IMAGES} type="product" />
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
