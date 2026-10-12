import { useState } from "react";
import { FolderOpen, FolderPlus } from "lucide-react";
import { useSearchParams } from "react-router";
import BrandToolbar from "../components/sections/brands/BrandToolbar";
import BrandItem from "../components/sections/brands/BrandItem";
import EmptyState from "@/components/shared/EmptyState";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import PageHeader from "@/components/shared/PageHeader";
import BrandItemSkeleton from "../components/skeletons/BrandItemSkeleton";
import AddBrandModal from "../components/modals/AddBrandModal";
import TablePagination from "@/components/shared/TablePagination";
import useSelectedStore from "@/hooks/useSelectedStore";
import useDebounce from "@/hooks/useDebounce";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import { breadcrubms } from "../utils/constants/breadcrumbs";

export default function Brands() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const { activeStore } = useSelectedStore();

  const { data, isLoading } = useGetQuery({
    endpoint: `/api/v1/brand/pagination/${activeStore?.id}?page=${page}&limit=12`,
    enabled: true,
    isTokenRequired: true,
    queryKey: ["brands", activeStore?.id, page],
  });

  const categories = data?.data?.data ?? [];

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredBrands =
    categories?.filter((brand) => {
      const searchTerm = debouncedSearch?.trim();
      if (!searchTerm) return true;

      return brand?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    }) ?? [];

  let content = null;

  if (isLoading) {
    content = (
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <BrandItemSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!isLoading && filteredBrands?.length > 0) {
    content = (
      <>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          {filteredBrands.map((brand) => (
            <BrandItem key={brand?.id} brand={brand} />
          ))}
        </div>

        <TablePagination meta={data?.data?.meta} />
      </>
    );
  }

  if (!isLoading && filteredBrands?.length === 0) {
    content = (
      <EmptyState
        className="min-h-[calc(100dvh-300px)]"
        icon={FolderOpen}
        title={debouncedSearch ? "No matching brands found" : "No brands yet"}
        description={
          debouncedSearch
            ? `No results for "${debouncedSearch}". Try a different keyword.`
            : "Organize your products by creating brands"
        }
        actionText={debouncedSearch ? "Clear Search" : "Add Brand"}
        onAction={
          debouncedSearch ? () => setSearch("") : () => setDialogOpen(true)
        }
      />
    );
  }

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.brands} />

      <PageHeader
        icon={FolderPlus}
        title="Brands"
        description="Manage your store's product Brands"
      />

      <div className="bg-card space-y-6 rounded-lg p-5">
        <BrandToolbar
          search={search}
          setSearch={setSearch}
          onOpen={() => setDialogOpen(true)}
        />

        {content}
      </div>

      <AddBrandModal dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
    </section>
  );
}
