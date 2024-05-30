import { useState, useEffect, MouseEvent, Fragment } from "react";
import { useSnackbar } from "react-simple-snackbar";
import { useLoaderData, useActionData, useSubmit } from "react-router-dom";
import { Customization, ErrorType } from "helpers/customTypes";
import { EMPTY_CUSTOMIZATION } from "helpers/constants";
import CustomizationCard from "routes/Customizations/CustomizationCard";
import EmptyState from "components/EmptyState";
import Button from "components/Button";

export default function Customizations() {
  const submit = useSubmit();
  const [openSnackbar] = useSnackbar();
  const actionData = useActionData() as ErrorType;
  const customizations = useLoaderData() as Customization[];
  const [newCustomization, setNewCustomization] = useState<Customization>();

  useEffect(() => {
    if (actionData?.message) {
      openSnackbar(actionData?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  const onNewCustomization = () => {
    setNewCustomization(EMPTY_CUSTOMIZATION as Customization);
  };

  const onSaveCustomization = (newCustomization: Customization) => {
    const formData = new FormData();
    formData.append("action", "store");
    formData.append("title", newCustomization.title);
    formData.append("minSize", `${newCustomization.minSize}`);
    formData.append("maxSize", `${newCustomization.maxSize}`);
    submit(formData, { method: "post" });
    setNewCustomization(undefined);
  };

  const onEditCustomization = (customization: Customization) => {
    const formData = new FormData();
    formData.append("action", "update");
    formData.append("id", `${customization.id}`);
    formData.append("title", customization.title);
    formData.append("minSize", `${customization.minSize}`);
    formData.append("maxSize", `${customization.maxSize}`);
    submit(formData, { method: "post" });
  };

  const onRemoveCustomization = (
    event: MouseEvent<HTMLElement>,
    id: string
  ) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("action", "destroy");
    formData.append("id", id);
    submit(formData, { method: "post" });
  };

  const onCancelNewCustomization = () => {
    setNewCustomization(undefined);
  };

  return (
    <Fragment>
      <div
        className="w-full flex justify-center my-4"
        data-testid="customizations_tab-content"
      >
        <Button
          data-testid="new-customization"
          className="!p-2 bg-slate-700"
          onClick={onNewCustomization}
          disabled={newCustomization !== undefined}
        >
          Nueva personalización
        </Button>
      </div>
      {customizations?.length > 0 || newCustomization !== undefined ? (
        <div
          className="grid lg:grid-cols-2 gap-3"
          data-testid="customizations_grid"
        >
          {customizations?.map((customization) => (
            <CustomizationCard
              key={customization.id}
              customization={customization}
              onSaveData={onEditCustomization}
              onRemove={onRemoveCustomization}
            />
          ))}
          {newCustomization && (
            <CustomizationCard
              customization={newCustomization}
              onSaveData={onSaveCustomization}
              isNew
              onRemove={onCancelNewCustomization}
            />
          )}
        </div>
      ) : (
        <EmptyState name="personalizaciones" />
      )}
    </Fragment>
  );
}
