import { useState } from "react";
import { Globe, X, ChevronsUpDown, SearchX } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";

export default function Location({ form, countries = [], isLoading = false }) {
  const [open, setOpen] = useState(false);

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

    setOpen(false);
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
        Select the countries where your store operates and set your primary
        country.
      </FieldDescription>

      <div className="mt-4 space-y-4 md:mt-6">
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
                Countries <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      role="combobox"
                      disabled={isLoading}
                      className="w-full justify-between font-normal"
                    >
                      <span className="text-muted-foreground text-sm">
                        {isLoading
                          ? "Loading countries..."
                          : "Search countries"}
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
                          {availableCountries?.map((country) => (
                            <CommandItem
                              key={country?.id}
                              value={country?.name}
                              onSelect={() => handleAddCountry(country?.id)}
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
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {selectedCountries.length > 0 && (
          <div>
            <p className="text-muted-foreground mb-2 text-xs">Countries</p>
            <div className="flex flex-wrap gap-2">
              {selectedCountries.map((country) => (
                <div
                  key={country.id}
                  className="flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs"
                >
                  <span>
                    {country?.flag_emoji} {country.name}
                  </span>
                  {defaultCountryId === country.id ? (
                    <Badge variant="secondary" className="text-[10px]">
                      Primary
                    </Badge>
                  ) : (
                    <Button
                      onClick={() => handleSetDefault(country.id)}
                      type="button"
                      variant="link"
                      className="text-muted-foreground h-auto p-0 text-[10px]"
                    >
                      Set as primary
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

        <FormField
          control={form.control}
          name="default_country_address"
          rules={{
            required: "Please enter your primary business address",
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">
                Business Address <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your business address"
                  {...field}
                  className="resize-none"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
