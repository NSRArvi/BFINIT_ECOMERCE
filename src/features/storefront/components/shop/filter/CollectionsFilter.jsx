import useFilterParams from "@/features/storefront/hooks/useFilterParams";
import { cn } from "@/lib/utils";

const Collection_Types = [
  { key: "is_new_arrival", label: "New Arrivals" },
  { key: "is_best_selling", label: "Best Selling" },
  { key: "is_featured", label: "Featured" },
  { key: "is_hot_deal", label: "Hot Deals" },
];

export default function CollectionsFilter() {
  const { getBoolean, toggleBoolean } = useFilterParams();

  return (
    <div className="space-y-3">
      <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
        Collections
      </p>
      <div className="flex flex-wrap gap-2">
        {Collection_Types.map((collection) => (
          <button
            key={collection.key}
            onClick={() => toggleBoolean(collection.key)}
            className={cn(
              "border px-3 py-1.5 text-xs font-medium transition-colors",
              getBoolean(collection.key)
                ? "border-foreground bg-foreground text-background"
                : "border-border text-foreground hover:border-foreground",
            )}
          >
            {collection.label}
          </button>
        ))}
      </div>
    </div>
  );
}
