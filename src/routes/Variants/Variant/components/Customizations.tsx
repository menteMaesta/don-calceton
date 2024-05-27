import { useState, MouseEvent } from "react";
import { TabPanel } from "@reach/tabs";
import { useLoaderData, useSubmit } from "react-router-dom";
import { Customization } from "helpers/customTypes";
import { EMPTY_CUSTOMIZATION } from "helpers/constants";
import CustomizationCard from "routes/Variants/Variant/components/CustomizationCard";
import EmptyState from "src/components/EmptyState";
import Button from "src/components/Button";

export default function Customizations() {
  const submit = useSubmit();
  const customizations = useLoaderData() as Customization[];
  const [newCustomization, setNewCustomization] = useState<Customization>();

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
    <TabPanel as="section" className="relative items-center w-full">
      <div className="w-full flex justify-center my-4">
        <Button
          className="!p-2 bg-slate-700"
          onClick={onNewCustomization}
          disabled={newCustomization !== undefined}
        >
          Nueva personalización
        </Button>
      </div>
      {customizations?.length > 0 ? (
        <div className="grid lg:grid-cols-2 gap-3">
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
    </TabPanel>
  );
}
