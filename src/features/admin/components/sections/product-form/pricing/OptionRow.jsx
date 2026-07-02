import { useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

export default function OptionRow({
  form,
  pricingIndex,
  optionIndex,
  onRemove,
}) {
  const [valueInput, setValueInput] = useState("");

  const optionPath = `pricing.${pricingIndex}.options.${optionIndex}`;

  const valuesError =
    form.formState.errors?.pricing?.[pricingIndex]?.options?.[optionIndex]
      ?.values;

  const {
    fields: valueFields,
    append: appendValue,
    remove: removeValue,
  } = useFieldArray({
    control: form.control,
    name: `${optionPath}.values`,
  });

  const addValue = (rawValue) => {
    const name = rawValue.trim();

    if (!name) return;

    if (
      valueFields.some(
        (value) => value.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      return;
    }

    appendValue({
      id: `${optionPath}-value-${crypto.randomUUID()}`,
      name,
    });
  };

  const handleValueKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addValue(valueInput);
      setValueInput("");
    }

    if (e.key === "Backspace" && valueInput === "" && valueFields.length > 0) {
      removeValue(valueFields.length - 1);
    }
  };

  const handleValueBlur = () => {
    addValue(valueInput);
    setValueInput("");
  };

  return (
    <div className="grid grid-cols-[35%_1fr] gap-x-6 gap-y-4">
      <Controller
        name={`${optionPath}.name`}
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="flex-1">
            <div className="flex items-start justify-between">
              <FieldLabel>Option Name</FieldLabel>
              <Button
                onClick={onRemove}
                type="button"
                size="icon-sm"
                variant="ghost-destructive"
              >
                <Trash2 />
              </Button>
            </div>
            <Input
              {...field}
              placeholder="e.g. Size"
              aria-invalid={fieldState.invalid}
              className="font-medium"
            />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Field>
        <FieldLabel className="h-7">Option Values</FieldLabel>

        <div className="border-input focus-within:border-primary focus-within:ring-primary/20 flex h-9 w-full items-center gap-1.5 rounded-md border px-3 text-sm focus-within:ring-1">
          <div className="custom-scrollbar-hide flex items-center gap-1.5 overflow-x-auto">
            {valueFields.map((valueField, valueIndex) => (
              <span
                key={valueField.id}
                className="bg-secondary inline-flex shrink-0 gap-1.5 rounded px-2 py-1 text-xs"
              >
                {valueField.name}

                <button
                  onClick={() => removeValue(valueIndex)}
                  type="button"
                  className="text-destructive hover:bg-destructive/10 rounded-full p-0.5"
                >
                  <X className="size-3" />
                </button>
              </span>
            ))}
          </div>

          <Input
            value={valueInput}
            placeholder="Type a value and press Enter"
            onChange={(e) => setValueInput(e.target.value)}
            onKeyDown={handleValueKeyDown}
            onBlur={handleValueBlur}
            className="h-full min-w-1/4 flex-1 shrink-0 border-0 px-0 focus-visible:ring-0"
          />
        </div>

        {valuesError ? (
          <FieldError errors={[valuesError]} />
        ) : (
          <FieldDescription>
            Press Enter or use commas to add multiple values.
          </FieldDescription>
        )}
      </Field>
    </div>
  );
}
