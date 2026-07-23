import { Controller } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import useSelectedStore from "@/hooks/useSelectedStore";
import { Switch } from "@/components/ui/switch";
import { ZONE_TYPES } from "@/features/admin/utils/constants/zoneTypes";
import { EMPTY_LOCATION } from "@/features/admin/utils/constants/emptyLocation";
import { EMPTY_RATE } from "@/features/admin/utils/constants/emptyRate";

export default function ShippingDetails({ form }) {
  const { activeStore } = useSelectedStore();

  const { data, isLoading } = useGetQuery({
    endpoint: `/api/v1/store/${activeStore?.id}`,
    enabled: !!activeStore?.id,
    isTokenRequired: true,
    queryKey: ["store", activeStore?.id],
  });

  const countries = data?.data?.countries || [];

  const handleZoneTypeChange = (newZoneType) => {
    form.setValue("zone_type", newZoneType);
    form.clearErrors("locations");

    const locations = newZoneType === "country_wide" ? [] : [EMPTY_LOCATION];
    const rates = newZoneType ? [EMPTY_RATE] : [];

    form.setValue("rates", rates);
    form.setValue("locations", locations);
  };

  return (
    <FieldSet>
      <div className="border-b px-5 py-4">
        <FieldLegend>Zone Details</FieldLegend>
        <FieldDescription>
          Configure the basic settings for this shipping zone
        </FieldDescription>
      </div>

      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Zone Name <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Enter a zone name"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="country_id"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Country <span className="text-destructive">*</span>
              </FieldLabel>
              <Select
                name={field.name}
                disabled={isLoading}
                value={field.value ? String(field.value) : ""}
                onValueChange={(value) => field.onChange(Number(value))}
              >
                <SelectTrigger
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                >
                  <SelectValue
                    placeholder={
                      isLoading ? "Loading countries..." : "Select a country"
                    }
                  />
                </SelectTrigger>

                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.id} value={String(country.id)}>
                      {country.flag_emoji} {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <Controller
          name="zone_type"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Zone Type <span className="text-destructive">*</span>
              </FieldLabel>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={(value) => handleZoneTypeChange(value)}
              >
                <SelectTrigger
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                >
                  <SelectValue placeholder="Select a zone type" />
                </SelectTrigger>

                <SelectContent>
                  {ZONE_TYPES.map((zoneType) => (
                    <SelectItem key={zoneType.value} value={zoneType.value}>
                      {zoneType.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <Controller
          name="priority"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Priority <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                {...field}
                type="number"
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="e.g. 1"
              />
              <FieldDescription>
                Lower numbers take precedence when zones overlap
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <FieldSeparator />

      <FieldGroup>
        <Controller
          name="is_active"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} orientation="horizontal">
              <FieldContent className="w-full gap-1">
                <FieldLabel htmlFor={field.name}>Active</FieldLabel>
                <FieldDescription>
                  Enable this zone for shipping calculations
                </FieldDescription>
              </FieldContent>

              <div className="w-fit">
                <Switch
                  id={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </div>
            </Field>
          )}
        />

        <Controller
          name="is_default"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} orientation="horizontal">
              <FieldContent className="w-full gap-1">
                <FieldLabel htmlFor={field.name}>Default Zone</FieldLabel>
                <FieldDescription>
                  Used when no other shipping zone matches
                </FieldDescription>
              </FieldContent>

              <div className="w-fit">
                <Switch
                  id={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </div>
            </Field>
          )}
        />
      </FieldGroup>
    </FieldSet>
  );
}
