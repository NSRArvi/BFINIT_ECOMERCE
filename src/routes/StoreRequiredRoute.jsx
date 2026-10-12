import { Outlet } from "react-router";
import { Spinner } from "@/components/ui/spinner";
import NoStoreEmptyState from "@/features/admin/components/NoStoreEmptyState";
import useGetStores from "@/features/admin/hooks/useGetStores";

export default function StoreRequiredRoute() {
  const { data, isLoading } = useGetStores();

  const stores = data?.data?.data ?? [];

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100dvh-95px)] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (stores.length === 0) {
    return <NoStoreEmptyState />;
  }

  return <Outlet />;
}
