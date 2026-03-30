"use client"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  categoryFormSchema,
  type CategoryFormValues,
} from "@/lib/schemas/payout"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"

interface CategoryFormProps {
  title: string
  initialValues: CategoryFormValues
  onSubmit: (values: CategoryFormValues) => void
  onCancel: () => void
  submitLabel: string
  formId: string
  isPending?: boolean
}

export function CategoryForm({
  title,
  initialValues,
  onSubmit,
  onCancel,
  submitLabel,
  formId,
  isPending = false,
}: CategoryFormProps) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: initialValues,
  })

  useEffect(() => {
    form.reset(initialValues)
  }, [form, initialValues])

  return (
    <div>
      <div className="px-6 pb-12 space-y-4">
        <div className="mb-4 text-xs font-bold tracking-wider text-text-primary uppercase">
          {title}
        </div>

        <form
          id={formId}
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
          className="rounded-3xl border border-dashed border-surface-6 bg-surface-2 p-5"
        >
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-xs font-semibold uppercase tracking-wide text-text-muted-3">
                    Category Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="category-name"
                    placeholder="e.g. Travel & Logistics"
                    aria-invalid={fieldState.invalid}
                    className="h-11 rounded-xl border-border-light bg-white"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-xs font-semibold uppercase tracking-wide text-text-muted-3">
                    Description
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="category-description"
                    placeholder="What is this category for?"
                    aria-invalid={fieldState.invalid}
                    className="min-h-20 resize-none rounded-xl border-border-light bg-white"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </div>

      <div className="mt-auto border-t border-surface-6 bg-surface-2 p-6">
        <div className="flex w-full items-center justify-between gap-4">
          <Button
            type="button"
            variant="ghost"
            className="font-semibold min-w-31.25 h-auto text-sm py-3 text-text-secondary hover:bg-surface-3 hover:text-text-primary"
            onClick={onCancel}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form={formId}
            disabled={isPending}
            className="h-11 flex-1 rounded-full text-sm bg-brand-primary font-semibold text-white hover:bg-brand-primary-dark"
          >
            {isPending ? "Saving..." : submitLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
