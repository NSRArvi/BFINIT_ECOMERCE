import { SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import FilterPanel from "./FilterPanel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useFilterParams from "../../hooks/useFilterParams";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-low-to-high", label: "Price: Low to High" },
  { value: "price-high-to-low", label: "Price: High to Low" },
  { value: "best-selling", label: "Best Selling" },
];

export default function Header({ products }) {
  const { getValue, setValue, activeFilterCount } = useFilterParams();
  const sort = getValue("sort");

  return (
    <div className="border-border mb-8 flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-muted-foreground text-xs tracking-widest uppercase">
          Catalog
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          All Products
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          {products?.length} products
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Mobile filter trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="rounded-none lg:hidden">
              <SlidersHorizontal className="size-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge className="ml-1 rounded-none">{activeFilterCount}</Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[85vw] max-w-sm overflow-y-auto rounded-none"
          >
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="px-4 pb-8">
              <FilterPanel />
            </div>
          </SheetContent>
        </Sheet>

        {/* Sort */}
        <Select value={sort} onValueChange={(val) => setValue("sort", val)}>
          <SelectTrigger className="w-[180px] rounded-none">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="rounded-none">
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
