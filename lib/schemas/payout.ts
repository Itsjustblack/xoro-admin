import { z } from "zod"

export const categoryFormSchema = z.object({
  name: z.string().trim().min(2, "Category name must be at least 2 characters"),
  description: z
    .string()
    .trim()
    .min(2, "Description must be at least 2 characters"),
  color: z.string().min(1, "Select a label color"),
})

export type CategoryFormValues = z.infer<typeof categoryFormSchema>
