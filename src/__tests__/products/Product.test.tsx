import React from "react";
import { render, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import SnackbarProvider from "react-simple-snackbar";
import { ROUTES } from "helpers/constants";
import ProductDetails from "routes/Products/Product";

describe("ProductDetails", () => {
  const product = {
    id: 4,
    name: "Playera",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    price: 100,
    variants: [
      {
        id: 3,
        name: "Playera azul",
        productId: 4,
        quantity: 20,
        images: [
          {
            id: 3,
            name: "znmjcbhhrote59v2jnivy7gu.png",
            variantId: 3,
          },
        ],
      },
    ],
  };

  it("renders product page without errors", async () => {
    const routes = [
      {
        path: ROUTES.PRODUCT,
        element: <ProductDetails />,
        loader: () => product,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: [`/products/${product.id}`],
    });

    const { getByTestId, getByText, getByPlaceholderText } = render(
      <React.StrictMode>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </React.StrictMode>
    );

    const productPage = await waitFor(() => getByTestId("product-page"));
    const productData = getByTestId(`product-data_${product.id}`);
    const sectionVariant = getByText("Variantes");
    const variantSearch = getByPlaceholderText("Buscar variantes");
    const newVariantButton = getByText("Nueva variante");
    const variantList = getByTestId("variant-list");
    const variantCard = getByTestId(`variant-link_${product.variants[0].id}`);

    expect(productPage).toBeInTheDocument();
    expect(productData).toBeInTheDocument();
    expect(sectionVariant).toBeInTheDocument();
    expect(variantSearch).toBeInTheDocument();
    expect(newVariantButton).toBeInTheDocument();
    expect(newVariantButton).toHaveAttribute(
      "href",
      ROUTES.NEW_VARIANT.replace(":productId", `${product.id}`)
    );
    expect(variantList).toBeInTheDocument();
    expect(variantList).toHaveClass(
      "grid grid-cols-1 gap-4",
      "sm:grid-cols-3 w-full",
      "mt-7 px-4"
    );
    expect(variantCard).toBeInTheDocument();
  });

  it("renders the empty state when there are no variants", async () => {
    const productWithoutVariants = {
      ...product,
      variants: [],
    };

    const routes = [
      {
        path: ROUTES.PRODUCT,
        element: <ProductDetails />,
        loader: () => productWithoutVariants,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: [`/products/${productWithoutVariants.id}`],
    });

    const { getByTestId } = render(
      <React.StrictMode>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </React.StrictMode>
    );

    const emptyState = await waitFor(() => getByTestId("empty-state"));

    expect(emptyState).toBeInTheDocument();
    expect(emptyState).toHaveTextContent("No hay variantes");
  });
});
