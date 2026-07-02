import { useEffect, useState } from "react";
import { Link } from "react-router";
import { keepPreviousData } from "@tanstack/react-query";
import { Package, Plus, Search } from "lucide-react";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import PageHeader from "@/components/shared/PageHeader";
import EmptyState from "@/components/shared/EmptyState";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InventoryTable from "../components/sections/inventory/InventoryTable";
import TablePagination from "@/components/shared/TablePagination";
import { Spinner } from "@/components/ui/spinner";
import useDebounce from "@/hooks/useDebounce";
import useSelectedStore from "@/hooks/useSelectedStore";
import useSearchParamState from "@/hooks/useSearchParamState";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import { breadcrubms } from "../utils/constants/breadcrumbs";

export default function Inventory() {
  const { activeStore } = useSelectedStore();

  const [search, setSearch] = useSearchParamState("search");
  const [page] = useSearchParamState("page", "1");

  const [searchInput, setSearchInput] = useState(search);
  const debouncedSearch = useDebounce(searchInput);

  useEffect(() => {
    if (debouncedSearch !== search) setSearch(debouncedSearch);
  }, [debouncedSearch, search, setSearch]);

  const { data, isLoading, isFetching } = useGetQuery({
    endpoint: `/api/v1/product/search/${activeStore?.id}?page=${page}&limit=20${search ? `&search=${search}` : ""}`,
    enabled: !!activeStore?.id,
    isTokenRequired: true,
    queryKey: ["products", activeStore?.id, page, search],
    placeholderData: keepPreviousData,
  });

  let content = null;

  if (isLoading) {
    content = <InventoryTable isLoading />;
  }

  if (!isLoading && data?.data?.length > 0) {
    content = (
      <>
        <InventoryTable products={data.data} />
        <TablePagination meta={data.meta} />
      </>
    );
  }

  if (!isLoading && data?.data?.length === 0) {
    content = (
      <EmptyState
        className="min-h-[calc(100dvh-300px)]"
        icon={Package}
        title={search ? "No matching products found" : "No products yet"}
        description={
          search
            ? `No results for "${search}". Try a different search term.`
            : "Add your first product to start managing inventory, stock levels, and availability."
        }
        actionText={search ? "Clear Search" : "Add Product"}
        onAction={search ? () => setSearchInput("") : undefined}
        actionPath={search ? undefined : "/products/inventory/add"}
      />
    );
  }

  if (!activeStore)
    return (
      <EmptyState
        title="No Store Selected"
        description="Create a store to start tracking and managing your product inventory."
      />
    );

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.inventory} />

      <PageHeader
        icon={Package}
        title="Inventory Management"
        description="Monitor stock levels, update inventory and keep product availability up to date."
      />

      <div className="bg-card space-y-6 rounded-lg p-5">
        <div className="flex items-center justify-end gap-4">
          <div className="relative w-full max-w-72">
            {isFetching ? (
              <div className="text-muted-foreground absolute top-1/2 left-2.5 -translate-y-1/2">
                <Spinner className="size-3.5" />
              </div>
            ) : (
              <Search className="text-muted-foreground absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2" />
            )}
            <Input
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
              placeholder="Search products..."
              className="pl-7 placeholder:text-xs md:text-xs"
            />
          </div>

          <Button asChild size="sm" className="shrink-0">
            <Link to="/products/inventory/add">
              <Plus /> Add Product
            </Link>
          </Button>
        </div>

        {content}
      </div>
    </section>
  );
}
