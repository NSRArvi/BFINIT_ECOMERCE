import { Link, useNavigate, useParams } from "react-router";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ChevronLeft, Landmark } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import PageHeader from "@/components/shared/PageHeader";
import { Form, FormDescription } from "@/components/ui/form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import useAuth from "@/hooks/auth/useAuth";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import usePostMutation from "@/hooks-v2/api/usePostMutation";
import usePatchMutation from "@/hooks-v2/api/usePatchMutation";
import useSelectedStore from "@/hooks/useSelectedStore";
import { breadcrubms } from "../utils/constants/breadcrumbs";
import { bankSchema } from "../schemas/bankSchema";

export default function BankForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { userData } = useAuth();
  const { activeStore } = useSelectedStore();

  const { data, isLoading: isBankLoading } = useGetQuery({
    endpoint: `/api/v1/bankPayment/get/${activeStore?.id}/${id}`,
    enabled: !!id,
    isTokenRequired: true,
    queryKey: ["bankAccounts", activeStore?.id, id],
  });

  const form = useForm({
    resolver: zodResolver(bankSchema),
    defaultValues: {
      bank_name: "",
      account_name: "",
      account_number: "",
      swift_code: "",
      iban: "",
      routing_number: "",
      is_active: true,
    },
    values: data?.data ?? undefined,
  });
  const { handleSubmit } = form;

  const { mutate, isPending } = usePostMutation({
    endpoint: "/api/v1/bankPayment/create",
    isTokenRequired: true,
  });

  const { mutate: update, isPending: isUpdating } = usePatchMutation({
    endpoint: `/api/v1/bankPayment/update/${activeStore?.id}/${id}`,
    isTokenRequired: true,
  });

  const onSubmit = (data) => {
    const payload = {
      ...data,
      user_id: userData?.id,
      store_id: activeStore?.id,
    };

    const onSuccess = (data) => {
      if (!data?.success) return toast.error(data?.message);
      toast.success(data?.message);
      navigate("/payments/manage-bank");
    };

    const onError = (error) => {
      console.log(error);
    };

    if (id) {
      return update(payload, { onSuccess, onError });
    }

    mutate(payload, {
      onSuccess,
      onError,
    });
  };

  const isLoading = isPending || isBankLoading || isUpdating;
  const btnLabel = id ? "Update" : "Save";
  const btnLoadingLabel = id ? "Updating..." : "Saving...";

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.bankPayment} />

      <PageHeader
        icon={Landmark}
        title="Add Bank Account"
        description="Add a bank account customers can use to pay by bank transfer"
        showStoreName={false}
      />

      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-card rounded-lg border p-5"
        >
          <fieldset disabled={isLoading} className="space-y-6">
            <Controller
              name="bank_name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Bank Name <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. BNP Paribas"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="account_name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Account Holder Name
                    <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. John Smith"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="account_number"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Account Number <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. 123456789012"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="grid grid-cols-2 gap-x-6">
              <Controller
                name="swift_code"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      SWIFT / BIC Code
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="e.g. DEUTDEFF"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="iban"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>IBAN</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="e.g. DE89 3704 0044 0532 0130 00"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              name="routing_number"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Routing Number</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. 021000021 (if applicable)"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="is_active"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  orientation="horizontal"
                >
                  <div className="flex-1 space-y-0.5">
                    <FieldLabel htmlFor={field.name}>Active</FieldLabel>
                    <FormDescription className="text-xs">
                      Customers will see this bank account when paying by bank
                      transfer
                    </FormDescription>
                  </div>
                  <div>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="flex flex-col-reverse gap-4 lg:flex-row lg:justify-between">
              <Button variant="outline" size="sm" asChild>
                <Link to="/">
                  <ChevronLeft /> Back to Home
                </Link>
              </Button>
              <Button
                disabled={isLoading}
                type="submit"
                size="sm"
                className="min-w-[105px] text-xs"
              >
                {isLoading ? (
                  <>
                    <Spinner /> {btnLoadingLabel}
                  </>
                ) : (
                  btnLabel
                )}
              </Button>
            </div>
          </fieldset>
        </form>
      </Form>
    </section>
  );
}
