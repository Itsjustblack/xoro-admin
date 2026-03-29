import { z } from "zod"

export const addBeneficiarySchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.email("Enter a valid email address"),
  bank_code: z.string().min(1, "Select a bank"),
  account_number: z.string().length(10, "Account number must be 10 digits"),
  category_id: z.string().optional(),
  default_amount: z
    .string()
    .optional()
    .transform((val) => (val ? parseFloat(val) : 0)),
  phone_number: z.string().min(7, "Enter a valid phone number"),
  phone_code: z.string().default("+234"),
  whatsapp_number: z.string().optional(),
})

export type AddBeneficiaryFormValues = z.output<typeof addBeneficiarySchema>
export type AddBeneficiaryFormInputValues = z.input<typeof addBeneficiarySchema>
