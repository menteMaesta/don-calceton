import { TabPanel } from "@reach/tabs";
import { es } from "helpers/strings";
import { Customization } from "helpers/customTypes";
import { PRODUCT_PAGE, CUSTOMIZATION_SELECTORS } from "helpers/test";
import EmptyState from "components/EmptyState";
import Button from "components/Button";
import NewCustomizationCard from "components/NewCustomizationCard";

type Props = {
  customizations: Customization[];
  setCustomizations: (value: React.SetStateAction<Customization[]>) => void;
};

export default function NewCustomizationsTab({
  customizations,
  setCustomizations,
}: Props) {
  return (
    <TabPanel as="section" data-testid={PRODUCT_PAGE.customizationTabPanel}>
      <div className="relative flex flex-col items-center w-full">
        <Button
          data-testid={CUSTOMIZATION_SELECTORS.new}
          className={"!p-2 bg-slate-700 mt-4 " + "sticky top-12 z-10 "}
          onClick={() =>
            setCustomizations((prev) => [
              ...prev,
              { title: "", maxSize: "", minSize: "" },
            ])
          }
        >
          {es.customizations.new}
        </Button>
        {customizations?.length > 0 ? (
          <div
            className="grid lg:grid-cols-2 gap-3 w-full mt-7"
            data-testid={CUSTOMIZATION_SELECTORS.grid}
          >
            {customizations.map((customization, index) => (
              <NewCustomizationCard
                key={index}
                index={index}
                customization={customization}
                setCustomizations={setCustomizations}
              />
            ))}
          </div>
        ) : (
          <EmptyState name={es.customizations.name} />
        )}
      </div>
    </TabPanel>
  );
}
