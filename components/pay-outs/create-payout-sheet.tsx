"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Landmark, Search, ShieldCheck, X } from "lucide-react"
import * as React from "react"
import { Controller, useForm } from "react-hook-form"

import { AmountInput } from "@/components/amount-input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { merchantPayout } from "@/lib/api/v1/payout/actions"
import { getPayoutBeneficiaries } from "@/lib/api/v1/payout/queries"
import {
  payoutQueryKeys,
  transactionQueryKeys,
} from "@/lib/api/v1/query-key-factory"
import { PAYMENT_METHODS } from "@/lib/constants"
import { getApiErrorMessage } from "@/lib/get-api-error-message"
import {
  individualPayoutSchema,
  type IndividualPayoutFormValues,
} from "@/lib/schemas/payout"
import type { BeneficiariesResponse, Beneficiary } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useCurrentMerchant } from "@/store/merchant"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

interface CreatePayoutSheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

export function CreatePayoutSheet({
  open,
  onOpenChange,
  children,
}: CreatePayoutSheetProps) {
  const merchant = useCurrentMerchant()
  const queryClient = useQueryClient()
  const [internalOpen, setInternalOpen] = React.useState(false)
  const resolvedOpen = open ?? internalOpen
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

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      if (open === undefined) {
        setInternalOpen(nextOpen)
      }

      if (!nextOpen) {
        setSearchQuery("")
        setSelectedBeneficiary(null)
        reset()
      }

      onOpenChange?.(nextOpen)
    },
    [onOpenChange, open, reset],
  )

  const { data: beneficiaryResponse, isPending: isBeneficiariesPending } =
    useQuery<BeneficiariesResponse>({
      queryKey: payoutQueryKeys.beneficiaries(merchant?.id ?? "", 1, 100, null),
      queryFn: () =>
        getPayoutBeneficiaries({
          merchant_id: merchant!.id,
          page: 1,
          size: 100,
        }),
      enabled: !!merchant?.id,
    })

  const beneficiaries = React.useMemo(
    () => beneficiaryResponse?.beneficiaries ?? [],
    [beneficiaryResponse?.beneficiaries],
  )

  const filteredBeneficiaries = React.useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    if (!normalizedQuery) {
      return beneficiaries
    }

    return beneficiaries.filter((beneficiary: Beneficiary) =>
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

  const { mutate: submitPayout, isPending: isSubmitting } = useMutation({
    mutationFn: (values: IndividualPayoutFormValues) => {
      if (!merchant?.id) {
        throw new Error("No merchant selected")
      }

      if (!selectedBeneficiary) {
        throw new Error("Select a beneficiary")
      }

      return merchantPayout({
        merchant_id: merchant.id,
        amount: values.amount,
        currency: "NGN",
        customer: {
          account_number: selectedBeneficiary.account_number,
          bank_code: selectedBeneficiary.bank_code,
        },
        narration: values.reference_note?.trim() || null,
      })
    },
    onSuccess: async () => {
      if (merchant?.id) {
        await queryClient.invalidateQueries({
          queryKey: transactionQueryKeys.all,
        })
      }

      toast.success("Payout sent successfully")
      setSelectedBeneficiary(null)
      reset()
      handleOpenChange(false)
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Unable to send payout"))
    },
  })

  const onSubmit = (values: IndividualPayoutFormValues) => {
    submitPayout(values)
  }

  const handleSelectBeneficiary = (beneficiary: Beneficiary) => {
    setSelectedBeneficiary(beneficiary)
  }

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((part) => part[0] ?? "")
      .join("")
      .slice(0, 2)
      .toUpperCase()

  return (
    <Sheet open={resolvedOpen} onOpenChange={handleOpenChange}>
      {children && <SheetTrigger asChild>{children}</SheetTrigger>}

      <SheetContent
        side="right"
        showCloseButton={false}
        className="max-w-110 border-l bg-white p-0 font-manrope flex flex-col h-full"
      >
        <SheetHeader className="px-8 pt-10 pb-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <SheetTitle className="font-secondary text-[28px] font-medium text-brand-primary-dark">
                Send Payment
              </SheetTitle>
              <p className="text-sm text-text-secondary">
                Send a payout to an individual beneficiary
              </p>
            </div>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-text-muted-2 hover:text-text-primary"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
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
                      filteredBeneficiaries.map((beneficiary: Beneficiary) => (
                        <button
                          key={beneficiary.id}
                          type="button"
                          onClick={() => handleSelectBeneficiary(beneficiary)}
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
                  inputClassName="h-auto border-0 bg-transparent p-0 text-3xl! font-medium text-brand-primary-dark placeholder:text-text-muted/50 shadow-none focus-visible:ring-0 rounded-none"
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
              disabled={isSubmitting}
              className="h-14 w-full rounded-full bg-brand-primary text-lg font-medium text-white shadow-[0_8px_30px_rgb(45,16,135,0.3)] hover:bg-brand-primary-dark"
            >
              {isSubmitting ? "Sending Payment..." : "Send Payment"}
            </Button>
            <SheetClose asChild>
              <Button className="h-12 w-full rounded-full bg-transparent text-base font-medium text-text-secondary shadow-none hover:bg-surface-3! hover:text-text-primary">
                Cancel
              </Button>
            </SheetClose>
            <div className="mt-2 flex items-center justify-center gap-1.5 text-text-muted">
              <ShieldCheck className="size-3.5" />
              <span className="text-xs font-medium">
                Payments are processed securely.
              </span>
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
