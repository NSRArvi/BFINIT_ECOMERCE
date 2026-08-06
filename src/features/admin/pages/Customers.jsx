import useSelectedStore from "@/hooks/useSelectedStore";
import EmptyStoreState from "../components/EmptyStoreState";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import { Users } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { breadcrubms } from "@/utils/constants/breadcrumbs";
import CustomerTable from "../components/sections/customers/CustomerTable";
import { useState } from "react";
import EmptyState from "../components/EmptyState";
import CustomersToolsSkeleton from "../components/skeletons/CustomersToolsSkeleton";
import CustomersTableSkeleton from "../components/skeletons/CustomersTableSkeleton";
import useDebounce from "@/hooks/useDebounce";
import CustomerToolbar from "../components/sections/customers/CustomerToolbar";

export default function Customers() {
  const { selectedStore } = useSelectedStore();

  const isLoading = false;
  const customersData = [];

  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search);

  const filteredCustomers =
    customersData?.filter((customer) => {
      const searchTerm = debouncedSearch?.trim();
      if (!searchTerm) return true;

      return (
        customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer?.email?.toLowerCase().includes(searchTerm?.toLowerCase())
      );
    }) ?? [];

  const hasCustomers = filteredCustomers?.length > 0;

  let content = null;

  if (!selectedStore) {
    return (
      <EmptyStoreState
        title="No Store Selected"
        description="Select a store to view and manage your customer accounts and information."
      />
    );
  }

  if (isLoading) {
    content = (
      <>
        <CustomersToolsSkeleton />
        <CustomersTableSkeleton />
      </>
    );
  }

  if (!isLoading && hasCustomers) {
    content = (
      <>
        <CustomerToolbar search={search} setSearch={setSearch} />
        <CustomerTable customersData={filteredCustomers} />
      </>
    );
  }

  if (!isLoading && !hasCustomers) {
    content = (
      <>
        <CustomerToolbar search={search} setSearch={setSearch} />
        <EmptyState
          icon={Users}
          title={debouncedSearch ? "No customers found" : "No customers yet"}
          description={
            debouncedSearch
              ? `No customers match "${debouncedSearch}"`
              : "Customers will appear here when they sign up or make a purchase"
          }
        />
      </>
    );
  }

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.customers} />

      <PageHeader
        icon={Users}
        title="Customers"
        description="View customer accounts registered to your store"
      />

      <div className="bg-card space-y-6 rounded-lg pt-5">{content}</div>
    </section>
  );
}
