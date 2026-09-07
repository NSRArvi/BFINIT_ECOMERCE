import { Link } from "react-router";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import OrderRow from "../components/sections/billing/OrderRow";
import PageHeader from "@/components/shared/PageHeader";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import usePackageInfo from "../hooks/usePackageInfo";
import usePackageUsage from "../hooks/usePackageUsage";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import { breadcrubms } from "../utils/constants/breadcrumbs";
import { formatDate } from "@/utils/formatDate";
import { formatDecimal } from "@/utils/format/formatDecimal";
import { cn } from "@/lib/utils";

const tableHeaders = [
  { label: "Invoice", className: "text-left" },
  { label: "Package", className: "text-left" },
  { label: "Price", className: "text-right" },
  { label: "Ordered", className: "text-left" },
  { label: "Method", className: "text-left" },
  { label: "Status", className: "text-center" },
];

export default function Billing() {
  const { data: packageInfo } = usePackageInfo();
  const { data: usageData } = usePackageUsage();

  const { data } = useGetQuery({
    endpoint: "/api/v1/package-order/user-orders",
    enabled: true,
    isTokenRequired: true,
    queryKey: ["orders"],
  });

  const expireDate = packageInfo?.data?.package_upgrade?.expire_at;
  const monthlyPrice =
    packageInfo?.data?.package_upgrade?.subscriptionPeriod?.price;

  const storeLimit = usageData?.data?.stores?.limit;
  const storeUsed = usageData?.data?.stores?.used;
  const productLimit = usageData?.data?.products?.limit;
  const productUsed = usageData?.data?.products?.used;

  const orders = data?.data ?? [];

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.billing} />
      <PageHeader
        icon={CreditCard}
        title="Billing"
        description="View your plan, usage and payment history"
      />

      {/* current plan */}
      <div className="bg-background rounded-lg border px-5 py-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs">Current plan</p>
              <p className="text-sm font-medium">
                {packageInfo?.data?.package_upgrade?.package?.package_name}
              </p>
            </div>
            <p className="text-muted-foreground text-xs">
              <span>€{formatDecimal(monthlyPrice, "€")}/mo</span> <span>·</span>{" "}
              <span>Renews {formatDate(expireDate)}</span>
            </p>
          </div>
          <Button asChild size="sm">
            <Link to="/account/billing/plans">Upgrade plan</Link>
          </Button>
        </div>
      </div>

      {/* stores and products usage */}
      <div className="bg-background rounded-lg border px-5 py-4">
        <p className="text-muted-foreground mb-2 text-xs">Usage</p>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Stores</p>
              <p className="text-muted-foreground text-xs">
                {storeUsed} of {storeLimit}
              </p>
            </div>
            <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
              <div
                style={{ width: `${(storeUsed / storeLimit) * 100}%` }}
                className="bg-foreground h-full"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Products</p>
              <p className="text-muted-foreground text-xs">
                {productUsed} of {productLimit}
              </p>
            </div>
            <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
              <div
                style={{ width: `${(productUsed / productLimit) * 100}%` }}
                className="bg-foreground h-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* payment history */}
      <div className="bg-background space-y-2 rounded-lg border px-5 py-4">
        <p className="text-sm font-medium">Payment history</p>

        <Table>
          <TableHeader>
            <TableRow className="bg-card hover:bg-transparent">
              {tableHeaders.map(({ label, className }) => (
                <TableHead
                  key={label}
                  className={cn(
                    "text-muted-foreground border text-xs font-medium",
                    className,
                  )}
                >
                  {label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order) => (
              <OrderRow
                key={order?.packageInvoice?.invoice_number}
                order={order}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
