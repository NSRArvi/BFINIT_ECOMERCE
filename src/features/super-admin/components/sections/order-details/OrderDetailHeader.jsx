import { Badge } from "@/components/ui/badge";
import { orderStatusVariantConfig } from "@/features/super-admin/utils/constants/orderStatusVariantConfig";
import { formatDate } from "@/utils/formatDate";

export default function OrderDetailHeader({ orderDetails = {} }) {
  const { invoice_number, created_at, package_upgrade, status } = orderDetails;

  const durationMonth = package_upgrade?.subscriptionPeriod?.duration;
  const statusVariant = orderStatusVariantConfig[status];

  return (
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold">Invoice #{invoice_number}</h2>
        </div>

        <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
          <span>{formatDate(created_at)}</span>
          <span>·</span>
          <span>
            {durationMonth >= 12 ? "1 year" : `${durationMonth} month`}{" "}
            subscription
          </span>
        </div>
      </div>

      <Badge variant={statusVariant} className="capitalize">
        {status}
      </Badge>
    </div>
  );
}
