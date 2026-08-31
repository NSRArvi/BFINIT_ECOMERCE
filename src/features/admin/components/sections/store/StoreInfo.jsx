import { FieldDescription, FieldLegend } from "@/components/ui/field";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function StoreInfo({ form }) {
  const selectedCountries = form.watch("countries");
  const defaultCountryId = form.watch("default_country_id");

  const defaultCountry = selectedCountries?.find(
    (country) => country?.id === defaultCountryId,
  );

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
