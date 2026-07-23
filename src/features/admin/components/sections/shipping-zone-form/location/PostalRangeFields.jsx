import { Controller } from "react-hook-form";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function PostalRangeFields({ form, fields, remove }) {
  return (
    <div className="col-span-2 grid gap-x-4 gap-y-5">
      {fields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-2 gap-x-4 gap-y-5">
          <Controller
            name={`locations.${index}.postal_code_from`}
            control={form.control}
            render={({ field: stateField, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="items-end">
                {index < 2 && (
                  <FieldLabel htmlFor={stateField.name}>
                    Postal Code From
                    <span className="text-destructive">*</span>
                  </FieldLabel>
                )}

                <Input
                  {...stateField}
                  placeholder="Enter a postal code"
                  id={stateField.name}
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name={`locations.${index}.postal_code_to`}
            control={form.control}
            render={({ field: cityField, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                orientation="horizontal"
                className="items-end"
              >
                <div className="w-full space-y-3">
                  {index < 2 && (
                    <FieldLabel htmlFor={cityField.name}>
                      Postal Code To
                      <span className="text-destructive">*</span>
                    </FieldLabel>
                  )}

                  <Input
                    {...cityField}
                    placeholder="Enter a postal code"
                    id={cityField.name}
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </div>

                <Button
                  onClick={() => remove(index)}
                  type="button"
                  size="icon-sm"
                  variant="ghost-destructive"
                  aria-label="Remove location"
                >
                  <Trash2 />
                </Button>
              </Field>
            )}
          />
        </div>
      ))}
    </div>
  );
}
