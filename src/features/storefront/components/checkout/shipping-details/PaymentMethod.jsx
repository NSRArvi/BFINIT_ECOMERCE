import { Fragment, useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { Copy, CreditCard, Upload } from "lucide-react";
import { Controller, useWatch } from "react-hook-form";
import CheckoutEmptyState from "../CheckoutEmptyState";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useCustomerGetQuery from "@/features/storefront/hooks/useCustomerGetQuery";
import { cn } from "@/lib/utils";

const PAYMENT_OPTION_UI = {
  cod: {
    value: "cod",
    title: "Cash on delivery",
    description: "Pay when your order is delivered",
  },
  stripe: {
    value: "stripe",
    title: "Pay online",
    description: "Securely pay with cards, mobile banking or digital wallets",
  },
  bank: {
    value: "bank_payment",
    title: "Bank transfer",
    description: "Transfer funds directly to our bank account",
  },
};

export default function PaymentMethod({ control, errors, setValue }) {
  const { storeId } = useParams();
  const selectedPaymentMethod = useWatch({ control, name: "payment_method" });
  const isBankPayment = selectedPaymentMethod === "bank_payment";

  const { data: paymentMethods } = useCustomerGetQuery({
    endpoint: `/api/v1/dashboard/stores/${storeId}/payment-methods`,
    enabled: !!storeId,
    isTokenRequired: true,
    queryKey: ["payment-methods", storeId],
  });

  const options = useMemo(
    () =>
      paymentMethods?.data
        ?.filter((method) => method.isConfigured && method.isEnabled)
        ?.map((method) => PAYMENT_OPTION_UI[method.key])
        ?.filter(Boolean),
    [paymentMethods?.data],
  );

  useEffect(() => {
    if (!options?.length) return;
    if (!options?.some((option) => option?.value === selectedPaymentMethod)) {
      setValue("payment_method", options?.[0]?.value);
    }
  }, [options, selectedPaymentMethod, setValue]);

  const bankData = paymentMethods?.data?.find(
    (method) => method?.key === "bank",
  )?.bank;

  const paymentFields = [
    { label: "Bank name", value: bankData?.bank_name },
    { label: "Account name", value: bankData?.account_name },
    {
      label: "Account number",
      value: bankData?.account_number,
      copyable: true,
    },
    { label: "Routing number", value: bankData?.routing_number },
    { label: "SWIFT/BIC", value: bankData?.swift_code },
    { label: "IBAN", value: bankData?.iban },
  ].filter((f) => f.value);

  let content = null;

  if (options?.length === 0) {
    content = (
      <CheckoutEmptyState
        icon={CreditCard}
        title="No payment methods available"
        description="This store isn't accepting payments right now. Please try again later or contact the store for assistance."
      />
    );
  } else if (options?.length > 0) {
    content = (
      <>
        <Controller
          name="payment_method"
          control={control}
          render={({ field }) => (
            <Field>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="space-y-3"
              >
                {options?.map((option) => (
                  <label
                    key={option?.value}
                    htmlFor={option?.value}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 border p-4 transition-colors",
                      field?.value === option?.value
                        ? "border-foreground"
                        : "border-border",
                    )}
                  >
                    <RadioGroupItem value={option?.value} id={option?.value} />
                    <div>
                      <p className="text-sm font-medium">{option?.title}</p>
                      <p className="text-muted-foreground text-xs">
                        {option?.description}
                      </p>
                    </div>
                  </label>
                ))}
              </RadioGroup>
              <FieldError>{errors.payment_method?.message}</FieldError>
            </Field>
          )}
        />

        {isBankPayment && (
          <div className="border-border bg-muted/30 mt-4 space-y-4 border p-4">
            <div className="bg-background border-border space-y-2 border p-3">
              <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                Send payment to
              </p>
              <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-xs">
                {paymentFields.map((field) => (
                  <Fragment key={field.label}>
                    <p className="text-muted-foreground">{field.label}</p>
                    {field.copyable ? (
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{field.value}</p>
                        <button
                          type="button"
                          onClick={() =>
                            navigator.clipboard.writeText(field.value)
                          }
                          className="text-muted-foreground hover:text-foreground"
                          aria-label={`Copy ${field.label.toLowerCase()}`}
                        >
                          <Copy className="size-3" />
                        </button>
                      </div>
                    ) : (
                      <p className="font-medium">{field.value}</p>
                    )}
                  </Fragment>
                ))}
              </div>
            </div>

            <Controller
              name="transaction_id"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Transaction ID <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. TRX9F4A2K8M"
                    className="bg-background rounded-none"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="transaction_proof"
              control={control}
              render={({
                field: { value, onChange, ...field },
                fieldState,
              }) => {
                const previewUrl =
                  value instanceof File ? URL.createObjectURL(value) : null;

                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>
                      Transaction proof{" "}
                      <span className="text-destructive">*</span>
                    </FieldLabel>

                    {!value ? (
                      <label
                        htmlFor={field.name}
                        className={cn(
                          "border-border hover:border-foreground bg-background flex cursor-pointer flex-col items-center justify-center gap-2 border border-dashed p-6 transition-colors",
                          fieldState.invalid &&
                            "border-destructive hover:border-destructive",
                        )}
                      >
                        <Upload className="text-muted-foreground h-5 w-5" />
                        <p className="text-muted-foreground text-xs">
                          Click to upload a screenshot (max 2MB)
                        </p>
                        <input
                          {...field}
                          id={field.name}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          aria-invalid={fieldState.invalid}
                          onChange={(e) =>
                            onChange(e.target.files?.[0] ?? null)
                          }
                        />
                      </label>
                    ) : (
                      <div className="border-border flex items-center gap-3 border p-2">
                        <img
                          src={previewUrl}
                          alt="Transaction proof preview"
                          className="size-19 rounded-sm object-cover"
                        />
                        <p className="text-muted-foreground flex-1 truncate text-xs">
                          {value.name}
                        </p>
                        <button
                          type="button"
                          onClick={() => onChange(null)}
                          className="text-muted-foreground hover:text-destructive text-xs underline"
                        >
                          Remove
                        </button>
                      </div>
                    )}

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                );
              }}
            />
          </div>
        )}
      </>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <h2 className="font-geist mb-6 text-sm font-semibold tracking-widest uppercase">
        Payment method
      </h2>

      {content}
    </div>
  );
}
