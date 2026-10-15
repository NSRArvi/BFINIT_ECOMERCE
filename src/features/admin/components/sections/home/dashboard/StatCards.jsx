import { ChartColumn, ShoppingCart, Users } from "lucide-react";
import StatCard from "./StatCard";
import StatCardsSkeleton from "../../../skeletons/StatCardsSkeleton";
import useGetStorePreference from "@/features/admin/hooks/store/useGetStorePreference";
import { formatNumber } from "@/utils/formatNumber";
import { formatPrice } from "@/utils/formatPrice";
import { getCurrencySymbol } from "@/utils/currencyHelpers";

export default function StatCards() {
  const { data: storePreference, isLoading: isStorePreferenceLoading } =
    useGetStorePreference();

  const orders = [];

  const currencySymbol = getCurrencySymbol(storePreference);
  const totalCustomers = 0; //TODO: make it dynamic
  const totalOrders = orders?.data?.length || 0;

  const totalSales =
    orders?.data?.reduce((accumulator, currOrder) => {
      const amount = parseFloat(
        currOrder?.pricingSummary?.grandTotal?.$numberDecimal || 0,
      );
      return accumulator + amount;
    }, 0) || 0;

  if (isStorePreferenceLoading) {
    return <StatCardsSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <StatCard
        icon={ChartColumn}
        label="Total Sales"
        value={formatPrice(totalSales, currencySymbol)}
      />
      <StatCard
        icon={ShoppingCart}
        label="Total Orders"
        value={formatNumber(totalOrders)}
      />
      <StatCard
        icon={Users}
        label="Total Customers"
        value={formatNumber(totalCustomers)}
      />
    </div>
  );
}
