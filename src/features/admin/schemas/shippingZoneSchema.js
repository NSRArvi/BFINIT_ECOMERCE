import * as z from "zod";

const numberField = (message) =>
  z.preprocess(
    (val) => (val === "" || val === null ? undefined : val),
    z.coerce.number({ error: message }),
  );

const locationSchema = z.object({
  state: z.string().optional(),
  city: z.string().optional(),
  postal_code: z.string().optional(),
  postal_code_from: z.string().optional(),
  postal_code_to: z.string().optional(),
});

const rateSchema = z
  .object({
    name: z.string().trim().min(1, "Rate name is required"),
    fee_type: z.enum(["flat", "weight_based", "order_value_based"], {
      error: "Fee type is required",
    }),
    base_fee: numberField(
      z.coerce.number({ error: "Base fee is required" }).min(0),
    ),
    free_delivery_min_order: z.coerce.number().optional(),
    // weight fields left loose for now — not wired in the UI yet
    min_weight: z.coerce.number().optional(),
    max_weight: z.coerce.number().optional(),
    extra_fee_per_kg: z.coerce.number().optional(),
    estimated_min_days: numberField(
      z.coerce.number({ error: "Minimum days is required" }).min(0),
    ),
    estimated_max_days: numberField(
      z.coerce.number({ error: "Maximum days is required" }).min(0),
    ),
    is_active: z.boolean(),
  })
  .superRefine((rate, ctx) => {
    if (
      rate.fee_type === "order_value_based" &&
      rate.free_delivery_min_order === undefined
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Free delivery threshold is required for this fee type",
        path: ["free_delivery_min_order"],
      });
    }

    if (
      rate.estimated_min_days !== undefined &&
      rate.estimated_max_days !== undefined &&
      rate.estimated_min_days > rate.estimated_max_days
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Minimum days can't exceed maximum days",
        path: ["estimated_max_days"],
      });
    }
  });

export const shippingZoneSchema = z
  .object({
    name: z.string().trim().min(1, "Zone name is required."),
    country_id: z.number({ error: "Country is required." }),
    zone_type: z.enum(
      ["country_wide", "state", "city", "postal_code", "postal_code_range"],
      {
        error: "Zone type is required.",
      },
    ),
    priority: numberField(
      z.coerce.number({ error: "Priority is required" }).min(1),
    ),
    is_active: z.boolean(),
    is_default: z.boolean(),
    locations: z.array(locationSchema),
    rates: z.array(rateSchema).min(1, "Add at least one shipping rate"),
  })
  .superRefine((data, ctx) => {
    if (data.zone_type === "state") {
      data.locations.forEach((location, index) => {
        if (!location.state?.trim()) {
          ctx.addIssue({
            code: "custom",
            message: "State or province is required.",
            path: ["locations", index, "state"],
          });
        }
      });
    }

    if (data.zone_type === "city") {
      data.locations.forEach((location, index) => {
        if (!location.state?.trim()) {
          ctx.addIssue({
            code: "custom",
            message: "State or province is required.",
            path: ["locations", index, "state"],
          });
        }

        if (!location.city?.trim()) {
          ctx.addIssue({
            code: "custom",
            message: "City is required.",
            path: ["locations", index, "city"],
          });
        }
      });
    }

    if (data.zone_type === "postal_code") {
      data.locations.forEach((location, index) => {
        if (!location.postal_code?.trim()) {
          ctx.addIssue({
            code: "custom",
            message: "Postal code is required.",
            path: ["locations", index, "postal_code"],
          });
        }
      });
    }

    if (data.zone_type === "postal_code_range") {
      data.locations.forEach((location, index) => {
        if (!location.postal_code_from?.trim()) {
          ctx.addIssue({
            code: "custom",
            message: "Starting postal code is required.",
            path: ["locations", index, "postal_code_from"],
          });
        }

        if (!location.postal_code_to?.trim()) {
          ctx.addIssue({
            code: "custom",
            message: "Ending postal code is required.",
            path: ["locations", index, "postal_code_to"],
          });
        }
      });
    }
  });
