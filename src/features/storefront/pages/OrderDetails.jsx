import { Link, useParams } from "react-router";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import useBasePath from "@/hooks/useBasePath";
import useCustomerGetQuery from "@/features/storefront/hooks/useCustomerGetQuery";
import { formatPrice } from "@/utils/formatPrice";
import { getImgUrl } from "@/utils/getImgUrl";

const ORDER_STATUS_CONFIG = {
  0: { label: "Pending", className: "bg-muted text-muted-foreground" },
  1: { label: "Processing", className: "bg-info text-info-foreground" },
  2: { label: "Completed", className: "bg-success text-success-foreground" },
  3: {
    label: "Cancelled",
    className: "bg-destructive text-destructive-foreground",
  },
};

function getOrderStatus(status) {
  return (
    ORDER_STATUS_CONFIG[status] ?? {
      label: "Unknown",
      className: "bg-muted text-muted-foreground",
    }
  );
}

function formatOrderDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatPaymentType(paymentType) {
  if (!paymentType) return "—";
  return paymentType.charAt(0).toUpperCase() + paymentType.slice(1);
}

function OrderItemRow({ item }) {
  return (
    <div className="flex items-center gap-6 py-6">
      <img
        src={getImgUrl(item.product?.image)}
        alt={item.product?.name}
        className="border-border bg-muted h-20 w-20 shrink-0 border object-cover"
      />

      <div className="min-w-0 flex-1 space-y-1">
        <p className="text-sm font-medium">{item.product?.name}</p>
        <p className="text-muted-foreground text-sm">Qty {item.quantity}</p>
      </div>

      <div className="text-right">
        <p className="text-sm font-medium">
          {formatPrice(item.total_price, "")}
        </p>
        {Number(item.quantity) > 1 && (
          <p className="text-muted-foreground text-xs">
            {formatPrice(item.unit_price, "")} each
          </p>
        )}
      </div>
    </div>
  );
}

function SummaryRow({ label, value, emphasis }) {
  return (
    <div className="flex items-center justify-between py-2">
      <p
        className={
          emphasis ? "text-sm font-medium" : "text-muted-foreground text-sm"
        }
      >
        {label}
      </p>
      <p className={emphasis ? "text-sm font-medium" : "text-sm"}>{value}</p>
    </div>
  );
}

function DetailBlock({ title, children }) {
  return (
    <div className="border-border border-t py-6">
      <p className="mb-3 text-sm font-medium">{title}</p>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function OrderDetailsSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="mt-6 h-8 w-56" />
      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]">
        <div className="divide-border divide-y">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="flex items-center gap-6 py-6">
              <Skeleton className="h-20 w-20" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
        <Skeleton className="h-80 w-full" />
      </div>
    </div>
  );
}

export default function OrderDetails() {
  const { orderId } = useParams();
  const basePath = useBasePath();

  const { data, isLoading } = useCustomerGetQuery({
    endpoint: `/api/v1/order/${orderId}`,
    enabled: !!orderId,
    isTokenRequired: true,
    queryKey: ["storefront", "order", orderId],
  });

  if (isLoading) {
    return <OrderDetailsSkeleton />;
  }

  const order = data?.data;

  if (!order) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 px-6 py-32 text-center">
        <p className="text-base font-medium">Order not found</p>
        <Link
          to={`${basePath}/orders`}
          className="text-primary text-sm font-medium underline underline-offset-4"
        >
          Back to orders
        </Link>
      </div>
    );
  }

  const status = getOrderStatus(order.status);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
      <Link
        to={`${basePath}/orders`}
        className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm transition-colors"
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
        Back to orders
      </Link>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-medium">{order.order_number}</h1>
          <p className="text-muted-foreground text-sm">
            Placed on {formatOrderDate(order.created_at)}
          </p>
        </div>
        <Badge className={`rounded-none ${status.className}`}>
          {status.label}
        </Badge>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]">
        {/* Items */}
        <div className="divide-border divide-y">
          {order.ecomOrderItems.map((item) => (
            <OrderItemRow key={item.id} item={item} />
          ))}
        </div>

        {/* Summary */}
        <div>
          <div className="space-y-1">
            <SummaryRow
              label="Subtotal"
              value={formatPrice(order.sub_total, order.currency)}
            />
            <SummaryRow
              label="Delivery Fee"
              value={
                Number(order.delivery_fee) === 0
                  ? "Free"
                  : formatPrice(order.delivery_fee, order.currency)
              }
            />
          </div>

          <div className="border-border mt-3 border-t pt-3">
            <SummaryRow
              label="Total"
              value={formatPrice(order.total_amount, order.currency)}
              emphasis
            />
          </div>

          <DetailBlock title="Shipping Details">
            <p className="text-sm">{order.shipping_address}</p>
            <p className="text-muted-foreground text-sm">{order.phone}</p>
          </DetailBlock>

          <DetailBlock title="Payment">
            <SummaryRow
              label="Method"
              value={formatPaymentType(order.payment_type)}
            />
            {order.transaction_id && (
              <SummaryRow label="Transaction ID" value={order.transaction_id} />
            )}
            {order.paid_at && (
              <SummaryRow
                label="Paid On"
                value={formatOrderDate(order.paid_at)}
              />
            )}
          </DetailBlock>

          {order.note && (
            <DetailBlock title="Note">
              <p className="text-sm">{order.note}</p>
            </DetailBlock>
          )}
        </div>
      </div>
    </div>
  );
}
