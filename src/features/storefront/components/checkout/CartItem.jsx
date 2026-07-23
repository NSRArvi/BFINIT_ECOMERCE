import useCountry from "@/hooks/useCountry";
import { formatPrice } from "@/utils/formatPrice";
import { getImgUrl } from "@/utils/getImgUrl";

export default function CartItem({ item }) {
  const { selectedCountry } = useCountry();

  const { image, name, optionLabels, quantity, price, discount_value } =
    item || {};

  const finalPrice = discount_value > 0 ? discount_value : price;
  const lineTotal = finalPrice * quantity;
  const hasDiscount = discount_value > 0 && discount_value < price;

  return (
    <div className="flex items-start gap-3 py-3 first:pt-0">
      <div className="border-border bg-muted relative h-14 w-14 shrink-0 overflow-hidden border">
        <img
          src={getImgUrl(image)}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium">{name}</p>

        {optionLabels && (
          <p className="text-muted-foreground text-[11px]">
            {Object.values(optionLabels).join(" · ")}
          </p>
        )}

        <p className="text-muted-foreground mt-1 text-[11px]">
          {quantity} × {formatPrice(finalPrice, selectedCountry.abbreviation)}
        </p>
      </div>

      <div className="shrink-0 text-right">
        {hasDiscount && quantity === 1 && (
          <p className="text-muted-foreground text-[11px] line-through">
            {formatPrice(price * quantity, selectedCountry.abbreviation)}
          </p>
        )}
        <p className="text-xs font-semibold">
          {formatPrice(lineTotal, selectedCountry.abbreviation)}
        </p>
      </div>
    </div>
  );
}
