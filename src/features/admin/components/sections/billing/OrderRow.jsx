import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/utils/formatDate";
import { formatDecimal } from "@/utils/format/formatDecimal";
import { orderStatusVariantConfig } from "@/config/orderStatusVariantConfig";
import { paymentMethodConfig } from "@/config/paymentMethodConfig";

const invoiceTypeCopy = {
  initial: "First purchase",
  upgrade: "Plan upgrade",
  downgrade: "Plan downgrade",
  renewal: "Plan renewal",
};

export default function OrderRow({ order }) {
  const { package: packageInfo, packageInvoice } = order ?? {};

  const isTrial = packageInvoice?.payment_method === "trial";
  const trialExpired = isTrial && order.status === "expired";

  const statusLabel = isTrial
    ? trialExpired
      ? "expired"
      : "active"
    : packageInvoice?.status;

  const statusVariant = orderStatusVariantConfig[statusLabel];
  const method = paymentMethodConfig[packageInvoice?.payment_method];
  const MethodIcon = method?.icon;

  return (
    <TableRow>
      <TableCell className="w-32 border text-xs">
        #{packageInvoice?.invoice_number}
      </TableCell>

      <TableCell className="space-y-1 border text-xs">
        <p>{packageInfo?.package_name}</p>
        <p className="text-muted-foreground">
          {invoiceTypeCopy[packageInvoice?.invoice_type]}
        </p>
      </TableCell>

      <TableCell className="w-28 border text-right text-xs">
        <p>
          {Number(packageInvoice?.payment_amount) === 0
            ? "Free"
            : `€${formatDecimal(packageInvoice?.payment_amount)}`}
        </p>
      </TableCell>

      <TableCell className="w-32 border text-xs">
        {formatDate(packageInvoice?.created_at)}
      </TableCell>

      <TableCell className="w-44 border text-xs">
        <span className="flex items-center gap-1.5 text-xs">
          {MethodIcon && <MethodIcon size={14} className="shrink-0" />}
          {method?.label}
        </span>
      </TableCell>

      <TableCell className="w-24 border text-center text-xs">
        <Badge variant={statusVariant} className="capitalize">
          {statusLabel}
        </Badge>
      </TableCell>
    </TableRow>
  );
}
