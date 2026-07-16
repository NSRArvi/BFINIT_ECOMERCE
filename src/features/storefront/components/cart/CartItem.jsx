import useCart from "@/hooks/useCart";
import useCountry from "@/hooks/useCountry";
import { formatPrice } from "@/utils/formatPrice";
import { getImgUrl } from "@/utils/getImgUrl";
import { Plus, Minus, Trash2 } from "lucide-react";

const LOW_STOCK_THRESHOLD = 15;

export default function CartItem({ item = {} }) {
  const { selectedCountry } = useCountry();
  const { updateItemQuantity, removeItem } = useCart();

  const {
    id,
    variantId,
    name,
    image,
    price,
    discount_value,
    quantity,
    stock,
    optionLabels,
  } = item || {};

  const lowStock = stock <= LOW_STOCK_THRESHOLD;
  const hasDiscount = discount_value < price;
  const finalPrice = discount_value > 0 ? discount_value : price;
  const lineTotal = finalPrice * quantity;

  return (
    <div
      key={`${id}-${variantId ?? "base"}`}
      className="flex gap-5 border-r p-6 lg:p-8"
    >
      <div className="border-border bg-muted relative h-28 w-28 shrink-0 overflow-hidden border">
        <img
          src={getImgUrl(image)}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold">{name}</p>

            {optionLabels && (
              <p className="text-muted-foreground mt-1 text-xs">
                {Object.entries(optionLabels)
                  .map(([key, value]) => `${key}: ${value}`)
                  .join(" · ")}
              </p>
            )}

            {lowStock && (
              <p className="mt-2 text-xs font-semibold">
                Only {stock} left in stock
              </p>
            )}
          </div>

          <button
            onClick={() => removeItem(id, variantId)}
            className="text-muted-foreground hover:text-destructive shrink-0"
            aria-label="Remove item"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3 flex items-end justify-between">
          <div className="border-border flex items-center border">
            <button
              onClick={() => updateItemQuantity(id, variantId)}
              disabled={quantity <= 1}
              className="hover:bg-secondary flex h-8 w-8 items-center justify-center disabled:opacity-30"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-9 text-center text-sm font-semibold">
              {quantity}
            </span>
            <button
              onClick={() => updateItemQuantity(id, variantId, "increment")}
              disabled={quantity >= stock}
              className="hover:bg-secondary flex h-8 w-8 items-center justify-center disabled:opacity-30"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="text-right">
            {hasDiscount && (
              <p className="text-muted-foreground text-[11px] line-through">
                {formatPrice(price * quantity, selectedCountry.abbreviation)}
              </p>
            )}
            <p className="text-sm font-semibold">
              {formatPrice(lineTotal, selectedCountry.abbreviation)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
