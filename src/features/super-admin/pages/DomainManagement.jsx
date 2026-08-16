import { useEffect, useState } from "react";
import { Globe, Search } from "lucide-react";
import { keepPreviousData } from "@tanstack/react-query";
import DomainTable from "../components/sections/domain-management/DomainTable";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import { Input } from "@/components/ui/input";
import PageHeader from "@/components/shared/PageHeader";
import { Spinner } from "@/components/ui/spinner";
import TablePagination from "@/components/shared/TablePagination";
import useSearchParamState from "@/hooks/useSearchParamState";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import useDebounce from "@/hooks/useDebounce";
import { breadcrubms } from "../utils/constants/breadcrumbs";

export default function DomainManagement() {
  const [search, setSearch] = useSearchParamState("search");
  const [page] = useSearchParamState("page", "1");

  const [searchInput, setSearchInput] = useState(search);
  const debouncedSearch = useDebounce(searchInput);

  useEffect(() => {
    if (debouncedSearch !== search) setSearch(debouncedSearch);
  }, [debouncedSearch, search, setSearch]);

  const { data, isLoading } = useGetQuery({
    endpoint: `/api/v1/platform/domains?limit=20&page=${page}${search ? `&search=${search}` : ""}`,
    enabled: true,
    isTokenRequired: true,
    queryKey: ["domains", page, search],
    placeholderData: keepPreviousData,
  });

  let content = null;

  if (!isLoading && data?.data?.data?.length > 0) {
    content = (
      <>
        <DomainTable domains={data?.data?.data} />
        <TablePagination meta={data?.data?.meta} />
      </>
    );
  }

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.domains} />
      <PageHeader
        icon={Globe}
        title="Domains"
        description="Manage custom domains for stores"
      />
      <div className="bg-card space-y-6 rounded-lg p-5">
        <div className="relative ml-auto w-full max-w-72">
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
            placeholder="Search domains..."
            className="pl-7 placeholder:text-xs md:text-xs"
          />
        </div>

        {content}
      </div>
    </section>
  );
}
