import * as z from "zod";

export const bankSchema = z.object({
  bank_name: z.string().trim().min(1, "Enter the bank name"),
  account_name: z.string().trim().min(1, "Enter the account holder's name"),
  account_number: z.string().trim().min(1, "Enter the account number"),
  swift_code: z.string().trim().optional(),
  iban: z.string().trim().optional(),
  routing_number: z.string().trim().optional(),
  is_active: z.boolean(),
});
