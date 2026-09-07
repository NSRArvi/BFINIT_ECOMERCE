import { useState } from "react";
import { ReceiptText } from "lucide-react";
import { keepPreviousData } from "@tanstack/react-query";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import PageHeader from "@/components/shared/PageHeader";
import PlanCard from "../components/sections/billing-plans/PlanCard";
import PlanCardSkeleton from "../components/skeletons/PlanCardSkeleton";
import { Switch } from "@/components/ui/switch";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import usePackageInfo from "../hooks/usePackageInfo";
import { cn } from "@/lib/utils";
import { breadcrubms } from "../utils/constants/breadcrumbs";

export default function BillingPlans() {
  const { data: packageInfo } = usePackageInfo();

  const [billingCycle, setBillingCycle] = useState("monthly");

  const { data, isLoading, isFetching } = useGetQuery({
    endpoint: `/api/v1/package/get-all/${billingCycle === "monthly" ? 1 : 12}`,
    enabled: true,
    queryKey: ["packages", billingCycle],
    placeholderData: keepPreviousData,
  });

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.billingPlans} />
      <PageHeader
        icon={ReceiptText}
        title="Upgrade plan"
        description="Compare plans and choose the one that fits your store"
      />

      <div className="flex items-center justify-center gap-3">
        <span
          className={cn(
            "text-xs",
            billingCycle === "monthly"
              ? "text-foreground"
              : "text-muted-foreground",
          )}
        >
          Monthly
        </span>
        <Switch
          disabled={isLoading}
          checked={billingCycle === "yearly"}
          onCheckedChange={(checked) =>
            setBillingCycle(checked ? "yearly" : "monthly")
          }
        />
        <span
          className={cn(
            "text-xs",
            billingCycle === "yearly"
              ? "text-foreground"
              : "text-muted-foreground",
          )}
        >
          Yearly
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <PlanCardSkeleton key={i} />
            ))
          : data?.data?.map((pack) => (
              <PlanCard
                key={pack.id}
                pack={pack}
                currentPackage={packageInfo?.data}
                billingCycle={billingCycle}
                isFetching={isFetching}
              />
            ))}
      </div>
    </section>
  );
}
