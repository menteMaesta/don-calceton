import { useEffect, useLayoutEffect, useState, ChangeEvent } from "react";
import classnames from "classnames";
import { useActionData, useMatch } from "react-router-dom";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import { useSnackbar } from "react-simple-snackbar";
import { ErrorType, ProductBase } from "helpers/customTypes";
import { ROUTES } from "helpers/constants";
import { es } from "helpers/strings";
import EmptyState from "components/EmptyState";
import NewProductData from "components/NewProductData";
import Button from "components/Button";
import BottomBar from "components/BottomBar";

export default function ProductDetails() {
  const actionData = useActionData() as ErrorType & { id: string };
  const variantsTab = useMatch(ROUTES.NEW_PRODUCT);
  const customizationTab = useMatch(
    `${ROUTES.PRODUCT}${ROUTES.CUSTOMIZATIONS}`
  );
  const [openSnackbar] = useSnackbar();
  const [tabIndex, setTabIndex] = useState(0);
  const [newProduct, setNewProduct] = useState<ProductBase>({
    name: "",
    price: 0,
    wholesalePrice: 0,
    description: "",
  });

  useEffect(() => {
    if (actionData?.message) {
      openSnackbar(actionData?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  useLayoutEffect(() => {
    if (variantsTab) {
      setTabIndex(0);
    } else if (customizationTab) {
      setTabIndex(1);
    }
  }, [customizationTab, variantsTab]);

  const handleTabChange = (index: number) => {
    setTabIndex(index);
    // switch (index) {
    //   case 0:
    //     navigate(ROUTES.PRODUCT.replace(":productId", `${product.id}`));
    //     break;
    //   case 1:
    //     navigate(
    //       `${ROUTES.PRODUCT.replace(":productId", `${product.id}`)}${
    //         ROUTES.CUSTOMIZATIONS
    //       }`
    //     );
    //     break;
    // }
  };

  const handleNewProductChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setNewProduct((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className={classnames("w-full mt-14 px-4")}>
      <NewProductData data={newProduct} onChange={handleNewProductChange} />

      <Tabs
        className="w-full pt-4"
        index={tabIndex}
        onChange={handleTabChange}
        data-testid="product_tabs"
      >
        <TabList className="flex w-full border-b dark:border-slate-600">
          <Tab
            className="px-2 py-1 rounded-t dark:text-slate-200"
            data-testid="variant_tab-header"
          >
            {es.variants.name}
          </Tab>
          <Tab
            className="px-2 py-1 rounded-t dark:text-slate-200"
            data-testid="customization_tab-header"
          >
            {es.variants.personalizationOptions}
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel as="section" data-testid="variant_tab-panel">
            <div className="relative flex flex-col items-center w-full">
              <EmptyState name={es.variants.name} />
            </div>
          </TabPanel>
          <TabPanel as="section" data-testid="customization_tab-panel">
            <EmptyState name={es.customizations.name} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <BottomBar>
        <Button
          className={
            "bg-slate-200 hover:bg-slate-300 " +
            "active:bg-slate-300 " +
            "text-slate-800"
          }
          onClick={() => {}}
        >
          {es.cancel}
        </Button>
        <Button onClick={() => {}}>{es.save}</Button>
      </BottomBar>
    </div>
  );
}
