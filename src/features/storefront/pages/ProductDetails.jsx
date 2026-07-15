import { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import useCart from "@/hooks/useCart";
import { getImgUrl } from "@/utils/getImgUrl";
import { formatPrice } from "@/utils/formatPrice";

export default function ProductDetailsPage() {
  const { storeId, slug } = useParams();
  const { addToCart } = useCart();

  const { data, isLoading } = useGetQuery({
    endpoint: `/api/v1/product/store/${storeId}/slug/${slug}`,
    enabled: !!storeId && !!slug,
    isTokenRequired: true, //TODO: make this endpoint public
    queryKey: ["product", storeId, slug],
  });

  const product = data?.data || {};
  const {
    name,
    image,
    images,
    category,
    tags,
    short_description,
    description,
    countryPricing,
  } = product;
  const {
    country,
    price,
    is_discount,
    discount_value,
    stock,
    variants_enabled,
    options,
    variants,
  } = countryPricing?.[0] || {};

  const currency = country?.abbreviation;

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});

  // auto select first value of each option
  useEffect(() => {
    if (options?.length) {
      const initial = {};
      options?.forEach((option) => {
        if (option.values?.[0]) initial[option.id] = option.values[0].id;
      });
      setSelectedOptions(initial);
    }
  }, [options]);

  const thumbnailImage = useMemo(() => {
    let resolvedImage = image;

    if (options?.length > 0) {
      for (const option of options) {
        const valueId = selectedOptions[option.id];
        const value = option.values.find((v) => v.id === valueId);
        if (value?.image) resolvedImage = value.image;
      }
    }

    return resolvedImage;
  }, [image, options, selectedOptions]);

  const gallery = useMemo(() => {
    const main = thumbnailImage ? [{ id: "main", image: thumbnailImage }] : [];
    return [...main, ...(images ?? [])];
  }, [thumbnailImage, images]);

  useEffect(() => {
    setActiveImage(0);
  }, [thumbnailImage]);

  const matchedVariant = useMemo(() => {
    return variants?.find((variant) =>
      options?.every(
        (option) =>
          variant?.optionValues?.[option.id] === selectedOptions?.[option.id],
      ),
    );
  }, [selectedOptions, options, variants]);

  const selectedOptionLabels = useMemo(() => {
    if (!options?.length) return {};
    return options.reduce((acc, option) => {
      const valueId = selectedOptions[option.id];
      const value = option.values.find((v) => v.id === valueId);
      if (value) acc[option.name] = value.name;
      return acc;
    }, {});
  }, [options, selectedOptions]);

  const activePrice = variants_enabled ? matchedVariant?.price : price;
  const activeDiscountedPrice = variants_enabled
    ? matchedVariant?.discount_value
    : discount_value;
  const activeIsDiscount = variants_enabled
    ? matchedVariant?.is_discount
    : is_discount;
  const activeStock = variants_enabled ? matchedVariant?.stock : stock;
  const inStock = activeStock > 0;

  const handleQuantityChange = (action) => {
    if (action === "increment") {
      setQuantity((prev) => prev + 1);
    } else {
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    }
  };

  const handleSelectValue = (optionId, valueId) => {
    setSelectedOptions((prev) => ({ ...prev, [optionId]: valueId }));
  };

  const handleAddToCart = () => {
    if (variants_enabled) {
      const variantInfo = {
        ...matchedVariant,
        optionLabels: selectedOptionLabels,
      };
      addToCart(product, quantity, variantInfo);
    } else {
      addToCart(product, quantity);
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-12 lg:grid-cols-2">
        <div className="bg-muted aspect-square animate-pulse" />
        <div className="space-y-4">
          <div className="bg-muted h-4 w-24 animate-pulse" />
          <div className="bg-muted h-8 w-2/3 animate-pulse" />
          <div className="bg-muted h-6 w-32 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-24 text-center">
        <p className="text-muted-foreground">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="font-inter bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-12 gap-y-8 px-6 py-10 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="border-border bg-muted aspect-square w-full border">
            {gallery[activeImage] && (
              <img
                src={getImgUrl(gallery[activeImage].image)}
                alt={name}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          {gallery.length > 1 && (
            <div className="mt-3 grid grid-cols-5 gap-3">
              {gallery.map((img, index) => (
                <button
                  key={img.id ?? index}
                  onClick={() => setActiveImage(index)}
                  className={`bg-muted aspect-square border ${
                    activeImage === index
                      ? "border-foreground"
                      : "border-border"
                  }`}
                >
                  <img
                    src={getImgUrl(img.image)}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          {category?.name && (
            <p className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
              {category.name}
            </p>
          )}

          <h1 className="text-foreground mt-2 text-2xl font-medium lg:text-3xl">
            {name}
          </h1>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-foreground text-xl font-semibold">
              {formatPrice(
                activeIsDiscount ? activeDiscountedPrice : activePrice,
                currency,
              )}
            </span>
            {activeIsDiscount && (
              <span className="text-muted-foreground text-sm line-through">
                {formatPrice(activePrice, currency)}
              </span>
            )}
          </div>

          {short_description && (
            <p className="text-muted-foreground mt-4 text-sm">
              {short_description}
            </p>
          )}

          <Separator className="my-6" />

          {/* variant options */}
          {variants_enabled &&
            options?.length > 0 &&
            options.map((option) => (
              <div key={option.id} className="mb-6 space-y-3">
                <p className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
                  {option.name}
                </p>
                <div className="flex gap-2">
                  {option.values.map((value) => {
                    const isSelected = selectedOptions[option.id] === value.id;
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

          {/* Quantity */}
          <div>
            <p className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
              Quantity
            </p>
            <div className="mt-2 flex items-center gap-4">
              <div className="border-border flex items-center border">
                <button
                  onClick={handleQuantityChange}
                  disabled={quantity === 1}
                  className="text-foreground flex h-10 w-10 items-center justify-center disabled:opacity-30"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center text-sm font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange("increment")}
                  disabled={quantity === activeStock}
                  className="text-foreground flex h-10 w-10 items-center justify-center disabled:opacity-30"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <span
                className={`text-xs ${inStock ? "text-muted-foreground" : "text-destructive"}`}
              >
                {inStock ? `${activeStock} in stock` : "Out of stock"}
              </span>
            </div>
          </div>

          <Button
            disabled={!inStock}
            onClick={handleAddToCart}
            className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6 h-12 w-full rounded-none text-sm font-semibold tracking-wide uppercase"
          >
            {inStock ? "Add to Cart" : "Out of Stock"}
          </Button>

          {tags?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="rounded-none">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {description && (
            <>
              <Separator className="my-6" />
              <div
                id="content-display"
                className="text-sm"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
