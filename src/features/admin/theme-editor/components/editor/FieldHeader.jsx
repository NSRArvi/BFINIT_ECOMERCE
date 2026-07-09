import { FieldDescription, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";

export default function FieldHeader({ field, className }) {
  const { label, helpText } = field;

  return (
    <div className={cn("space-y-0.5", className)}>
      <FieldLabel htmlFor={field.key} className="text-xs">
        {label}
      </FieldLabel>

      {helpText && <FieldDescription>{helpText}</FieldDescription>}
    </div>
  );
}
