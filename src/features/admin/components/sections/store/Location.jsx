import { Globe, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FieldDescription, FieldLegend } from "@/components/ui/field";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

export default function Location({ form, countries = [], isLoading = false }) {
  const selectedCountries = form.watch("countries");
  const defaultCountryId = form.watch("default_country_id");

  const availableCountries = countries?.data?.filter(
    (country) =>
      !selectedCountries?.find(
        (selectedCountry) => selectedCountry?.id === country?.id,
      ),
  );

  const handleAddCountry = (countryId) => {
    const country = countries?.data?.find((c) => c.id === Number(countryId));
    if (!country) return;

    const alreadyAdded = selectedCountries.some((c) => c.id === country.id);
    if (alreadyAdded) return;

    const updated = [...selectedCountries, country];
    form.setValue("countries", updated, { shouldValidate: true });

    if (updated.length === 1) {
      form.setValue("default_country_id", country.id);
    }
  };

  const handleRemoveCountry = (countryId) => {
    const updated = selectedCountries.filter((c) => c.id !== countryId);
    form.setValue("countries", updated, { shouldValidate: true });

    const currentDefault = form.getValues("default_country_id");
    if (currentDefault === countryId && updated.length > 0) {
      form.setValue("default_country_id", updated[0].id);
    }
  };

  const handleSetDefault = (countryId) => {
    form.setValue("default_country_id", countryId);
  };

  return (
    <div className="bg-card rounded-lg p-5">
      <FieldLegend>Location</FieldLegend>
      <FieldDescription>
        Select countries where you operate and provide your business address
      </FieldDescription>

      <div className="mt-4 space-y-4 md:mt-6">
        {/* selected countries */}
        {selectedCountries.length > 0 && (
          <div>
            <p className="text-muted-foreground mb-2 text-xs">
              Selected Countries
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedCountries.map((country) => (
                <div
                  key={country.id}
                  className="flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs"
                >
                  <Globe className="text-muted-foreground size-3" />
                  <span>{country.name}</span>
                  <span className="text-muted-foreground">
                    {country.abbreviation}
                  </span>
                  {defaultCountryId === country.id ? (
                    <Badge className="text-[10px]">Default</Badge>
                  ) : (
                    <Button
                      onClick={() => handleSetDefault(country.id)}
                      type="button"
                      variant="link"
                      className="text-muted-foreground h-auto p-0 text-[10px]"
                    >
                      Set Default
                    </Button>
                  )}
                  <Button
                    onClick={() => handleRemoveCountry(country.id)}
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="hover:text-destructive size-4 hover:bg-transparent"
                  >
                    <X className="size-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Country Select */}
        <FormField
          control={form.control}
          name="countries"
          rules={{
            validate: (value) =>
              value?.length > 0 || "Please add at least one country",
          }}
          render={() => (
            <FormItem>
              <FormLabel>
                Add Country <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={handleAddCountry}
                  disabled={isLoading}
                  value={null}
                >
                  <SelectTrigger className="w-full">
                    <div className="flex items-center gap-2">
                      <Plus size={16} className="shrink-0" />
                      <span className="text-muted-foreground text-sm">
                        {isLoading
                          ? "Loading countries..."
                          : "Select a country to add"}
                      </span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {availableCountries?.map((country) => (
                      <SelectItem key={country?.id} value={country?.id}>
                        {country?.name} {country?.abbreviation}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
