import { SquarePen, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmptyEditorState({ section, handleCancelClick }) {
  return (
    <aside className="flex h-[calc(100vh-63px)] w-full max-w-80 flex-col border-l bg-white">
      {/* Header - Keep consistency even in empty state */}
      <div className="bg-card flex items-start justify-between gap-3 border-b px-4 py-2.5">
        <div>
          <h2 className="text-xs font-semibold">{section.name}</h2>
          <p className="text-muted-foreground mt-0.5 text-[11px]">
            Edit section content
          </p>
        </div>
        <Button onClick={handleCancelClick} size="sm" variant="ghost">
          <X className="text-muted-foreground" />
        </Button>
      </div>

      {/* Empty state content */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="max-w-60 space-y-2 text-center">
          <div className="bg-muted/30 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg border border-dashed">
            <SquarePen size={20} className="text-muted-foreground" />
          </div>
          <h3 className="text-xs font-medium">No editor available</h3>
          <p className="text-muted-foreground text-[11px] leading-relaxed">
            This section doesn&apos;t have any editable fields configured yet.
          </p>
        </div>
      </div>
    </aside>
  );
}
