import { Badge, Crown, Flame, Star } from "lucide-react";
import { Controller } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import FlashSale from "./status/FlashSale";

export default function Status({ form }) {
  return (
    <FieldSet>
      <div className="border-b px-5 py-4">
        <FieldLegend>Product Status</FieldLegend>
        <FieldDescription>
          Select one or more status badges to display on the product. These help
          customers discover products and appear on product cards
        </FieldDescription>
      </div>

      <FieldGroup>
        <Controller
          name="is_best_selling"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="rounded-lg border p-4"
            >
              <FieldContent className="flex-row">
                <div className="bg-muted flex size-7 items-center justify-center rounded-md">
                  <Crown className="text-muted-foreground size-3.5" />
                </div>

                <div className="space-y-0.5">
                  <p className="text-xs font-medium">Bestseller</p>
                  <FieldDescription>
                    Showcases popular products based on sales volume to build
                    social proof and trust.
                  </FieldDescription>
                </div>
              </FieldContent>

              <div className="flex items-center justify-between">
                <FieldLabel htmlFor={field.name} className="font-normal">
                  Enable Bestseller badge
                </FieldLabel>

                <Switch
                  id={field.name}
                  name={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </div>
            </Field>
          )}
        />

        <Controller
          name="is_featured"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="rounded-lg border p-4"
            >
              <FieldContent className="flex-row">
                <div className="bg-muted flex size-7 items-center justify-center rounded-md">
                  <Badge className="text-muted-foreground size-3.5" />
                </div>

                <div className="space-y-0.5">
                  <p className="text-xs font-medium">Featured</p>
                  <FieldDescription>
                    Highlights premium or recommended products in special
                    collections and homepage sections.
                  </FieldDescription>
                </div>
              </FieldContent>

              <div className="flex items-center justify-between">
                <FieldLabel htmlFor={field.name} className="font-normal">
                  Enable Featured badge
                </FieldLabel>

                <Switch
                  id={field.name}
                  name={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </div>
            </Field>
          )}
        />

        <Controller
          name="is_new_arrival"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="rounded-lg border p-4"
            >
              <FieldContent className="flex-row">
                <div className="bg-muted flex size-7 items-center justify-center rounded-md">
                  <Star className="text-muted-foreground size-3.5" />
                </div>

                <div className="space-y-0.5">
                  <p className="text-xs font-medium">New Arrival</p>
                  <FieldDescription>
                    Highlights recently added products to attract attention to
                    your latest offerings.
                  </FieldDescription>
                </div>
              </FieldContent>

              <div className="flex items-center justify-between">
                <FieldLabel htmlFor={field.name} className="font-normal">
                  Enable New Arrival badge
                </FieldLabel>

                <Switch
                  id={field.name}
                  name={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </div>
            </Field>
          )}
        />

        <Controller
          name="is_hot_deal"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="rounded-lg border p-4"
            >
              <FieldContent className="flex-row">
                <div className="bg-muted flex size-7 items-center justify-center rounded-md">
                  <Flame className="text-muted-foreground size-3.5" />
                </div>

                <div className="space-y-0.5">
                  <p className="text-xs font-medium">Hot Deal</p>
                  <FieldDescription>
                    Promotes special offers and deals without time constraints.
                    Great for ongoing promotions.
                  </FieldDescription>
                </div>
              </FieldContent>

              <div className="flex items-center justify-between">
                <FieldLabel htmlFor={field.name} className="font-normal">
                  Enable Hot Deal badge
                </FieldLabel>

                <Switch
                  id={field.name}
                  name={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </div>
            </Field>
          )}
        />

        {/* <FlashSale form={form} /> */}
      </FieldGroup>
    </FieldSet>
  );
}
