import { z } from "zod"

export const categoryFormSchema = z.object({
  name: z.string().trim().min(2, "Category name must be at least 2 characters"),
  description: z
    .string()
    .trim()
    .min(2, "Description must be at least 2 characters"),
})

export type CategoryFormValues = z.infer<typeof categoryFormSchema>

export const individualPayoutSchema = z.object({
  beneficiary_id: z.string().min(1, "Select a beneficiary"),
  amount: z.string().min(1, "Enter an amount").refine((val) => Number(val.replace(/,/g, '')) >= 100, "Minimum amount is ₦100"),
  payment_method: z.enum(["bank_transfer", "mobile_money", "crypto", "wallet"]),
  reference_note: z.string().optional(),
})

export type IndividualPayoutFormValues = z.infer<typeof individualPayoutSchema>
