import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs, TabList, Tab, TabPanels } from "@reach/tabs";
import NewCustomizationsTab from "routes/NewProduct/NewCustomizationsTab";
import {
  NEW_CUSTOMIZATION,
  PRODUCT_PAGE,
  CUSTOMIZATION_SELECTORS,
  SELECTORS,
} from "helpers/test";

describe("NewCustomizationsTab", () => {
  test("renders empty state when no variants are provided", () => {
    const { getByTestId } = render(
      <Tabs>
        <TabList>
          <Tab>es.customizations.name</Tab>
        </TabList>

        <TabPanels>
          <NewCustomizationsTab
            customizations={[]}
            setCustomizations={() => {}}
          />
        </TabPanels>
      </Tabs>
    );

    const panel = getByTestId(PRODUCT_PAGE.customizationTabPanel);
    const emptyState = getByTestId(SELECTORS.emptyState);
    const newCustomizationButton = getByTestId(CUSTOMIZATION_SELECTORS.new);

    expect(panel).toBeInTheDocument();
    expect(emptyState).toBeInTheDocument();
    expect(newCustomizationButton).toBeInTheDocument();
  });

  test("renders customization cards when customizations are provided", () => {
    const customizations = [NEW_CUSTOMIZATION, NEW_CUSTOMIZATION];

    const { getByTestId } = render(
      <Tabs>
        <TabList>
          <Tab>es.customizations.name</Tab>
        </TabList>

        <TabPanels>
          <NewCustomizationsTab
            customizations={customizations}
            setCustomizations={() => {}}
          />
        </TabPanels>
      </Tabs>
    );

    const panel = getByTestId(PRODUCT_PAGE.customizationTabPanel);
    const customizationList = getByTestId(CUSTOMIZATION_SELECTORS.grid);
    const newCustomizationButton = getByTestId(CUSTOMIZATION_SELECTORS.new);

    expect(panel).toBeInTheDocument();
    expect(customizationList).toBeInTheDocument();
    expect(customizationList.children).toHaveLength(customizations.length);
    expect(newCustomizationButton).toBeInTheDocument();
  });

  test("calls setCustomizations when new customization button is clicked", async () => {
    const setCustomizations = vi.fn();
    const { getByTestId } = render(
      <Tabs>
        <TabList>
          <Tab>es.customizations.name</Tab>
        </TabList>

        <TabPanels>
          <NewCustomizationsTab
            customizations={[NEW_CUSTOMIZATION]}
            setCustomizations={setCustomizations}
          />
        </TabPanels>
      </Tabs>
    );

    const newCustomizationButton = getByTestId(CUSTOMIZATION_SELECTORS.new);
    await userEvent.click(newCustomizationButton);

    expect(setCustomizations).toHaveBeenCalled();
  });
});
