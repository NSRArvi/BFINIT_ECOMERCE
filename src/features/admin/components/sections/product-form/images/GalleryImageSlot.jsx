import { useEffect, useState } from "react";
import { ImagePlus, Pencil, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function GalleryImageSlot({
  value,
  isEmpty,
  isError,
  dragOver,
  onDrop,
  onDragOver,
  onDragLeave,
  onPick,
  onRemove,
}) {
  const [preview, setPreview] = useState(
    typeof value === "string" ? value : null,
  );

  useEffect(() => {
    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }

    if (typeof value === "string") {
      setPreview(value);
    }
  }, [value]);

  const handleRemove = (e) => {
    e.stopPropagation();
    onRemove();
  };

  return (
    <>
      {isEmpty ? (
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          className={cn(
            "bg-muted/30 hover:border-primary/50 hover:bg-muted/50 group relative flex aspect-square w-full max-w-[140px] cursor-pointer flex-col items-center justify-center gap-1.5 rounded-md border border-dashed transition-colors duration-200",
            dragOver && "border-primary bg-primary/5",
            isError && "border-destructive hover:border-destructive",
          )}
        >
          <div
            className={cn(
              "bg-background ring-border flex size-7 items-center justify-center rounded-full ring-1",
              isError && "ring-destructive/40",
            )}
          >
            <ImagePlus
              className={cn(
                "text-muted-foreground group-hover:text-primary size-3 transition-all group-hover:scale-105",
                isError && "text-destructive group-hover:text-destructive",
              )}
            />
          </div>

          <div className="text-center">
            <p
              className={cn(
                "text-muted-foreground group-hover:text-foreground text-[11px] font-medium",
                isError && "text-destructive group-hover:text-destructive",
              )}
            >
              Add gallery images
            </p>
          </div>

          <button
            type="button"
            onClick={onPick}
            className="ring-primary/50 absolute inset-0 cursor-pointer rounded-md transition-all duration-300"
            aria-label="Upload gallery image"
          />
        </div>
      ) : (
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className="group relative aspect-square w-full max-w-[140px] overflow-hidden rounded-md border border-transparent"
        >
          <div className="h-full w-full overflow-hidden rounded-md">
            <img src={preview} alt="" className="h-full w-full object-cover" />
          </div>

          <div className="from-foreground/75 via-foreground/25 absolute inset-0 bg-linear-to-t to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="bg-background/15 ring-background/30 flex size-7 scale-90 items-center justify-center rounded-full ring-1 backdrop-blur-sm transition-transform duration-300 group-hover:scale-100">
              <Pencil className="text-background size-3" />
            </div>
          </div>

          {dragOver && (
            <div className="bg-background/60 absolute inset-0 flex items-center justify-center rounded-md backdrop-blur-sm">
              <div className="bg-background/15 ring-primary/30 flex size-7 items-center justify-center rounded-full ring-1">
                <ImagePlus className="text-primary size-3" />
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={onPick}
            className="ring-primary/50 absolute inset-0 cursor-pointer rounded-md ring-0 transition-all duration-300 group-hover:ring-2"
            aria-label="Replace gallery image"
          />

          <button
            type="button"
            onClick={handleRemove}
            aria-label="Remove image"
            className="bg-background/15 ring-background/30 text-background hover:bg-destructive hover:ring-destructive/50 absolute top-1.5 right-1.5 z-10 flex size-6 items-center justify-center rounded-full ring-1 backdrop-blur-sm transition-opacity md:opacity-0 md:group-hover:opacity-100"
          >
            <X className="size-3" />
          </button>
        </div>
      )}
    </>
  );
}
