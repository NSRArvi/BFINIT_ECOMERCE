import { useRef, useState } from "react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import GalleryImageSlot from "./GalleryImageSlot";
import { cn } from "@/lib/utils";

const maxImages = 8;
const maxFileSize = 300 * 1024;
const imgFileAcceptedTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

export default function GalleryField({ form, field, fieldState }) {
  const inputRef = useRef(null);
  const targetIndexRef = useRef(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const images = field.value || [];
  const canAddMore = images.length < maxImages;
  const totalSlots = Math.min(
    canAddMore ? images.length + 1 : images.length,
    maxImages,
  );

  const handleInputChange = (e) => {
    if (e.target.files?.length) {
      addFiles(e.target.files, targetIndexRef.current);
    }
    e.target.value = "";
  };

  const addFiles = (files, targetIndex = null) => {
    const fileList = Array.from(files);
    const wrongType = fileList.filter(
      (f) => !imgFileAcceptedTypes.includes(f.type),
    );
    const tooLarge = fileList.filter(
      (f) => imgFileAcceptedTypes.includes(f.type) && f.size > maxFileSize,
    );
    const valid = fileList.filter(
      (f) => imgFileAcceptedTypes.includes(f.type) && f.size <= maxFileSize,
    );

    if (wrongType.length > 0) {
      form.setError("images", {
        type: "manual",
        message: "Only PNG, JPEG, JPG or WebP files are allowed",
      });
      return;
    }

    if (tooLarge.length > 0) {
      form.setError("images", {
        type: "manual",
        message: "Each image must be less than 300KB",
      });
      return;
    }

    if (valid.length === 0) return;

    form.clearErrors("images");

    const updated = [...images];
    if (targetIndex !== null && targetIndex < updated.length) {
      updated[targetIndex] = valid[0];
    } else {
      const availableSlots = maxImages - updated.length;
      updated.push(...valid.slice(0, availableSlots));
    }
    field.onChange(updated);
  };

  const removeAt = (index) => {
    const updated = [...images];
    updated.splice(index, 1);
    field.onChange(updated);
  };

  const handlePick = (index) => {
    targetIndexRef.current = index < images.length ? index : null;
    inputRef.current.multiple = index === images.length;
    inputRef.current.click();
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    setDragOverIndex(null);
    addFiles(e.dataTransfer.files, index < images.length ? index : null);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  return (
    <Field>
      <Input
        ref={inputRef}
        type="file"
        accept={imgFileAcceptedTypes.join(",")}
        onChange={handleInputChange}
        className="hidden"
      />

      <FieldLabel className={cn(fieldState.invalid && "text-destructive")}>
        Gallery Images{" "}
        <span className="text-muted-foreground font-normal">
          ({images.length}/{maxImages})
        </span>
      </FieldLabel>

      <div className="flex flex-wrap items-center gap-2">
        {Array.from({ length: Math.max(totalSlots, 1) }).map((_, index) => (
          <GalleryImageSlot
            key={index}
            value={images[index]}
            isEmpty={!images[index]}
            isError={fieldState.error?.type === "manual"}
            dragOver={dragOverIndex === index}
            onPick={() => handlePick(index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={() => setDragOverIndex(null)}
            onRemove={() => removeAt(index)}
          />
        ))}
      </div>

      {fieldState.invalid && (
        <FieldError errors={[fieldState.error]} className="text-[11px]" />
      )}

      {!fieldState.invalid && (
        <FieldDescription className="text-[11px]">
          PNG, JPG, JPEG, WebP • Max 300 KB per image
        </FieldDescription>
      )}
    </Field>
  );
}
