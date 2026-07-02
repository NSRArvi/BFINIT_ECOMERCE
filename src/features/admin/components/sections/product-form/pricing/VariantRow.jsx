import { Controller, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { TableCell, TableRow } from "@/components/ui/table";
import { Field, FieldError } from "@/components/ui/field";
import VariantImageField from "../images/VariantImageField";

export default function VariantRow({
  form,
  pricingIndex,
  variantIndex,
  variant,
  currencySymbol,
}) {
  const variantPath = `pricing.${pricingIndex}.variants.${variantIndex}`;

  const useDefaultPricing = useWatch({
    control: form.control,
    name: `pricing.${pricingIndex}.use_default_pricing`,
  });

  const countryPrice = useWatch({
    control: form.control,
    name: `pricing.${pricingIndex}.price`,
  });

  const countryDiscountValue = useWatch({
    control: form.control,
    name: `pricing.${pricingIndex}.discount_value`,
  });

  const handleInputChange = (e, field) => {
    const val = e.target.value;
    field.onChange(val === "" ? undefined : Number(val));
  };

  return (
    <TableRow key={variant.id} className="hover:bg-background">
      <TableCell className="text-xs">{variant.labels}</TableCell>

      <TableCell>
        <Controller
          name={`${variantPath}.sku`}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                type="text"
                placeholder="e.g. S-RED"
                aria-invalid={fieldState.invalid}
                className="h-8 md:text-xs"
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </TableCell>

      <TableCell>
        <Controller
          name={`${variantPath}.price`}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="border-input focus-within:border-primary focus-within:ring-primary/20 flex h-8 w-full items-center gap-1.5 rounded-md border px-3 focus-within:ring-1">
                <span className="text-muted-foreground shrink-0 text-xs">
                  {currencySymbol}
                </span>
                <Input
                  {...field}
                  onChange={(e) => handleInputChange(e, field)}
                  value={
                    useDefaultPricing
                      ? (countryPrice ?? "")
                      : (field.value ?? "")
                  }
                  disabled={useDefaultPricing}
                  type="number"
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="0.00"
                  className="h-full min-w-1/4 flex-1 shrink-0 border-0 px-0 focus-visible:ring-0 md:text-xs"
                />
              </div>
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </TableCell>

      <TableCell>
        <Controller
          name={`${variantPath}.discount_value`}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="border-input focus-within:border-primary focus-within:ring-primary/20 flex h-8 w-full items-center gap-1.5 rounded-md border px-3 text-xs focus-within:ring-1">
                <span className="text-muted-foreground shrink-0">
                  {currencySymbol}
                </span>
                <Input
                  {...field}
                  onChange={(e) => handleInputChange(e, field)}
                  value={
                    useDefaultPricing
                      ? (countryDiscountValue ?? "")
                      : (field.value ?? "")
                  }
                  disabled={useDefaultPricing}
                  type="number"
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="0.00"
                  className="h-full min-w-1/4 flex-1 shrink-0 border-0 px-0 focus-visible:ring-0 md:text-xs"
                />
              </div>
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </TableCell>

      <TableCell>
        <Controller
          name={`${variantPath}.stock`}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                onChange={(e) => handleInputChange(e, field)}
                value={field.value ?? ""}
                type="number"
                placeholder="0"
                aria-invalid={fieldState.invalid}
                className="h-8 md:text-xs"
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </TableCell>

      <TableCell>
        <VariantImageField
          form={form}
          pricingIndex={pricingIndex}
          variantIndex={variantIndex}
        />
      </TableCell>

      <TableCell>
        <Controller
          name={`${variantPath}.is_active`}
          control={form.control}
          render={({ field }) => (
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
      </TableCell>
    </TableRow>
  );
}
