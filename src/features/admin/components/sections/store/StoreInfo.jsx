import { FieldDescription, FieldLegend } from "@/components/ui/field";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { slugify } from "@/features/admin/utils/slugify";
import { sanitizeSubdomainInput } from "@/features/admin/utils/sanitizeSubdomainInput";
import { Spinner } from "@/components/ui/spinner";
import { AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

export default function StoreInfo({
  form,
  isEditMode,
  subdomainTouchedRef,
  isSubdomainChecking,
  subdomainCheck,
}) {
  const selectedCountries = form.watch("countries");
  const defaultCountryId = form.watch("default_country_id");

  const defaultCountry = selectedCountries?.find(
    (country) => country?.id === defaultCountryId,
  );

  const isTaken =
    !isEditMode &&
    !isSubdomainChecking &&
    subdomainCheck?.data?.available === false;

  return (
    <div className="bg-card rounded-lg p-5">
      <FieldLegend>Store Information</FieldLegend>
      <FieldDescription>
        Enter your store name and contact details for your primary country.
      </FieldDescription>

      <div className="mt-4 grid grid-cols-1 items-start gap-4 md:mt-6 md:grid-cols-2 md:gap-6">
        <FormField
          control={form.control}
          name="name"
          rules={{
            required: "Store name is required",
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">
                Store Name <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter your store name" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          rules={{
            required: "Email address is required",
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">
                Email Address <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your store email address"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="public_subdomain"
          rules={{ required: "store url is required" }}
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel className="text-xs">
                Store URL <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <div
                  className={cn(
                    "flex h-9 w-full items-center gap-1.5 overflow-hidden rounded-md border text-sm",
                    "border-input focus-within:border-primary focus-within:ring-primary/20 focus-within:ring-1",
                    isTaken &&
                      "border-destructive focus-within:border-destructive focus-within:ring-destructive/20",
                    isEditMode && "bg-muted/40 cursor-not-allowed",
                  )}
                >
                  <Input
                    {...field}
                    onChange={(e) => {
                      subdomainTouchedRef.current = true;
                      field.onChange(sanitizeSubdomainInput(e.target.value));
                    }}
                    onBlur={(e) => {
                      field.onChange(slugify(e.target.value));
                      field.onBlur();
                    }}
                    readOnly={isEditMode}
                    disabled={isEditMode}
                    placeholder="Enter your store url address"
                    className="h-full min-w-1/4 flex-1 shrink-0 border-0 px-3 focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-100"
                  />

                  <div className="bg-secondary inline-flex h-full shrink-0 items-center gap-2 px-3">
                    {!isEditMode && isSubdomainChecking && <Spinner />}
                    <span className="text-muted-foreground flex h-full items-center">
                      .bfinit.com
                    </span>
                  </div>
                </div>
              </FormControl>

              {isEditMode && (
                <p className="text-muted-foreground text-xs">
                  Your store URL can&apos;t be changed. Want a different
                  address?{" "}
                  <Link
                    to="/domains"
                    className="text-primary underline underline-offset-2"
                  >
                    Connect a custom domain
                  </Link>{" "}
                </p>
              )}

              {isTaken && (
                <div className="flex flex-wrap items-end gap-2 space-y-1.5">
                  <p className="text-destructive flex shrink-0 items-center gap-1.5 text-xs">
                    <AlertCircle className="size-3.5" />
                    That URL is already taken. Choose one of these:
                  </p>
                  {subdomainCheck?.data?.suggestions?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {subdomainCheck.data.suggestions.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => {
                            subdomainTouchedRef.current = true;
                            field.onChange(s);
                            field.onBlur();
                          }}
                          className="border-border hover:bg-muted/30 rounded-md border px-2.5 py-1 text-xs"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mobile"
          rules={{
            required: "Mobile number is required",
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">
                Mobile Number <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <div className="border-input focus-within:border-primary focus-within:ring-primary/20 flex h-9 items-center gap-1.5 rounded-md border px-3 text-sm focus-within:ring-1">
                  {defaultCountry?.country_code && (
                    <span className="text-muted-foreground">
                      {defaultCountry?.country_code}
                    </span>
                  )}

                  <Input
                    {...field}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="Enter your mobile number"
                    className="h-full w-full min-w-1/4 flex-1 shrink-0 border-0 px-0 focus-visible:ring-0"
                  />
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="telephone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Telephone Number</FormLabel>
              <FormControl>
                <div className="border-input focus-within:border-primary focus-within:ring-primary/20 flex h-9 items-center gap-1.5 rounded-md border px-3 text-sm focus-within:ring-1">
                  {defaultCountry?.country_code && (
                    <span className="text-muted-foreground">
                      {defaultCountry?.country_code}
                    </span>
                  )}

                  <Input
                    {...field}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="Enter your telephone number (optional)"
                    className="h-full w-full min-w-1/4 flex-1 shrink-0 border-0 px-0 focus-visible:ring-0"
                  />
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
