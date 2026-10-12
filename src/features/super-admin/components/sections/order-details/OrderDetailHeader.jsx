import { Badge } from "@/components/ui/badge";
import { orderStatusVariantConfig } from "@/features/super-admin/utils/constants/orderStatusVariantConfig";
import { getTrialInfo } from "@/features/super-admin/utils/trial";
import { formatDate } from "@/utils/formatDate";

export default function OrderDetailHeader({ orderDetails = {} }) {
  const { invoice_number, created_at, package_upgrade } = orderDetails;

  const {
    isTrial,
    totalDays,
    status: displayStatus,
  } = getTrialInfo(orderDetails);
  const durationMonth = package_upgrade?.subscriptionPeriod?.duration;
  const statusVariant = orderStatusVariantConfig[displayStatus];

  return (
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold">Invoice #{invoice_number}</h2>
        <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
          <span>{formatDate(created_at)}</span>
          <span>·</span>
          <span>
            {isTrial
              ? `Free trial${totalDays ? ` · ${totalDays} days` : ""}`
              : `${durationMonth >= 12 ? "1 year" : `${durationMonth} month`} subscription`}
          </span>
        </div>
      </div>

      <Badge variant={statusVariant} className="capitalize">
        {displayStatus}
      </Badge>
    </div>
  );
}
