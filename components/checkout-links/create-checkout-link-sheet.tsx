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
import { createCheckoutLink } from "@/lib/api/v1/link/actions"
import { checkoutLinkQueryKeys } from "@/lib/api/v1/query-key-factory"
import { getApiErrorMessage } from "@/lib/get-api-error-message"
import { type CreateCheckoutLinkFormValues } from "@/lib/schemas/checkout-link"
import { useCurrentMerchant, useCurrentMode } from "@/store/merchant"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { CheckoutLinkForm } from "./checkout-link-form"

interface CreateCheckoutLinkSheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

const CHECKOUT_LINK_FORM_ID = "create-checkout-link-form"

export function CreateCheckoutLinkSheet({
  open,
  onOpenChange,
  children,
}: CreateCheckoutLinkSheetProps) {
  const merchant = useCurrentMerchant()
  const mode = useCurrentMode()
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

  const { mutate: submitCheckoutLink, isPending } = useMutation({
    mutationFn: createCheckoutLink,
    onSuccess: async (link) => {
      if (merchant?.id) {
        await queryClient.invalidateQueries({
          queryKey: checkoutLinkQueryKeys.list(merchant.id),
        })
      }
      toast.success(`Checkout link "${link.title}" created successfully`)
      handleOpenChange(false)
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Unable to create checkout link"))
    },
  })

  const handleSubmit = async (values: CreateCheckoutLinkFormValues) => {
    if (!merchant?.id) {
      toast.error("No merchant selected")
      return
    }

    submitCheckoutLink({
      merchant_id: merchant.id,
      title: values.title,
      description: values.description?.trim() || null,
      amount_type: values.amount_type,
      mode,
      type: values.type,
      currency: values.currency,
      amount:
        values.amount_type === "dynamic" || !values.amount?.trim()
          ? null
          : Number(values.amount),
      max_uses: values.max_uses?.trim() ? Number(values.max_uses) : null,
      redirect_url: values.redirect_url?.trim() || null,
      expires_at: values.expires_at?.trim() || null,
    })
  }

  const handleCancel = () => {
    handleOpenChange(false)
  }

  return (
    <Sheet open={resolvedOpen} onOpenChange={handleOpenChange}>
      {children && <SheetTrigger asChild>{children}</SheetTrigger>}
      
      <SheetContent 
        side="right" 
        showCloseButton={false}
        className="w-full data-[side=right]:sm:max-w-125 bg-surface-1 p-0 gap-0 border-l flex flex-col h-full"
      >
        <SheetHeader className="py-6 px-8 border-b border-surface-6">
          <div className="flex items-center justify-between pr-8">
            <SheetTitle className="text-2xl font-bold text-text-primary font-manrope">
              Create Checkout Link
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
          <CheckoutLinkForm 
            formId={CHECKOUT_LINK_FORM_ID}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel="Create Payment Link"
            isPending={isPending}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
