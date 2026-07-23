import { Link, useParams } from "react-router";
import {
  Package,
  MapPin,
  CreditCard,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";
import useAuth from "@/hooks/auth/useAuth";
import useGetQuery from "@/hooks/api/useGetQuery";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

// Status configurations
const ORDER_STATUSES = [
  { value: "PLACED", label: "Placed", variant: "secondary" },
  { value: "CONFIRMED", label: "Confirmed", variant: "default" },
  { value: "PROCESSING", label: "Processing", variant: "default" },
  { value: "SHIPPED", label: "Shipped", variant: "default" },
  { value: "DELIVERED", label: "Delivered", variant: "default" },
  { value: "CANCELLED", label: "Cancelled", variant: "destructive" },
];

const DELIVERY_STATUSES = [
  { value: "PENDING", label: "Pending", variant: "secondary" },
  { value: "IN_TRANSIT", label: "In Transit", variant: "default" },
  { value: "OUT_FOR_DELIVERY", label: "Out for Delivery", variant: "default" },
  { value: "DELIVERED", label: "Delivered", variant: "default" },
  { value: "FAILED", label: "Failed", variant: "destructive" },
  { value: "RETURNED", label: "Returned", variant: "destructive" },
];

function getStatusVariant(status, statusList) {
  const found = statusList.find((s) => s.value === status);
  return found ? found.variant : "secondary";
}

function getStatusLabel(status, statusList) {
  const found = statusList.find((s) => s.value === status);
  return found ? found.label : status;
}

export default function OrderDetails() {
  const { orderId } = useParams();
  const { user } = useAuth();

  const { data: orderData, isLoading } = useGetQuery({
    endpoint: `/api/v1/order/${orderId}`,
    token: user?.token,
    clientId: user?.data?.clientid,
    queryKey: ["orders", orderId],
    enabled: !!orderId && !!user?.token,
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
  const shipping = order?.ShippingDetails;

  // Calculate order total
  const orderTotal = order?.Products?.reduce((sum, product) => {
    return sum + parseFloat(product?.lineTotal?.$numberDecimal || 0);
  }, 0);

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
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Package className="text-muted-foreground h-5 w-5" />
                <h1 className="text-foreground text-xl font-semibold">
                  Order #{orderId}
                </h1>
              </div>
              <p className="text-muted-foreground text-sm">
                Placed on {formatDate(order?.createdAt)}
              </p>
            </div>
            <div className="space-y-2 text-right">
              <div className="flex items-center justify-end gap-2">
                <span className="text-muted-foreground text-xs">
                  Order Status:
                </span>
                <Badge
                  variant={getStatusVariant(order?.orderStatus, ORDER_STATUSES)}
                  className="text-xs"
                >
                  {getStatusLabel(order?.orderStatus, ORDER_STATUSES)}
                </Badge>
              </div>
              <div className="flex items-center justify-end gap-2">
                <span className="text-muted-foreground text-xs">
                  Delivery Status:
                </span>
                <Badge
                  variant={getStatusVariant(
                    order?.deliveryStatus,
                    DELIVERY_STATUSES,
                  )}
                  className="text-xs"
                >
                  {getStatusLabel(order?.deliveryStatus, DELIVERY_STATUSES)}
                </Badge>
              </div>
              <p className="text-foreground mt-2 text-lg font-semibold">
                ${orderTotal?.toFixed(2)}
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
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs">Customer Name</p>
              <p className="text-foreground text-sm font-medium">
                {shipping?.name}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-muted-foreground text-xs">Email</p>
              <p className="text-foreground text-sm">{shipping?.email}</p>
            </div>

            <div className="space-y-1">
              <p className="text-muted-foreground text-xs">Phone</p>
              <p className="text-foreground text-sm">{shipping?.phone}</p>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-muted-foreground text-xs font-medium">
                Shipping Address
              </p>
              <div className="text-foreground space-y-1 text-sm">
                <p>{shipping?.addressLine1}</p>
                {shipping?.addressLine2 && <p>{shipping?.addressLine2}</p>}
                <p>
                  {shipping?.city}, {shipping?.state && `${shipping?.state}, `}
                  {shipping?.zipCode}
                </p>
                <p>{shipping?.country}</p>
              </div>
            </div>
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
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs">Payment Method</p>
              <p className="text-foreground text-sm font-medium">
                {order?.PaymentMethod || "N/A"}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-muted-foreground text-xs">Payment Status</p>
              <Badge variant="secondary" className="text-xs">
                {order?.paymentStatus || "Pending"}
              </Badge>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">
                  ${orderTotal?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span className="text-foreground">$0.00</span>
              </div>
              <Separator />
              <div className="flex justify-between text-base font-semibold">
                <span className="text-foreground">Total</span>
                <span className="text-foreground">
                  ${orderTotal?.toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ShoppingBag className="text-muted-foreground h-4 w-4" />
            Order Items
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-border divide-y">
            {order?.Products?.map((product) => (
              <div
                key={product?._id}
                className="hover:bg-muted/30 p-4 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <Link
                      to={`/products/${product?.productId}`}
                      className="text-foreground hover:text-primary text-sm font-medium transition-colors"
                    >
                      {product?.productName}
                    </Link>
                    <p className="text-muted-foreground text-xs">
                      Quantity: {product?.quantity}
                    </p>
                    {product?.variant && (
                      <p className="text-muted-foreground text-xs">
                        Variant: {product?.variant}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="text-muted-foreground text-xs">
                      $
                      {parseFloat(product?.unitPrice?.$numberDecimal).toFixed(
                        2,
                      )}{" "}
                      × {product?.quantity}
                    </p>
                    <p className="text-foreground text-sm font-semibold">
                      $
                      {parseFloat(product?.lineTotal?.$numberDecimal).toFixed(
                        2,
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
