import { Skeleton } from "@/components/ui/skeleton";

export default function StripeConnectSkeleton() {
  return (
    <div className="grid rounded-lg border px-5 py-4 md:grid-cols-2">
      {/* left side skeleton */}
      <div>
        <Skeleton className="h-4 w-40" />
        <Skeleton className="mt-2 h-3 w-full max-w-sm" />
        <Skeleton className="mt-1 h-3 w-3/4 max-w-sm" />
        <Skeleton className="mt-3 h-8 w-[120px]" />
        <ul className="mt-6 space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i} className="flex items-center gap-2">
              <Skeleton className="size-3.5 rounded-full" />
              <Skeleton className="h-3 w-40" />
            </li>
          ))}
        </ul>
      </div>

      {/* right side skeleton */}
      <div className="mt-6 border-t pt-6 md:mt-0 md:border-t-0 md:border-l md:pt-0 md:pl-5">
        <Skeleton className="h-4 w-24" />
        <ol className="mt-2 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <Skeleton className="size-6 shrink-0 rounded-full" />
                {i < 2 && <div className="bg-border mt-1 w-px flex-1" />}
              </div>
              <div className="flex-1 pb-1">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="mt-2 h-3 w-full" />
                <Skeleton className="mt-1 h-3 w-2/3" />
              </div>
            </li>
          ))}
        </ol>
        <div className="bg-muted mt-5 flex items-start gap-2.5 rounded-md p-3">
          <Skeleton className="size-4 shrink-0 rounded" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      </div>
    </div>
  );
}
