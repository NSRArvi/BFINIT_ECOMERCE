import { ArrowDown } from "lucide-react";
import { getImgUrl } from "@/utils/getImgUrl";

export default function LandingHero({ content }) {
  const { title, subTitle, description, image } = content;

  return (
    <section className="relative flex h-[80dvh] w-full items-center">
      {image && (
        <img
          src={getImgUrl(image?.url)}
          alt=""
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
      )}

      {/* dark overlay */}
      <div className="bg-foreground/50 absolute inset-0 z-10" />

      <div className="text-primary-foreground relative z-20 mx-auto w-full max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
        {title && (
          <h1 className="text-5xl leading-[0.95] font-medium tracking-tight uppercase md:text-7xl">
            {title}
          </h1>
        )}

        <div className="flex gap-4">
          {description && (
            <p className="w-full max-w-sm text-sm text-balance opacity-80 md:text-base">
              {description}
            </p>
          )}

          {subTitle && (
            <h2 className="text-5xl leading-[0.95] font-medium tracking-tight uppercase md:text-7xl">
              {subTitle}
            </h2>
          )}
        </div>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2">
        <button
          className="bg-background relative z-10 cursor-default rounded-full p-3"
          aria-label="Scroll down"
        >
          <ArrowDown className="size-5" />
        </button>
        <div className="bg-background/25 absolute inset-0 z-0 scale-140 animate-pulse rounded-full" />
      </div>
    </section>
  );
}
