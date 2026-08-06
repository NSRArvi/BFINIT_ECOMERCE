import { ArrowLeft } from "lucide-react";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import { useParams } from "react-router";

export default function BlogDetails() {
  const { id } = useParams();

  const { data: blog, isLoading } = useGetQuery({
    endpoint: `/blog/?blogId=${id}`,
    queryKey: ["blogs", id],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <div className="space-y-4">
            <div className="bg-muted h-8 w-48 animate-pulse rounded" />
            <div className="bg-muted h-12 w-3/4 animate-pulse rounded" />
            <div className="bg-muted aspect-video w-full animate-pulse rounded-lg" />
            <div className="space-y-2">
              <div className="bg-muted h-4 w-full animate-pulse rounded" />
              <div className="bg-muted h-4 w-full animate-pulse rounded" />
              <div className="bg-muted h-4 w-2/3 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog?.data) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-foreground text-xl font-semibold">
            Blog not found
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            The blog post you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const blogData = blog.data;

  return (
    <div className="bg-background min-h-screen">
      {/* Header Navigation */}
      <div className="border-border bg-card border-b">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <button
            onClick={() => window.history.back()}
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </button>
        </div>
      </div>

      {/* Main Content */}
      <article className="mx-auto max-w-7xl px-4 py-12">
        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-foreground text-4xl font-bold lg:text-5xl">
            {blogData.blogName}
          </h1>
        </header>

        {/* Featured Image */}
        {blogData.blogImage && blogData.blogImage[0] && (
          <div className="mb-8">
            <img
              src={`https://ecomback.bfinit.com${blogData.blogImage[0]}`}
              alt={blogData.blogName}
              className="aspect-video w-full rounded-lg object-cover"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=675&fit=crop";
              }}
            />
          </div>
        )}

        {/* Blog Content */}
        <div
          id="content-display"
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: blogData.blogDescription }}
        />

        {/* Article Footer */}
        <footer className="border-border mt-12 border-t pt-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.history.back()}
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </button>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: blogData.blogName,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }
              }}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
            >
              Share
            </button>
          </div>
        </footer>
      </article>
    </div>
  );
}
