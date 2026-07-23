import { ShoppingCart } from "lucide-react";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import PageHeader from "../components/PageHeader";
import useSelectedStore from "@/hooks/useSelectedStore";
import EmptyStoreState from "../components/EmptyStoreState";
import { breadcrubms } from "@/utils/constants/breadcrumbs";
import OrdersTableSkeleton from "../components/skeletons/OrdersTableSkeleton";
import OrdersTable from "../components/sections/orders/OrdersTable";
import OrdersToolbar from "../components/sections/orders/OrdersToolbar";
import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import OrdersToolsSkeleton from "../components/skeletons/OrdersToolsSkeleton";
import EmptyState from "../components/EmptyState";
import useGetQuery from "@/hooks-v2/api/useGetQuery";

export default function Orders() {
  const { activeStore } = useSelectedStore();

  const { data, isLoading } = useGetQuery({
    endpoint: "/api/v1/order",
    enabled: true,
    isTokenRequired: true,
    queryKey: ["orders"],
  });

  const orders = data?.data ?? [];

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const filteredOrders =
    orders?.filter((order) => {
      const searchTerm = debouncedSearch?.trim()?.toLowerCase();
      if (!searchTerm) return true;

      return (
        order?.orderId?.toLowerCase().includes(searchTerm) ||
        order?.shippingDetails?.name?.toLowerCase().includes(searchTerm) ||
        order?.shippingDetails?.email?.toLowerCase().includes(searchTerm)
      );
    }) ?? [];

  let content = null;

  if (!activeStore) {
    return (
      <EmptyStoreState
        title="No Orders Yet"
        description="Create your store to start receiving and managing customer orders."
      />
    );
  }

  if (isLoading) {
    content = (
      <>
        <OrdersToolsSkeleton />
        <OrdersTableSkeleton />
      </>
    );
  }

  if (!isLoading && filteredOrders?.length > 0) {
    content = (
      <>
        <OrdersToolbar search={search} setSearch={setSearch} />
        <OrdersTable orders={filteredOrders} />
      </>
    );
  }

  if (!isLoading && !filteredOrders?.length > 0) {
    content = (
      <>
        <OrdersToolbar search={search} setSearch={setSearch} />
        <EmptyState
          icon={ShoppingCart}
          title={debouncedSearch ? "No orders found" : "No orders yet"}
          description={
            debouncedSearch
              ? `No orders match "${debouncedSearch}"`
              : "Orders will appear here when customers make a purchase"
          }
        />
      </>
    );
  }

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.orders} />

      <PageHeader
        icon={ShoppingCart}
        title="Orders"
        description="View and manage customer orders"
      />

      <div className="bg-card space-y-6 rounded-lg pt-5">{content} </div>
    </section>
  );
}
