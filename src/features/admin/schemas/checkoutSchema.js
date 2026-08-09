import * as z from "zod";

export const checkoutSchema = z
  .object({
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
    payment_method: z.enum(["cod", "stripe", "bank_payment"], {
      required_error: "Select a payment method",
    }),
    transaction_id: z.string().optional(),
    transaction_proof: z
      .instanceof(File)
      .refine(
        (file) => file.size <= 2 * 1024 * 1024,
        "File size must be less than 2MB",
      )
      .refine(
        (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
        "Only JPG, PNG, or WEBP allowed",
      )
      .optional(),
    note: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.payment_method === "bank_payment") {
      if (!data.transaction_id?.trim()) {
        ctx.addIssue({
          code: "custom",
          message: "Transaction ID is required",
          path: ["transaction_id"],
        });
      }
      if (!data.transaction_proof) {
        ctx.addIssue({
          code: "custom",
          message: "Transaction proof is required",
          path: ["transaction_proof"],
        });
      }
    }
  });
