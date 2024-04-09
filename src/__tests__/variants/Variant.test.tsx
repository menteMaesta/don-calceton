import React from "react";
import { render, waitFor } from "@testing-library/react";
import SnackbarProvider from "react-simple-snackbar";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "helpers/constants";
import Variant from "routes/Variants/Variant";

describe("VariantDetails", () => {
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
        name: "image.png",
        variantId: 2,
        createdAt: "2024-03-25T21:02:00.478+00:00",
        updatedAt: "2024-03-25T21:02:00.478+00:00",
      },
    ],
  };

  it("renders the component without errors", async () => {
    const routes = [
      {
        path: `${ROUTES.PRODUCT}${ROUTES.VARIANT}`,
        element: <Variant />,
        loader: () => variant,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: [
        `${ROUTES.PRODUCT}${ROUTES.VARIANT}`
          .replace(":productId", `${variant.productId}`)
          .replace(":variantId", `${variant.id}`),
      ],
    });

    const { getByTestId, getByText, getByLabelText } = render(
      <React.StrictMode>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </React.StrictMode>
    );

    const variantPage = await waitFor(() => getByTestId("variant-page"));
    const variantDetails = getByTestId(`variant-data_${variant.id}`);
    const sectionImages = getByText("Imagenes");
    const newImageButton = getByLabelText("Imagenes (PNG, JPG)");
    const imageList = getByTestId("image-list");
    const imageCard = getByTestId(`image-card_${variant.images[0].id}`);

    expect(variantPage).toBeInTheDocument();
    expect(variantDetails).toBeInTheDocument();
    expect(sectionImages).toBeInTheDocument();
    expect(newImageButton).toBeInTheDocument();

    expect(imageList).toBeInTheDocument();
    expect(imageList).toHaveClass(
      "grid grid-cols-1 gap-4",
      "sm:grid-cols-3 w-full",
      "pt-7 px-4"
    );
    expect(imageCard).toBeInTheDocument();
  });

  it("renders upload images button", async () => {
    const routes = [
      {
        path: `${ROUTES.PRODUCT}${ROUTES.VARIANT}`,
        element: <Variant />,
        loader: () => variant,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: [
        `${ROUTES.PRODUCT}${ROUTES.VARIANT}`
          .replace(":productId", `${variant.productId}`)
          .replace(":variantId", `${variant.id}`),
      ],
    });

    const { getByLabelText } = render(
      <React.StrictMode>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </React.StrictMode>
    );

    const newImageButton = await waitFor(() =>
      getByLabelText("Imagenes (PNG, JPG)")
    );

    expect(newImageButton).toBeInTheDocument();
    expect(newImageButton).toHaveAttribute("type", "file");
    expect(newImageButton).toHaveAttribute("name", "images");
    expect(newImageButton).toHaveAttribute("accept", ".jpg, .jpeg, .png");
    expect(newImageButton).toHaveAttribute("multiple", "");
    expect(newImageButton.parentElement).toHaveClass(
      "w-fit sticky top-12 z-10 mt-4"
    );
  });

  it("renders image cards correctly", async () => {
    const routes = [
      {
        path: `${ROUTES.PRODUCT}${ROUTES.VARIANT}`,
        element: <Variant />,
        loader: () => variant,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: [
        `${ROUTES.PRODUCT}${ROUTES.VARIANT}`
          .replace(":productId", `${variant.productId}`)
          .replace(":variantId", `${variant.id}`),
      ],
    });

    const { getByTestId, getByAltText } = render(
      <React.StrictMode>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </React.StrictMode>
    );

    const imageCard = await waitFor(() =>
      getByTestId(`image-card_${variant.images[0].id}`)
    );
    const imageElement = getByAltText(variant.images[0].name);

    expect(imageCard).toHaveClass(
      "max-h-64 bg-white",
      "flex justify-center",
      "rounded shadow",
      "relative"
    );
    expect(imageElement.getAttribute("src")).toContain(variant.images[0].name);
    expect(imageElement).toHaveClass("object-contain max-h-64");
    expect(imageElement.parentElement).not.toHaveClass();
  });
});
