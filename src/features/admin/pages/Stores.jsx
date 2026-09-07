import { Link } from "react-router";
import { Plus, Store } from "lucide-react";
import { breadcrubms } from "@/utils/constants/breadcrumbs";
import { Button } from "@/components/ui/button";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import EmptyState from "@/components/shared/EmptyState";
import PageHeader from "../components/PageHeader";
import StoreCard from "../components/sections/stores/StoreCard";
import { Skeleton } from "@/components/ui/skeleton";
import StoreCardSkeleton from "../components/skeletons/StoreCardSkeleton";
import UsageBadge from "../components/UsageBadge";
import useGetStores from "../hooks/useGetStores";
import usePackageUsage from "../hooks/usePackageUsage";

export default function Stores() {
  const { data, isLoading } = useGetStores();

  const { data: usageData, isLoading: isUsageLoading } = usePackageUsage();

  const storeLimit = usageData?.data?.stores?.limit;
  const storeUsed = usageData?.data?.stores?.used;
  const isAtLimit = storeUsed >= storeLimit;

  let content = null;

  if (isLoading) {
    content = (
      <>
        {Array.from({ length: 3 }).map((_, i) => (
          <StoreCardSkeleton key={i} />
        ))}
      </>
    );
  }

  if (!isLoading && storeUsed >= 1) {
    content = (
      <>
        {data?.data?.data?.map((store) => (
          <StoreCard key={store?.id} store={store} />
        ))}
      </>
    );
  }

  if (!isLoading && storeUsed === 0) {
    return (
      <EmptyState
        icon={Store}
        title="No Store Found"
        description="Get started by creating your first online store. You can manage multiple stores from this dashboard."
        actionText="Create Your First Store"
        actionPath="/stores/create"
      />
    );
  }

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.Stores} />

      <div className="flex items-end justify-between">
        <div>
          <PageHeader
            icon={Store}
            title="Stores"
            description="Manage Update Delete stores from here"
            showStoreName={false}
          />
        </div>

        {isLoading || isUsageLoading ? (
          <Skeleton className="h-7 w-40" />
        ) : (
          <div className="flex items-center gap-3">
            <UsageBadge used={storeUsed} limit={storeLimit} label="stores" />

            {isAtLimit ? (
              <Button size="sm" asChild className="text-xs">
                <Link to="/settings/billing">Upgrade plan</Link>
              </Button>
            ) : (
              <Button size="sm" asChild className="text-xs">
                <Link to="/stores/create">
                  <Plus />
                  New store
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-4">{content}</div>
    </section>
  );
}
