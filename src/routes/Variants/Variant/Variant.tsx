import { useEffect, useState } from "react";
import classnames from "classnames";
import {
  useLoaderData,
  useActionData,
  useSubmit,
  useNavigate,
  useMatch,
  Outlet,
} from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import { Tabs, TabList, Tab, TabPanels } from "@reach/tabs";
import { Variant, ErrorType, VariantBase } from "helpers/customTypes";
import { ROUTES } from "helpers/constants";
import VariantData from "components/VariantData";
import VariantImages from "routes/Variants/Variant/VaraintImages";

export default function VariantDetails() {
  const variant = useLoaderData() as Variant;
  const submit = useSubmit();
  const navigate = useNavigate();
  const imageTab = useMatch(`${ROUTES.PRODUCT}${ROUTES.VARIANT}`);
  const customizationTab = useMatch(
    `${ROUTES.PRODUCT}${ROUTES.VARIANT}${ROUTES.CUSTOMIZATIONS}`
  );
  const [openSnackbar] = useSnackbar();
  const actionData = useActionData() as ErrorType;
  const [tabIndex, setTabIndex] = useState(0);

  const onEdit = (data: VariantBase) => {
    const formData = new FormData();
    formData.append("variant", "editVariant");
    formData.append("productId", `${variant.productId}`);
    formData.append("variantId", `${variant.id}`);
    formData.append("data", JSON.stringify(data));
    submit(formData, { method: "post" });
  };

  useEffect(() => {
    if (actionData?.message) {
      openSnackbar(actionData?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  useEffect(() => {
    if (imageTab) {
      setTabIndex(0);
    } else if (customizationTab) {
      setTabIndex(1);
    }
  }, [customizationTab, imageTab]);

  const handleTabChange = (index: number) => {
    setTabIndex(index);
    switch (index) {
      case 0:
        navigate(
          `${ROUTES.PRODUCT.replace(
            ":productId",
            `${variant.productId}`
          )}${ROUTES.VARIANT.replace(":variantId", `${variant.id}`)}`
        );
        break;
      case 1:
        navigate(
          `${ROUTES.PRODUCT.replace(
            ":productId",
            `${variant.productId}`
          )}${ROUTES.VARIANT.replace(":variantId", `${variant.id}`)}${
            ROUTES.CUSTOMIZATIONS
          }`
        );
        break;
    }
  };

  return (
    <div className={classnames("w-full mt-14 px-4")} data-testid="variant-page">
      <VariantData variant={variant} onEditData={onEdit} />
      <Tabs className="w-full pt-4" index={tabIndex} onChange={handleTabChange}>
        <TabList className="flex w-full border-b">
          <Tab className="px-2 py-1 rounded-t">Imagenes</Tab>
          <Tab className="px-2 py-1 rounded-t">Opciones de personalización</Tab>
        </TabList>

        <TabPanels>
          <VariantImages variant={variant} />
          <Outlet />
        </TabPanels>
      </Tabs>
    </div>
  );
}
