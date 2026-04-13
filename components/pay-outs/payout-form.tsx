"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Landmark, Search, ShieldCheck } from "lucide-react"
import * as React from "react"
import { Controller, useForm } from "react-hook-form"

import { AmountInput } from "@/components/amount-input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PAYMENT_METHODS } from "@/lib/constants"
import {
  individualPayoutSchema,
  type IndividualPayoutFormValues,
} from "@/lib/schemas/payout"
import type { Beneficiary } from "@/lib/types"
import { cn } from "@/lib/utils"

interface PayoutFormProps {
  beneficiaries: Beneficiary[]
  isBeneficiariesPending: boolean
  isPending?: boolean
  onSubmit: (values: IndividualPayoutFormValues, beneficiary: Beneficiary) => void
  onCancel: () => void
}

export function PayoutForm({
  beneficiaries,
  isBeneficiariesPending,
  isPending = false,
  onSubmit,
  onCancel,
}: PayoutFormProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedBeneficiary, setSelectedBeneficiary] =
    React.useState<Beneficiary | null>(null)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IndividualPayoutFormValues>({
    resolver: zodResolver(individualPayoutSchema),
    defaultValues: {
      beneficiary_id: "",
      amount: 0,
      payment_method: "bank_transfer",
      reference_note: "",
    },
  })

  const filteredBeneficiaries = React.useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    if (!normalizedQuery) {
      return beneficiaries
    }

    return beneficiaries.filter((beneficiary) =>
      [
        beneficiary.name,
        beneficiary.email,
        beneficiary.account_number,
        beneficiary.phone_number ?? "",
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    )
  }, [beneficiaries, searchQuery])

  React.useEffect(() => {
    if (selectedBeneficiary) {
      setValue("beneficiary_id", String(selectedBeneficiary.id), {
        shouldValidate: true,
      })
      return
    }

    setValue("beneficiary_id", "", { shouldValidate: true })
  }, [selectedBeneficiary, setValue])

  const handleFormSubmit = (values: IndividualPayoutFormValues) => {
    if (!selectedBeneficiary) {
      setValue("beneficiary_id", "", { shouldValidate: true })
      return
    }

    onSubmit(values, selectedBeneficiary)
  }

  const handleCancel = () => {
    setSearchQuery("")
    setSelectedBeneficiary(null)
    reset()
    onCancel()
  }

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((part) => part[0] ?? "")
      .join("")
      .slice(0, 2)
      .toUpperCase()

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-1 flex-col overflow-hidden"
    >
      <div className="custom-scrollbar flex-1 space-y-8 overflow-y-auto px-8 pb-8">
        <div className="space-y-4">
          {!selectedBeneficiary ? (
            <>
              <div className="relative">
                <Search className="absolute left-4 top-1/3 h-5 w-5 -translate-y-1/3 text-text-muted" />
                <Input
                  placeholder="Search beneficiary..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="h-12 rounded-full border-transparent bg-surface-5 pl-12 text-base focus-visible:ring-1 focus-visible:ring-surface-6"
                />
                {errors.beneficiary_id ? (
                  <p className="mt-1 px-4 text-xs text-destructive">
                    {errors.beneficiary_id.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-3">
                {isBeneficiariesPending ? (
                  <p className="py-6 text-sm text-text-secondary">
                    Loading beneficiaries...
                  </p>
                ) : filteredBeneficiaries.length === 0 ? (
                  <p className="py-6 text-sm text-text-secondary">
                    No beneficiaries found.
                  </p>
                ) : (
                  filteredBeneficiaries.map((beneficiary) => (
                    <button
                      key={beneficiary.id}
                      type="button"
                      onClick={() => setSelectedBeneficiary(beneficiary)}
                      className="flex w-full items-center gap-4 rounded-3xl border border-surface-6 bg-surface-1 p-4 text-left transition-colors hover:bg-surface-2"
                    >
                      <Avatar className="size-12 rounded-full">
                        <AvatarFallback className="bg-brand-primary-dark text-lg font-bold text-white">
                          {getInitials(beneficiary.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-base font-medium text-brand-primary-dark">
                          {beneficiary.name}
                        </p>
                        <p className="truncate text-xs text-text-secondary">
                          {beneficiary.email}
                        </p>
                        <p className="mt-1 text-xs text-text-muted">
                          {beneficiary.account_number}
                        </p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </>
          ) : (
            <div className="relative rounded-3xl border border-surface-6 bg-brand-primary-dark/10 p-6">
              <div className="mb-4 flex items-start justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-primary-dark/50">
                  Selected Recipient
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedBeneficiary(null)}
                  className="text-xs font-bold text-brand-primary-dark hover:underline"
                >
                  Change
                </button>
              </div>

              <div className="mb-5 flex items-center gap-4">
                <Avatar className="size-12 rounded-full">
                  <AvatarFallback className="bg-brand-primary-dark text-lg font-bold text-white">
                    {getInitials(selectedBeneficiary.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-base font-medium text-brand-primary-dark">
                    {selectedBeneficiary.name}
                  </span>
                  <span className="text-xs text-text-secondary">
                    {selectedBeneficiary.email}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-brand-primary-dark/20 pt-4">
                <div className="flex items-center gap-2 text-brand-primary-dark">
                  <Landmark className="size-4" />
                  <span className="text-xs">
                    {selectedBeneficiary.account_number}
                  </span>
                </div>
                <Badge className="rounded-full border-0 bg-success-2/20 px-3 py-0.5 text-[10px] font-semibold text-green-700 hover:bg-success-2/20">
                  Verified
                </Badge>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Label className="text-xs font-bold uppercase tracking-wider text-text-muted">
            Amount
          </Label>
          <div
            className={cn(
              "rounded-none border p-6",
              errors.amount ? "border-destructive" : "border-surface-6",
            )}
          >
            <AmountInput
              name="amount"
              control={control}
              prefix="₦"
              wrapperClassName="flex items-center"
              prefixClassName="mr-3 text-3xl font-medium text-brand-primary-dark"
              inputClassName="h-auto rounded-none border-0 bg-transparent p-0 text-3xl! font-medium text-brand-primary-dark placeholder:text-text-muted/50 shadow-none focus-visible:ring-0"
            />
          </div>
          {errors.amount ? (
            <p className="text-xs text-destructive">{errors.amount.message}</p>
          ) : null}
        </div>

        <div className="space-y-3">
          <Label className="text-xs font-bold uppercase tracking-wider text-text-muted">
            Payment Method
          </Label>
          <Controller
            name="payment_method"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-2 gap-3">
                {PAYMENT_METHODS.map((method) => {
                  const isActive = field.value === method.id
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => field.onChange(method.id)}
                      className={cn(
                        "flex h-12 items-center justify-center gap-2 rounded-full border font-medium transition-colors",
                        isActive
                          ? "border-brand-primary bg-brand-primary text-white shadow-sm"
                          : "border-transparent bg-surface-5 text-text-secondary hover:bg-surface-6",
                      )}
                    >
                      <method.icon
                        className={cn(
                          "size-4",
                          isActive ? "text-white" : "text-text-secondary",
                        )}
                      />
                      <span>{method.label}</span>
                    </button>
                  )
                })}
              </div>
            )}
          />
        </div>

        <div className="space-y-3">
          <Label className="text-xs font-bold uppercase tracking-wider text-text-muted">
            Reference Note
          </Label>
          <Controller
            name="reference_note"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder=""
                className="h-10 rounded-none border-x-0 border-b border-t-0 border-surface-6 bg-transparent px-0 text-base shadow-none focus-visible:border-brand-primary focus-visible:ring-0"
              />
            )}
          />
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-4 px-8 py-8">
        <Button
          type="submit"
          disabled={isPending}
          className="h-14 w-full rounded-full bg-brand-primary text-lg font-medium text-white shadow-[0_8px_30px_rgb(45,16,135,0.3)] hover:bg-brand-primary-dark"
        >
          {isPending ? "Sending Payment..." : "Send Payment"}
        </Button>
        <Button
          type="button"
          onClick={handleCancel}
          className="h-12 w-full rounded-full bg-transparent text-base font-medium text-text-secondary shadow-none hover:bg-surface-3! hover:text-text-primary"
        >
          Cancel
        </Button>
        <div className="mt-2 flex items-center justify-center gap-1.5 text-text-muted">
          <ShieldCheck className="size-3.5" />
          <span className="text-xs font-medium">
            Payments are processed securely.
          </span>
        </div>
      </div>
    </form>
  )
}
