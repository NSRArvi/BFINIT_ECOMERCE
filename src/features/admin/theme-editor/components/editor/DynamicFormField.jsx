import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductSourceField from "./ProductSourceField";
import { Switch } from "@/components/ui/switch";
import ImageUploadField from "./ImageUploadField";
import FieldHeader from "./FieldHeader";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function DynamicFormField({ field, value, onChange }) {
  switch (field.type) {
    case "text":
      return (
        <div className="space-y-2">
          <FieldHeader field={field} />
          <Input
            id={field.key}
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            className="h-9 text-sm"
          />
        </div>
      );

    case "textarea":
      return (
        <div className="space-y-2">
          <FieldHeader field={field} />
          <Textarea
            id={field.key}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            rows={field.rows || 3}
            className="resize-none text-sm"
          />
        </div>
      );

    case "select":
      return (
        <div className="space-y-2">
          <FieldHeader field={field} />
          <Select value={value || ""} onValueChange={onChange}>
            <SelectTrigger id={field.key} className="h-9 text-sm">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {field.options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="text-sm"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );

    case "image":
      return (
        <ImageUploadField field={field} value={value} onChange={onChange} />
      );

    case "checkbox":
      return (
        <div className="border-border bg-muted/20 flex items-start gap-3 rounded-lg border p-3">
          <Checkbox
            id={field.key}
            checked={value || false}
            onCheckedChange={onChange}
            className="mt-0.5"
          />
          <FieldHeader field={field} />
        </div>
      );

    case "radio":
      return (
        <div className="space-y-2">
          <FieldHeader field={field} />
          <RadioGroup
            value={value}
            onValueChange={onChange}
            className="flex flex-col gap-2"
          >
            {field.options.map((option) => (
              <label
                key={option.value}
                htmlFor={`${field.key}-${option.value}`}
                className="border-border bg-muted/20 has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors"
              >
                <RadioGroupItem
                  id={`${field.key}-${option.value}`}
                  value={option.value}
                />
                <span className="text-xs font-medium">{option.label}</span>
              </label>
            ))}
          </RadioGroup>
        </div>
      );

    case "switch":
      return (
        <div className="border-border bg-muted/20 flex items-center justify-between rounded-lg border p-3">
          <FieldHeader field={field} />
          <Switch
            id={field.key}
            checked={value || false}
            onCheckedChange={onChange}
          />
        </div>
      );

    case "product-source":
      return (
        <ProductSourceField
          field={field}
          value={value || { type: "all", value: null }}
          onChange={onChange}
        />
      );

    default:
      return null;
  }
}
