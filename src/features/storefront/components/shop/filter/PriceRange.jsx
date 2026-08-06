import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import useCountry from "@/hooks/useCountry";
import useFilterParams from "@/features/storefront/hooks/useFilterParams";

export default function PriceRange({ maxPriceRange }) {
  const { selectedCountry } = useCountry();
  const { getValue, setRange } = useFilterParams();

  const minFromUrl = Number(getValue("min_price")) || 0;
  const maxFromUrl = Number(getValue("max_price")) || maxPriceRange;

  const [priceRange, setPriceRange] = useState([minFromUrl, maxFromUrl]);

  useEffect(() => {
    setPriceRange([minFromUrl, maxFromUrl]);
  }, [minFromUrl, maxFromUrl]);

  const onDragRelease = (value) => {
    setRange({
      minKey: "min_price",
      maxKey: "max_price",
      minValue: value[0],
      maxValue: value[1],
    });
  };

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
        Price Range
      </p>
      <Slider
        onValueChange={setPriceRange}
        onValueCommit={onDragRelease}
        value={priceRange}
        min={0}
        max={maxPriceRange}
        step={100}
        className="mt-2"
      />
      <div className="flex items-center justify-between text-sm">
        <span className="border-border border px-2 py-1 font-medium">
          {selectedCountry?.abbreviation}
          {priceRange[0]}
        </span>
        <span className="text-muted-foreground">to</span>
        <span className="border-border border px-2 py-1 font-medium">
          {selectedCountry?.abbreviation}
          {priceRange[1]}
        </span>
      </div>
    </div>
  );
}
