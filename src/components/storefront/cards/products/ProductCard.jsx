import { useState } from "react";
import { Link } from "react-router";
import { ShoppingCart, Eye, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import VariantSelectorModal from "../../modals/VariantSelectorModal";
import useBasePath from "@/hooks/useBasePath";
import useCart from "@/hooks/useCart";
import { getImgUrl } from "@/utils/getImgUrl";
import { getDiscountPercent } from "@/utils/products";
import { formatPrice } from "@/utils/formatPrice";
import { editorLinkClick } from "@/utils/themeEditor";

export default function ProductCard({ product = {}, isEditing = false }) {
  const { addToCart } = useCart();
  const basePath = useBasePath();

  const { slug, name, countryPricing, image, short_description } =
    product || {};
  const { price, discount_value, is_discount, country, variants_enabled } =
    countryPricing || {};

  const [showVariantModal, setShowVariantModal] = useState(false);
  const currencySymbol = country?.abbreviation;
  const discountPercent = getDiscountPercent(price, discount_value);

  const handleAddToCart = () => {
    if (variants_enabled) {
      setShowVariantModal(true);
    } else {
      addToCart(product);
    }
  };

  return (
    <>
      <div className="group bg-card border-border hover:border-primary/50 relative flex flex-col overflow-hidden rounded-lg border transition-all duration-300">
        <div className="bg-muted relative aspect-square overflow-hidden">
          {image ? (
            <Link
              onClick={isEditing ? editorLinkClick : undefined}
              to={`${basePath}/shop/${slug}`}
              className="h-full w-full"
            >
              <img
                src={getImgUrl(image)}
                alt={name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </Link>
          ) : (
            <div className="bg-muted flex aspect-square w-full items-center justify-center rounded-lg">
              <Image
                className="text-muted-foreground/20 h-20 w-20"
                strokeWidth={0.5}
              />

              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="text-muted-foreground/25 -rotate-12 text-4xl font-medium">
                  DEMO
                </span>
              </div>
            </div>
          )}

          {is_discount && (
            <div className="bg-destructive text-destructive-foreground absolute top-3 right-3 rounded-md px-2.5 py-1 text-xs font-semibold">
              -{discountPercent}%
            </div>
          )}

          {/* Quick Action Buttons */}
          <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Button
              size="icon"
              variant="secondary"
              className="bg-background/95 hover:bg-primary hover:text-primary-foreground h-9 w-9 rounded-full backdrop-blur-sm"
            >
              <Link
                onClick={isEditing ? editorLinkClick : undefined}
                to={`${basePath}/shop/${slug}`}
              >
                <Eye />
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <Link
            onClick={isEditing ? editorLinkClick : undefined}
            to={`${basePath}/shop/${slug}`}
            className="group-hover:text-primary mb-2 line-clamp-2 text-sm leading-snug font-semibold transition-colors"
          >
            {name}
          </Link>

          {short_description && (
            <p className="text-muted-foreground mb-3 line-clamp-2 text-xs leading-relaxed">
              {short_description}
            </p>
          )}

          <div className="mt-auto flex items-center justify-between gap-2">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold">
                  {formatPrice(
                    is_discount ? discount_value : price,
                    currencySymbol,
                  )}
                </span>
                {is_discount && (
                  <span className="text-muted-foreground text-xs line-through">
                    {formatPrice(price, currencySymbol)}
                  </span>
                )}
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={isEditing ? editorLinkClick : handleAddToCart}
              className="hover:bg-primary hover:text-primary-foreground hover:border-primary h-9 gap-1.5 px-3 text-xs font-medium transition-all active:scale-95"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Add</span>
            </Button>
          </div>
        </div>
      </div>

      <VariantSelectorModal
        product={product}
        open={showVariantModal}
        onClose={setShowVariantModal}
      />
    </>
  );
}
