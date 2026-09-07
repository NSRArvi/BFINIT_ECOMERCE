import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function PlanCardSkeleton() {
  return (
    <div className="relative flex h-fit flex-col overflow-hidden rounded-md">
      <div className="h-9" />

      <div className="flex flex-1 flex-col rounded-md border p-4">
        <div className="flex-1">
          <Skeleton className="mb-2 h-3 w-16" />
          <Skeleton className="h-4 w-32" />

          <div className="mt-3 space-y-1.5">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
          </div>

          <div className="mt-4 flex items-baseline gap-1.5">
            <Skeleton className="h-6 w-20" />
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <div>
              <Skeleton className="mb-1.5 h-3 w-14" />
              <Skeleton className="h-4 w-8" />
            </div>
            <div>
              <Skeleton className="mb-1.5 h-3 w-14" />
              <Skeleton className="h-4 w-8" />
            </div>
          </div>

          <Separator className="my-4" />

          <Skeleton className="mb-2 h-3 w-20" />
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <Skeleton className="size-3 shrink-0 rounded-full" />
                <Skeleton className="h-3 w-full" />
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-4" />

        <Skeleton className="h-8 w-full rounded" />
      </div>
    </div>
  );
}
