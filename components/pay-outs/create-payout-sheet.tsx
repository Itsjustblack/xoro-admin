"use client"

import * as React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { X, Search, Landmark, Smartphone, Bitcoin, Wallet, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { individualPayoutSchema, type IndividualPayoutFormValues } from "@/lib/schemas/payout"
import { cn } from "@/lib/utils"

interface CreatePayoutSheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

// Mocking a selected beneficiary based on the design
const MOCK_BENEFICIARY = {
  id: "1",
  name: "Emmanuel Omole",
  email: "emmanuel.omole@nexus.io",
  bank: "Standard Chartered Bank",
  verified: true,
}

export function CreatePayoutSheet({
  open,
  onOpenChange,
  children,
}: CreatePayoutSheetProps) {
  const [selectedBeneficiary, setSelectedBeneficiary] = React.useState<typeof MOCK_BENEFICIARY | null>(MOCK_BENEFICIARY)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IndividualPayoutFormValues>({
    resolver: zodResolver(individualPayoutSchema),
    defaultValues: {
      beneficiary_id: MOCK_BENEFICIARY.id,
      amount: "",
      payment_method: "bank_transfer",
      reference_note: "",
    },
  })

  // Set the form value when local state changes
  React.useEffect(() => {
    if (selectedBeneficiary) {
      setValue("beneficiary_id", selectedBeneficiary.id)
    } else {
      setValue("beneficiary_id", "")
    }
  }, [selectedBeneficiary, setValue])

  const onSubmit = (data: IndividualPayoutFormValues) => {
    console.log("Sending payment:", data)
    onOpenChange?.(false)
    reset()
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {children && <SheetTrigger asChild>{children}</SheetTrigger>}
      
      <SheetContent 
        side="right" 
        showCloseButton={false}
        className="w-full sm:max-w-[439px] bg-white p-0 border-l flex flex-col h-full font-manrope"
      >
        <SheetHeader className="px-8 pt-10 pb-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <SheetTitle className="text-[28px] font-medium text-brand-primary-dark font-clash-display">
                Send Payment
              </SheetTitle>
              <p className="text-text-secondary text-sm">
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

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 px-8 overflow-y-auto custom-scrollbar space-y-8 pb-8">
            
            {/* Beneficiary Search / Selection */}
            <div className="space-y-4">
              {!selectedBeneficiary ? (
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
                  <Input 
                    placeholder="Search beneficiary..." 
                    className="pl-12 bg-surface-5 border-transparent focus-visible:ring-1 focus-visible:ring-surface-6 rounded-full h-12 text-base"
                  />
                  {errors.beneficiary_id && <p className="text-xs text-destructive mt-1 px-4">{errors.beneficiary_id.message}</p>}
                </div>
              ) : (
                <div className="rounded-3xl border border-surface-6 bg-surface-1 p-6 relative">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
                      Selected Recipient
                    </span>
                    <button 
                      type="button" 
                      onClick={() => setSelectedBeneficiary(null)}
                      className="text-sm font-bold text-brand-primary-dark hover:underline"
                    >
                      Change
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-5">
                    <Avatar className="size-12 rounded-full">
                      <AvatarFallback className="bg-brand-primary-dark text-white font-bold text-lg">
                        {selectedBeneficiary.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-lg font-medium text-brand-primary-dark">{selectedBeneficiary.name}</span>
                      <span className="text-sm text-text-secondary">{selectedBeneficiary.email}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-surface-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-brand-primary-dark">
                      <Landmark className="size-4" />
                      <span className="text-sm">{selectedBeneficiary.bank}</span>
                    </div>
                    {selectedBeneficiary.verified && (
                      <Badge className="bg-success-2/20 text-success-3 hover:bg-success-2/20 border-0 rounded-full px-3 py-0.5 font-semibold text-xs">
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Amount */}
            <div className="space-y-3">
              <Label className="text-xs font-bold text-text-muted uppercase tracking-wider">
                Amount
              </Label>
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <div className={cn(
                    "rounded-xl border p-6 flex items-center",
                    errors.amount ? "border-destructive" : "border-surface-6"
                  )}>
                    <span className="text-3xl font-medium text-brand-primary-dark mr-3">₦</span>
                    <Input 
                      {...field}
                      type="text"
                      placeholder="0.00" 
                      className="border-0 bg-transparent p-0 h-auto text-4xl font-medium text-brand-primary-dark placeholder:text-text-muted/50 focus-visible:ring-0 rounded-none shadow-none"
                    />
                  </div>
                )}
              />
              {errors.amount && <p className="text-xs text-destructive">{errors.amount.message}</p>}
            </div>

            {/* Payment Method */}
            <div className="space-y-3">
              <Label className="text-xs font-bold text-text-muted uppercase tracking-wider">
                Payment Method
              </Label>
              <Controller
                name="payment_method"
                control={control}
                render={({ field }) => (
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: "bank_transfer", label: "Bank Transfer", icon: Landmark },
                      { id: "mobile_money", label: "Mobile Money", icon: Smartphone },
                      { id: "crypto", label: "Crypto", icon: Bitcoin },
                      { id: "wallet", label: "Wallet", icon: Wallet },
                    ].map((method) => {
                      const isActive = field.value === method.id;
                      return (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => field.onChange(method.id)}
                          className={cn(
                            "flex items-center justify-center gap-2 h-12 rounded-full font-medium transition-colors border",
                            isActive 
                              ? "bg-brand-primary border-brand-primary text-white shadow-sm" 
                              : "bg-surface-5 border-transparent text-text-secondary hover:bg-surface-6"
                          )}
                        >
                          <method.icon className={cn("size-4", isActive ? "text-white" : "text-text-secondary")} />
                          <span>{method.label}</span>
                        </button>
                      )
                    })}
                  </div>
                )}
              />
            </div>

            {/* Reference Note */}
            <div className="space-y-3">
              <Label className="text-xs font-bold text-text-muted uppercase tracking-wider">
                Reference Note
              </Label>
              <Controller
                name="reference_note"
                control={control}
                render={({ field }) => (
                  <Input 
                    {...field}
                    placeholder="" 
                    className="border-t-0 border-x-0 border-b border-surface-6 rounded-none bg-transparent px-0 h-10 focus-visible:ring-0 focus-visible:border-brand-primary shadow-none text-base"
                  />
                )}
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-8 py-8 mt-auto flex flex-col gap-4">
            <Button 
              type="submit" 
              className="w-full bg-brand-primary hover:bg-brand-primary-dark text-white rounded-full h-14 text-lg font-medium shadow-[0_8px_30px_rgb(45,16,135,0.3)]"
            >
              Send Payment
            </Button>
            <SheetClose asChild>
              <Button variant="ghost" className="w-full text-text-secondary hover:text-text-primary text-base font-medium h-12">
                Cancel
              </Button>
            </SheetClose>
            <div className="flex items-center justify-center gap-1.5 text-text-muted mt-2">
              <ShieldCheck className="size-3.5" />
              <span className="text-xs font-medium">Payments are processed securely.</span>
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
