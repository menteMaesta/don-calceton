import React from "react";
import { render, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import SnackbarProvider from "react-simple-snackbar";
import { ROUTES } from "helpers/constants";
import ProductDetails from "routes/Products/Product";
import Customizations from "routes/Customizations/Customizations";
import { PRODUCT, VARIANT, IMAGE, CUSTOMIZATION } from "helpers/test";

describe("ProductDetails", () => {
  const product = {
    ...PRODUCT,
    variants: [
      {
        ...VARIANT,
        images: [IMAGE],
        customizations: [CUSTOMIZATION],
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
      initialEntries: [ROUTES.PRODUCT.replace(":productId", `${product.id}`)],
    });

    const { getByTestId, queryByTestId } = render(
      <React.StrictMode>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </React.StrictMode>
    );

    const productPage = await waitFor(() => getByTestId("product-page"));
    const productData = getByTestId(`product-data_${product.id}`);
    const productTabs = getByTestId("product_tabs");
    const variantTabHeader = getByTestId("variant_tab-header");
    const variantTabPanel = getByTestId("variant_tab-panel");
    const customizationTabHeader = getByTestId("customization_tab-header");
    const customizationTabPanel = getByTestId("customization_tab-panel");
    const customizationTabContent = queryByTestId("customizations_tab-content");

    expect(productPage).toBeInTheDocument();
    expect(productData).toBeInTheDocument();
    expect(productTabs).toBeInTheDocument();
    expect(variantTabHeader).toBeInTheDocument();
    expect(variantTabHeader).toHaveTextContent("Variantes");
    expect(variantTabPanel).toBeInTheDocument();
    expect(customizationTabHeader).toBeInTheDocument();
    expect(customizationTabHeader).toHaveTextContent(
      "Opciones de personalización"
    );
    expect(customizationTabPanel).toHaveAttribute("tabindex", "-1");
    expect(customizationTabPanel).toHaveAttribute("hidden");
    expect(customizationTabContent).not.toBeInTheDocument();
  });

  it("renders variant tab without errors", async () => {
    const routes = [
      {
        path: ROUTES.PRODUCT,
        element: <ProductDetails />,
        loader: () => product,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: [ROUTES.PRODUCT.replace(":productId", `${product.id}`)],
    });

    const { getByTestId, getByText, getByPlaceholderText } = render(
      <React.StrictMode>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </React.StrictMode>
    );

    const variantSearch = await waitFor(() =>
      getByPlaceholderText("Buscar variantes")
    );
    const newVariantButton = getByText("Nueva variante");
    const variantList = getByTestId("variant-list");
    const variantCard = getByTestId(`variant-link_${product.variants[0].id}`);

    expect(variantSearch).toBeInTheDocument();
    expect(newVariantButton).toBeInTheDocument();
    expect(newVariantButton).toHaveAttribute(
      "href",
      ROUTES.NEW_VARIANT.replace(":productId", `${product.id}`)
    );
    expect(variantList).toBeInTheDocument();
    expect(variantList).toHaveClass(
      "grid grid-cols-1 gap-4",
      "sm:grid-cols-2",
      "md:grid-cols-3",
      "lg:grid-cols-5",
      "w-full",
      "mt-7 px-4"
    );
    expect(variantCard).toBeInTheDocument();
  });

  it("renders customizations tab without errors", async () => {
    const routes = [
      {
        path: ROUTES.PRODUCT,
        element: <ProductDetails />,
        loader: () => product,
        children: [
          {
            path: `${ROUTES.PRODUCT}${ROUTES.CUSTOMIZATIONS}`,
            element: <Customizations />,
            loader: () => [CUSTOMIZATION],
            action: () => true,
          },
        ],
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: [
        ROUTES.PRODUCT.replace(
          ":productId",
          `${product.id}${ROUTES.CUSTOMIZATIONS}`
        ),
      ],
    });

    const { getByTestId, queryByText } = render(
      <React.StrictMode>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </React.StrictMode>
    );

    const customizationTabHeader = await waitFor(() =>
      getByTestId("customization_tab-header")
    );
    const customizationTabPanel = getByTestId("customization_tab-panel");
    const variantTabPanel = getByTestId("variant_tab-panel");
    const variantSearch = queryByText("Buscar variantes");

    expect(variantTabPanel).toHaveAttribute("tabindex", "-1");
    expect(variantTabPanel).toHaveAttribute("hidden");
    expect(variantSearch).not.toBeInTheDocument();

    expect(customizationTabHeader).toHaveAttribute("aria-selected", "true");
    expect(customizationTabHeader).toHaveAttribute("data-selected");
    expect(customizationTabPanel).not.toHaveAttribute("tabindex", "-1");
    expect(customizationTabPanel).not.toHaveAttribute("hidden");
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
      initialEntries: [
        ROUTES.PRODUCT.replace(":productId", `${productWithoutVariants.id}`),
      ],
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
