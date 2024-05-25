import { TabPanel } from "@reach/tabs";
import { Customization } from "helpers/customTypes";
import CustomizationCard from "routes/Variants/Variant/components/CustomizationCard";
import EmptyState from "src/components/EmptyState";
import Button from "src/components/Button";

type Props = {
  customizations?: Customization[];
};

export default function Customizations({ customizations = [] }: Props) {
  return (
    <TabPanel as="section" className="relative items-center w-full">
      <div className="w-full flex justify-center my-4">
        <Button className="!p-2 bg-slate-700">Nueva personalización</Button>
      </div>
      {customizations.length > 0 ? (
        customizations?.map((customization) => (
          <CustomizationCard
            key={customization.id}
            customization={customization}
          />
        ))
      ) : (
        <EmptyState name="personalizaciones" />
      )}
    </TabPanel>
  );
}
