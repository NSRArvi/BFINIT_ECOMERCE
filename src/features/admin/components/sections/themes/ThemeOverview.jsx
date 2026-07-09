import { Link } from "react-router";
import { ExternalLink, Clock, SlidersHorizontal } from "lucide-react";
import ThemeOverviewSkeleton from "./ThemeOverviewSkeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import useSelectedStore from "@/hooks/useSelectedStore";
import { timeAgo } from "@/utils/formatDate";

export default function ThemeOverview() {
  const { activeStore } = useSelectedStore();

  const { data, isLoading } = useGetQuery({
    endpoint: `/api/v1/themes/storeTheme/getAllThemeForStore/${activeStore?.id}`,
    enabled: !!activeStore?.id,
    isTokenRequired: true,
    queryKey: ["admin", "stores", activeStore?.id, "themes"],
  });

  const themeId = data?.data?.[0]?.theme_id;

  const { data: latestData } = useGetQuery({
    endpoint: `/api/v1/themes/storeTheme/get/${activeStore?.id}/${themeId}`,
    enabled: !!activeStore?.id,
    isTokenRequired: true,
    queryKey: ["admin", "stores", activeStore?.id, "themes", themeId],
  });

  const {
    themeName,
    themeDescription,
    themeThumbnailUrl,
    isCustomized,
    updatedAt,
  } = data?.data || {};

  if (isLoading) {
    return <ThemeOverviewSkeleton />;
  }

  return (
    <div className="bg-card grid gap-8 rounded-lg border p-5 lg:grid-cols-[1.6fr_0.9fr]">
      {/* Preview */}
      <div className="max-h-[344px] overflow-hidden rounded-lg border">
        <img
          src="https://images.pexels.com/photos/875862/pexels-photo-875862.png"
          alt={`${themeName} theme preview`}
          className="aspect-16/10 w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex h-full flex-col">
        <div className="space-y-4">
          <Badge variant="success" showDot className="text-[10px]">
            Customized
          </Badge>

          <div className="space-y-1.5">
            <h2 className="text-sm font-semibold">Solis</h2>

            <p className="text-muted-foreground text-xs leading-5">
              A clean, responsive theme with everything you need to launch your
              store
            </p>
          </div>
        </div>

        <div className="border-border mt-5 border-t pt-4">
          <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <Clock className="size-3.5" />
            Last updated {timeAgo("2026-07-09T11:36:23.294Z")}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-5">
          <Button size="sm" asChild>
            <Link to={`/stores/${activeStore?.id}/theme-editor/${themeId}`}>
              <SlidersHorizontal className="size-3.5" />
              Customize Theme
            </Link>
          </Button>

          <Button size="sm" variant="outline" asChild>
            <Link to={`/stores/${activeStore?.id}`} target="_blank">
              <ExternalLink className="size-3.5" />
              View Store
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
