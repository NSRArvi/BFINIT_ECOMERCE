import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { X, ImagePlus, Loader } from "lucide-react";
import toast from "react-hot-toast";
import FieldHeader from "./FieldHeader";
import { Spinner } from "@/components/ui/spinner";
import useThemeEditor from "../../hooks/useThemeEditor";
import usePostMutation from "@/hooks-v2/api/usePostMutation";
import useDeleteMutation from "@/hooks-v2/api/useDeleteMutation";
import { getImgUrl } from "@/utils/getImgUrl";
import { cn } from "@/lib/utils";

const validateImage = (file) => {
  const allowedImageTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  if (!allowedImageTypes.includes(file.type)) {
    toast.error("Please upload JPG, PNG, or WebP images only");
    return false;
  }

  if (file.size > 2 * 1024 * 1024) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
    toast.error(`Image is too large (${sizeMB}MB). Maximum size is 2MB`);
    return false;
  }

  return true;
};

export default function ImageUploadField({ field, value, onChange }) {
  const { storeId, themeId } = useParams();
  const { setIsUploading, storeThemeId } = useThemeEditor();

  const { mutate, isPending: isUploading } = usePostMutation({
    endpoint: `/api/v1/themes/storeTheme/createImageGallary/${storeId}/${themeId}`,
    isTokenRequired: true,
  });

  const { mutate: deleteMutate, isPending: isDeleting } = useDeleteMutation({
    endpoint: `/api/v1/themes/storeTheme/deleteImageGallary/${storeId}/${storeThemeId}/${value?.id}`,
    isTokenRequired: true,
  });

  const [imagePreview, setImagePreview] = useState(value?.url || null);

  useEffect(() => {
    setImagePreview(value?.url ? getImgUrl(value?.url) : null);
  }, [value]);

  // handle image upload loading state globally
  useEffect(() => {
    setIsUploading(isUploading || isDeleting);
  }, [setIsUploading, isUploading, isDeleting]);

  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!validateImage(file)) {
      e.target.value = "";
      return;
    }

    // set local preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("image", file);

    mutate(formData, {
      onSuccess: (data) => {
        if (!data?.success) {
          return toast.error(data?.message);
        }
        const { id, image } = data?.data || {};
        setImagePreview(image);
        onChange({ url: image, id });
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const handleDelete = () => {
    deleteMutate(null, {
      onSuccess: (data) => {
        if (!data?.success) {
          return toast.error(data?.message);
        }
        setImagePreview(null);
        onChange(null);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <div className="space-y-2">
      <FieldHeader field={field} />

      {imagePreview ? (
        <div className="group relative overflow-hidden rounded-md">
          <img
            src={imagePreview}
            alt="Hero background"
            className="h-32 w-full object-cover"
          />

          <div className="from-foreground/75 via-foreground/25 absolute inset-0 bg-linear-to-t to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            type="button"
            className="bg-background/15 ring-background/30 text-background hover:bg-destructive hover:ring-destructive/50 absolute top-1.5 right-1.5 z-10 flex size-6 items-center justify-center rounded-full ring-1 backdrop-blur-sm transition-opacity md:opacity-0 md:group-hover:opacity-100"
          >
            <X className="size-3" />
          </button>

          {isDeleting && (
            <div className="from-foreground/75 via-foreground/25 absolute inset-0 flex items-center justify-center bg-linear-to-t to-transparent">
              <Loader className="h-6 w-6 animate-spin text-white" />
            </div>
          )}
        </div>
      ) : (
        <label
          className={cn(
            "bg-muted/30 hover:border-primary/50 text-muted-foreground hover:bg-muted/50 group block h-32 w-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-md border border-dashed text-center transition-colors duration-200",
            isUploading && "pointer-events-none",
          )}
        >
          {isUploading ? (
            <div className="flex h-full flex-col items-center justify-center gap-0.5">
              <Spinner className="size-4.5" />
              <span className="text-xs">Uploading...</span>
            </div>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center">
              <div className="ring-border bg-background mx-auto flex size-7 items-center justify-center rounded-full ring-1">
                <ImagePlus className="group-hover:text-primary size-3.5 scale-90 transition-all group-hover:scale-100" />
              </div>
              <p className="group-hover:text-foreground mt-2 text-xs font-medium">
                Upload image
              </p>
              <p className="mt-0.5 px-4 text-center text-[11px] leading-relaxed">
                JPG, PNG, WebP • Max 2MB
              </p>
              <p className="mt-1 text-[11px]">Recommended: 1920x1080px</p>
            </div>
          )}

          <input
            id={field.key}
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleUpload}
            className="hidden"
            disabled={isUploading}
          />
        </label>
      )}
    </div>
  );
}
