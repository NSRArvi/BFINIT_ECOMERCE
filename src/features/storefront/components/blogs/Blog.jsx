import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useBasePath from "@/hooks/useBasePath";
import { getImgUrl } from "@/utils/getImgUrl";

export default function Blog({ blog }) {
  const basePath = useBasePath();

  return (
    <div className="bg-card border-border flex flex-col overflow-hidden rounded-none border">
      {/* Blog Image */}
      <Link
        to={`${basePath}/blog/${blog.id}`}
        className="bg-muted block aspect-4/3 overflow-hidden"
      >
        <img
          src={getImgUrl(blog.image)}
          alt={blog.title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </Link>

      {/* Blog Content */}
      <div className="border-border flex flex-1 flex-col justify-between gap-1 border-t p-3">
        <Link
          to={`${basePath}/blog/${blog.id}`}
          className="line-clamp-2 text-sm leading-snug font-medium underline-offset-4 hover:underline"
        >
          {blog.title}
        </Link>

        {blog.short_description && (
          <p className="text-muted-foreground line-clamp-2 text-xs leading-relaxed">
            {blog.short_description}
          </p>
        )}

        <Button
          asChild
          className="hover:bg-foreground/90 mt-3 h-9 w-full gap-1.5 rounded-none text-xs font-medium tracking-wide"
        >
          <Link to={`${basePath}/blog/${blog.id}`}>
            View Details
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
