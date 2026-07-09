import { Skeleton } from "@/components/ui/skeleton";

export default function ThemeEditorSidebarSkeleton() {
  const renderGroupSkeleton = (itemCount) => (
    <div className="space-y-2">
      <Skeleton className="h-3 w-16" />
      <div className="space-y-1.5">
        {Array.from({ length: itemCount }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-full rounded-md" />
        ))}
      </div>
    </div>
  );

  return (
    <aside className="flex h-[calc(100vh-63px)] w-full max-w-64 flex-col border-r bg-white">
      {/* Header */}
      <div className="bg-card border-b px-4 py-2.5">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-7 w-16 rounded-md" />
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <div className="space-y-6">
          {renderGroupSkeleton(1)}
          {renderGroupSkeleton(2)}
          {renderGroupSkeleton(1)}
        </div>
      </div>
    </aside>
  );
}
