import * as z from "zod";

const optionValueSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(1, "Value name is required!"),
});

const optionSchema = z
  .object({
    id: z.string(),
    name: z.string().trim(),
    values: z.array(optionValueSchema),
  })
  .superRefine((data, ctx) => {
    const hasName = data.name.trim().length > 0;
    const hasValues = data.values.length > 0;

    if (!hasName && !hasValues) {
      ctx.addIssue({
        code: "custom",
        message:
          "Enter an option name and add at least one value, or remove this option.",
        path: ["name"],
      });
      return;
    }

    if (hasValues && !hasName) {
      ctx.addIssue({
        code: "custom",
        message: "Enter an option name.",
        path: ["name"],
      });
    }

    if (hasName && !hasValues) {
      ctx.addIssue({
        code: "custom",
        message: "Add at least one option value.",
        path: ["values"],
      });
    }
  });

const variantSchema = z
  .object({
    optionValues: z.record(z.string(), z.string()),
    sku: z.string().trim().min(1, "SKU is required!"),
    price: z.number().optional(),
    discount_value: z.number().optional(),
    stock: z.number({ error: "Stock is required!" }),
    image: z.instanceof(File).nullable().optional(),
    is_active: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (
      data.discount_value != null &&
      data.price != null &&
      data.discount_value >= data.price
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Sale price must be lower than price!",
        path: ["discount_value"],
      });
    }
  });

const pricingSchema = z
  .object({
    country_id: z.number({ error: "Country is required!" }),
    price: z.number({ error: "Price is required!" }),
    discount_value: z.number().optional(),
    stock: z.number({ error: "Stock is required!" }),
    variants_enabled: z.boolean(),
    use_default_pricing: z.boolean(),
    options: z.array(optionSchema).optional(),
    variants: z.array(variantSchema).optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.use_default_pricing) {
      data.variants?.forEach((variant, i) => {
        if (variant.price == null) {
          ctx.addIssue({
            code: "custom",
            message: "Price is required!",
            path: ["variants", i, "price"],
          });
        }
      });
    }

    if (data.discount_value != null && data.discount_value >= data.price) {
      ctx.addIssue({
        code: "custom",
        message: "Sale price must be lower than price!",
        path: ["discount_value"],
      });
    }

    const completeOptions =
      data.options?.filter(
        (opt) => opt.name.trim() !== "" && opt.values.length > 0,
      ) ?? [];

    if (completeOptions.length === 0) return;

    if (!data.variants || data.variants.length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "Generate variants before saving, or remove the option.",
        path: ["options"],
      });
      return;
    }

    // Expected variant count if fully generated: product of each option's value count
    const expectedCount = completeOptions.reduce(
      (total, opt) => total * opt.values.length,
      1,
    );

    // Every complete option's id must appear as a key in every variant's optionValues
    const everyVariantCoversAllOptions = data.variants.every((variant) =>
      completeOptions.every((opt) =>
        Object.prototype.hasOwnProperty.call(variant.optionValues, opt.id),
      ),
    );

    if (
      data.variants.length !== expectedCount ||
      !everyVariantCoversAllOptions
    ) {
      ctx.addIssue({
        code: "custom",
        message:
          "Variant options have changed. Regenerate variants before saving.",
        path: ["options"],
      });
    }
  });

export const productSchema = z
  .object({
    name: z.string().trim().min(1, "Product Name is required!"),
    category_id: z.number({ error: "Category is required!" }),
    sub_category_id: z.number().optional(),
    brand_id: z.number().optional(),
    tags: z.array(z.string()).optional(),
    short_description: z.string().optional(),
    description: z.string().optional(),
    is_hot_deal: z.boolean(),
    is_new_arrival: z.boolean(),
    is_featured: z.boolean(),
    is_best_selling: z.boolean(),
    is_flash_deal: z.boolean(),
    flash_deal_start_date: z.string().nullable(),
    flash_deal_end_date: z.string().nullable(),
    image: z.instanceof(File, { error: "Thumbnail image is required!" }),
    images: z.array(z.instanceof(File)).optional(),
    pricing: z.array(pricingSchema),
  })
  .superRefine((data, ctx) => {
    if (data.is_flash_deal && !data.flash_deal_end_date) {
      ctx.addIssue({
        code: "custom",
        message: "End date is required for flash deals!",
        path: ["flash_deal_end_date"],
      });
    }

    if (
      data.flash_deal_start_date &&
      data.flash_deal_end_date &&
      new Date(data.flash_deal_start_date) >= new Date(data.flash_deal_end_date)
    ) {
      ctx.addIssue({
        code: "custom",
        message: "End date must be after start date!",
        path: ["flash_deal_end_date"],
      });
    }
  });
