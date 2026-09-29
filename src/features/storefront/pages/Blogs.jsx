import { useParams, useSearchParams } from "react-router";
import { keepPreviousData } from "@tanstack/react-query";
import Blog from "../components/blogs/Blog";
import { Card, CardContent } from "@/components/ui/card";
import EmptyContent from "../components/EmptyContent";
import ProductPagination from "../components/shop/ProductPagination";
import { Skeleton } from "@/components/ui/skeleton";
import useGetQuery from "@/hooks-v2/api/useGetQuery";

export default function Blogs() {
  const { storeId } = useParams();
  const [searchParams] = useSearchParams();

  const queryString = searchParams.toString();

  const { data, isLoading } = useGetQuery({
    endpoint: `/api/v1/general/blog/store/${storeId}/all?limit=12${queryString ? `&${queryString}` : ""}`,
    enabled: !!storeId,
    queryKey: ["blogs", storeId, queryString],
    placeholderData: keepPreviousData,
  });

  const blogs = data?.data?.data ?? [];

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <Skeleton className="mx-auto mb-4 h-10 w-48" />
            <Skeleton className="mx-auto h-6 w-96" />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <Skeleton className="h-48 w-full rounded-t-lg" />
                <CardContent className="p-6">
                  <Skeleton className="mb-4 h-6 w-full" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-foreground mb-4 text-4xl font-bold">
            From the Blog
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            A few thoughts, guides and things we've been working on.
          </p>
        </div>

        {/* Blog Grid */}
        {blogs.length === 0 ? (
          <EmptyContent
            title="No posts yet"
            description="We haven't published any blog posts yet. Check back soon for stories and updates from us."
          />
        ) : (
          <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
              ))}
            </div>

            <ProductPagination totalPages={data?.data?.meta?.totalPages} />
          </div>
        )}
      </div>
    </div>
  );
}
