import { useState } from "react";
import { Link } from "react-router";
import { ShoppingCart, Image } from "lucide-react";
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
      <div className="group bg-card border-border relative flex flex-col overflow-hidden rounded-none border">
        <div className="bg-muted relative aspect-square overflow-hidden">
          {image ? (
            <Link
              onClick={isEditing ? editorLinkClick : undefined}
              to={`${basePath}/shop/${slug}`}
              className="block h-full w-full"
            >
              <img
                src={getImgUrl(image)}
                alt={name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
          ) : (
            <div className="bg-muted flex aspect-square w-full items-center justify-center">
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
            <div className="bg-destructive text-destructive-foreground absolute top-0 left-0 rounded-none px-2.5 py-1 text-xs font-semibold tracking-wide">
              -{discountPercent}%
            </div>
          )}
        </div>

        <div className="border-border flex flex-1 flex-col gap-1 border-t p-3">
          <Link
            onClick={isEditing ? editorLinkClick : undefined}
            to={`${basePath}/shop/${slug}`}
            className="line-clamp-2 text-sm leading-snug font-medium underline-offset-4 group-hover:underline"
          >
            {name}
          </Link>

          {short_description && (
            <p className="text-muted-foreground line-clamp-2 text-xs leading-relaxed">
              {short_description}
            </p>
          )}

          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-sm font-semibold">
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

          <Button
            size="sm"
            variant="outline"
            onClick={isEditing ? editorLinkClick : handleAddToCart}
            className="hover:bg-foreground hover:text-background hover:border-foreground mt-3 h-9 w-full gap-1.5 rounded-none text-xs font-medium tracking-wide transition-colors active:scale-[0.99]"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>Add</span>
          </Button>
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
