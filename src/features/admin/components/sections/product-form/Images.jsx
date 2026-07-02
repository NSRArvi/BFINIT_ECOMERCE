import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import ThumbnailImageField from "./images/ThumbnailImageField";
import GalleryImages from "./images/GalleryImages";

export default function Images({ form }) {
  return (
    <FieldSet>
      <div className="border-b px-5 py-4">
        <FieldLegend>Product Images</FieldLegend>
        <FieldDescription>
          Upload high-quality images to showcase your product
        </FieldDescription>
      </div>

      <FieldGroup className="grid-cols-[240px_1fr]">
        <ThumbnailImageField form={form} />
        <GalleryImages form={form} />
      </FieldGroup>
    </FieldSet>
  );
}
