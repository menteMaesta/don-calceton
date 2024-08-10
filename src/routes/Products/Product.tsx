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
import { Product, ErrorType, NewVariantType } from "helpers/customTypes";
import { ROUTES, EMPTY_VARIANT } from "helpers/constants";
import { es } from "helpers/strings";
import { PRODUCT_PAGE, VARIANT_SELECTORS } from "helpers/test";
import VariantCard from "components/VariantCard";
import SearchBar from "components/SearchBar";
import ProductData from "components/ProductData";
import EmptyState from "components/EmptyState";
import Button from "components/Button";
import NewVariantCard from "src/components/NewVariantCard";

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
  const [newVariant, setNewVariant] = useState<NewVariantType[]>([]);

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

  const onSaveVariant = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("products", "createVariant");
    formData.append("productId", `${product.id}`);
    formData.append("data", JSON.stringify(newVariant[0]));
    for (const image of newVariant[0].images) {
      formData.append("images[]", image.file, image.name);
    }
    submit(formData, { method: "post", encType: "multipart/form-data" });
    setNewVariant([]);
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

  const onNewVariant = () => {
    setNewVariant([EMPTY_VARIANT]);
  };

  useEffect(() => {
    if (actionData?.message) {
      openSnackbar(actionData?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  useEffect(() => {
    if (actionData?.statusText === "200") {
      if (actionData?.action === "delete") {
        setVariants((prev) =>
          prev.filter((variant) => `${variant.id}` !== actionData.id || "")
        );
      } else if (product?.variants !== undefined) {
        setVariants([...product.variants]);
      }
    }
  }, [actionData, product.variants]);

  useLayoutEffect(() => {
    if (variantsTab) {
      setTabIndex(0);
    } else if (customizationTab) {
      setTabIndex(1);
    }
  }, [customizationTab, variantsTab]);

  return (
    <div
      className={classnames("w-full mt-14 px-4")}
      data-testid={PRODUCT_PAGE.name}
    >
      <ProductData product={product} />

      <Tabs
        className="w-full pt-4"
        index={tabIndex}
        onChange={handleTabChange}
        data-testid={PRODUCT_PAGE.productTabs}
      >
        <TabList className="flex w-full border-b dark:border-slate-600">
          <Tab
            className="px-2 py-1 rounded-t dark:text-slate-200"
            data-testid={PRODUCT_PAGE.variantTabHeader}
          >
            {es.variants.name}
          </Tab>
          <Tab
            className="px-2 py-1 rounded-t dark:text-slate-200"
            data-testid={PRODUCT_PAGE.customizationTabHeader}
          >
            {es.variants.personalizationOptions}
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel as="section" data-testid={PRODUCT_PAGE.variantTabPanel}>
            <div className="relative flex flex-col items-center w-full">
              <SearchBar onSearch={onSearch} placeholder={es.variants.search} />
              <Button
                data-testid={VARIANT_SELECTORS.newVariant}
                className={"!p-2 mt-4 " + "sticky top-12 z-10 "}
                onClick={onNewVariant}
                disabled={newVariant.length > 0}
              >
                {es.variants.new}
              </Button>

              {(variants.length > 0 || newVariant !== undefined) && (
                <div
                  className={classnames(
                    "grid grid-cols-1 gap-4",
                    "sm:grid-cols-2 md:grid-cols-3",
                    "lg:grid-cols-5 w-full",
                    "mt-7 px-4"
                  )}
                  data-testid={PRODUCT_PAGE.variantList}
                >
                  {variants.map((variant) => (
                    <VariantCard
                      key={variant.id}
                      variant={variant}
                      onRemove={handleRemove}
                    />
                  ))}
                  {newVariant.length > 0 && (
                    <NewVariantCard
                      index={0}
                      variant={newVariant[0]}
                      setVariants={setNewVariant}
                      onSave={onSaveVariant}
                    />
                  )}
                </div>
              )}
              {variants.length === 0 && <EmptyState name={es.variants.name} />}
            </div>
          </TabPanel>
          <TabPanel
            as="section"
            data-testid={PRODUCT_PAGE.customizationTabPanel}
          >
            <Outlet />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
