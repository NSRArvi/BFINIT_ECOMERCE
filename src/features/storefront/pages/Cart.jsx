import { ShoppingBag, Truck, ArrowRight, ArrowLeft } from "lucide-react";
import CartItem from "../components/cart/CartItem";
import useCart from "@/hooks/useCart";
import useCountry from "@/hooks/useCountry";
import { formatPrice } from "@/utils/formatPrice";
import { Button } from "@/components/ui/button";

const DELIVERY_FEE = 0;

export default function Cart() {
  const { selectedCountry } = useCountry();
  const { cartItems, subTotalAmount, totalSavingsAmount, totalAmount } =
    useCart();

  if (cartItems.length === 0) {
    return (
      <div className="bg-background text-foreground font-inter flex min-h-screen flex-col items-center justify-center gap-4 px-6">
        <div className="border-border flex h-16 w-16 items-center justify-center border">
          <ShoppingBag className="text-muted-foreground h-6 w-6" />
        </div>
        <p className="font-geist text-sm font-semibold tracking-[0.15em] uppercase">
          Your cart is empty
        </p>
        <p className="text-muted-foreground max-w-xs text-center text-sm">
          Items you add to your cart will show up here.
        </p>
        <button className="border-foreground hover:bg-foreground hover:text-background mt-2 flex items-center gap-2 border px-6 py-3 text-xs font-semibold tracking-widest uppercase transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" />
          Continue shopping
        </button>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground font-inter min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-border flex items-end justify-between gap-4 border-b py-6">
          <div>
            <p className="font-geist text-muted-foreground mb-2 text-[11px] tracking-[0.15em] uppercase">
              Home / Cart
            </p>
            <h1 className="font-geist text-2xl font-semibold tracking-tight">
              Shopping cart
            </h1>
          </div>
          <p className="text-muted-foreground shrink-0 text-sm">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px]">
          {/* left cart items */}
          <div className="border-border divide-border divide-y">
            {cartItems.map((item, i) => (
              <CartItem key={`${item.id}-${i}`} item={item} />
            ))}

            <div className="p-6 lg:p-8">
              <button className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-xs font-medium tracking-widest uppercase transition-colors">
                <ArrowLeft className="h-3.5 w-3.5" />
                Continue shopping
              </button>
            </div>
          </div>

          {/* right order summary */}
          <div className="bg-muted/40 h-fit">
            <div className="p-6 lg:p-8">
              <h2 className="font-geist mb-6 text-sm font-semibold tracking-widest uppercase">
                Order summary
              </h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>
                    {formatPrice(subTotalAmount, selectedCountry.abbreviation)}
                  </span>
                </div>
                {totalSavingsAmount > 0 && (
                  <div className="text-success flex justify-between">
                    <span>Savings</span>
                    <span>
                      -
                      {formatPrice(
                        totalSavingsAmount,
                        selectedCountry.abbreviation,
                      )}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Truck className="h-3.5 w-3.5" /> Delivery
                  </span>
                  <span>
                    {formatPrice(DELIVERY_FEE, selectedCountry.abbreviation)}
                  </span>
                </div>
                <div className="border-border flex justify-between border-t pt-3 text-base font-semibold">
                  <span>Total</span>
                  <span>
                    {formatPrice(totalAmount, selectedCountry.abbreviation)}
                  </span>
                </div>
              </div>

              <Button className="mt-6 w-full rounded-none py-6 font-semibold tracking-wide uppercase">
                Proceed to checkout
                <ArrowRight className="h-4 w-4" />
              </Button>

              <p className="text-muted-foreground mt-3 text-center text-xs">
                Shipping and taxes calculated at checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
