import { render, waitFor, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SliderImageCard from "components/SliderImageCard";
import { ROUTES } from "helpers/constants";

describe("SliderImageCard", () => {
  const images = [
    { name: "image1.jpg", id: 1 },
    { name: "image2.jpg", id: 2 },
    { name: "image3.jpg", id: 3 },
  ];

  it("renders the SliderImageCard component with images", () => {
    const onRemove = vi.fn();
    const { getByTestId } = render(
      <BrowserRouter>
        <SliderImageCard
          elementId="1"
          images={images}
          title="Slider Card"
          onRemove={onRemove}
          type="product"
          footer={<p>Footer</p>}
          route={ROUTES.PRODUCT.replace(":productId", "1")}
        />
      </BrowserRouter>
    );

    const card = getByTestId("product-link_1");
    const prevButton = getByTestId("prev-image_button");
    const nextButton = getByTestId("next-image_button");
    const firstImage = getByTestId("slider-image_1");

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
    const defaultImage = getByTestId("slider-image_default");

    expect(defaultImage).toBeInTheDocument();
  });

  it("renders the next images images", async () => {
    const onRemove = vi.fn();
    const { getByTestId } = render(
      <BrowserRouter>
        <SliderImageCard
          elementId="1"
          images={images}
          title="Slider Card"
          onRemove={onRemove}
          type="product"
          footer={<p>Footer</p>}
          route={ROUTES.PRODUCT.replace(":productId", "1")}
        />
      </BrowserRouter>
    );

    const prevButton = getByTestId("prev-image_button");
    const nextButton = getByTestId("next-image_button");

    expect(getByTestId("slider-image_1")).toBeInTheDocument();
    act(() => prevButton.click());
    await waitFor(() =>
      expect(getByTestId("slider-image_3")).toBeInTheDocument()
    );
    act(() => nextButton.click());
    await waitFor(() =>
      expect(getByTestId("slider-image_1")).toBeInTheDocument()
    );
    act(() => nextButton.click());
    await waitFor(() =>
      expect(getByTestId("slider-image_2")).toBeInTheDocument()
    );
  });
});
