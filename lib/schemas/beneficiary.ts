import { z } from "zod"

export const addBeneficiarySchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.email("Enter a valid email address"),
  bank_code: z.string().min(1, "Select a bank"),
  account_number: z.string().length(10, "Account number must be 10 digits"),
  category_id: z.string().optional(),
  default_amount: z
    .union([z.string(), z.number()])
    .optional()
    .transform((val) => {
      if (val === undefined || val === "") return 0
      if (typeof val === "number") return Number.isNaN(val) ? 0 : val
      const parsed = parseFloat(val)
      return Number.isNaN(parsed) ? 0 : parsed
    }),
  phone_number: z.string().min(7, "Enter a valid phone number"),
  phone_code: z.string().default("+234"),
  whatsapp_number: z.string().optional(),
})

export type AddBeneficiaryFormValues = z.output<typeof addBeneficiarySchema>
export type AddBeneficiaryFormInputValues = z.input<typeof addBeneficiarySchema>
