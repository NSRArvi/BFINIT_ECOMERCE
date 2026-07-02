import { useState } from "react";
import { useSearchParams } from "react-router";
import { FolderTree, Plus, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/shared/EmptyState";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import PageHeader from "@/components/shared/PageHeader";
import useSelectedStore from "@/hooks/useSelectedStore";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import { breadcrubms } from "../utils/constants/breadcrumbs";
import SubcategoryCard from "../components/sections/subcategories/SubcategoryCard";
import AddSubcategoryModal from "../components/modals/AddSubcategoryModal";
import SubcategoryCardSkeleton from "../components/skeletons/SubcategoryCardSkeleton";
import TablePagination from "@/components/shared/TablePagination";

export default function Subcategories() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const { activeStore } = useSelectedStore();

  const { data, isLoading } = useGetQuery({
    endpoint: `/api/v1/subcategory/pagination/${activeStore?.id}?page=${page}`,
    enabled: true,
    isTokenRequired: true,
    queryKey: ["subcategories", activeStore?.id, page],
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const subcategories = data?.data ?? [];

  let content = null;

  if (!activeStore) {
    return (
      <EmptyState
        icon={Store}
        title="No Store Selected"
        description="Create a store before adding subcategories to organize your product catalog"
        actionText="Create Store"
        actionPath="/stores/create"
      />
    );
  }

  if (isLoading) {
    content = (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <SubcategoryCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!isLoading && subcategories.length > 0) {
    content = (
      <>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {subcategories.map((category) => (
            <SubcategoryCard key={category.category_id} category={category} />
          ))}
        </div>

        <TablePagination meta={data?.meta} />
      </>
    );
  }

  if (!isLoading && subcategories.length === 0) {
    content = (
      <EmptyState
        className="min-h-[calc(100dvh-300px)]"
        icon={FolderTree}
        title="No subcategories yet"
        description="Organize your products by adding subcategories under your categories"
        actionText="Add Subcategory"
        onAction={() => setDialogOpen(true)}
      />
    );
  }

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.subCategory} />

      <PageHeader
        icon={FolderTree}
        title="Subcategories"
        description="Manage your store's product subcategories"
      />

      <div className="bg-card space-y-6 rounded-lg p-5">
        <div className="flex items-center justify-end">
          <Button onClick={() => setDialogOpen(true)} size="sm">
            <Plus /> Add Subcategory
          </Button>
        </div>

        {content}
      </div>

      <AddSubcategoryModal
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </section>
  );
}
