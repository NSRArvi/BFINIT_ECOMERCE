import { useEffect, useMemo, useState } from "react";
import { Minus, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import { getImgUrl } from "@/utils/getImgUrl";

export default function VariantSelectorModal({
  product = {},
  open = false,
  onClose = () => {},
}) {
  const { addToCart } = useCart();

  const { name, image, category, countryPricing } = product || {};
  const { country, options, variants, stock } = countryPricing || {};
  const currencySymbol = country.abbreviation;

  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1);

  // auto select first value of each option
  useEffect(() => {
    if (options?.length) {
      const initial = {};
      options.forEach((option) => {
        if (option.values?.[0]) initial[option.id] = option.values[0].id;
      });
      setSelectedOptions(initial);
    }
  }, [options]);

  const thumbnailImage = useMemo(() => {
    let resolvedImage = image;

    for (const option of options) {
      const valueId = selectedOptions[option.id];
      const value = option.values.find((v) => v.id === valueId);
      if (value?.image) resolvedImage = value.image;
    }

    return resolvedImage;
  }, [image, options, selectedOptions]);

  const selectedOptionLabels = useMemo(() => {
    if (!options?.length) return {};
    return options.reduce((acc, option) => {
      const valueId = selectedOptions[option.id];
      const value = option.values.find((v) => v.id === valueId);
      if (value) acc[option.name] = value.name;
      return acc;
    }, {});
  }, [options, selectedOptions]);

  const matchedVariant = useMemo(() => {
    return variants?.find((variant) =>
      options?.every(
        (option) =>
          variant?.optionValues?.[option.id] === selectedOptions?.[option.id],
      ),
    );
  }, [selectedOptions, options, variants]);

  const activePrice = matchedVariant?.price;
  const activeDiscount =
    matchedVariant?.is_discount && matchedVariant?.discount_value;
  const activeStock = matchedVariant?.stock ?? stock;

  const handleSelectValue = (optionId, valueId) => {
    setSelectedOptions((prev) => ({ ...prev, [optionId]: valueId }));
  };

  const handleQuantityChange = (action) => {
    if (action === "increment") {
      setQuantity((prev) => prev + 1);
    } else {
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    }
  };

  const handleAddToCart = () => {
    const variantInfo = {
      ...matchedVariant,
      optionLabels: selectedOptionLabels,
    };
    addToCart(product, quantity, variantInfo);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-none p-0 sm:max-w-4xl sm:rounded-none">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Image */}
          <div>
            <div className="bg-muted aspect-square">
              <img
                src={getImgUrl(thumbnailImage)}
                alt={name}
                className="h-full w-full object-cover"
              />
            </div>
            <button className="text-muted-foreground hover:text-foreground mt-4 text-xs tracking-wider uppercase underline underline-offset-4">
              View full details
            </button>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between p-8 sm:p-10">
            <div className="space-y-8">
              <DialogHeader className="space-y-2 text-left">
                <p className="text-muted-foreground text-xs tracking-wider uppercase">
                  {category.name}
                </p>
                <DialogTitle className="text-2xl font-normal">
                  {name}
                </DialogTitle>
                <div className="flex items-baseline gap-3 pt-1">
                  <span className="text-lg font-medium">
                    {formatPrice(
                      activeDiscount ? activeDiscount : activePrice,
                      currencySymbol,
                    )}
                  </span>
                  {activeDiscount && (
                    <span className="text-muted-foreground text-sm line-through">
                      {formatPrice(activePrice, currencySymbol)}
                    </span>
                  )}
                </div>
              </DialogHeader>

              <div className="bg-border h-px" />

              {options.map((option) => (
                <div key={option.id} className="space-y-3">
                  <p className="text-muted-foreground text-xs tracking-wider uppercase">
                    {option.name}
                  </p>
                  <div className="flex gap-2">
                    {option.values.map((value) => {
                      const isSelected =
                        selectedOptions[option.id] === value.id;
                      return (
                        <button
                          key={value.id}
                          onClick={() => handleSelectValue(option.id, value.id)}
                          className={`h-10 min-w-10 border px-3 text-sm ${
                            isSelected
                              ? "border-foreground"
                              : "hover:border-foreground/50"
                          }`}
                        >
                          {value.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="bg-border h-px" />

              {/* Quantity */}
              <div className="space-y-3">
                <p className="text-muted-foreground text-xs tracking-wider uppercase">
                  Quantity
                </p>
                <div className="border-border flex w-fit border">
                  <button
                    onClick={handleQuantityChange}
                    disabled={quantity === 1}
                    className="hover:bg-muted flex h-10 w-10 items-center justify-center disabled:pointer-events-none disabled:opacity-50"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <div className="border-border flex h-10 w-12 items-center justify-center border-x text-sm font-medium">
                    {quantity}
                  </div>
                  <button
                    onClick={() => handleQuantityChange("increment")}
                    disabled={activeStock === quantity}
                    className="hover:bg-muted flex h-10 w-10 items-center justify-center disabled:pointer-events-none disabled:opacity-50"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <p className="text-muted-foreground text-xs">
                  {activeStock} in stock
                </p>
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              className="mt-8 h-12 w-full rounded-none text-sm tracking-wider uppercase"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
