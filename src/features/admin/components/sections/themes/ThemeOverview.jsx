import { useState } from "react";
import { Link } from "react-router";
import {
  ExternalLink,
  SlidersHorizontal,
  Copy,
  Check,
  Globe,
} from "lucide-react";
import ThemeOverviewSkeleton from "./ThemeOverviewSkeleton";
import { Button } from "@/components/ui/button";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import useSelectedStore from "@/hooks/useSelectedStore";

export default function ThemeOverview() {
  const { activeStore } = useSelectedStore();
  const [copied, setCopied] = useState(false);

  const { data, isLoading } = useGetQuery({
    endpoint: `/api/v1/themes/storeTheme/getAllThemeForStore/${activeStore?.id}`,
    enabled: !!activeStore?.id,
    isTokenRequired: true,
    queryKey: ["admin", "stores", activeStore?.id, "themes"],
  });

  if (isLoading) return <ThemeOverviewSkeleton />;

  const themeId = data?.data?.[0]?.theme_id;
  const storeUrl = `https://shopadmin.bfinit.com/stores/${activeStore?.id}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(storeUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="bg-card divide-y rounded-lg border">
      {/* Theme */}
      <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 space-y-0.5">
          <h2 className="text-sm font-medium">Store theme</h2>
          <p className="text-muted-foreground max-w-lg text-xs">
            Customize your store's appearance and content.
          </p>
        </div>

        <Button size="sm" asChild className="shrink-0">
          <Link to={`/stores/${activeStore?.id}/theme-editor/${themeId}`}>
            <SlidersHorizontal className="size-3.5" />
            Customize theme
          </Link>
        </Button>
      </div>

      {/* Storefront */}
      {storeUrl && (
        <div className="bg-muted/30 flex flex-col gap-3 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 gap-2">
            <Globe className="text-muted-foreground mt-0.5 size-4 shrink-0" />

            <div className="min-w-0 space-y-0.5">
              <p className="text-muted-foreground text-xs">Store URL</p>
              <p className="truncate text-xs">
                {storeUrl.replace(/^https?:\/\//, "")}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Button size="sm" variant="ghost" onClick={handleCopy}>
              {copied ? (
                <Check className="size-3.5" />
              ) : (
                <Copy className="size-3.5" />
              )}
              {copied ? "Copied" : "Copy link"}
            </Button>

            <Button size="sm" variant="outline" asChild>
              <a href={storeUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="size-3.5" />
                View store
              </a>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
