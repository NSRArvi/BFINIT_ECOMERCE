import { Skeleton } from "@/components/ui/skeleton";

export default function ContentPageSkeleton({ title }) {
  return (
    <div>
      {/* Hero Skeleton */}
      <div className="bg-muted/30 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          {title ? (
            <h1 className="mb-3 text-3xl font-bold sm:text-4xl">{title}</h1>
          ) : (
            <Skeleton className="mx-auto h-10 w-64 sm:h-12 sm:w-96" />
          )}
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />

          <div className="pt-4">
            <Skeleton className="h-6 w-2/3" />
            <div className="mt-2 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>

          <div className="pt-4">
            <Skeleton className="h-6 w-1/2" />
            <div className="mt-2 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
