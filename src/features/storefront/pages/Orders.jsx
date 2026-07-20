import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import useBasePath from "@/hooks/useBasePath";
import useCustomerGetQuery from "@/features/storefront/hooks/useCustomerGetQuery";
import { formatPrice } from "@/utils/formatPrice";
import useCustomerAuth from "@/features/storefront/hooks/useCustomerAuth";
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
  });
}

function OrderItemThumbnails({ items }) {
  const visibleItems = items.slice(0, 3);
  const remainingCount = items.length - visibleItems.length;

  return (
    <div className="flex items-center gap-2">
      {visibleItems.map((item) => (
        <img
          key={item.id}
          src={getImgUrl(item.product?.image)}
          alt={item.product?.name}
          className="border-border bg-muted h-16 w-16 shrink-0 border object-cover"
        />
      ))}
      {remainingCount > 0 && (
        <div className="border-border bg-muted text-muted-foreground flex h-16 w-16 shrink-0 items-center justify-center border text-sm font-medium">
          +{remainingCount}
        </div>
      )}
    </div>
  );
}

function OrderRowSkeleton() {
  return (
    <div className="flex items-center justify-between py-8">
      <div className="flex items-center gap-6">
        <Skeleton className="h-16 w-16" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-28" />
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const { customerData } = useCustomerAuth();
  const basePath = useBasePath();

  const { data, isLoading } = useCustomerGetQuery({
    endpoint: `/api/v1/order/user/${customerData?.id}`,
    enabled: !!customerData?.id,
    isTokenRequired: true,
    queryKey: ["storefront", "orders"],
  });

  const orders = data?.data ?? [];

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
        <h1 className="text-2xl font-medium">My Orders</h1>
        <div className="divide-border mt-10 divide-y">
          {Array.from({ length: 3 }).map((_, index) => (
            <OrderRowSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 px-6 py-32 text-center">
        <p className="text-base font-medium">No orders yet</p>
        <p className="text-muted-foreground text-sm">
          Your order history will show up here once you place an order.
        </p>
        <Link
          to={basePath}
          className="text-primary mt-2 text-sm font-medium underline underline-offset-4"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
      <h1 className="text-2xl font-medium">My Orders</h1>

      <div className="divide-border mt-10 divide-y">
        {orders.map((order) => {
          const status = getOrderStatus(order.status);
          const itemCount = order.ecomOrderItems.length;

          return (
            <Link
              key={order.id}
              to={`${basePath}/orders/${order.id}`}
              className="hover:bg-muted/40 group flex items-center justify-between gap-6 py-8 transition-colors"
            >
              <div className="flex items-center gap-6">
                <OrderItemThumbnails items={order.ecomOrderItems} />

                <div className="space-y-1.5">
                  <p className="text-base font-medium">{order.order_number}</p>
                  <p className="text-muted-foreground text-sm">
                    {formatOrderDate(order.created_at)} · {itemCount}{" "}
                    {itemCount === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="flex flex-col items-end gap-2">
                  <Badge className={`rounded-none ${status.className}`}>
                    {status.label}
                  </Badge>
                  <p className="text-base font-medium">
                    {formatPrice(order.total_amount, order.currency)}
                  </p>
                </div>

                <ChevronRight
                  className="text-muted-foreground group-hover:text-foreground h-5 w-5 shrink-0 transition-colors"
                  strokeWidth={1.5}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
