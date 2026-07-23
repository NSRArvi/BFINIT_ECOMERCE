import { Controller } from "react-hook-form";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function PostalCodeFields({ form, fields, remove }) {
  return (
    <>
      {fields.length === 0 && (
        <p className="text-muted-foreground col-span-2 px-5 py-4 text-center text-xs">
          No states added yet. Click "Add location" to start.
        </p>
      )}

      <div className="col-span-2 grid grid-cols-2 gap-x-4 gap-y-5">
        {fields.map((field, index) => (
          <Controller
            key={field.id}
            name={`locations.${index}.postal_code`}
            control={form.control}
            render={({ field: stateField, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                orientation="horizontal"
                className="items-end"
              >
                <div className="w-full space-y-3">
                  {index < 2 && (
                    <FieldLabel htmlFor={stateField.name}>
                      Postal Code <span className="text-destructive">*</span>
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
        ))}
      </div>
    </>
  );
}
