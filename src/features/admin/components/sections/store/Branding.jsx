import { useRef } from "react";
import { Image, X } from "lucide-react";
import toast from "react-hot-toast";
import { FieldDescription, FieldLegend } from "@/components/ui/field";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getImgUrl } from "@/utils/getImgUrl";

export default function Branding({ form }) {
  const logoRef = useRef();
  const faviconRef = useRef();
  const maxLogoSize = 500 * 1024; // 500KB

  const handleFiles = (files, onChange) => {
    const file = files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    if (file.size > maxLogoSize) {
      return toast.error("File size must be less than 500KB");
    }

    const imageData = {
      id: crypto.randomUUID(),
      file: file,
      preview: URL.createObjectURL(file),
      name: file.name,
      isNew: true,
    };

    onChange(imageData);
  };

  const handleLogoInput = (e, onChange) => {
    handleFiles(e.target.files, onChange);
  };

  const handleFaviconInput = (e, onChange) => {
    handleFiles(e.target.files, onChange);
  };

  const handleRemoveLogo = (onChange, currentImage) => {
    if (currentImage && currentImage.preview) {
      URL.revokeObjectURL(currentImage.preview);
      logoRef.current.value = "";
    }
    onChange(null);
  };

  const handleRemoveFavicon = (onChange, currentImage) => {
    if (currentImage && currentImage.preview) {
      URL.revokeObjectURL(currentImage.preview);
      logoRef.current.value = "";
    }
    onChange(null);
  };

  const getImageSrc = (value) => {
    if (!value) return null;

    if (value.preview) return value.preview;

    if (typeof value === "string") return getImgUrl(value);

    if (value.url) return value.url;

    return null;
  };

  return (
    <div className="bg-card rounded-lg p-5">
      <FieldLegend>Branding</FieldLegend>
      <FieldDescription>
        Upload your logo and favicon to establish your store's visual identity
      </FieldDescription>

      <div className="mt-4 space-y-4 md:mt-6 md:space-y-6">
        {/* Logo */}
        <FormField
          control={form.control}
          name="logo"
          rules={{ required: "Please upload your store logo" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">
                Logo <span className="text-destructive">*</span>
              </FormLabel>

              <FormControl>
                <div className="border-border bg-muted/50 flex items-start gap-4 rounded-lg border p-4">
                  {/* Upload Box */}
                  <div className="shrink-0">
                    {field.value && getImageSrc(field.value) ? (
                      <div className="group relative">
                        <div className="border-border bg-background relative size-32 rounded-md border">
                          <img
                            src={getImageSrc(field.value)}
                            alt={field.value.name || "Store Logo"}
                            className="h-full w-full object-contain p-2"
                          />
                          <button
                            onClick={() =>
                              handleRemoveLogo(field.onChange, field.value)
                            }
                            type="button"
                            className="bg-destructive text-destructive-foreground absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full shadow-md transition-opacity hover:cursor-pointer hover:opacity-90"
                            aria-label="Remove logo"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => logoRef.current?.click()}
                        className="border-border bg-background hover:border-primary/50 hover:bg-muted/50 flex size-32 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-md border border-dashed transition-colors"
                      >
                        <Image
                          strokeWidth={1.5}
                          className="text-muted-foreground/60 size-8"
                        />
                        <p className="text-muted-foreground text-[11px] font-medium">
                          Upload
                        </p>
                      </div>
                    )}

                    <input
                      ref={logoRef}
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      onChange={(e) => handleLogoInput(e, field.onChange)}
                      className="hidden"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 space-y-2 text-xs">
                    <div>
                      <p className="font-medium">Store Logo</p>
                      <p className="text-muted-foreground mt-1">
                        Upload your logo in its original aspect ratio. It will
                        be displayed in your store's navigation.
                      </p>
                    </div>
                    <div className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
                      <span>• PNG, JPG or WebP</span>
                      <span>• 500×200px or larger</span>
                      <span>• Max 500KB file size</span>
                    </div>
                  </div>
                </div>
              </FormControl>

              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* Favicon */}
        <FormField
          control={form.control}
          name="favicon"
          rules={{ required: "Please upload a favicon" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">
                Favicon <span className="text-destructive">*</span>
              </FormLabel>

              <FormControl>
                <div className="border-border bg-muted/50 flex items-start gap-4 rounded-lg border p-4">
                  {/* Upload Box */}
                  <div className="shrink-0">
                    {field.value && getImageSrc(field.value) ? (
                      <div className="group relative">
                        <div className="border-border bg-background relative size-32 rounded-md border">
                          <img
                            src={getImageSrc(field.value)}
                            alt={field.value.name || "Favicon"}
                            className="h-full w-full object-contain p-2"
                          />
                          <button
                            onClick={() =>
                              handleRemoveFavicon(field.onChange, field.value)
                            }
                            type="button"
                            className="bg-destructive text-destructive-foreground absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full shadow-md transition-opacity hover:cursor-pointer hover:opacity-90"
                            aria-label="Remove favicon"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => faviconRef.current?.click()}
                        className="border-border bg-background hover:border-primary/50 hover:bg-muted/50 flex size-32 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-md border border-dashed transition-colors"
                      >
                        <Image
                          strokeWidth={1.5}
                          className="text-muted-foreground/60 size-8"
                        />
                        <p className="text-muted-foreground text-[11px] font-medium">
                          Upload
                        </p>
                      </div>
                    )}

                    <input
                      ref={faviconRef}
                      type="file"
                      accept="image/png,image/x-icon"
                      onChange={(e) => handleFaviconInput(e, field.onChange)}
                      className="hidden"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 space-y-2 text-xs">
                    <div>
                      <p className="font-medium">Browser Favicon</p>
                      <p className="text-muted-foreground mt-1">
                        The small icon that appears in browser tabs and
                        bookmarks. Use a simple, recognizable icon.
                      </p>
                    </div>
                    <div className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
                      <span>• PNG or ICO</span>
                      <span>• 256×256px minimum</span>
                      <span>• Max 100KB</span>
                    </div>
                  </div>
                </div>
              </FormControl>

              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
