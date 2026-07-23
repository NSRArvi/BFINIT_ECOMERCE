import { Controller, useWatch } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import useSelectedStore from "@/hooks/useSelectedStore";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const FEE_TYPE = [
  { value: "flat", label: "Flat" },
  //   { value: "weight_based", label: "Weight Based" },
  { value: "order_value_based", label: "Order Value Based" },
];

export default function RateRow({ form, fields, remove, index }) {
  const { activeStore } = useSelectedStore();

  const { data } = useGetQuery({
    endpoint: `/api/v1/store/${activeStore?.id}`,
    enabled: !!activeStore?.id,
    isTokenRequired: true,
    queryKey: ["store", activeStore?.id],
  });

  const selectedCountryId = useWatch({
    control: form.control,
    name: "country_id",
  });

  const feeType = useWatch({
    control: form.control,
    name: `rates.${index}.fee_type`,
  });

  const countries = data?.data?.countries || [];

  const selectedCountryInfo = countries.find(
    (country) => country.id === selectedCountryId,
  );

  return (
    <div className="bg-background space-y-4 rounded-lg border p-3">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm font-medium">
          Rate {index + 1}
        </p>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          onClick={() => remove(index)}
          disabled={fields.length === 1}
          aria-label="Remove rate"
        >
          <Trash2 className="text-destructive size-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-5">
        <Controller
          name={`rates.${index}.name`}
          control={form.control}
          render={({ field: stateField, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={stateField.name}>
                Shipping Rate Name
                <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                {...stateField}
                placeholder="Enter a shipping rate name"
                id={stateField.name}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name={`rates.${index}.fee_type`}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Fee Type <span className="text-destructive">*</span>
              </FieldLabel>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                >
                  <SelectValue placeholder="Select a fee type" />
                </SelectTrigger>

                <SelectContent>
                  {FEE_TYPE.map((feeType) => (
                    <SelectItem key={feeType.value} value={feeType.value}>
                      {feeType.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <Controller
          name={`rates.${index}.base_fee`}
          control={form.control}
          render={({ field: stateField, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className={cn(feeType !== "order_value_based" && "col-span-2")}
            >
              <FieldLabel htmlFor={stateField.name}>
                Base Fee
                <span className="text-destructive">*</span>
              </FieldLabel>
              <div
                aria-invalid={fieldState.invalid}
                className="border-input focus-within:border-primary focus-within:ring-primary/20 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex h-9 w-full items-center gap-1.5 rounded-md border px-3 text-sm focus-within:ring-1"
              >
                <span className="text-muted-foreground shrink-0">
                  {selectedCountryInfo?.abbreviation}
                </span>
                <Input
                  {...stateField}
                  type="number"
                  placeholder="Enter an amount"
                  id={stateField.name}
                  className="h-full min-w-1/4 flex-1 shrink-0 border-0 px-0 focus-visible:ring-0"
                />
              </div>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {feeType === "order_value_based" && (
          <Controller
            name={`rates.${index}.free_delivery_min_order`}
            control={form.control}
            render={({ field: stateField, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={stateField.name}>
                  Free Delivery Threshold
                  <span className="text-destructive">*</span>
                </FieldLabel>

                <div
                  aria-invalid={fieldState.invalid}
                  className="border-input focus-within:border-primary focus-within:ring-primary/20 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex h-9 w-full items-center gap-1.5 rounded-md border px-3 text-sm focus-within:ring-1"
                >
                  <span className="text-muted-foreground shrink-0">
                    {selectedCountryInfo?.abbreviation}
                  </span>
                  <Input
                    {...stateField}
                    type="number"
                    placeholder="Enter the minimum order amount"
                    id={stateField.name}
                    className="h-full min-w-1/4 flex-1 shrink-0 border-0 px-0 focus-visible:ring-0"
                  />
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        )}

        <Controller
          name={`rates.${index}.estimated_min_days`}
          control={form.control}
          render={({ field: stateField, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={stateField.name}>
                Minimum Delivery Days
                <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                {...stateField}
                type="number"
                placeholder="e.g. 2"
                id={stateField.name}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name={`rates.${index}.estimated_max_days`}
          control={form.control}
          render={({ field: stateField, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={stateField.name}>
                Maximum Delivery Days
                <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                {...stateField}
                type="number"
                placeholder="e.g. 5"
                id={stateField.name}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
    </div>
  );
}
