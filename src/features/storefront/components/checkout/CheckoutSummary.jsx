import { Lock, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartItem from "./CartItem";
import useCart from "@/hooks/useCart";
import useCountry from "@/hooks/useCountry";
import { formatPrice } from "@/utils/formatPrice";
import { Link } from "react-router";
import useBasePath from "@/hooks/useBasePath";

export default function CheckoutSummary({
  isPlacingOrder,
  deliveryFee,
  isLoading,
  hasDeliveryRate,
}) {
  const { selectedCountry } = useCountry();
  const { cartItems, subTotalAmount, totalSavingsAmount, originalAmount } =
    useCart();
  const basePath = useBasePath();

  const totalAmount = subTotalAmount + deliveryFee;

  return (
    <div className="bg-muted/40 h-fit border border-t-0">
      <div className="p-6 lg:p-8">
        <h2 className="font-geist mb-6 text-sm font-semibold tracking-widest uppercase">
          Order summary
        </h2>

        <div className="divide-border custom-scrollbar-hide mb-6 max-h-72 space-y-0 divide-y overflow-y-auto">
          {cartItems.map((item, i) => (
            <CartItem key={`${item.id}-${item.variantId ?? i}`} item={item} />
          ))}
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>
              {formatPrice(originalAmount, selectedCountry.abbreviation)}
            </span>
          </div>
          {totalSavingsAmount > 0 && (
            <div className="text-success flex justify-between">
              <span>Savings</span>
              <span>
                -{formatPrice(totalSavingsAmount, selectedCountry.abbreviation)}
              </span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-muted-foreground flex items-center gap-1">
              <Truck className="h-3.5 w-3.5" /> Delivery
            </span>

            {isLoading && (
              <span className="text-muted-foreground text-sm">
                Calculating...
              </span>
            )}

            {!isLoading && hasDeliveryRate && (
              <span className="font-medium">
                {formatPrice(deliveryFee, selectedCountry.abbreviation)}
              </span>
            )}

            {!isLoading && !hasDeliveryRate && (
              <span className="text-muted-foreground text-sm">Unavailable</span>
            )}
          </div>

          <div className="border-border flex justify-between border-t pt-3 text-base font-semibold">
            <span>Total</span>
            <span>
              {formatPrice(totalAmount, selectedCountry.abbreviation)}
            </span>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isPlacingOrder}
          className="mt-6 w-full rounded-none py-6 font-semibold tracking-wide uppercase"
        >
          <Lock className="h-4 w-4" />
          {isPlacingOrder ? "Placing order..." : "Place order"}
        </Button>

        <p className="text-muted-foreground mt-3 text-center text-xs">
          By placing your order, you agree to our{" "}
          <Link
            to={`${basePath}/support/terms-and-conditions`}
            className="text-foreground hover:underline"
          >
            Legal & Terms
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
