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
import {
  addSubscriptionSchema,
  type AddSubscriptionFormInputValues,
  type AddSubscriptionFormValues,
} from "@/lib/schemas/subscription"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"

const PLAN_TYPES = [
  { name: "Premium", value: "Premium" },
  { name: "Standard", value: "Standard" },
  { name: "Basic", value: "Basic" },
  { name: "Enterprise", value: "Enterprise" },
]

const BILLING_CYCLES = ["Monthly", "Yearly", "Custom", "None"] as const

interface SubscriptionFormProps {
  initialValues?: AddSubscriptionFormInputValues
  onSubmit: (values: AddSubscriptionFormValues) => void
  onCancel: () => void
  submitLabel: string
  formId: string
  isPending?: boolean
}

export function SubscriptionForm({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel,
  formId,
  isPending = false,
}: SubscriptionFormProps) {
  const form = useForm<
    AddSubscriptionFormInputValues,
    undefined,
    AddSubscriptionFormValues
  >({
    resolver: zodResolver(addSubscriptionSchema),
    defaultValues: initialValues || {
      customerName: "",
      email: "",
      planType: "",
      billingCycle: "Monthly",
      amount: "",
    },
  })

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues)
    }
  }, [form, initialValues])

  return (
    <div className="flex h-full flex-col">
      <div className="custom-scrollbar flex-1 overflow-y-auto px-8 py-8">
        <form
          id={formId}
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
          className="space-y-6 font-primary"
        >
          <FieldGroup className="gap-6">
            <Controller
              name="customerName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-sm font-semibold text-text-subtitle">
                    Customer Name
                  </FieldLabel>
                  <Input
                    {...field}
                    placeholder="Enter customer full name"
                    className="h-11.5 rounded-lg border-border-light bg-surface-1 transition-colors"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-sm font-semibold text-text-subtitle">
                    Email Address
                  </FieldLabel>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter customer email"
                    className="h-11.5 rounded-lg border-border-light bg-surface-1 transition-colors"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="grid grid-cols-2 gap-2">
              <Controller
                name="planType"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-sm font-semibold text-text-subtitle">
                      Plan Type
                    </FieldLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-11.5! rounded-lg border-border-light bg-surface-1">
                        <SelectValue placeholder="Select plan" />
                      </SelectTrigger>
                      <SelectContent>
                        {PLAN_TYPES.map((plan) => (
                          <SelectItem key={plan.value} value={plan.value}>
                            {plan.name}
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
                name="billingCycle"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-sm font-semibold text-text-subtitle">
                      Billing Cycle
                    </FieldLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-11.5! rounded-lg border-border-light bg-surface-1">
                        <SelectValue placeholder="Select cycle" />
                      </SelectTrigger>
                      <SelectContent>
                        {BILLING_CYCLES.map((cycle) => (
                          <SelectItem key={cycle} value={cycle}>
                            {cycle}
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

            <Controller
              name="amount"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-sm font-semibold text-text-subtitle">
                    Subscription Amount (NGN)
                  </FieldLabel>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                      NGN
                    </span>
                    <Input
                      {...field}
                      type="number"
                      placeholder="0.00"
                      className="h-11.5 rounded-lg border-border-light bg-surface-1 pl-14"
                    />
                  </div>
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
            {isPending ? "Adding..." : submitLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
