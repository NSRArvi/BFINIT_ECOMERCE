import { Link, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import useBasePath from "@/hooks/useBasePath";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import { getImgUrl } from "@/utils/getImgUrl";

export default function BlogDetailsPage() {
  const { id } = useParams();
  const basePath = useBasePath();

  const { data, isLoading } = useGetQuery({
    endpoint: `/api/v1/general/blogs/store/${id}`,
    enabled: !!id,
    queryKey: ["blogs", id],
  });

  const blog = data?.data;

  if (isLoading) {
    return (
      <div className="bg-background">
        {/* Header */}
        <div className="mx-auto max-w-3xl px-4 pt-12 md:pt-20">
          <Skeleton className="mx-auto mb-8 h-3 w-28" />
          <Skeleton className="mx-auto h-9 w-full md:h-12" />
          <Skeleton className="mx-auto mt-3 h-9 w-2/3 md:h-12" />
          <Skeleton className="mx-auto mt-6 h-4 w-3/4 max-w-xl" />
          <Skeleton className="mx-auto mt-2 h-4 w-1/2 max-w-md" />
        </div>

        {/* Hero image */}
        <div className="mx-auto mt-10 max-w-5xl px-4 md:mt-14">
          <Skeleton className="aspect-video w-full rounded-xl" />
        </div>

        {/* Body */}
        <div className="mx-auto max-w-2xl space-y-3 px-4 py-10 md:py-16">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <div className="h-4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-10/12" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  if (!blog) return null;

  return (
    <article className="bg-background text-foreground">
      <header className="mx-auto max-w-3xl px-4 pt-12 text-center md:pt-20">
        <Link
          to={`${basePath}/blog`}
          className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 text-xs tracking-widest uppercase"
        >
          <ArrowLeft className="size-3.5" />
          Back to journal
        </Link>

        <h1 className="text-3xl leading-tight font-semibold tracking-tight md:text-5xl">
          {blog.title}
        </h1>
        <p className="text-muted-foreground mx-auto mt-5 max-w-xl text-base md:text-lg">
          {blog.short_description}
        </p>
      </header>

      {blog.image && (
        <div className="mx-auto mt-10 max-w-5xl px-4 md:mt-14">
          <img
            src={getImgUrl(blog.image)}
            alt={blog.title}
            className="bg-muted aspect-video w-full rounded-xl object-cover"
          />
        </div>
      )}

      <div
        id="content-display"
        className="mx-auto max-w-2xl px-4 py-10 md:py-16"
        dangerouslySetInnerHTML={{ __html: blog.description }}
      />
    </article>
  );
}
