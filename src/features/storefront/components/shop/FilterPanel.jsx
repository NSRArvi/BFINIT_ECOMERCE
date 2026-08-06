import BrandFilter from "./filter/BrandFilter";
import CategoryFilter from "./filter/CategoryFilter";
import CollectionsFilter from "./filter/CollectionsFilter";
import PriceRange from "./filter/PriceRange";
import { Separator } from "@/components/ui/separator";
import useFilterParams from "../../hooks/useFilterParams";

export default function FilterPanel({ maxPriceRange }) {
  const { clearFilters } = useFilterParams();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-wide uppercase">
          Filters
        </h2>
        <button
          onClick={clearFilters}
          className="text-muted-foreground hover:text-foreground text-xs underline underline-offset-4"
        >
          Clear all
        </button>
      </div>

      <PriceRange maxPriceRange={maxPriceRange} />
      <Separator />

      <CategoryFilter />
      <Separator />

      <BrandFilter />
      <Separator />

      <CollectionsFilter />
    </div>
  );
}
