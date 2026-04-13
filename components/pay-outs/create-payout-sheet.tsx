"use client"

import { X } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
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
import { getApiErrorMessage } from "@/lib/get-api-error-message"
import { type IndividualPayoutFormValues } from "@/lib/schemas/payout"
import type { BeneficiariesResponse, Beneficiary } from "@/lib/types"
import { useCurrentMerchant } from "@/store/merchant"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { PayoutForm } from "./payout-form"

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

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      if (open === undefined) {
        setInternalOpen(nextOpen)
      }

      onOpenChange?.(nextOpen)
    },
    [onOpenChange, open],
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

  const { mutate: submitPayout, isPending: isSubmitting } = useMutation({
    mutationFn: ({
      values,
      beneficiary,
    }: {
      values: IndividualPayoutFormValues
      beneficiary: Beneficiary
    }) => {
      if (!merchant?.id) {
        throw new Error("No merchant selected")
      }

      return merchantPayout({
        merchant_id: merchant.id,
        amount: values.amount,
        currency: "NGN",
        customer: {
          account_number: beneficiary.account_number,
          bank_code: beneficiary.bank_code,
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
      handleOpenChange(false)
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Unable to send payout"))
    },
  })

  return (
    <Sheet open={resolvedOpen} onOpenChange={handleOpenChange}>
      {children && <SheetTrigger asChild>{children}</SheetTrigger>}

      <SheetContent
        side="right"
        showCloseButton={false}
        className="max-w-110 flex h-full flex-col border-l bg-white p-0 font-manrope"
      >
        <SheetHeader className="px-8 pb-6 pt-10">
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

        <PayoutForm
          beneficiaries={beneficiaries}
          isBeneficiariesPending={isBeneficiariesPending}
          isPending={isSubmitting}
          onSubmit={(values, beneficiary) =>
            submitPayout({ values, beneficiary })
          }
          onCancel={() => handleOpenChange(false)}
        />
      </SheetContent>
    </Sheet>
  )
}
