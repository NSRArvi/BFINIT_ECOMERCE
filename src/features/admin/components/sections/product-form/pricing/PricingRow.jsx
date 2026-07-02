import { useMemo, useState } from "react";
import { Controller, useFieldArray, useWatch } from "react-hook-form";
import {
  AlertTriangle,
  ChevronDown,
  Combine,
  Plus,
  Trash2,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import OptionRow from "./OptionRow";
import Variants from "./Variants";

function generateVariantCombinations(options) {
  if (!options || options.length === 0) return [];

  const validOptions = options.filter((opt) => opt.values.length > 0);
  if (validOptions.length === 0) return [];

  return validOptions.reduce(
    (combinations, option) => {
      const next = [];
      combinations.forEach((combo) => {
        option.values.forEach((value) => {
          next.push({
            ...combo,
            optionValues: {
              ...combo.optionValues,
              [option.id]: value.id,
            },
            labels: [...combo.labels, value.name],
          });
        });
      });
      return next;
    },
    [{ optionValues: {}, labels: [] }],
  );
}

const createOptionSnapshot = (options) =>
  (options ?? [])
    .filter((option) => option.name.trim() !== "" && option.values.length > 0)
    .map((option) => ({
      name: option.name,
      values: option.values.map((v) => v.name),
    }));

export default function PricingRow({
  form,
  isOnlyCountry,
  index,
  countries,
  openCountryIndex,
  setOpenCountryIndex,
  isMultipleCountries,
  removePricing,
}) {
  const [generatedSnapshot, setGeneratedSnapshot] = useState(null);

  const isVariantsEnabled = useWatch({
    control: form.control,
    name: `pricing.${index}.variants_enabled`,
  });

  const watchedOptions = useWatch({
    control: form.control,
    name: `pricing.${index}.options`,
  });

  const countryId = useWatch({
    control: form.control,
    name: `pricing.${index}.country_id`,
  });

  const country = countries?.find((c) => c.id === countryId);

  const lastOption = watchedOptions?.at(-1);
  const canAddOption =
    !lastOption ||
    (lastOption.name.trim() !== "" && lastOption.values.length > 0);

  const variantsDirty =
    JSON.stringify(generatedSnapshot) !==
    JSON.stringify(createOptionSnapshot(watchedOptions));

  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    control: form.control,
    name: `pricing.${index}.options`,
  });

  const { fields: variantFields, replace: replaceVariants } = useFieldArray({
    control: form.control,
    name: `pricing.${index}.variants`,
  });

  const combinations = useMemo(
    () => generateVariantCombinations(watchedOptions),
    [watchedOptions],
  );

  const hasMeaningfulOptions = optionFields.some(
    (option) => option.name.trim() !== "" && option.values.length > 0,
  );

  const optionsError = form.formState.errors?.pricing?.[index]?.options;

  const showGenerateAlert =
    variantFields.length === 0 &&
    (hasMeaningfulOptions || Boolean(optionsError));
  const showRegenerateAlert =
    variantFields.length > 0 &&
    variantsDirty &&
    (hasMeaningfulOptions || Boolean(optionsError));

  const hasIncompleteOption = optionFields.some(
    (opt) =>
      (opt.name.trim() !== "" && opt.values.length === 0) ||
      (opt.name.trim() === "" && opt.values.length > 0),
  );

  const handleAddOption = () => {
    appendOption({
      id: `option-${crypto.randomUUID()}`,
      name: "",
      values: [],
    });
  };

  const handleRemoveOption = (index) => {
    removeOption(index);
  };

  const handleGenerateVariants = () => {
    if (!watchedOptions || watchedOptions.length === 0) return [];

    const validOptions = watchedOptions.filter(
      (opt) => opt.name.trim() !== "" && opt.values.length > 0,
    );

    if (validOptions.length === 0) return [];

    const newVariants = combinations.map((combo) => ({
      optionValues: combo.optionValues,
      sku: combo.labels.join("-").toUpperCase().replace(/\s+/g, ""),
      price: undefined,
      discount_value: undefined,
      stock: undefined,
      image: null,
      is_active: true,
      labels: combo.labels.join(" / "),
    }));
    replaceVariants(newVariants);
    setGeneratedSnapshot(createOptionSnapshot(watchedOptions));
    form.clearErrors(`pricing.${index}.options`);
  };

  const handleInputChange = (e, field) => {
    const val = e.target.value;
    field.onChange(val === "" ? undefined : Number(val));
  };

  const handleToggleChange = (checked, field) => {
    field.onChange(checked);

    if (!optionFields.length > 0) {
      handleAddOption();
    }
  };

  return (
    <div>
      {isMultipleCountries && (
        <div className="bg-muted flex items-center justify-between px-2 py-3">
          <Button
            onClick={() => setOpenCountryIndex(index)}
            type="button"
            variant="ghost"
          >
            <ChevronDown
              className={openCountryIndex === index && "rotate-180"}
            />
            <div className="space-y-1 text-left text-xs">
              <p className="font-medium">{country?.name}</p>
              <p className="text-muted-foreground">
                {country?.currency_code} ({country?.abbreviation})
              </p>
            </div>
          </Button>

          <Button
            onClick={() => removePricing(index)}
            disabled={isOnlyCountry}
            type="button"
            size="icon-sm"
            variant="ghost-destructive"
          >
            <Trash2 />
          </Button>
        </div>
      )}

      {openCountryIndex === index && (
        <FieldGroup className="grid-cols-[repeat(2,1fr)_240px_auto]">
          <Controller
            name={`pricing.${index}.price`}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Price <span className="text-destructive">*</span>
                </FieldLabel>

                <div className="border-input focus-within:border-primary focus-within:ring-primary/20 flex h-9 w-full items-center gap-1.5 rounded-md border px-3 text-sm focus-within:ring-1">
                  <span className="text-muted-foreground shrink-0">
                    {country?.abbreviation}
                  </span>
                  <Input
                    {...field}
                    onChange={(e) => handleInputChange(e, field)}
                    value={field.value ?? ""}
                    type="number"
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="0.00"
                    className="h-full min-w-1/4 flex-1 shrink-0 border-0 px-0 focus-visible:ring-0"
                  />
                </div>

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name={`pricing.${index}.discount_value`}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Sale Price</FieldLabel>

                <div className="border-input focus-within:border-primary focus-within:ring-primary/20 flex h-9 w-full items-center gap-1.5 rounded-md border px-3 text-sm focus-within:ring-1">
                  <span className="text-muted-foreground shrink-0">
                    {country?.abbreviation}
                  </span>
                  <Input
                    {...field}
                    onChange={(e) => handleInputChange(e, field)}
                    value={field.value ?? ""}
                    type="number"
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="0.00"
                    className="h-full min-w-1/4 flex-1 shrink-0 border-0 px-0 focus-visible:ring-0"
                  />
                </div>

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name={`pricing.${index}.stock`}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Stock <span className="text-destructive">*</span>
                </FieldLabel>

                <Input
                  {...field}
                  onChange={(e) => handleInputChange(e, field)}
                  value={field.value ?? ""}
                  type="number"
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="0"
                />

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name={`pricing.${index}.variants_enabled`}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Variants</FieldLabel>
                <div>
                  <Switch
                    id={field.name}
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={(checked) =>
                      handleToggleChange(checked, field)
                    }
                  />
                </div>
              </Field>
            )}
          />
        </FieldGroup>
      )}

      {openCountryIndex === index && isVariantsEnabled && (
        <div className="bg-muted/30 border-t px-5 py-4">
          {/* options container */}
          <>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="mb-1 text-xs font-medium">Variant Options</p>
                <p className="text-muted-foreground text-xs leading-normal">
                  Add options like Size or Color to create product variants.
                </p>
              </div>

              <div className="space-x-4">
                <Button
                  onClick={handleAddOption}
                  disabled={!canAddOption}
                  type="button"
                  size="sm"
                  variant="outline"
                >
                  <Plus /> Add Option
                </Button>
                <Button
                  onClick={handleGenerateVariants}
                  disabled={combinations.length === 0 || hasIncompleteOption}
                  type="button"
                  size="sm"
                >
                  <Combine />
                  Generate Variants
                </Button>
              </div>
            </div>

            {showRegenerateAlert && (
              <Alert variant="warning" className="mb-5">
                <AlertTriangle />
                <AlertTitle>Regenerate variants</AlertTitle>
                <AlertDescription>
                  Variants need to be regenerated You've changed the variant
                  options. Generate variants again to update the product
                  variants before saving.
                </AlertDescription>
              </Alert>
            )}

            {showGenerateAlert && (
              <Alert variant="destructive" className="mb-5">
                <AlertTriangle />
                <AlertTitle>Variants haven't been generated</AlertTitle>
                <AlertDescription>
                  Generate variants to create all product combinations before
                  saving.
                </AlertDescription>
              </Alert>
            )}

            {/* options container */}
            {optionFields.length > 0 && (
              <div className="bg-background space-y-5 rounded-lg border px-5 py-4">
                {optionFields.map((optionField, optionIndex) => (
                  <OptionRow
                    key={optionField.id}
                    form={form}
                    pricingIndex={index}
                    optionIndex={optionIndex}
                    onRemove={() => handleRemoveOption(optionIndex)}
                  />
                ))}
              </div>
            )}
          </>

          {/* generated variants container */}
          {variantFields.length > 0 && (
            <Variants
              form={form}
              pricingIndex={index}
              variants={variantFields}
              currencySymbol={country?.abbreviation}
            />
          )}
        </div>
      )}
    </div>
  );
}
