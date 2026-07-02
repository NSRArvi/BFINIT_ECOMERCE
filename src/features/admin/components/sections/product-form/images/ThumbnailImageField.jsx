import { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { ImagePlus, Pencil } from "lucide-react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const maxFileSize = 500 * 1024;
const imgFileAcceptedTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

export default function ThumbnailImageField({ form }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleInputClick = () => {
    inputRef?.current?.click();
  };

  const processFile = (file, field) => {
    if (!file) return;

    if (!imgFileAcceptedTypes.includes(file.type)) {
      form.setError("image", {
        type: "manual",
        message: "Only PNG, JPEG, JPG or WebP files are allowed",
      });
      return;
    }

    if (file.size > maxFileSize) {
      form.setError("image", {
        type: "manual",
        message: "File size must be less than 500KB",
      });
      return;
    }

    form.clearErrors("image");
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
    field.onChange(file);
  };

  const handleImageUpload = (e, field) => {
    processFile(e.target.files[0], field);
  };

  const handleDrop = (e, field) => {
    e.preventDefault();
    setIsDragging(false);
    processFile(e.dataTransfer.files[0], field);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragging(false);
    }
  };

  return (
    <Controller
      name="image"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field>
          <Input
            onChange={(e) => handleImageUpload(e, field)}
            ref={inputRef}
            id={field.name}
            type="file"
            accept={imgFileAcceptedTypes.join(",")}
            className="hidden"
          />

          <FieldLabel
            htmlFor={field.name}
            className={cn(fieldState.invalid && "text-destructive")}
          >
            Thumbnail Image <span className="text-destructive">*</span>
          </FieldLabel>

          {preview ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, field)}
              className={cn(
                "group relative aspect-square w-full overflow-hidden rounded border border-transparent",
                isDragging && "border-primary border-dashed",
              )}
            >
              <div className="h-full w-full overflow-hidden rounded">
                <img
                  src={preview}
                  alt="product thumbnail"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="from-foreground/75 via-foreground/25 absolute inset-0 bg-linear-to-t to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="bg-background/15 ring-background/30 flex size-8 scale-90 items-center justify-center rounded-full ring-1 backdrop-blur-sm transition-transform duration-300 group-hover:scale-100">
                  <Pencil className="text-background size-3.5" />
                </div>
                <span className="text-background text-xs font-medium tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  Replace image
                </span>
              </div>

              {isDragging && (
                <div className="bg-background/60 absolute inset-0 flex flex-col items-center justify-center gap-2 rounded backdrop-blur-sm">
                  <div className="bg-background/15 ring-primary/30 flex size-8 items-center justify-center rounded-full ring-1">
                    <ImagePlus className="text-primary size-3.5" />
                  </div>
                  <span className="text-primary text-xs font-medium">
                    Drop to replace
                  </span>
                </div>
              )}

              <button
                type="button"
                onClick={handleInputClick}
                className="ring-primary/50 absolute inset-0 cursor-pointer rounded-md ring-0 transition-all duration-300 group-hover:ring-2"
                aria-label="Replace thumbnail image"
              />
            </div>
          ) : (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, field)}
              className={cn(
                "bg-muted/30 hover:border-primary/50 hover:bg-muted/50 group relative flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed transition-colors duration-200",
                isDragging && "border-primary bg-primary/5",
                fieldState?.invalid &&
                  "border-destructive hover:border-destructive",
              )}
            >
              <div
                className={cn(
                  "ring-border bg-background flex size-7 items-center justify-center rounded-full ring-1",
                  fieldState?.invalid && "ring-destructive/40",
                )}
              >
                <ImagePlus
                  className={cn(
                    "text-muted-foreground group-hover:text-primary size-3.5 scale-90 transition-all group-hover:scale-100",
                    fieldState?.invalid &&
                      "text-destructive group-hover:text-destructive",
                  )}
                />
              </div>
              <div className="text-center">
                <p
                  className={cn(
                    "text-muted-foreground group-hover:text-foreground text-xs font-medium",
                    fieldState?.invalid &&
                      "text-destructive group-hover:text-destructive",
                  )}
                >
                  Add product image
                </p>
              </div>

              <button
                type="button"
                onClick={handleInputClick}
                className="ring-primary/50 absolute inset-0 cursor-pointer rounded-md transition-all duration-300"
                aria-label="Upload thumbnail image"
              />
            </div>
          )}

          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} className="text-[11px]" />
          )}

          {!fieldState.invalid && !preview && (
            <FieldDescription className="text-[11px]">
              PNG, JPG, JPEG, WebP • Max 500 KB
            </FieldDescription>
          )}
        </Field>
      )}
    />
  );
}
