import React from "react";
import { render, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import SnackbarProvider from "react-simple-snackbar";
import { ROUTES } from "helpers/constants";
import ProductDetails from "routes/Products/Product";
import Customizations from "routes/Customizations/Customizations";
import {
  PRODUCT,
  VARIANT,
  IMAGE,
  CUSTOMIZATION,
  PRODUCT_PAGE,
  ELEMENT_CARD,
  SELECTORS,
} from "helpers/test";
import { es } from "helpers/strings";

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

    const productPage = await waitFor(() => getByTestId(PRODUCT_PAGE.name));
    const productData = getByTestId(
      PRODUCT_PAGE.productData.replace("{id}", `${product.id}`)
    );
    const productTabs = getByTestId(PRODUCT_PAGE.productTabs);
    const variantTabHeader = getByTestId(PRODUCT_PAGE.variantTabHeader);
    const variantTabPanel = getByTestId(PRODUCT_PAGE.variantTabPanel);
    const customizationTabHeader = getByTestId(
      PRODUCT_PAGE.customizationTabHeader
    );
    const customizationTabPanel = getByTestId(
      PRODUCT_PAGE.customizationTabPanel
    );
    const customizationTabContent = queryByTestId(
      PRODUCT_PAGE.customizationTabContent
    );

    expect(productPage).toBeInTheDocument();
    expect(productData).toBeInTheDocument();
    expect(productTabs).toBeInTheDocument();
    expect(variantTabHeader).toBeInTheDocument();
    expect(variantTabHeader).toHaveTextContent(es.variants.name);
    expect(variantTabPanel).toBeInTheDocument();
    expect(customizationTabHeader).toBeInTheDocument();
    expect(customizationTabHeader).toHaveTextContent(
      es.variants.personalizationOptions
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
      getByPlaceholderText(es.variants.search)
    );
    const newVariantButton = getByText(es.variants.new);
    const variantList = getByTestId(PRODUCT_PAGE.variantList);
    const variantCard = getByTestId(
      ELEMENT_CARD.elementCard
        .replace("{type}", "variant")
        .replace("{id}", `${product.variants[0].id}`)
    );

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
    const customizationTabPanel = getByTestId(
      PRODUCT_PAGE.customizationTabPanel
    );
    const variantTabPanel = getByTestId(PRODUCT_PAGE.variantTabPanel);
    const variantSearch = queryByText(es.variants.search);

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

    const emptyState = await waitFor(() => getByTestId(SELECTORS.emptyState));

    expect(emptyState).toBeInTheDocument();
    expect(emptyState).toHaveTextContent("No hay variantes");
  });
});
