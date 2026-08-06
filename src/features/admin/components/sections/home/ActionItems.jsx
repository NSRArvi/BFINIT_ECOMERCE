import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, CreditCard, Building2 } from "lucide-react";
import { Link } from "react-router";
import { useMemo } from "react";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import useAuth from "@/hooks/auth/useAuth";
import useSelectedStore from "@/hooks/useSelectedStore";

export default function ActionItems() {
  const { user } = useAuth();
  const { selectedStore } = useSelectedStore();

  const { data } = useGetQuery({
    endpoint: `/payments/stripe/client`,
    token: user?.token,
    clientId: user?.data?.clientid,
    queryKey: ["stripeConnectionInfo", user?.token, user?.data?.clientid],
    enabled: !!user?.token && !!user?.data?.clientid,
  });

  const { data: bankPayment } = useGetQuery({
    endpoint: `/bankpayment/${selectedStore?.storeId}`,
    token: true,
    clientId: true,
    queryKey: ["bankpayment", selectedStore?.storeId],
    enabled: !!selectedStore?.storeId,
  });

  const { data: domainData } = useGetQuery({
    endpoint: `/publish/status/${selectedStore?.storeId}`,
    token: user?.token,
    clientId: user?.data?.clientid,
    queryKey: ["/publish/status", selectedStore?.storeId],
    enabled: !!selectedStore?.storeId,
  });

  const currentStore =
    data?.data?.length > 0 &&
    data?.data?.find((status) => status.storeId === selectedStore?.storeId);

  // Count orders with pending delivery
  const pendingDeliveryCount = useMemo(() => {
    const orders = [];

    if (!orders?.data) return 0;
    return orders.data.filter((order) => order.deliveryStatus === "PENDING")
      .length;
  }, []);

  const isStripeConnected =
    currentStore?.payouts_enabled && currentStore?.charges_enabled;
  const isBankConnected = bankPayment?.data?.isActive;
  const isDomainConnected = domainData?.messag === "Domain Record Found";

  return (
    <Card className="col-span-full shadow-none lg:col-span-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg font-bold">Action Items</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Pending Delivery */}
        {pendingDeliveryCount > 0 && (
          <div className="hover:bg-muted/50 flex items-start gap-4 rounded-lg border p-4 transition-colors">
            <div className="mt-0.5">
              <AlertCircle className="text-warning h-4 w-4" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm leading-none font-semibold">
                {pendingDeliveryCount}{" "}
                {pendingDeliveryCount === 1 ? "order" : "orders"} pending
                delivery
              </p>
              <p className="text-muted-foreground text-xs">Awaiting shipment</p>
              <Link to="/orders">
                <Button
                  variant="link"
                  className="text-primary h-auto p-0 text-xs font-semibold"
                >
                  Take Action →
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Stripe Not Connected */}
        {!isStripeConnected && (
          <div className="hover:bg-muted/50 flex items-start gap-4 rounded-lg border p-4 transition-colors">
            <div className="mt-0.5">
              <CreditCard className="text-warning h-4 w-4" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm leading-none font-semibold">
                Connect Stripe
              </p>
              <p className="text-muted-foreground text-xs">
                Enable online payments for your store
              </p>
              <Link to="/payments/stripe">
                <Button
                  variant="link"
                  className="text-primary h-auto p-0 text-xs font-semibold"
                >
                  Take Action →
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Bank Not Connected */}
        {!isBankConnected && (
          <div className="hover:bg-muted/50 flex items-start gap-4 rounded-lg border p-4 transition-colors">
            <div className="mt-0.5">
              <Building2 className="text-info h-4 w-4" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm leading-none font-semibold">
                Connect bank account
              </p>
              <p className="text-muted-foreground text-xs">
                Set up direct bank transfers
              </p>
              <Link to="/payments/bank">
                <Button
                  variant="link"
                  className="text-primary h-auto p-0 text-xs font-semibold"
                >
                  Take Action →
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Domain Expiring */}
        {!isDomainConnected && (
          <div className="hover:bg-muted/50 flex items-start gap-4 rounded-lg border p-4 transition-colors">
            <div className="mt-0.5">
              <AlertCircle className="text-destructive h-4 w-4" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm leading-none font-semibold">
                Connect custom domain
              </p>
              <p className="text-muted-foreground text-xs">
                Set up your store's domain
              </p>
              <Link to="/domains">
                <Button
                  variant="link"
                  className="text-primary h-auto p-0 text-xs font-semibold"
                >
                  Take Action →
                </Button>
              </Link>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
