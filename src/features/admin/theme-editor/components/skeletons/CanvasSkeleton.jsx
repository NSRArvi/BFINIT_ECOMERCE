import { Skeleton } from "@/components/ui/skeleton";

export default function CanvasSkeleton({ isPreviewMode }) {
  return (
    <div
      className={`bg-background w-full ${
        isPreviewMode ? "h-dvh" : "m-2 h-[calc(100dvh-79px)] rounded-md"
      } overflow-hidden`}
    >
      {/* Nav */}
      <div className="flex items-center justify-between border-b px-8 py-4">
        <Skeleton className="h-6 w-24" />
        <div className="flex gap-6">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
      </div>

      {/* Hero */}
      <div className="space-y-4 px-8 py-16">
        <Skeleton className="h-10 w-2/5" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-9 w-28 rounded-md" />
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-4 gap-4 px-8 py-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="aspect-square w-full rounded-md" />
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="grid grid-cols-3 gap-8 border-t px-8 py-10">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}
