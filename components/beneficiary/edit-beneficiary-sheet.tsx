"use client"

import { BeneficiaryForm } from "@/components/beneficiary/beneficiary-form"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { updateBeneficiary } from "@/lib/api/v1/payout/actions"
import { getBanks, getPayoutCategories } from "@/lib/api/v1/payout/queries"
import { payoutQueryKeys } from "@/lib/api/v1/query-key-factory"
import countryCodes from "@/lib/country-codes.json"
import { getApiErrorMessage } from "@/lib/get-api-error-message"
import type {
  AddBeneficiaryFormInputValues,
  AddBeneficiaryFormValues,
} from "@/lib/schemas/beneficiary"
import type { BeneficiaryTableRow, CountryPhoneCode } from "@/lib/types"
import { useCurrentMerchant } from "@/store/merchant"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { X } from "lucide-react"
import * as React from "react"
import { toast } from "sonner"

const BENEFICIARY_FORM_ID = "edit-beneficiary-form"
const COUNTRY_CODES = countryCodes as CountryPhoneCode[]

interface EditBeneficiarySheetProps {
  beneficiary: BeneficiaryTableRow
  open: boolean
  onOpenChange: (open: boolean) => void
}

function splitPhoneNumber(value?: string | null) {
  const normalizedValue = value?.trim() ?? ""

  if (!normalizedValue) {
    return { phone_code: "+234", phone_number: "" }
  }

  const matchedCountryCode = [...COUNTRY_CODES]
    .sort((a, b) => b.dial_code.length - a.dial_code.length)
    .find((country) => normalizedValue.startsWith(country.dial_code))

  if (!matchedCountryCode) {
    return { phone_code: "+234", phone_number: normalizedValue }
  }

  return {
    phone_code: matchedCountryCode.dial_code,
    phone_number: normalizedValue.slice(matchedCountryCode.dial_code.length),
  }
}

export function EditBeneficiarySheet({
  beneficiary,
  open,
  onOpenChange,
}: EditBeneficiarySheetProps) {
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

  const initialValues = React.useMemo<AddBeneficiaryFormInputValues>(() => {
    const { phone_code, phone_number } = splitPhoneNumber(
      beneficiary.phone_number,
    )

    return {
      name: beneficiary.name,
      email: beneficiary.email,
      bank_code: beneficiary.bank_code,
      account_number: beneficiary.account_number,
      category_id: beneficiary.category_id ? String(beneficiary.category_id) : "",
      default_amount:
        beneficiary.default_amount > 0 ? String(beneficiary.default_amount) : "",
      phone_code,
      phone_number,
      whatsapp_number: beneficiary.whatsapp_number ?? "",
    }
  }, [beneficiary])

  const formatPhoneNumber = React.useCallback(
    (phoneCode: string, phoneNumber: string) => {
      const normalizedNumber = phoneNumber.replace(/\s+/g, "")

      if (!normalizedNumber) return ""
      if (normalizedNumber.startsWith("+")) return normalizedNumber

      return `${phoneCode}${normalizedNumber}`
    },
    [],
  )

  const { mutate: submitBeneficiary, isPending } = useMutation({
    mutationFn: (values: AddBeneficiaryFormValues) => {
      if (!merchant?.id) {
        throw new Error("No merchant selected")
      }

      return updateBeneficiary({
        id: beneficiary.id,
        merchant_id: merchant.id,
        name: values.name,
        email: values.email,
        bank_code: values.bank_code,
        account_number: values.account_number,
        category_id: values.category_id ? Number(values.category_id) : null,
        default_amount: values.default_amount,
        phone_number: formatPhoneNumber(values.phone_code, values.phone_number),
        whatsapp_number: values.whatsapp_number?.trim() || null,
        narration: beneficiary.narration ?? null,
      })
    },
    onSuccess: async () => {
      if (merchant?.id) {
        await queryClient.invalidateQueries({
          queryKey: payoutQueryKeys.beneficiariesList(merchant.id),
        })
      }

      toast.success("Beneficiary updated successfully")
      onOpenChange(false)
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Unable to update beneficiary"))
    },
  })

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full gap-0 border-l bg-surface-1 p-0 data-[side=right]:sm:max-w-125"
      >
        <SheetHeader className="border-b border-surface-6 px-8 py-6">
          <div className="flex items-center justify-between pr-8">
            <SheetTitle className="font-manrope text-2xl font-bold text-text-primary">
              Edit Beneficiary
            </SheetTitle>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-6 h-8 w-8 text-text-muted-2 hover:text-text-primary"
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
            initialValues={initialValues}
            onSubmit={submitBeneficiary}
            onCancel={() => onOpenChange(false)}
            submitLabel="Save Changes"
            banks={banks}
            categories={categories}
            isPending={isPending}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
