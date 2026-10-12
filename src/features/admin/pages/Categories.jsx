import { useState } from "react";
import { FolderOpen, FolderPlus } from "lucide-react";
import { useSearchParams } from "react-router";
import CategoryToolbar from "../components/sections/category/CategoryToolbar";
import CategoryItem from "../components/sections/category/CategoryItem";
import EmptyState from "@/components/shared/EmptyState";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import PageHeader from "@/components/shared/PageHeader";
import CategoryItemSkeleton from "../components/skeletons/CategoryItemSkeleton";
import AddCategoryModal from "../components/modals/AddCategoryModal";
import TablePagination from "@/components/shared/TablePagination";
import useSelectedStore from "@/hooks/useSelectedStore";
import useDebounce from "@/hooks/useDebounce";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import { breadcrubms } from "../utils/constants/breadcrumbs";

export default function Categories() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const { activeStore } = useSelectedStore();

  const { data, isLoading } = useGetQuery({
    endpoint: `/api/v1/category/pagination/${activeStore?.id}?page=${page}&limit=12`,
    enabled: true,
    isTokenRequired: true,
    queryKey: ["categories", activeStore?.id, page],
  });

  const categories = data?.data?.data ?? [];

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredCategories =
    categories?.filter((category) => {
      const searchTerm = debouncedSearch?.trim();
      if (!searchTerm) return true;

      return category.name.toLowerCase().includes(searchTerm.toLowerCase());
    }) ?? [];

  let content = null;

  if (isLoading) {
    content = (
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <CategoryItemSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!isLoading && filteredCategories?.length > 0) {
    content = (
      <>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {filteredCategories.map((category) => (
            <CategoryItem key={category?.id} category={category} />
          ))}
        </div>

        <TablePagination meta={data?.data?.meta} />
      </>
    );
  }

  if (!isLoading && filteredCategories?.length === 0) {
    content = (
      <EmptyState
        className="min-h-[calc(100dvh-300px)]"
        icon={FolderOpen}
        title={
          debouncedSearch ? "No matching categories found" : "No categories yet"
        }
        description={
          debouncedSearch
            ? `No results for "${debouncedSearch}". Try a different keyword.`
            : "Organize your products by creating categories"
        }
        actionText={debouncedSearch ? "Clear Search" : "Add Category"}
        onAction={
          debouncedSearch ? () => setSearch("") : () => setDialogOpen(true)
        }
      />
    );
  }

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.categories} />

      <PageHeader
        icon={FolderPlus}
        title="Categories"
        description="Manage your store's product categories"
      />

      <div className="bg-card space-y-6 rounded-lg p-5">
        <CategoryToolbar
          search={search}
          setSearch={setSearch}
          onOpen={() => setDialogOpen(true)}
        />

        {content}
      </div>

      <AddCategoryModal dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
    </section>
  );
}
