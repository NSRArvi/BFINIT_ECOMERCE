import { Bitcoin, Building2, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/utils/formatDate";
import { formatDecimal } from "@/utils/format/formatDecimal";
import { orderStatusVariantConfig } from "@/features/super-admin/utils/constants/orderStatusVariantConfig";

const paymentConfig = {
  stripe: { label: "Stripe", icon: CreditCard },
  bank_transfer: { label: "Bank Transfer", icon: Building2 },
  solana: { label: "Crypto", icon: Bitcoin },
};

const invoiceTypeCopy = {
  initial: "First purchase",
  upgrade: "Plan upgrade",
  downgrade: "Plan downgrade",
  renewal: "Plan renewal",
};

export default function OrderRow({ order }) {
  const { package: packageInfo, packageInvoice } = order ?? {};

  const method = paymentConfig[packageInvoice?.payment_method];
  const MethodIcon = method?.icon;
  const statusVariant = orderStatusVariantConfig[packageInvoice?.status];

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
        <p>€{formatDecimal(packageInvoice?.payment_amount)}</p>
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
          {packageInvoice?.status}
        </Badge>
      </TableCell>
    </TableRow>
  );
}
