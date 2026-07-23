import * as z from "zod";

export const checkoutSchema = z.object({
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .regex(/^\+?[0-9]+$/, "Digits only"),
  state: z.string().min(1, "State is required"),
  city: z.string().optional(),
  postal_code: z.string().optional(),
  shipping_address: z.string().min(10, "Enter a complete shipping address"),
  delivery_zone_id: z
    .union([z.string(), z.number()])
    .refine((val) => val !== "" && val !== undefined && val !== null, {
      message: "Select a delivery method",
    }),
  delivery_zone_rate_id: z
    .union([z.string(), z.number()])
    .refine((val) => val !== "" && val !== undefined && val !== null, {
      message: "Select a delivery method",
    }),
  payment_type: z.enum(["online", "offline"], {
    required_error: "Select a payment method",
  }),
  note: z.string().optional(),
});
