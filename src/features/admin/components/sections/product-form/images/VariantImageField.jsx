import { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { ImagePlus, X } from "lucide-react";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const maxFileSize = 200 * 1024;
const imgFileAcceptedTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

export default function VariantImageField({
  form,
  pricingIndex,
  variantIndex,
}) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const fieldName = `pricing.${pricingIndex}.variants.${variantIndex}.image`;

  const handleInputClick = () => {
    inputRef?.current?.click();
  };

  const processFile = (file, field) => {
    if (!file) return;

    if (!imgFileAcceptedTypes.includes(file.type)) {
      form.setError(fieldName, {
        type: "manual",
        message: "Only PNG, JPEG, JPG or WebP files are allowed",
      });
      return;
    }

    if (file.size > maxFileSize) {
      form.setError(fieldName, {
        type: "manual",
        message: "File size must be less than 200KB",
      });
      return;
    }

    form.clearErrors(fieldName);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
    field.onChange(file);
  };

  const handleImageUpload = (e, field) => {
    processFile(e.target.files[0], field);
    e.target.value = "";
  };

  const handleRemove = (e, field) => {
    e.stopPropagation();
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    field.onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <Controller
      name={fieldName}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <Input
            onChange={(e) => handleImageUpload(e, field)}
            ref={inputRef}
            id={field.name}
            type="file"
            accept={imgFileAcceptedTypes.join(",")}
            className="hidden"
          />

          {preview ? (
            <div className="group relative aspect-square w-full max-w-9">
              <button
                type="button"
                onClick={handleInputClick}
                className="block size-full overflow-hidden rounded-md border"
                aria-label="Replace variant image"
              >
                <img
                  src={preview}
                  alt="Variant"
                  className="size-full object-cover"
                />
              </button>
              <button
                type="button"
                onClick={(e) => handleRemove(e, field)}
                className="bg-destructive text-destructive-foreground absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Remove image"
              >
                <X className="size-2.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleInputClick}
              className={cn(
                "bg-muted/30 hover:border-primary/50 hover:bg-muted/50 group flex aspect-square w-full max-w-9 items-center justify-center rounded-md border border-dashed transition-colors duration-200",
                fieldState.invalid &&
                  "border-destructive hover:border-destructive",
              )}
              aria-label="Upload variant image"
            >
              <div className="bg-background ring-border flex size-6 items-center justify-center rounded-full ring-1">
                <ImagePlus className="text-muted-foreground group-hover:text-primary size-3 transition-all group-hover:scale-105" />
              </div>
            </button>
          )}

          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} className="text-[10px]" />
          )}
        </Field>
      )}
    />
  );
}
