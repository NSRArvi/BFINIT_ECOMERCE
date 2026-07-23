import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Plus, Search, Truck } from "lucide-react";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import EmptyState from "@/components/shared/EmptyState";
import PageHeader from "@/components/shared/PageHeader";
import ShippingZoneTable from "../components/shipping-zones/ShippingZoneTable";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TablePagination from "@/components/shared/TablePagination";
import useDebounce from "@/hooks/useDebounce";
import useSearchParamState from "@/hooks/useSearchParamState";
import useSelectedStore from "@/hooks/useSelectedStore";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import { breadcrubms } from "../utils/constants/breadcrumbs";

export default function ShippingZones() {
  const { activeStore } = useSelectedStore();
  const [search, setSearch] = useSearchParamState("search");
  const [page] = useSearchParamState("page", "1");

  const [searchInput, setSearchInput] = useState(search);
  const debouncedSearch = useDebounce(searchInput);

  useEffect(() => {
    if (debouncedSearch !== search) setSearch(debouncedSearch);
  }, [debouncedSearch, search, setSearch]);

  const { data, isLoading } = useGetQuery({
    endpoint: `/api/v1/delivery-zone/store/${activeStore?.id}?page=${page}&limit=20${search ? `&search=${search}` : ""}`,
    enabled: !!activeStore?.id,
    isTokenRequired: true,
    queryKey: ["delivery-zones", activeStore?.id, page, search],
  });

  let content = null;

  if (isLoading) {
    content = <ShippingZoneTable isLoading={isLoading} />;
  }

  if (!isLoading && data?.data?.length > 0) {
    content = (
      <>
        <ShippingZoneTable shippingZones={data.data} />
        <TablePagination meta={data.meta} />
      </>
    );
  }

  if (!isLoading && data?.data?.length === 0) {
    content = (
      <EmptyState
        className="min-h-[calc(100dvh-300px)]"
        icon={Truck}
        title={
          search ? "No matching shipping zones found" : "No shipping zones yet"
        }
        description={
          search
            ? `No results for "${search}". Try a different search term.`
            : "Create your first shipping zone to define where you ship and configure delivery rates"
        }
        actionText={search ? "Clear Search" : "Add Shipping Zone"}
        onAction={search ? () => setSearchInput("") : undefined}
        actionPath={search ? undefined : "/shipping-zones/add"}
      />
    );
  }

  if (!activeStore)
    return (
      <EmptyState
        title="No Store Selected"
        description="Select or create a store to configure shipping zones and delivery rates"
      />
    );

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.shippingZones} />

      <PageHeader
        icon={Truck}
        title="Shipping"
        description="Create shipping zones, configure delivery rates and manage your store's shipping settings"
      />

      <div className="bg-card space-y-6 rounded-lg p-5">
        <div className="flex items-center justify-end gap-4">
          <div className="relative w-full max-w-72">
            {isLoading ? (
              <div className="text-muted-foreground absolute top-1/2 left-2.5 -translate-y-1/2">
                <Spinner className="size-3.5" />
              </div>
            ) : (
              <Search className="text-muted-foreground absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2" />
            )}
            <Input
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
              placeholder="Search zones by name..."
              className="pl-7 placeholder:text-xs md:text-xs"
            />
          </div>

          <Button asChild size="sm" className="shrink-0">
            <Link to="/shipping-zones/add">
              <Plus /> Add Shipping Zone
            </Link>
          </Button>
        </div>

        {content}
      </div>
    </section>
  );
}
