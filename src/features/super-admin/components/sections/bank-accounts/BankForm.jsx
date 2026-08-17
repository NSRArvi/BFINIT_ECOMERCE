import { Link, useNavigate, useParams } from "react-router";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ChevronLeft, ChevronsUpDown, Landmark, SearchX } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import { Form, FormDescription } from "@/components/ui/form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import PageHeader from "../../../../admin/components/PageHeader";
import { Spinner } from "@/components/ui/spinner";
import usePatchMutaion from "@/hooks/api/usePatchMutaion";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import usePostMutation from "@/hooks-v2/api/usePostMutation";
import { breadcrubms } from "@/utils/constants/breadcrumbs";
import {
  emptyDefaults,
  transformPlatformBankData,
} from "@/features/admin/utils/platformBankAccHelper";
import { bankSchema } from "@/features/admin/schemas/bankSchema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";

export default function BankForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const { data: countries, isLoading: isCountriesLoading } = useGetQuery({
    endpoint: "/api/v1/country",
    enabled: true,
    queryKey: ["countries"],
  });

  const { data, isLoading: isDataLoading } = useGetQuery({
    endpoint: `/api/v1/platform-bank-payment/get/${id}`,
    enabled: !!id,
    queryKey: ["platform_bank_details", id],
  });

  const form = useForm({
    resolver: zodResolver(bankSchema),
    values: isEditMode ? transformPlatformBankData(data?.data) : emptyDefaults,
  });
  const { handleSubmit } = form;

  const [open, setOpen] = useState(false);

  const { mutate, isPending: isCreating } = usePostMutation({
    endpoint: "/api/v1/platform-bank-payment/create",
    isTokenRequired: true,
  });

  const { mutate: update, isPending: isUpdating } = usePatchMutaion({
    endpoint: `/api/v1/platform-bank-payment/update/${id}`,
    newBaseUrl: true,
  });

  const onSubmit = (data) => {
    if (!id) {
      mutate(data, {
        onSuccess: (res) => {
          toast.success(res?.message);
          form.reset(emptyDefaults);
          navigate("/super-admin/bank-accounts");
        },
        onError: (err) => {
          toast.error(err?.message);
        },
      });

      return;
    }

    update(data, {
      onSuccess: (res) => {
        toast.success(res?.message);
        navigate("/super-admin/bank-accounts");
      },
      onError: (err) => {
        toast.error(err?.message);
      },
    });
  };

  const isLoading = isCreating || isDataLoading || isUpdating;
  const btnLabel = isEditMode ? "Update" : "Save";
  const btnLoadingLabel = isEditMode ? "Updating..." : "Saving...";

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.addPlatformBank} />

      <PageHeader
        icon={Landmark}
        title="Add Bank Account"
        description="Add a new bank account to display on the e-BFINIT"
        showStoreName={false}
      />

      {/* Form card */}
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-card rounded-lg border p-5"
        >
          <fieldset disabled={isLoading} className="space-y-6">
            <Controller
              name="country"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Country <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        disabled={isCountriesLoading}
                        className="w-full justify-between font-normal"
                      >
                        <span
                          className={
                            field.value ? "" : "text-muted-foreground text-sm"
                          }
                        >
                          {isCountriesLoading
                            ? "Loading countries..."
                            : field.value || "Search countries"}
                        </span>
                        <ChevronsUpDown className="text-muted-foreground size-4 shrink-0" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-[--radix-popover-trigger-width] min-w-[--radix-popover-trigger-width] p-0"
                      align="start"
                    >
                      <Command>
                        <CommandInput placeholder="Search countries..." />
                        <CommandList>
                          <CommandEmpty>
                            <SearchX className="text-muted-foreground mx-auto mb-2 size-4" />
                            <p className="text-muted-foreground text-xs">
                              No countries found
                            </p>
                          </CommandEmpty>
                          <CommandGroup>
                            {countries?.data?.map((country) => (
                              <CommandItem
                                key={country?.id}
                                value={country?.name}
                                onSelect={() => {
                                  field.onChange(country?.name);
                                  setOpen(false);
                                }}
                              >
                                <span>{country?.flag_emoji}</span>
                                <span>{country?.name}</span>
                                <span className="text-muted-foreground ml-auto text-[11px]">
                                  {country?.currency_code}
                                </span>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

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

            <div className="grid grid-cols-2 gap-6">
              <Controller
                name="account_number"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Account Number</FieldLabel>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        form.trigger(["account_number", "iban"]);
                      }}
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

              <Controller
                name="iban"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>IBAN</FieldLabel>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        form.trigger(["account_number", "iban"]);
                      }}
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
            </div>

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
