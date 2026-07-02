import { Controller } from "react-hook-form";
import { Crown } from "lucide-react";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function FlashSale({ form }) {
  const isFlashSaleEnabled = form.watch("is_flash_deal");

  const handleSwitchChange = (checked, field) => {
    field.onChange(checked);

    if (!checked) {
      form.resetField("flash_deal_start_date", { defaultValue: null });
      form.resetField("flash_deal_end_date", { defaultValue: null });
    }
  };

  return (
    <div className="rounded-lg border p-4">
      <Controller
        name="is_flash_deal"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldContent className="flex-row">
              <div className="bg-muted flex size-7 items-center justify-center rounded-md">
                <Crown className="text-muted-foreground size-3.5" />
              </div>

              <div className="space-y-0.5">
                <p className="text-xs font-medium">Flash Sale</p>
                <FieldDescription>
                  Creates urgency with limited-time offer badge. Both Price
                  Compare at Price and must be set.
                </FieldDescription>
              </div>
            </FieldContent>

            <div className="flex items-center justify-between">
              <FieldLabel htmlFor={field.name} className="font-normal">
                Enable Flash Sale badge
              </FieldLabel>

              <Switch
                id={field.name}
                name={field.name}
                checked={field.value}
                onCheckedChange={(checked) =>
                  handleSwitchChange(checked, field)
                }
              />
            </div>
          </Field>
        )}
      />

      {isFlashSaleEnabled && (
        <div className="mt-5 space-y-4 border-t pt-4">
          <Controller
            name="flash_deal_start_date"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Sale Start Date</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="datetime-local"
                  aria-invalid={fieldState.invalid}
                  value={field.value || ""}
                  min={new Date().toISOString().slice(0, 16)}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="flash_deal_end_date"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Sale End Date <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="datetime-local"
                  aria-invalid={fieldState.invalid}
                  value={field.value || ""}
                  min={new Date().toISOString().slice(0, 16)}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      )}
    </div>
  );
}
