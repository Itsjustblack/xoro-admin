import { z } from "zod"

export const addSubscriptionSchema = z.object({
  customerName: z.string().min(2, "Customer name is required"),
  email: z.string().email("Enter a valid email address"),
  planType: z.string().min(1, "Please select a plan type"),
  billingCycle: z.enum(["Monthly", "Yearly", "Custom", "None"] as const, {
    message: "Please select a billing cycle",
  }),
  amount: z.string().min(1, "Amount is required"),
})

export type AddSubscriptionFormValues = z.output<typeof addSubscriptionSchema>
export type AddSubscriptionFormInputValues = z.input<typeof addSubscriptionSchema>
