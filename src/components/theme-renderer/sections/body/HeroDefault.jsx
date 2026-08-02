import { Link } from "react-router";
import { ArrowRight, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import useBasePath from "@/hooks/useBasePath";
import { getImgUrl } from "@/utils/getImgUrl";
import { editorLinkClick } from "@/utils/themeEditor";

export default function HeroDefault({ content, isEditing = false }) {
  const basePath = useBasePath();

  const { backgroundImage, cta, subTitle, title } = content || {};

  return (
    <div className="relative h-[500px] w-full overflow-hidden md:h-[600px]">
      {/* background image*/}
      <div className="bg-muted absolute inset-0">
        {backgroundImage?.url ? (
          <img
            src={getImgUrl(backgroundImage?.url)}
            alt="Hero background"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="bg-muted absolute inset-0 flex items-center justify-center">
            <div className="text-muted-foreground text-center">
              <Image className="mx-auto mb-2 h-12 w-12 opacity-50" />
              <p className="text-sm">No background image set</p>
              <p className="mt-1 text-xs">Add one in the inspector panel →</p>
            </div>
          </div>
        )}
        <div className="bg-foreground/40 absolute inset-0"></div>
      </div>

      {/* content */}
      <div className="relative z-10 mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-full max-w-2xl flex-col justify-center">
          <h1 className="text-primary-foreground mb-4 text-4xl leading-tight font-semibold md:mb-6 md:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="text-primary-foreground mb-8 text-lg leading-relaxed font-light md:mb-10 md:text-xl">
            {subTitle}
          </p>

          <Button
            asChild
            className="border-primary-foreground group hover:text-primary hover:bg-primary-foreground w-fit rounded-md border bg-transparent px-8 py-4 font-medium"
          >
            <Link
              onClick={isEditing ? editorLinkClick : undefined}
              to={`${basePath}/shop`}
            >
              {cta}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
