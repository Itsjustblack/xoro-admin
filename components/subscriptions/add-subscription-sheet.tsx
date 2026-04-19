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
import { type AddSubscriptionFormValues } from "@/lib/schemas/subscription"
import { toast } from "sonner"
import { SubscriptionForm } from "./subscription-form"

interface AddSubscriptionSheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

const SUBSCRIPTION_FORM_ID = "add-subscription-form"

export function AddSubscriptionSheet({
  open,
  onOpenChange,
  children,
}: AddSubscriptionSheetProps) {
  const [isPending, setIsPending] = React.useState(false)

  const handleSubmit = async (values: AddSubscriptionFormValues) => {
    setIsPending(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    toast.success(`Subscription created for ${values.customerName}`)
    setIsPending(false)
    onOpenChange?.(false)
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
        className="w-full data-[side=right]:sm:max-w-125 bg-surface-1 p-0 gap-0 border-l flex flex-col h-full"
      >
        <SheetHeader className="py-6 px-8 border-b border-surface-6">
          <div className="flex items-center justify-between pr-8">
            <SheetTitle className="text-2xl font-bold text-text-primary font-manrope">
              Add New Subscription
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
          <SubscriptionForm 
            formId={SUBSCRIPTION_FORM_ID}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel="Add New Subscription"
            isPending={isPending}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
