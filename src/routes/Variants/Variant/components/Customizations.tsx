import { TabPanel } from "@reach/tabs";
import { Customization } from "helpers/customTypes";
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
          <div
            key={customization.id}
            className="bg-white px-2 py-1 mb-3 rounded"
          >
            <p className="font-bold">{customization.title}</p>
            <p>Imagen min: {customization.minSize} cm</p>
            <p>Imagen max: {customization.maxSize} cm</p>
          </div>
        ))
      ) : (
        <EmptyState name="personalizaciones" />
      )}
    </TabPanel>
  );
}
