import { useEffect, useMemo, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { FieldDescription, FieldLegend, FieldSet } from "@/components/ui/field";
import CountryPicker from "../../popovers/CountryPicker";
import PricingRow from "./pricing/PricingRow";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import useSelectedStore from "@/hooks/useSelectedStore";

export default function Pricing({ form }) {
  const { activeStore } = useSelectedStore();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "pricing",
  });

  const { data: countries, isLoading: isCountriesLoading } = useGetQuery({
    endpoint: "/api/v1/country",
    enabled: true,
    queryKey: ["countries"],
  });

  const { data, isLoading: isStoreLoading } = useGetQuery({
    endpoint: `/api/v1/store/${activeStore?.id}`,
    enabled: !!activeStore?.id,
    isTokenRequired: true,
    queryKey: ["store", activeStore?.id],
  });

  const store = data?.data;

  const savedCountries = useMemo(
    () =>
      store?.country_ids && countries?.data
        ? store.country_ids.map((countryId) =>
            countries.data.find((c) => c.id === countryId),
          )
        : [],
    [store, countries],
  );

  const isMultipleCountries = Boolean(savedCountries.length > 1);

  const [openCountryIndex, setOpenCountryIndex] = useState(0);

  useEffect(() => {
    if (savedCountries.length > 0 && !form.getValues("pricing.0.country_id")) {
      form.setValue("pricing.0.country_id", savedCountries[0].id, {
        shouldDirty: false,
      });
    }
  }, [savedCountries, form]);

  const handleAddCountryPricing = (countryId) => {
    append({
      country_id: countryId,
      price: undefined,
      discount_value: undefined,
      stock: undefined,
      variants_enabled: false,
      use_default_pricing: true,
      options: [],
      variants: [],
    });
  };

  const addedCountryIds = form
    .watch("pricing")
    ?.map((p) => p.country_id)
    .filter(Boolean);

  const availableCountries = savedCountries.filter(
    (c) => !addedCountryIds?.includes(c.id),
  );

  return (
    <FieldSet>
      <div className="flex items-center justify-between border-b px-5 py-4">
        <div>
          <FieldLegend>Pricing</FieldLegend>
          <FieldDescription>
            Set pricing for every market this product is available in.
          </FieldDescription>
        </div>

        <CountryPicker
          isMultipleCountries={isMultipleCountries}
          availableCountries={availableCountries}
          onSelect={handleAddCountryPricing}
        />
      </div>

      <div className="divide-y">
        {fields.map((field, index) => (
          <PricingRow
            key={field.id}
            form={form}
            isOnlyCountry={fields.length === 1}
            index={index}
            countries={savedCountries}
            openCountryIndex={openCountryIndex}
            isMultipleCountries={isMultipleCountries}
            setOpenCountryIndex={setOpenCountryIndex}
            removePricing={remove}
          />
        ))}
      </div>
    </FieldSet>
  );
}
