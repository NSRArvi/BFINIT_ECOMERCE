import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import CustomerTable from "../components/sections/customers/CustomerTable";
import CustomersTableSkeleton from "../components/skeletons/CustomersTableSkeleton";
import CustomerToolbar from "../components/sections/customers/CustomerToolbar";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import EmptyState from "@/components/shared/EmptyState";
import PageHeader from "@/components/shared/PageHeader";
import TablePagination from "@/components/shared/TablePagination";
import useDebounce from "@/hooks/useDebounce";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import useSearchParamState from "@/hooks/useSearchParamState";
import useSelectedStore from "@/hooks/useSelectedStore";
import { breadcrubms } from "../utils/constants/breadcrumbs";

export default function Customers() {
  const { activeStore } = useSelectedStore();
  const [page] = useSearchParamState("page", "1");
  const [search, setSearch] = useSearchParamState("search");

  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput);

  useEffect(() => {
    if (debouncedSearch !== search) setSearch(debouncedSearch);
  }, [debouncedSearch, search, setSearch]);

  const { data, isLoading, isFetching } = useGetQuery({
    endpoint: `/api/v1/dashboard/stores/${activeStore?.id}/customers?page=${page}&limit=12${search ? `&search=${search}` : ""}`,
    enabled: !!activeStore?.id,
    isTokenRequired: true,
    queryKey: ["customers", page, search],
  });

  const hasCustomers = data?.data?.customers?.length > 0;

  let content = null;

  if (isLoading) {
    content = <CustomersTableSkeleton />;
  }

  if (!isLoading && hasCustomers) {
    content = (
      <>
        <CustomerTable customers={data?.data?.customers} />
        <TablePagination meta={data?.data?.meta} />
      </>
    );
  }

  if (!isLoading && !hasCustomers) {
    content = (
      <EmptyState
        className="min-h-[calc(100dvh-300px)]"
        icon={Users}
        title={debouncedSearch ? "No customers found" : "No customers yet"}
        description={
          debouncedSearch
            ? `No results for "${search}". Try a different search term.`
            : "Customers will appear here when they sign up or make a purchase"
        }
        actionText="Clear search"
        onAction={() => setSearchInput("")}
      />
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

      <div className="bg-card space-y-6 rounded-lg p-5">
        <CustomerToolbar
          isFetching={isFetching}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />

        {content}
      </div>
    </section>
  );
}
