import { useEffect, useLayoutEffect, useState, MouseEvent } from "react";
import classnames from "classnames";
import {
  useLoaderData,
  useSubmit,
  useActionData,
  useNavigate,
  useMatch,
  Outlet,
} from "react-router-dom";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import { useSnackbar } from "react-simple-snackbar";
import { Product, ErrorType } from "helpers/customTypes";
import { ROUTES } from "helpers/constants";
import { es } from "helpers/strings";
import VariantCard from "components/VariantCard";
import SearchBar from "components/SearchBar";
import SticyLink from "components/StickyLink";
import ProductData from "components/ProductData";
import EmptyState from "components/EmptyState";

export default function ProductDetails() {
  const product = useLoaderData() as Product;
  const actionData = useActionData() as ErrorType & { id: string };
  const submit = useSubmit();
  const navigate = useNavigate();
  const variantsTab = useMatch(ROUTES.PRODUCT);
  const customizationTab = useMatch(
    `${ROUTES.PRODUCT}${ROUTES.CUSTOMIZATIONS}`
  );
  const [openSnackbar] = useSnackbar();
  const [variants, setVariants] = useState(product?.variants);
  const [tabIndex, setTabIndex] = useState(0);

  const onSearch = (search: string) => {
    if (search) {
      const filtered = product?.variants.filter((variant) =>
        variant.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
      setVariants(filtered);
    } else {
      setVariants(product?.variants);
    }
  };

  const handleRemove = (event: MouseEvent<HTMLElement>, variantId: string) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("products", "deleteVariant");
    formData.append("variantId", variantId);
    formData.append("productId", `${product.id}`);
    submit(formData, { method: "post" });
  };

  const handleTabChange = (index: number) => {
    setTabIndex(index);
    switch (index) {
      case 0:
        navigate(ROUTES.PRODUCT.replace(":productId", `${product.id}`));
        break;
      case 1:
        navigate(
          `${ROUTES.PRODUCT.replace(":productId", `${product.id}`)}${
            ROUTES.CUSTOMIZATIONS
          }`
        );
        break;
    }
  };

  useEffect(() => {
    if (actionData?.message) {
      openSnackbar(actionData?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  useEffect(() => {
    if (actionData?.statusText === "200") {
      setVariants((prev) =>
        prev.filter((variant) => `${variant.id}` !== actionData.id || "")
      );
    }
  }, [actionData]);

  useLayoutEffect(() => {
    if (variantsTab) {
      setTabIndex(0);
    } else if (customizationTab) {
      setTabIndex(1);
    }
  }, [customizationTab, variantsTab]);

  return (
    <div className={classnames("w-full mt-14 px-4")} data-testid="product-page">
      <ProductData product={product} />

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
              <SearchBar onSearch={onSearch} placeholder="Buscar variantes" />
              <SticyLink
                to={ROUTES.NEW_VARIANT.replace(":productId", `${product.id}`)}
                title={es.variants.new}
              />
              {variants && (
                <div
                  className={classnames(
                    "grid grid-cols-1 gap-4",
                    "sm:grid-cols-2 md:grid-cols-3",
                    "lg:grid-cols-5 w-full",
                    "mt-7 px-4"
                  )}
                  data-testid="variant-list"
                >
                  {variants.map((variant) => (
                    <VariantCard
                      key={variant.id}
                      variant={variant}
                      onRemove={handleRemove}
                    />
                  ))}
                </div>
              )}
              {variants.length === 0 && <EmptyState name={es.variants.name} />}
            </div>
          </TabPanel>
          <TabPanel as="section" data-testid="customization_tab-panel">
            <Outlet />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
