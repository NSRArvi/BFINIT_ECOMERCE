import { useNavigate, useParams } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Lock, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import useCart from "@/hooks/useCart";
import useCountry from "@/hooks/useCountry";
import useCustomerAuth from "../hooks/useCustomerAuth";
import { formatPrice } from "@/utils/formatPrice";
import { getImgUrl } from "@/utils/getImgUrl";
import useCustomerPostMutation from "../hooks/useCustomerPostMutation";
import toast from "react-hot-toast";
import useBasePath from "@/hooks/useBasePath";

const DELIVERY_FEE = 0;

const checkoutSchema = z.object({
  shipping_address: z.string().min(10, "Enter a complete shipping address"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .regex(/^\+?[0-9]+$/, "Digits only"),
  payment_type: z.enum(["online", "offline"], {
    required_error: "Select a payment method",
  }),
});

export default function Checkout() {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const basePath = useBasePath();
  const { selectedCountry } = useCountry();
  const { customer } = useCustomerAuth();
  const {
    cartItems,
    subTotalAmount,
    totalSavingsAmount,
    originalAmount,
    clearCart,
  } = useCart();

  const totalAmount = subTotalAmount + DELIVERY_FEE;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      shipping_address: "",
      phone: "",
      payment_type: "offline",
    },
  });

  const { mutate, isPending: isPlacingOrder } = useCustomerPostMutation({
    endpoint: "/api/v1/order",
    isTokenRequired: true,
  });

  const onSubmit = (data) => {
    const payload = {
      user_id: customer?.user?.id,
      store_id: parseInt(storeId),
      country_id: selectedCountry?.id,
      currency: selectedCountry?.currency_code,
      sub_total: subTotalAmount,
      total_amount: subTotalAmount + DELIVERY_FEE,
      payment_provider_id: 1,
      delivery_charge_id: 1,
      delivery_fee: DELIVERY_FEE,
      items: cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        ...(item.variantId && {
          product_variant_combination_id: item.variantId,
        }),
      })),
      ...data,
    };

    mutate(payload, {
      onSuccess: (data) => {
        console.log(data);
        if (!data?.success) {
          return toast.error(data?.message);
        }
        clearCart();
        toast.success(data?.message);
        navigate(`${basePath}/orders/${data.data.id}`);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <div className="bg-background text-foreground font-inter min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-border flex items-end justify-between gap-4 border-b py-6">
          <div>
            <p className="font-geist text-muted-foreground mb-2 text-[11px] tracking-[0.15em] uppercase">
              Home / Cart / Checkout
            </p>
            <h1 className="font-geist text-2xl font-semibold tracking-tight">
              Checkout
            </h1>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-[1fr_380px]"
        >
          {/* left: shipping + payment */}
          <div className="border-border divide-border divide-y">
            <div className="p-6 lg:p-8">
              <h2 className="font-geist mb-6 text-sm font-semibold tracking-widest uppercase">
                Shipping details
              </h2>

              <div className="space-y-5">
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor="phone">Phone number</FieldLabel>
                      <Input
                        id="phone"
                        placeholder="+8801712345678"
                        className="rounded-none"
                        {...field}
                      />
                      <FieldError>{errors.phone?.message}</FieldError>
                    </Field>
                  )}
                />

                <Controller
                  name="shipping_address"
                  control={control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor="shipping_address">
                        Shipping address
                      </FieldLabel>
                      <Textarea
                        id="shipping_address"
                        rows={4}
                        placeholder="House, road, area, city"
                        className="rounded-none"
                        {...field}
                      />
                      <FieldError>
                        {errors.shipping_address?.message}
                      </FieldError>
                    </Field>
                  )}
                />
              </div>
            </div>

            <div className="p-6 lg:p-8">
              <h2 className="font-geist mb-6 text-sm font-semibold tracking-widest uppercase">
                Payment method
              </h2>

              <Controller
                name="payment_type"
                control={control}
                render={({ field }) => (
                  <Field>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="space-y-3"
                    >
                      <label
                        htmlFor="offline"
                        className={`flex cursor-pointer items-center gap-3 border p-4 transition-colors ${
                          field.value === "offline"
                            ? "border-foreground"
                            : "border-border"
                        }`}
                      >
                        <RadioGroupItem value="offline" id="offline" />
                        <div>
                          <p className="text-sm font-medium">
                            Cash on delivery
                          </p>
                          <p className="text-muted-foreground text-xs">
                            Pay when your order arrives
                          </p>
                        </div>
                      </label>

                      <label
                        htmlFor="online"
                        className={`flex cursor-pointer items-center gap-3 border p-4 transition-colors ${
                          field.value === "online"
                            ? "border-foreground"
                            : "border-border"
                        }`}
                      >
                        <RadioGroupItem value="online" id="online" />
                        <div>
                          <p className="text-sm font-medium">Pay online</p>
                          <p className="text-muted-foreground text-xs">
                            Card, mobile banking, or wallet
                          </p>
                        </div>
                      </label>
                    </RadioGroup>
                    <FieldError>{errors.payment_type?.message}</FieldError>
                  </Field>
                )}
              />
            </div>

            <div className="p-6 lg:p-8">
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-xs font-medium tracking-widest uppercase transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to cart
              </button>
            </div>
          </div>

          {/* right: order summary */}
          <div className="bg-muted/40 h-fit border border-t-0">
            <div className="p-6 lg:p-8">
              <h2 className="font-geist mb-6 text-sm font-semibold tracking-widest uppercase">
                Order summary
              </h2>

              <div className="divide-border custom-scrollbar-hide mb-6 max-h-72 space-y-0 divide-y overflow-y-auto">
                {cartItems.map((item, i) => {
                  const finalPrice =
                    item.discount_value > 0 ? item.discount_value : item.price;
                  const hasDiscount =
                    item.discount_value > 0 && item.discount_value < item.price;
                  const lineTotal = finalPrice * item.quantity;

                  return (
                    <div
                      key={`${item.id}-${item.variantId ?? i}`}
                      className="flex items-start gap-3 py-3 first:pt-0"
                    >
                      <div className="border-border bg-muted relative h-14 w-14 shrink-0 overflow-hidden border">
                        <img
                          src={getImgUrl(item.image)}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium">
                          {item.name}
                        </p>

                        {item.optionLabels && (
                          <p className="text-muted-foreground text-[11px]">
                            {Object.values(item.optionLabels).join(" · ")}
                          </p>
                        )}

                        <p className="text-muted-foreground mt-1 text-[11px]">
                          {item.quantity} ×{" "}
                          {formatPrice(
                            finalPrice,
                            selectedCountry.abbreviation,
                          )}
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        {hasDiscount && item.quantity === 1 && (
                          <p className="text-muted-foreground text-[11px] line-through">
                            {formatPrice(
                              item.price * item.quantity,
                              selectedCountry.abbreviation,
                            )}
                          </p>
                        )}
                        <p className="text-xs font-semibold">
                          {formatPrice(lineTotal, selectedCountry.abbreviation)}
                        </p>
                      </div>
                    </div>
                  );
                })}
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

              <Button
                type="submit"
                disabled={isPlacingOrder}
                className="mt-6 w-full rounded-none py-6 font-semibold tracking-wide uppercase"
              >
                <Lock className="h-4 w-4" />
                {isPlacingOrder ? "Placing order..." : "Place order"}
              </Button>

              <p className="text-muted-foreground mt-3 text-center text-xs">
                By placing your order you agree to our terms
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
