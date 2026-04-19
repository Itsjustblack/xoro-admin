import { z } from "zod"

export const createCheckoutLinkSchema = z.object({
  title: z.string().min(2, "Link title is required"),
  description: z.string().optional(),
  amount_type: z.enum(["static", "dynamic"]).default("static"),
  type: z.enum(["one_time", "recurring"], {
    message: "Please select a link type",
  }),
  currency: z.string().min(1, "Currency is required"),
  amount: z.string().optional(),
  max_uses: z.string().optional(),
  redirect_url: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  expires_at: z.string().optional(),
}).superRefine((values, ctx) => {
  if (values.amount_type === "static" && !values.amount?.trim()) {
    ctx.addIssue({
      code: "custom",
      message: "Amount is required",
      path: ["amount"],
    })
  }

  if (values.type === "recurring") {
    if (!values.max_uses?.trim()) {
      ctx.addIssue({
        code: "custom",
        message: "Max uses is required",
        path: ["max_uses"],
      })
    }

    if (!values.expires_at?.trim()) {
      ctx.addIssue({
        code: "custom",
        message: "Expiry date is required",
        path: ["expires_at"],
      })
    }
  }
})

export type CreateCheckoutLinkFormValues = z.output<typeof createCheckoutLinkSchema>
export type CreateCheckoutLinkFormInputValues = z.input<typeof createCheckoutLinkSchema>
