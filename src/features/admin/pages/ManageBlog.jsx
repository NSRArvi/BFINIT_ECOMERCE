import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { FileText, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import PageHeader from "../components/PageHeader";
import EmptyStoreState from "../components/EmptyStoreState";
import BlogTableRow from "../components/sections/manage-blog/BlogTableRow";
import useSelectedStore from "@/hooks/useSelectedStore";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import TablePagination from "@/components/shared/TablePagination";
import { breadcrubms } from "../utils/constants/breadcrumbs";
import BlogTableRowSkeleton from "../components/skeletons/BlogTableRowSkeleton";
import useDebounce from "@/hooks/useDebounce";
import EmptyState from "@/components/shared/EmptyState";

export default function ManageBlog() {
  const { activeStore } = useSelectedStore();
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const navigate = useNavigate();
  const debouncedSearch = useDebounce(search);

  const { data, isLoading } = useGetQuery({
    endpoint: `/api/v1/general/blog/store/${activeStore?.id}?page=${page}`,
    enabled: true,
    isTokenRequired: true,
    queryKey: ["blogs", activeStore?.id, page],
  });

  const blogs = data?.data?.data ?? [];
  const filteredBlogs =
    blogs?.filter((blog) => {
      const searchTerm = debouncedSearch?.trim();
      if (!searchTerm) return true;
      return blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    }) ?? [];

  if (!activeStore) {
    return (
      <EmptyStoreState
        title="No Store Selected"
        description="Create a store to start writing and managing blog content for your audience."
      />
    );
  }

  let content = null;

  if (isLoading) {
    content = (
      <Table>
        <TableBody>
          {Array.from({ length: 4 }).map((_, i) => (
            <BlogTableRowSkeleton key={i} />
          ))}
        </TableBody>
      </Table>
    );
  }

  if (!isLoading && filteredBlogs.length > 0) {
    content = (
      <>
        <Table>
          <TableHeader className="bg-card hover:bg-transparent">
            <TableRow>
              <TableHead className="border text-xs font-semibold">
                Blog
              </TableHead>
              <TableHead className="border text-xs font-semibold">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredBlogs?.map((blog) => (
              <BlogTableRow key={blog.id} blog={blog} />
            ))}
          </TableBody>
        </Table>

        <TablePagination meta={data?.data?.meta} />
      </>
    );
  }

  if (!isLoading && filteredBlogs?.length === 0) {
    content = (
      <EmptyState
        className="min-h-[calc(100dvh-300px)]"
        icon={FileText}
        title={debouncedSearch ? "No matching blogs found" : "No blogs yet"}
        description={
          debouncedSearch
            ? `No results for "${debouncedSearch}". Try a different keyword.`
            : "Organize your products by creating blogs"
        }
        actionText={debouncedSearch ? "Clear Search" : "Add Blog"}
        onAction={
          debouncedSearch ? () => setSearch("") : () => navigate("/blogs/add")
        }
      />
    );
  }

  return (
    <section className="space-y-6">
      {/* Breadcrumb Navigation */}
      <DynamicBreadcrumb items={breadcrubms.manageBlogs} />

      {/* Page Header */}
      <PageHeader
        icon={FileText}
        title="Manage Blogs"
        description="View and manage all blog posts for"
      />

      <div className="bg-card space-y-6 rounded-lg py-5">
        <div className="flex items-center justify-end gap-4 px-5">
          <div className="relative w-full max-w-72">
            <Search className="text-muted-foreground absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2" />
            <Input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search blogs..."
              value={search}
              className="pl-7 placeholder:text-xs md:text-xs"
            />
          </div>

          <Button size="sm" asChild className="text-xs">
            <Link to="/blogs/add">
              <Plus /> Add Blog
            </Link>
          </Button>
        </div>

        {content}
      </div>
    </section>
  );
}
