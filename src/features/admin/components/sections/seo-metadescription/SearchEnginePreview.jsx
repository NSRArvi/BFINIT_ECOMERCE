import { AlertCircle, Search } from "lucide-react";
import useSelectedStore from "@/hooks/useSelectedStore";

export default function SearchEnginePreview({ metaTitle, metaDescription }) {
  const { activeStore } = useSelectedStore();

  return (
    <div className="bg-muted/30 border-border rounded-lg border p-4">
      <h3 className="text-muted-foreground mb-3 text-xs font-medium">
        Search Engine Preview
      </h3>

      <div className="bg-background border-border space-y-1 rounded-md border p-4">
        {/* Title */}
        <h4 className="line-clamp-1 cursor-pointer text-sm leading-tight font-normal text-[#1a0dab] hover:underline">
          {metaTitle || `${activeStore?.name} - Premium Products & Services`}
        </h4>

        {/* URL */}
        <p className="text-xs text-[#006621]">https://yourstore.com</p>

        {/* Description */}
        <p className="text-muted-foreground line-clamp-2 text-xs leading-snug">
          {metaDescription ||
            "Discover our wide selection of quality products. Fast shipping, excellent customer service and competitive prices. Shop now for the best deals!"}
        </p>
      </div>

      {/* Character warnings */}
      <div className="mt-3 space-y-2">
        {metaTitle?.length > 60 && (
          <div className="text-warning flex items-center gap-1.5 text-xs">
            <AlertCircle className="h-3 w-3 shrink-0" />
            <span>
              Title exceeds 60 characters and may be truncated in search results
            </span>
          </div>
        )}
        {metaDescription?.length > 160 && (
          <div className="text-warning flex items-center gap-1.5 text-xs">
            <AlertCircle className="h-3 w-3 shrink-0" />
            <span>
              Description exceeds 160 characters and may be truncated in search
              results
            </span>
          </div>
        )}
        {metaTitle?.length < 30 && metaTitle.length > 0 && (
          <div className="text-info flex items-center gap-1.5 text-xs">
            <AlertCircle className="h-3 w-3 shrink-0" />
            <span>
              Consider making your title longer for better SEO (recommended:
              50-60 characters)
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
