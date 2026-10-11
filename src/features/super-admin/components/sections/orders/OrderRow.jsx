import { Link } from "react-router";
import { Bitcoin, Building2, CreditCard, Gift } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/utils/formatDate";
import { formatDecimal } from "@/utils/format/formatDecimal";
import { orderStatusVariantConfig } from "@/features/super-admin/utils/constants/orderStatusVariantConfig";

const paymentConfig = {
  stripe: { label: "Stripe", icon: CreditCard },
  bank_transfer: { label: "Bank Transfer", icon: Building2 },
  solana: { label: "Crypto", icon: Bitcoin },
  trial: { label: "Free Trial", icon: Gift },
};

export default function OrderRow({ order }) {
  const {
    package: packageInfo,
    packageInvoice,
    user,
    subscriptionPeriod,
  } = order;

  const method = paymentConfig[packageInvoice?.payment_method];
  const MethodIcon = method?.icon;

  const isTrial = packageInvoice?.payment_method === "trial";
  const trialExpired = isTrial && order.status === "expired";

  const statusLabel = isTrial
    ? trialExpired
      ? "expired"
      : "active"
    : packageInvoice?.status;

  const statusVariant = orderStatusVariantConfig[statusLabel];

  return (
    <TableRow>
      <TableCell className="max-w-xs truncate border text-xs font-medium">
        <div className="flex flex-col gap-1">
          <span className="font-medium">#{packageInvoice?.invoice_number}</span>
          <span className="text-muted-foreground">
            {formatDate(packageInvoice?.created_at)}
          </span>
        </div>
      </TableCell>

      <TableCell className="max-w-xs truncate border text-xs">
        <div className="flex flex-col gap-1">
          <span className="font-medium">{user?.name}</span>
          <span className="text-muted-foreground">{user?.email}</span>
        </div>
      </TableCell>

      <TableCell className="max-w-xs truncate border text-xs">
        <div className="flex flex-col gap-1">
          <span className="font-medium">{packageInfo?.package_name}</span>
          <span className="text-muted-foreground">
            {subscriptionPeriod?.duration >= 12
              ? `${subscriptionPeriod?.duration / 12} year`
              : `${subscriptionPeriod?.duration} month`}
          </span>
        </div>
      </TableCell>

      <TableCell className="max-w-xs truncate border text-xs font-medium">
        {isTrial ? "Free" : `€${formatDecimal(packageInvoice?.payment_amount)}`}
      </TableCell>

      <TableCell className="border">
        <span className="flex items-center gap-1.5 text-xs">
          {MethodIcon && <MethodIcon size={14} className="shrink-0" />}
          {method?.label}
        </span>
      </TableCell>

      <TableCell className="border">
        <Badge variant={statusVariant} className="capitalize">
          {statusLabel}
        </Badge>
      </TableCell>

      <TableCell className="border">
        <Button asChild variant="outline" size="sm" className="h-7 text-xs">
          <Link to={`/super-admin/orders/${packageInvoice?.invoice_number}`}>
            View
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  );
}
