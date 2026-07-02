import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import VariantRow from "./VariantRow";
import { Switch } from "@/components/ui/switch";
import { Controller } from "react-hook-form";
import { Field, FieldLabel } from "@/components/ui/field";

const tableHeaders = [
  { id: "variant", title: "Variant" },
  { id: "sku", title: "SKU", required: true },
  { id: "price", title: "Price", required: true },
  { id: "salePrice", title: "Sale Price" },
  { id: "stock", title: "Stock", required: true },
  { id: "image", title: "Image" },
  { id: "status", title: "Status" },
];

export default function Variants({
  form,
  pricingIndex,
  variants,
  currencySymbol,
}) {
  return (
    <div className="mt-5 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">
          Total Generated Variants ({variants.length})
        </p>

        <div>
          <Controller
            name={`pricing.${pricingIndex}.use_default_pricing`}
            control={form.control}
            render={({ field }) => (
              <Field orientation="horizontal">
                <FieldLabel
                  htmlFor={`pricing.${pricingIndex}.use_default_pricing`}
                >
                  Use Default Pricing
                </FieldLabel>

                <Switch
                  id={`pricing.${pricingIndex}.use_default_pricing`}
                  name={`pricing.${pricingIndex}.use_default_pricing`}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </Field>
            )}
          />
        </div>
      </div>

      <div className="bg-background overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-background">
              {tableHeaders.map((header) => (
                <TableHead key={header.id} className="text-xs font-medium">
                  {header.title}{" "}
                  {header?.required && (
                    <span className="text-destructive">*</span>
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {variants.map((variant, variantIndex) => (
              <VariantRow
                key={variant.id}
                form={form}
                pricingIndex={pricingIndex}
                variantIndex={variantIndex}
                variant={variant}
                currencySymbol={currencySymbol}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
