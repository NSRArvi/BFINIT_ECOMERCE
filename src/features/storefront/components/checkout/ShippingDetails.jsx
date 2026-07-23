import { Controller } from "react-hook-form";
import { ArrowLeft, Truck } from "lucide-react";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import useCountry from "@/hooks/useCountry";
import { formatPrice } from "@/utils/formatPrice";
import { Link } from "react-router";
import useBasePath from "@/hooks/useBasePath";

export default function ShippingDetails({
  control,
  errors,
  isLoading,
  deliveryOptions = [],
}) {
  const { selectedCountry } = useCountry();
  const basePath = useBasePath();

  return (
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
                <FieldLabel htmlFor="phone">
                  Phone number <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  className="rounded-none"
                  {...field}
                />
                <FieldError>{errors.phone?.message}</FieldError>
              </Field>
            )}
          />

          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="state">
                  State / Province <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  id="state"
                  placeholder="Enter your state or province"
                  className="rounded-none"
                  {...field}
                />
                <FieldError>{errors.state?.message}</FieldError>
              </Field>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="city">City</FieldLabel>
                  <Input
                    id="city"
                    placeholder="Enter your city"
                    className="rounded-none"
                    {...field}
                  />
                  <FieldError>{errors.city?.message}</FieldError>
                </Field>
              )}
            />

            <Controller
              name="postal_code"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="postal_code">Postal code</FieldLabel>
                  <Input
                    id="postal_code"
                    placeholder="Enter your postal code"
                    className="rounded-none"
                    {...field}
                  />
                  <FieldError>{errors.postal_code?.message}</FieldError>
                </Field>
              )}
            />
          </div>

          <Controller
            name="shipping_address"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="shipping_address">
                  Address <span className="text-destructive">*</span>
                </FieldLabel>
                <Textarea
                  id="shipping_address"
                  rows={4}
                  placeholder="Street address, apartment, suite, etc."
                  className="rounded-none"
                  {...field}
                />
                <FieldError>{errors.shipping_address?.message}</FieldError>
              </Field>
            )}
          />

          <Controller
            name="delivery_zone_rate_id"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Delivery method</FieldLabel>

                {isLoading && (
                  <div className="space-y-3">
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="border-border flex animate-pulse items-center justify-between border p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-muted h-4 w-4 rounded-full" />
                          <div className="space-y-2">
                            <div className="bg-muted h-3 w-32 rounded" />
                            <div className="bg-muted h-3 w-20 rounded" />
                          </div>
                        </div>
                        <div className="bg-muted h-4 w-14 rounded" />
                      </div>
                    ))}
                  </div>
                )}

                {!isLoading && deliveryOptions?.length > 0 && (
                  <RadioGroup
                    value={String(field.value)}
                    onValueChange={(v) => field.onChange(Number(v))}
                    className="space-y-3"
                  >
                    {deliveryOptions?.map((opt) => (
                      <label
                        key={opt.rate_id}
                        htmlFor={`rate-${opt.rate_id}`}
                        className={`flex cursor-pointer items-center justify-between gap-3 border p-4 transition-colors ${
                          field.value === opt.rate_id
                            ? "border-foreground"
                            : "border-border"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <RadioGroupItem
                            value={String(opt.rate_id)}
                            id={`rate-${opt.rate_id}`}
                          />
                          <div>
                            <p className="text-sm font-medium">{opt.name}</p>
                            <p className="text-muted-foreground text-xs">
                              {opt.estimated_min_days === opt.estimated_max_days
                                ? `${opt.estimated_min_days} day`
                                : `${opt.estimated_min_days}-${opt.estimated_max_days} days`}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm font-semibold">
                          {formatPrice(
                            Number(opt.fee),
                            selectedCountry.abbreviation,
                          )}
                        </p>
                      </label>
                    ))}
                  </RadioGroup>
                )}

                {!isLoading && deliveryOptions?.length === 0 && (
                  <div className="border-border bg-background border py-8 text-center">
                    <Truck className="text-muted-foreground mx-auto mb-3 h-5 w-5" />
                    <h3 className="text-sm font-medium">
                      No delivery methods available
                    </h3>
                    <p className="text-muted-foreground mx-auto mt-2 max-w-md text-xs leading-5">
                      No delivery methods are available for your location. Try a
                      different shipping address or contact the store for
                      assistance.
                    </p>
                  </div>
                )}
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
                    <p className="text-sm font-medium">Cash on delivery</p>
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
        <Controller
          name="note"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor="shipping_address">
                Order Notes (Optional)
              </FieldLabel>
              <Textarea
                id="shipping_address"
                rows={4}
                placeholder="Add delivery instructions..."
                className="rounded-none"
                {...field}
              />
              <FieldError>{errors.shipping_address?.message}</FieldError>
            </Field>
          )}
        />
      </div>

      <div className="p-6 lg:p-8">
        <Link
          to={`${basePath}/cart`}
          className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-xs font-medium transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          Return to cart
        </Link>
      </div>
    </div>
  );
}
