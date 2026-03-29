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
  addBeneficiarySchema,
  type AddBeneficiaryFormInputValues,
  type AddBeneficiaryFormValues,
} from "@/lib/schemas/beneficiary"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"

const MOCK_BANKS = [
  { name: "Access Bank", code: "044" },
  { name: "First Bank", code: "011" },
  { name: "GTBank", code: "058" },
  { name: "Zenith Bank", code: "057" },
]

const MOCK_CATEGORIES = [
  { name: "Payroll", id: "1" },
  { name: "Vendor Payouts", id: "3" },
  { name: "Marketing", id: "2" },
]

const COUNTRY_CODES = [
  { name: "Nigeria", code: "NG", dial_code: "+234", label: "NG" },
  { name: "Ghana", code: "GH", dial_code: "+233", label: "GH" },
  { name: "Kenya", code: "KE", dial_code: "+254", label: "KE" },
]

interface BeneficiaryFormProps {
  initialValues?: AddBeneficiaryFormInputValues
  onSubmit: (values: AddBeneficiaryFormValues) => void
  onCancel: () => void
  submitLabel: string
  formId: string
  isPending?: boolean
}

export function BeneficiaryForm({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel,
  formId,
  isPending = false,
}: BeneficiaryFormProps) {
  const form = useForm<
    AddBeneficiaryFormInputValues,
    undefined,
    AddBeneficiaryFormValues
  >({
    resolver: zodResolver(addBeneficiarySchema),
    defaultValues: initialValues || {
      name: "",
      email: "",
      bank_code: "",
      account_number: "",
      category_id: "",
      default_amount: "",
      phone_number: "",
      phone_code: "+234",
      whatsapp_number: "",
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
          className="space-y-6 font-manrope"
        >
          <FieldGroup className="gap-6">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-sm font-semibold text-text-subtitle">
                    Full Name
                  </FieldLabel>
                  <Input
                    {...field}
                    placeholder="Enter beneficiary full name"
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
                name="bank_code"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-sm font-semibold text-text-subtitle">
                      Select Bank
                    </FieldLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-11.5! rounded-lg border-border-light bg-surface-1">
                        <SelectValue placeholder="Search and select bank" />
                      </SelectTrigger>
                      <SelectContent>
                        {MOCK_BANKS.map((bank) => (
                          <SelectItem key={bank.code} value={bank.code}>
                            {bank.name}
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
                name="account_number"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-sm font-semibold text-text-subtitle">
                      Account Number
                    </FieldLabel>
                    <Input
                      {...field}
                      placeholder="10-digit account number"
                      className="h-11.5 rounded-lg border-border-light bg-surface-1"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Controller
                name="category_id"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-sm font-semibold text-text-subtitle">
                      Category
                    </FieldLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-11.5! rounded-lg border-border-light bg-surface-1">
                        <SelectValue placeholder="Select or create category" />
                      </SelectTrigger>
                      <SelectContent>
                        {MOCK_CATEGORIES.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
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
                name="default_amount"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-sm font-semibold text-text-subtitle">
                      Default Payment Amount (NGN)
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
                        onChange={(event) => field.onChange(event.target.value)}
                        value={field.value ?? ""}
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Field>
              <FieldLabel className="text-sm font-semibold text-text-subtitle">
                Phone Number
              </FieldLabel>
              <div className="flex gap-2">
                <Controller
                  name="phone_code"
                  control={form.control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-11.5! w-27.5 shrink-0 rounded-lg border-border-light bg-surface-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRY_CODES.map((country) => (
                          <SelectItem key={country.code} value={country.dial_code}>
                            <span className="flex items-center gap-2">
                              <span>{country.label}</span>
                              <span>{country.dial_code}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />

                <Controller
                  name="phone_number"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div className="flex-1">
                      <Input
                        {...field}
                        placeholder="801 234 5678"
                        className={cn(
                          "h-11.5 rounded-lg border-border-light bg-surface-1",
                          fieldState.invalid && "border-destructive",
                        )}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </div>
                  )}
                />
              </div>
            </Field>

            <Controller
              name="whatsapp_number"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-sm font-semibold text-text-subtitle">
                    WhatsApp Number (Optional)
                  </FieldLabel>
                  <Input
                    {...field}
                    placeholder="Enter WhatsApp number"
                    className="h-11.5 rounded-lg border-border-light bg-surface-1"
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

      <div className="mt-auto border-t border-surface-6 bg-surface-2/30 p-8">
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
            className="h-11 rounded-xl bg-brand-primary px-8 font-semibold text-white shadow-sm shadow-brand-primary/20 hover:bg-brand-primary-dark"
          >
            {isPending ? "Saving..." : submitLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
