import { Fragment } from "react";
import { useParams } from "react-router";
import { Copy, Upload } from "lucide-react";
import { Controller, useWatch } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import useCustomerGetQuery from "@/features/storefront/hooks/useCustomerGetQuery";
import { cn } from "@/lib/utils";

export default function PaymentMethod({ control, errors }) {
  const { storeId } = useParams();
  const paymentMethod = useWatch({ control, name: "payment_method" });
  const isBankPayment = paymentMethod === "bank_payment";

  const { data, isLoading } = useCustomerGetQuery({
    endpoint: `/api/v1/bankPayment/get-active/${storeId}`,
    enabled: !!isBankPayment,
    isTokenRequired: true,
    queryKey: ["bankAccounts", "active", storeId],
  });

  const bankData = data?.data;

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

  return (
    <div className="p-6 lg:p-8">
      <h2 className="font-geist mb-6 text-sm font-semibold tracking-widest uppercase">
        Payment method
      </h2>

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
              <label
                htmlFor="cod"
                className={`flex cursor-pointer items-center gap-3 border p-4 transition-colors ${
                  field.value === "cod" ? "border-foreground" : "border-border"
                }`}
              >
                <RadioGroupItem value="cod" id="cod" />
                <div>
                  <p className="text-sm font-medium">Cash on delivery</p>
                  <p className="text-muted-foreground text-xs">
                    Pay when your order is delivered
                  </p>
                </div>
              </label>

              <label
                htmlFor="stripe"
                className={`flex cursor-pointer items-center gap-3 border p-4 transition-colors ${
                  field.value === "stripe"
                    ? "border-foreground"
                    : "border-border"
                }`}
              >
                <RadioGroupItem value="stripe" id="stripe" />
                <div>
                  <p className="text-sm font-medium">Pay online</p>
                  <p className="text-muted-foreground text-xs">
                    Securely pay with cards, mobile banking or digital wallets
                  </p>
                </div>
              </label>

              <label
                htmlFor="bank_payment"
                className={`flex cursor-pointer items-center gap-3 border p-4 transition-colors ${
                  field.value === "bank_payment"
                    ? "border-foreground"
                    : "border-border"
                }`}
              >
                <RadioGroupItem value="bank_payment" id="bank_payment" />
                <div>
                  <p className="text-sm font-medium">Bank transfer</p>
                  <p className="text-muted-foreground text-xs">
                    Transfer funds directly to our bank account
                  </p>
                </div>
              </label>
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
              {isLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <Fragment key={i}>
                      <Skeleton className="h-3.5 w-20" />
                      <Skeleton className="h-3.5 w-32" />
                    </Fragment>
                  ))
                : paymentFields.map((field) => (
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
            render={({ field: { value, onChange, ...field }, fieldState }) => {
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
                        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
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
    </div>
  );
}
