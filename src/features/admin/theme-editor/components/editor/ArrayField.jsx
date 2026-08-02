import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DynamicFormField from "./DynamicFormField";
import FieldHeader from "./FieldHeader";

export default function ArrayField({ field, value, onChange }) {
  const items = value || [];

  const handleItemChange = (index, key, itemValue) => {
    const updated = items.map((item, i) =>
      i === index ? { ...item, [key]: itemValue } : item,
    );
    onChange(updated);
  };

  const handleAdd = () => {
    const emptyItem = Object.fromEntries(
      field.itemSchema.map((f) => [f.key, ""]),
    );
    onChange([...items, emptyItem]);
  };

  const handleRemove = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <FieldHeader field={field} />

      {items.map((item, index) => (
        <div
          key={index}
          className="border-border bg-muted/20 space-y-3 rounded-lg border p-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium">
              {field.itemLabel || "Item"} {index + 1}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={items.length === 0}
              onClick={() => handleRemove(index)}
              className="text-destructive size-7"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>

          {field.itemSchema.map((subField) => (
            <DynamicFormField
              key={subField.key}
              field={subField}
              value={item[subField.key]}
              onChange={(v) => handleItemChange(index, subField.key, v)}
            />
          ))}
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleAdd}
        className="w-full"
      >
        <Plus className="size-4" />
        Add {field.itemLabel || "Item"}
      </Button>
    </div>
  );
}
