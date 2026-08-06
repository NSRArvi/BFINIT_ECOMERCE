import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import useGetStorePreference from "@/features/admin/hooks/store/useGetStorePreference";
import { formatPrice } from "@/utils/formatPrice";
import { Link } from "react-router";
import { ShoppingBag } from "lucide-react";
import { getCurrencySymbol } from "@/utils/currencyHelpers";

const DELIVERY_STATUSES = {
  PENDING: "Pending",
  IN_TRANSIT: "In Transit",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
  FAILED: "Failed",
  RETURNED: "Returned",
};

const STATUS_STYLES = {
  PENDING: "bg-orange-100 text-orange-700 hover:bg-orange-100",
  IN_TRANSIT: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  OUT_FOR_DELIVERY: "bg-purple-100 text-purple-700 hover:bg-purple-100",
  DELIVERED: "bg-green-100 text-green-700 hover:bg-green-100",
  FAILED: "bg-red-100 text-red-700 hover:bg-red-100",
  RETURNED: "bg-gray-100 text-gray-700 hover:bg-gray-100",
};

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function RecentOrders() {
  const { data: storePreference } = useGetStorePreference();
  const orders = [];

  const currencySymbol = getCurrencySymbol(storePreference);
  const hasOrders = orders?.data && orders.data.length > 0;

  return (
    <div className="bg-card col-span-full rounded-lg border lg:col-span-8">
      <div className="flex items-center justify-between px-4 py-6">
        <h3 className="text-lg font-semibold">Recent Orders</h3>
        {hasOrders && (
          <Link
            to="/orders"
            className="text-primary text-sm font-semibold hover:underline"
          >
            View all orders
          </Link>
        )}
      </div>

      {!hasOrders ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-muted/50 mb-4 rounded-full p-6">
            <ShoppingBag className="text-muted-foreground h-12 w-12" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">No orders yet</h3>
          <p className="text-muted-foreground mb-6 text-sm">
            Your recent orders will appear here once customers start placing
            orders.
          </p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="text-muted-foreground text-xs font-semibold uppercase">
                Order ID
              </TableHead>
              <TableHead className="text-muted-foreground text-xs font-semibold uppercase">
                Customer
              </TableHead>
              <TableHead className="text-muted-foreground text-xs font-semibold uppercase">
                Amount
              </TableHead>
              <TableHead className="text-muted-foreground text-xs font-semibold uppercase">
                Delivery Status
              </TableHead>
              <TableHead className="text-muted-foreground text-xs font-semibold uppercase">
                Date
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders?.data?.map((order) => (
              <TableRow key={order?._id} className="hover:bg-muted/30">
                <TableCell className="py-3.5 font-medium">
                  {order?.orderId}
                </TableCell>
                <TableCell className="py-3.5">
                  {order?.shippingDetails?.name}
                </TableCell>
                <TableCell className="py-3.5 font-medium">
                  {formatPrice(
                    order?.pricingSummary?.grandTotal,
                    currencySymbol,
                  )}
                </TableCell>
                <TableCell className="py-3.5">
                  <Badge
                    variant="secondary"
                    className={STATUS_STYLES[order?.deliveryStatus]}
                  >
                    {DELIVERY_STATUSES[order?.deliveryStatus]}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground py-3.5">
                  {formatDate(order?.createdAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
