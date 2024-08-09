import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import SnackbarProvider from "react-simple-snackbar";
import { Tabs, TabList, Tab, TabPanels } from "@reach/tabs";
import {
  SELECTORS,
  NEW_VARIANT_CARD_ITEM,
  PRODUCT_PAGE,
  VARIANT_SELECTORS,
} from "helpers/test";
import { ROUTES } from "helpers/constants";
import NewVariantsTab from "routes/NewProduct/NewVariantsTab";

describe("NewVariantsTab", () => {
  test("renders empty state when no variants are provided", () => {
    const { getByTestId, queryByTestId } = render(
      <Tabs>
        <TabList>
          <Tab>es.variants.name</Tab>
        </TabList>

        <TabPanels>
          <NewVariantsTab variants={[]} setVariants={vi.fn()} />
        </TabPanels>
      </Tabs>
    );

    const emptyStateElement = getByTestId(SELECTORS.emptyState);
    const variantTab = getByTestId(PRODUCT_PAGE.variantTabPanel);
    const newVariantButton = getByTestId(VARIANT_SELECTORS.newVariant);

    expect(emptyStateElement).toBeInTheDocument();
    expect(variantTab).toBeInTheDocument();
    expect(newVariantButton).toBeInTheDocument();
    expect(queryByTestId(PRODUCT_PAGE.variantList)).not.toBeInTheDocument();
  });

  test("renders variant cards when variants are provided", () => {
    const variants = [NEW_VARIANT_CARD_ITEM, NEW_VARIANT_CARD_ITEM];
    const routes = [
      {
        path: ROUTES.NEW_PRODUCT,
        element: (
          <Tabs>
            <TabList>
              <Tab>es.variants.name</Tab>
            </TabList>

            <TabPanels>
              <NewVariantsTab variants={variants} setVariants={vi.fn()} />
            </TabPanels>
          </Tabs>
        ),
        action: () => true,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: [ROUTES.NEW_PRODUCT],
    });

    const { getByTestId } = render(
      <React.StrictMode>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </React.StrictMode>
    );

    const variantTab = getByTestId(PRODUCT_PAGE.variantTabPanel);
    const variantList = getByTestId(PRODUCT_PAGE.variantList);
    const newVariantButton = getByTestId(VARIANT_SELECTORS.newVariant);

    expect(variantTab).toBeInTheDocument();
    expect(variantList).toBeInTheDocument();
    expect(variantList.children).toHaveLength(variants.length);
    expect(newVariantButton).toBeInTheDocument();
  });

  test("calls setVariants when new variant button is clicked", async () => {
    const variants = [NEW_VARIANT_CARD_ITEM, NEW_VARIANT_CARD_ITEM];
    const setVariants = vi.fn();
    const routes = [
      {
        path: ROUTES.NEW_PRODUCT,
        element: (
          <Tabs>
            <TabList>
              <Tab>es.variants.name</Tab>
            </TabList>

            <TabPanels>
              <NewVariantsTab variants={variants} setVariants={setVariants} />
            </TabPanels>
          </Tabs>
        ),
        action: () => true,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: [ROUTES.NEW_PRODUCT],
    });

    const { getByTestId } = render(
      <React.StrictMode>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </React.StrictMode>
    );

    const newVariantButton = getByTestId(VARIANT_SELECTORS.newVariant);
    await userEvent.click(newVariantButton);

    expect(setVariants).toHaveBeenCalled();
  });
});
