import {
  useEffect,
  useLayoutEffect,
  useState,
  ChangeEvent,
  useMemo,
} from "react";
import classnames from "classnames";
import {
  useActionData,
  useMatch,
  useSubmit,
  useNavigate,
} from "react-router-dom";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import { useSnackbar } from "react-simple-snackbar";
import { ErrorType, NewVariantType } from "helpers/customTypes";
import { ROUTES } from "helpers/constants";
import { es } from "helpers/strings";
import EmptyState from "components/EmptyState";
import NewProductData from "components/NewProductData";
import Button from "components/Button";
import BottomBar from "components/BottomBar";
import NewVariantsTab from "./NewVariantsTab";

export default function ProductDetails() {
  const submit = useSubmit();
  const actionData = useActionData() as ErrorType & { id: string };
  const navigate = useNavigate();
  const variantsTab = useMatch(ROUTES.NEW_PRODUCT);
  const customizationTab = useMatch(
    `${ROUTES.PRODUCT}${ROUTES.CUSTOMIZATIONS}`
  );
  const [openSnackbar] = useSnackbar();
  const [tabIndex, setTabIndex] = useState(0);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    wholesalePrice: "",
    description: "",
  });
  const [variants, setVariants] = useState<NewVariantType[]>([]);
  const disableSave = useMemo(() => {
    const hasEmptyVariants = variants.some((variant) => {
      if (
        !variant.name ||
        !variant.quantity ||
        variant.quantity.includes(".") ||
        !variant.images.length
      ) {
        return true;
      }
    });
    return (
      !newProduct.name ||
      newProduct.price === "" ||
      newProduct.wholesalePrice === "" ||
      !newProduct.description ||
      hasEmptyVariants
    );
  }, [newProduct, variants]);

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

  const handleNewProductChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setNewProduct((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("action", "createProduct");
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("wholesalePrice", newProduct.wholesalePrice);
    formData.append("description", newProduct.description);
    formData.append("variants", JSON.stringify(variants)); // TODO: Separate images
    for (let i = 0; i < variants.length; i++) {
      for (const image of variants[i].images) {
        formData.append(`images${i}[]`, image.file, image.name);
      }
    }
    submit(formData, { method: "post", encType: "multipart/form-data" });
  };

  return (
    <div
      data-testid="new-product-view"
      className={classnames("w-full mt-14 px-4")}
    >
      <NewProductData data={newProduct} onChange={handleNewProductChange} />

      <Tabs
        className="w-full pt-4 pb-10"
        index={tabIndex}
        onChange={(index) => setTabIndex(index)}
        data-testid="new-product_tabs"
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
          <NewVariantsTab variants={variants} setVariants={setVariants} />

          <TabPanel as="section" data-testid="customization_tab-panel">
            <EmptyState name={es.customizations.name} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <BottomBar>
        <Button
          data-testid="new-product-cancel"
          className={
            "bg-slate-200 hover:bg-slate-300 " +
            "active:bg-slate-300 " +
            "text-slate-800"
          }
          onClick={() => navigate(ROUTES.DASHBOARD, { replace: true })}
        >
          {es.cancel}
        </Button>
        <Button
          data-testid="new-product-save"
          onClick={handleSave}
          disabled={disableSave}
        >
          {es.save}
        </Button>
      </BottomBar>
    </div>
  );
}
