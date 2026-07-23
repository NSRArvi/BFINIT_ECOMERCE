import { useFieldArray, useWatch } from "react-hook-form";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import RateField from "./rates/RateField";
import { EMPTY_RATE } from "@/features/admin/utils/constants/emptyRate";

export default function ShippingRates({ form }) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "rates",
  });

  const zoneType = useWatch({
    control: form.control,
    name: "zone_type",
  });

  const handleAddRate = () => {
    append(EMPTY_RATE);
  };

  return (
    <FieldSet>
      <div className="flex items-center justify-between border-b px-5 py-4">
        <div>
          <FieldLegend>Shipping Rates</FieldLegend>
          <FieldDescription>
            Configure the shipping rates for this shipping zone
          </FieldDescription>
        </div>

        <Button
          onClick={handleAddRate}
          disabled={!zoneType}
          type="button"
          variant="outline"
          size="sm"
        >
          <Plus />
          Add Rate
        </Button>
      </div>

      <FieldGroup className="bg-muted/30">
        {zoneType ? (
          <RateField form={form} fields={fields} remove={remove} />
        ) : (
          <div className="col-span-2 flex flex-col items-center justify-center gap-1 py-10 text-center">
            <p className="text-sm font-medium">Select a zone type</p>
            <p className="text-muted-foreground text-xs">
              Choose a zone type before adding shipping rates
            </p>
          </div>
        )}
      </FieldGroup>
    </FieldSet>
  );
}
