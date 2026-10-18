import { Link, useParams } from "react-router";
import {
  Package,
  MapPin,
  CreditCard,
  ShoppingBag,
  ArrowLeft,
  StickyNote,
} from "lucide-react";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const ORDER_STATUSES = {
  0: { label: "Pending Payment", variant: "secondary" },
  1: { label: "Pending", variant: "secondary" },
  2: { label: "Processing", variant: "default" },
  3: { label: "Ready for Delivery", variant: "default" },
  4: { label: "Delivered", variant: "default" },
  5: { label: "Cancelled", variant: "destructive" },
  6: { label: "Returned", variant: "destructive" },
};

const PAYMENT_METHODS = {
  cod: "Cash on Delivery",
};

const IMAGE_BASE_URL = import.meta.env.VITE_API_URL || "";

const getStatus = (status) =>
  ORDER_STATUSES[status] || { label: `Status ${status}`, variant: "outline" };

const getPaymentMethodLabel = (method) =>
  PAYMENT_METHODS[method] || method?.toUpperCase() || "N/A";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatMoney = (value, currency = "BDT") => {
  const num = Number(value);
  if (Number.isNaN(num)) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(num);
};

function InfoRow({ label, children }) {
  return (
    <div className="space-y-1">
      <p className="text-muted-foreground text-xs">{label}</p>
      <div className="text-foreground text-sm">{children || "N/A"}</div>
    </div>
  );
}

export default function OrderDetails() {
  const { orderId } = useParams();

  const { data: orderData, isLoading } = useGetQuery({
    endpoint: `/api/v1/order/${orderId}`,
    enabled: !!orderId,
    isTokenRequired: true,
    queryKey: ["orders", orderId],
  });

  if (isLoading) {
    return (
      <section className="space-y-6">
        <Card>
          <CardContent className="space-y-4 p-6">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
      </section>
    );
  }

  const order = orderData?.data;

  if (!order) {
    return (
      <section className="space-y-6">
        <Button variant="ghost" size="sm" asChild className="text-xs">
          <Link to="/orders">
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
            Back to Orders
          </Link>
        </Button>
        <Card>
          <CardContent className="text-muted-foreground p-6 text-center text-sm">
            Order not found.
          </CardContent>
        </Card>
      </section>
    );
  }

  const status = getStatus(order.status);
  const currency = order.currency || "BDT";
  const isPaid = !!order.paid_at;

  const addressLine = [
    order.shipping_city,
    order.shipping_state,
    order.shipping_postal_code,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <section className="space-y-6">
      {/* Back Button */}
      <div>
        <Button variant="ghost" size="sm" asChild className="text-xs">
          <Link to="/orders">
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
            Back to Orders
          </Link>
        </Button>
      </div>

      {/* Order Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Package className="text-muted-foreground h-5 w-5" />
                <h1 className="text-foreground text-xl font-semibold">
                  {order.order_number}
                </h1>
              </div>
              <p className="text-muted-foreground text-sm">
                Placed on {formatDate(order.created_at)}
              </p>
            </div>
            <div className="space-y-2 sm:text-right">
              <div className="flex items-center gap-2 sm:justify-end">
                <span className="text-muted-foreground text-xs">
                  Order Status:
                </span>
                <Badge variant={status.variant} className="text-xs">
                  {status.label}
                </Badge>
              </div>
              <div className="flex items-center gap-2 sm:justify-end">
                <span className="text-muted-foreground text-xs">Payment:</span>
                <Badge
                  variant={isPaid ? "default" : "secondary"}
                  className="text-xs"
                >
                  {isPaid ? "Paid" : "Unpaid"}
                </Badge>
              </div>
              <p className="text-foreground pt-1 text-lg font-semibold">
                {formatMoney(order.total_amount, currency)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Shipping Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="text-muted-foreground h-4 w-4" />
              Shipping Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <InfoRow label="Customer ID">#{order.user_id}</InfoRow>
            <InfoRow label="Phone">{order.phone}</InfoRow>

            <Separator />

            <InfoRow label="Shipping Address">
              <div className="space-y-1">
                <p>{order.shipping_address}</p>
                {addressLine && <p>{addressLine}</p>}
              </div>
            </InfoRow>

            {order.note && (
              <>
                <Separator />
                <div className="space-y-1">
                  <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                    <StickyNote className="h-3 w-3" />
                    Customer Note
                  </p>
                  <p className="text-foreground text-sm">{order.note}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Payment Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CreditCard className="text-muted-foreground h-4 w-4" />
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <InfoRow label="Payment Method">
              <span className="font-medium">
                {getPaymentMethodLabel(order.payment_method)}
              </span>
            </InfoRow>
            <InfoRow label="Payment Type">
              <span className="capitalize">{order.payment_type}</span>
            </InfoRow>
            {order.transaction_id && (
              <InfoRow label="Transaction ID">{order.transaction_id}</InfoRow>
            )}
            {isPaid && (
              <InfoRow label="Paid At">{formatDate(order.paid_at)}</InfoRow>
            )}

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">
                  {formatMoney(order.sub_total, currency)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span className="text-foreground">
                  {formatMoney(order.delivery_fee, currency)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between text-base font-semibold">
                <span className="text-foreground">Total</span>
                <span className="text-foreground">
                  {formatMoney(order.total_amount, currency)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ShoppingBag className="text-muted-foreground h-4 w-4" />
            Order Items
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-border divide-y">
            {order.ecomOrderItems?.map((item) => (
              <div
                key={item.id}
                className="hover:bg-muted/30 flex items-center gap-4 p-4 transition-colors"
              >
                <div className="bg-muted flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-md border">
                  {item.product?.image ? (
                    <img
                      src={`${IMAGE_BASE_URL}${item.product.image}`}
                      alt={item.product?.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Package className="text-muted-foreground h-5 w-5" />
                  )}
                </div>

                <div className="min-w-0 flex-1 space-y-1">
                  <Link
                    to={`/products/${item.product_id}`}
                    className="text-foreground hover:text-primary block truncate text-sm font-medium transition-colors"
                  >
                    {item.product?.name || `Product #${item.product_id}`}
                  </Link>
                  <p className="text-muted-foreground text-xs">
                    Quantity: {item.quantity}
                  </p>
                  {item.product_variant_combination_id && (
                    <p className="text-muted-foreground text-xs">
                      Variant #{item.product_variant_combination_id}
                    </p>
                  )}
                </div>

                <div className="space-y-1 text-right">
                  <p className="text-muted-foreground text-xs">
                    {formatMoney(item.unit_price, currency)} × {item.quantity}
                  </p>
                  <p className="text-foreground text-sm font-semibold">
                    {formatMoney(item.total_price, currency)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
