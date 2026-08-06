import { ChevronLeft, Landmark } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import usePostMutation from "@/hooks/api/usePostMutation";
import PageHeader from "../../../../admin/components/PageHeader";
import DynamicBreadcrumb from "../../../../admin/components/DynamicBreadcrumb";
import { breadcrubms } from "@/utils/constants/breadcrumbs";
import { Link, useNavigate, useParams } from "react-router";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import {
  emptyDefaults,
  transformPlatformBankData,
} from "@/features/admin/utils/platformBankAccHelper";
import usePatchMutaion from "@/hooks/api/usePatchMutaion";
import toast from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";

export default function BankForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const { data, isLoading: isDataLoading } = useGetQuery({
    endpoint: `/api/v1/platform-bank-payment/get/${id}`,
    enabled: !!id,
    newBaseUrl: true,
    queryKey: ["platform_bank_details", id],
  });

  const form = useForm({
    values: isEditMode ? transformPlatformBankData(data?.data) : emptyDefaults,
  });
  const { handleSubmit } = form;

  const { mutate, isPending: isCreating } = usePostMutation({
    endpoint: "/api/v1/platform-bank-payment/create",
    newBaseUrl: true,
  });

  const { mutate: update, isPending: isUpdating } = usePatchMutaion({
    endpoint: `/api/v1/platform-bank-payment/update/${id}`,
    newBaseUrl: true,
  });

  const isLoading = isCreating || isDataLoading || isUpdating;
  const btnLabel = isEditMode ? "Update" : "Save";
  const btnLoadingLabel = isEditMode ? "Updating..." : "Saving...";

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
          <fieldset className="space-y-6">
            {/* Bank name */}
            <FormField
              control={form.control}
              name="bank_name"
              rules={{ required: "Bank name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">
                    Bank name <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="e.g. BNP Paribas"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Account name */}
            <FormField
              control={form.control}
              name="account_name"
              rules={{ required: "Account name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">
                    Account name <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="e.g. Société Générale France"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Account number */}
            <FormField
              control={form.control}
              name="account_number"
              rules={{ required: "Account Number is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">
                    Account number <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g. 20041010050500013M026"
                      inputMode="numeric"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Routing number + SWIFT side by side */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="routing_number"
                rules={{ required: "Routing Number is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">
                      Routing number <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g. 30004"
                        className="text-sm"
                        inputMode="numeric"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="swift_code"
                rules={{
                  required: "SWIFT / BIC code is required",
                  minLength: {
                    value: 8,
                    message: "Min length is 8 characters",
                  },
                  maxLength: {
                    value: 11,
                    message: "Max length is 11 characters",
                  },
                  pattern: {
                    value: /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/,
                    message: "Invalid SWIFT code format",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium">
                      SWIFT / BIC code{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="e.g. BNPAFRPP"
                        className="uppercase"
                        maxLength={11}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            {/* is_active toggle */}
            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-xs font-medium">
                      Active
                    </FormLabel>
                    <FormDescription className="text-xs">
                      Show this account as a payment option on the storefront
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Actions */}
            <div className="flex flex-col-reverse gap-4 lg:flex-row lg:justify-between">
              <Button variant="outline" size="sm" asChild className="text-xs">
                <Link to="/super-admin/packages">
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
