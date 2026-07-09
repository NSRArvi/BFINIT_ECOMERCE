import StorefrontLoader from "@/components/storefront/loader/StorefrontLoader";
import useThemeEditor from "@/features/admin/theme-editor/hooks/useThemeEditor";
import { cn } from "@/lib/utils";

export default function Canvas({ children }) {
  const { sections, isLoading, isPreviewMode } = useThemeEditor();

  if (isLoading) {
    return (
      <div
        className={cn(
          "bg-background custom-scrollbar flex h-[calc(100dvh-79px)] w-full items-center justify-center",
          isPreviewMode ? "h-dvh" : "m-2 rounded-md",
        )}
      >
        <StorefrontLoader canvasHeight={true} />
      </div>
    );
  }

  const hasSections =
    sections?.header?.length > 0 ||
    sections?.body?.length > 0 ||
    sections?.footer?.length > 0;

  if (!isLoading && !hasSections) {
    return (
      <div className="text-muted-foreground flex h-96 flex-1 items-center justify-center">
        <p>Click &quot;Add&quot; to add sections to your page</p>
      </div>
    );
  }

  return (
    <div
      id="canvas"
      className={cn(
        "bg-background custom-scrollbar h-[calc(100dvh-79px)] w-full overflow-y-auto",
        isPreviewMode ? "h-dvh" : "m-2 rounded-md",
      )}
    >
      {children}
    </div>
  );
}
