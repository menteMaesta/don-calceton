import { render, fireEvent } from "@testing-library/react";
import OrderCardFooter from "routes/Orders/OrderCardFooter";
import { OrderType } from "helpers/customTypes";
import { ORDER_SELECTORS } from "helpers/test";
import { es } from "helpers/strings";

describe("OrderCardFooter", () => {
  const order = {
    id: 1,
    customizationId: 1,
    variantId: 1,
    imageSize: 52,
    status: "IN_PROCESS",
    quantity: 1,
    images: [
      {
        id: 1,
        name: "image.jpg",
        orderId: 1,
      },
    ],
    customization: {
      title: "centro",
    },
    variant: {
      name: "Playera rosa",
      images: [
        {
          id: 1,
          name: "image2.jpg",
          variantId: 1,
        },
      ],
    },
  } as OrderType;

  const onDownloadImages = vi.fn();

  it("should render the component correctly", () => {
    const { getByText, getByTestId } = render(
      <OrderCardFooter order={order} onDownloadImages={onDownloadImages} />
    );

    const position = getByTestId(ORDER_SELECTORS.position);
    const imageSize = getByTestId(ORDER_SELECTORS.imageSize);
    const status = getByTestId(ORDER_SELECTORS.status);
    const download = getByTestId(ORDER_SELECTORS.download);

    // Assert that the component renders correctly
    expect(position).toBeInTheDocument();
    expect(position).toHaveTextContent(es.orders.position);
    expect(imageSize).toBeInTheDocument();
    expect(imageSize).toHaveTextContent(es.orders.imageSize);
    expect(status).toBeInTheDocument();
    expect(status).toHaveTextContent(es.orders.statusLabel);
    expect(download).toBeInTheDocument();
    expect(download).toHaveTextContent(es.orders.downloadImages);

    expect(getByText(order.customization.title)).toBeInTheDocument();
    expect(getByText(`${order.imageSize} cm`)).toBeInTheDocument();
    expect(getByText(es.orders.status[order.status])).toBeInTheDocument();
  });

  it("should call onDownloadImages when the button is clicked", () => {
    const { getByTestId } = render(
      <OrderCardFooter order={order} onDownloadImages={onDownloadImages} />
    );

    const download = getByTestId(ORDER_SELECTORS.download);

    // Simulate a click event on the button
    fireEvent.click(download);

    // Assert that onDownloadImages is called with the correct arguments
    expect(onDownloadImages).toHaveBeenCalledWith(order.images, order.id);
  });
});
