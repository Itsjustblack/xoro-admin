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
import { createBeneficiary } from "@/lib/api/v1/payout/actions"
import { getBanks, getPayoutCategories } from "@/lib/api/v1/payout/queries"
import { payoutQueryKeys } from "@/lib/api/v1/query-key-factory"
import { type AddBeneficiaryFormValues } from "@/lib/schemas/beneficiary"
import { useCurrentMerchant } from "@/store/merchant"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { BeneficiaryForm } from "./beneficiary-form"

interface AddBeneficiarySheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

const BENEFICIARY_FORM_ID = "add-beneficiary-form"

export function AddBeneficiarySheet({
  open,
  onOpenChange,
  children,
}: AddBeneficiarySheetProps) {
  const merchant = useCurrentMerchant()
  const queryClient = useQueryClient()

  const { data: categories = [] } = useQuery({
    queryKey: payoutQueryKeys.categories(merchant?.id ?? ""),
    queryFn: () => getPayoutCategories(merchant!.id),
    enabled: !!merchant?.id,
  })

  const { data: banks = [] } = useQuery({
    queryKey: payoutQueryKeys.banks(),
    queryFn: getBanks,
  })

  const { mutate: submitBeneficiary, isPending } = useMutation({
    mutationFn: createBeneficiary,
    onSuccess: async () => {
      if (merchant?.id) {
        await queryClient.invalidateQueries({
          queryKey: payoutQueryKeys.beneficiariesList(merchant.id),
        })
      }
      toast.success("Beneficiary created successfully")
      onOpenChange?.(false)
    },
    onError: () => {
      toast.error("Unable to create beneficiary")
    },
  })

  const formatPhoneNumber = (phoneCode: string, phoneNumber: string) => {
    const normalizedNumber = phoneNumber.replace(/\s+/g, "")

    if (!normalizedNumber) return ""
    if (normalizedNumber.startsWith("+")) return normalizedNumber

    return `${phoneCode}${normalizedNumber}`
  }

  const handleSubmit = (values: AddBeneficiaryFormValues) => {
    if (!merchant?.id) {
      toast.error("No merchant selected")
      return
    }

    submitBeneficiary({
      merchant_id: merchant.id,
      name: values.name,
      email: values.email,
      bank_code: values.bank_code,
      account_number: values.account_number,
      category_id: values.category_id ? Number(values.category_id) : null,
      default_amount: values.default_amount,
      phone_number: formatPhoneNumber(values.phone_code, values.phone_number),
      whatsapp_number: values.whatsapp_number?.trim() || undefined,
      narration: undefined,
    })
  }

  const handleCancel = () => {
    onOpenChange?.(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {children && <SheetTrigger asChild>{children}</SheetTrigger>}

      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full data-[side=right]:sm:max-w-125 bg-surface-1 p-0  gap-0 border-l flex flex-col h-full"
      >
        <SheetHeader className="py-6 px-8 border-b border-surface-6">
          <div className="flex items-center justify-between pr-8">
            <SheetTitle className="text-2xl font-bold text-text-primary font-manrope">
              Add New Beneficiary
            </SheetTitle>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-text-muted-2 hover:text-text-primary absolute right-4 top-6"
              >
                <X strokeWidth={3} className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-hidden">
          <BeneficiaryForm
            formId={BENEFICIARY_FORM_ID}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel="Add New Beneficiary"
            banks={banks}
            categories={categories}
            isPending={isPending}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
