"use client"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  createCheckoutLinkSchema,
  type CreateCheckoutLinkFormInputValues,
  type CreateCheckoutLinkFormValues,
} from "@/lib/schemas/checkout-link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"

const CURRENCIES = [
  { name: "Nigerian Naira", code: "NGN" },
  { name: "US Dollar", code: "USD" },
  { name: "Euro", code: "EUR" },
  { name: "British Pound", code: "GBP" },
]

const LINK_TYPES = [
  { name: "One-Time Payment", value: "one_time" },
  { name: "Recurring (Subscription)", value: "recurring" },
]

const AMOUNT_TYPES = [
  { name: "Static (Fixed)", value: "static" },
  { name: "Flexible (Customer enters amount)", value: "dynamic" },
]

interface CheckoutLinkFormProps {
  initialValues?: CreateCheckoutLinkFormInputValues
  onSubmit: (values: CreateCheckoutLinkFormValues) => void
  onCancel: () => void
  submitLabel: string
  formId: string
  isPending?: boolean
}

export function CheckoutLinkForm({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel,
  formId,
  isPending = false,
}: CheckoutLinkFormProps) {
  const form = useForm<
    CreateCheckoutLinkFormInputValues,
    undefined,
    CreateCheckoutLinkFormValues
  >({
    resolver: zodResolver(createCheckoutLinkSchema),
    defaultValues: initialValues || {
      title: "",
      description: "",
      amount_type: "static",
      type: "one_time",
      currency: "NGN",
      amount: "",
      max_uses: "",
      redirect_url: "",
      expires_at: "",
      metadata: "",
    },
  })

  const amountType = form.watch("amount_type")

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues)
    }
  }, [form, initialValues])

  return (
    <div className="flex h-full flex-col font-primary">
      <div className="custom-scrollbar flex-1 overflow-y-auto px-8 py-8">
        <form
          id={formId}
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
          className="space-y-6"
        >
          <FieldGroup className="gap-6">
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-sm font-semibold text-text-subtitle">
                    Link Title
                  </FieldLabel>
                  <Input
                    {...field}
                    placeholder="e.g. Support My Project"
                    className="h-11.5 rounded-lg border-border-light bg-surface-1 transition-colors"
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
                  <FieldLabel className="text-sm font-semibold text-text-subtitle">
                    Description (Optional)
                  </FieldLabel>
                  <Textarea
                    {...field}
                    placeholder="Provide context for this payment link"
                    className="min-h-24 rounded-lg border-border-light bg-surface-1 transition-colors resize-none"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller
                name="amount_type"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-sm font-semibold text-text-subtitle">
                      Amount Type
                    </FieldLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-11.5! rounded-lg border-border-light bg-surface-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {AMOUNT_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="type"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-sm font-semibold text-text-subtitle">
                      Link Type
                    </FieldLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-11.5! rounded-lg border-border-light bg-surface-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {LINK_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller
                name="amount"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-sm font-semibold text-text-subtitle">
                      Amount
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        type="number"
                        placeholder={amountType === "dynamic" ? "N/A" : "0.00"}
                        className="h-11.5 rounded-lg border-border-light bg-surface-1 transition-colors pl-4"
                        value={field.value ?? ""}
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="currency"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-sm font-semibold text-text-subtitle">
                      Currency
                    </FieldLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-11.5! rounded-lg border-border-light bg-surface-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CURRENCIES.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.code}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller
                name="max_uses"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-sm font-semibold text-text-subtitle">
                      Max Uses (Optional)
                    </FieldLabel>
                    <Input
                      {...field}
                      type="number"
                      placeholder="e.g. 10"
                      className="h-11.5 rounded-lg border-border-light bg-surface-1 transition-colors"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="expires_at"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-sm font-semibold text-text-subtitle">
                      Expires At (Optional)
                    </FieldLabel>
                    <Input
                      {...field}
                      type="datetime-local"
                      className="h-11.5 rounded-lg border-border-light bg-surface-1 transition-colors"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              name="redirect_url"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-sm font-semibold text-text-subtitle">
                    Redirect URL (Optional)
                  </FieldLabel>
                  <Input
                    {...field}
                    type="url"
                    placeholder="https://example.com/thank-you"
                    className="h-11.5 rounded-lg border-border-light bg-surface-1 transition-colors"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="metadata"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-sm font-semibold text-text-subtitle">
                    Metadata (Optional)
                  </FieldLabel>
                  <Input
                    {...field}
                    placeholder="e.g. campaign=donation2025"
                    className="h-11.5 rounded-lg border-border-light bg-surface-1 transition-colors"
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

      <div className="mt-auto border-t border-surface-6 bg-surface-2 p-8">
        <div className="flex w-full items-center justify-end gap-4">
          <Button
            type="button"
            variant="ghost"
            className="h-11 font-semibold text-text-secondary hover:text-text-primary"
            onClick={onCancel}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form={formId}
            disabled={isPending}
            className="h-11 rounded-xl bg-brand-primary px-8 font-semibold text-white shadow-sm hover:bg-brand-primary-dark"
          >
            {isPending ? "Creating..." : submitLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
