import { useFieldArray, useWatch } from "react-hook-form";
import { Plus } from "lucide-react";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import StateFields from "./location/StateFields";
import CityFields from "./location/CityFields";
import PostalCodeFields from "./location/PostalCodeFields";
import PostalRangeFields from "./location/PostalRangeFields";
import { EMPTY_LOCATION } from "@/features/admin/utils/constants/emptyLocation";

export default function ShippingLocation({ form }) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "locations",
  });

  const zoneType = useWatch({
    control: form.control,
    name: "zone_type",
  });

  const handleAddLocation = () => {
    append(EMPTY_LOCATION);
  };

  return (
    <FieldSet>
      <div className="flex items-center justify-between border-b px-5 py-4">
        <div>
          <FieldLegend>Locations</FieldLegend>
          <FieldDescription>
            Add the locations included in this shipping zone
          </FieldDescription>
        </div>

        <Button
          onClick={handleAddLocation}
          disabled={!zoneType || zoneType === "country_wide"}
          type="button"
          variant="outline"
          size="sm"
        >
          <Plus />
          Add location
        </Button>
      </div>

      <FieldGroup>
        {!zoneType && (
          <div className="col-span-2 flex flex-col items-center justify-center gap-1 py-10 text-center">
            <p className="text-sm font-medium">No zone type selected</p>
            <p className="text-muted-foreground text-xs">
              Choose a zone type to add matching locations
            </p>
          </div>
        )}

        {zoneType === "country_wide" && (
          <div className="col-span-2 px-5 py-4 text-center">
            <p className="text-muted-foreground text-xs">
              This zone applies to the entire country - no locations needed.
            </p>
          </div>
        )}

        {zoneType === "state" && (
          <StateFields form={form} fields={fields} remove={remove} />
        )}

        {zoneType === "city" && (
          <CityFields form={form} fields={fields} remove={remove} />
        )}

        {zoneType === "postal_code" && (
          <PostalCodeFields form={form} fields={fields} remove={remove} />
        )}

        {zoneType === "postal_code_range" && (
          <PostalRangeFields form={form} fields={fields} remove={remove} />
        )}
      </FieldGroup>
    </FieldSet>
  );
}
