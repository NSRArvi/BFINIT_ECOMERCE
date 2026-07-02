import { Controller } from "react-hook-form";
import GalleryField from "./GalleryField";

export default function GalleryImages({ form }) {
  return (
    <Controller
      name="images"
      control={form.control}
      render={({ field, fieldState }) => (
        <GalleryField form={form} field={field} fieldState={fieldState} />
      )}
    />
  );
}
