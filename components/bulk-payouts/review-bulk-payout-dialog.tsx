import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Beneficiary } from "@/lib/types"
import { cn, formatCurrency, getInitials } from "@/lib/utils"

interface ReviewBulkPayoutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  batchName: string
  isSubmitting: boolean
  onBack: () => void
  onBatchNameChange: (value: string) => void
  onSubmit: () => void
  selectedCategoryName: string | null
  selectedCustomerObjects: Beneficiary[]
  totalSelectedAmount: number
}

const getAvatarColor = (name: string) => {
  const colors = [
    "bg-accent-violet-soft text-accent-violet",
    "bg-status-success-soft text-status-success",
    "bg-accent-blue-soft text-accent-blue",
    "bg-status-warning-soft text-status-warning",
    "bg-surface-3 text-text-secondary",
  ]
  let hash = 0

  for (let i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }

  return colors[Math.abs(hash) % colors.length]
}

export function ReviewBulkPayoutDialog({
  open,
  onOpenChange,
  batchName,
  isSubmitting,
  onBack,
  onBatchNameChange,
  onSubmit,
  selectedCategoryName,
  selectedCustomerObjects,
  totalSelectedAmount,
}: ReviewBulkPayoutDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl overflow-hidden border-0 bg-surface-2 p-0 sm:max-w-2xl">
        <DialogHeader className="border-b border-surface-3 gap-0 px-8 py-4 bg-white">
          <DialogTitle className="font-secondary text-2xl font-black tracking-tight text-text-primary">
            Review Bulk Payout
          </DialogTitle>
          <DialogDescription className="text-sm font-manrope font-medium text-text-secondary">
            Confirm beneficiaries, review their saved payout amounts, and submit
            this batch.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 overflow-y-auto px-8 py-2 custom-scrollbar">
          <div className="rounded-3xl border border-surface-3 bg-white p-6 shadow-sm">
            <div className=" font-manrope space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="bulk-payout-batch-name"
                  className="text-sm font-bold text-text-primary"
                >
                  Batch Name
                </label>
                <Input
                  id="bulk-payout-batch-name"
                  value={batchName}
                  onChange={(event) => onBatchNameChange(event.target.value)}
                  placeholder="e.g. April salary run"
                  className="h-12 mt-1 rounded-xl border-surface-3 bg-surface-2 focus-visible:ring-brand-primary-2/20"
                />
              </div>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Beneficiaries</span>
                  <span className="text-sm font-bold text-text-primary">{selectedCustomerObjects.length} selected</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Total Amount</span>
                  <span className="font-secondary text-lg font-black text-brand-primary-2">
                    {formatCurrency(totalSelectedAmount, "NGN")}
                  </span>
                </div>
                {selectedCategoryName && (
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Category</span>
                    <span className="text-sm font-bold text-text-primary">{selectedCategoryName}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
              Beneficiaries and Amounts
            </p>
            <div className="space-y-3">
              {selectedCustomerObjects.map((customer) => (
                <div
                  key={customer.id}
                  className="flex items-center gap-4 rounded-2xl border border-surface-3 bg-white px-6 py-5 shadow-sm transition-colors hover:bg-surface-2"
                >
                  <Avatar className="size-12">
                    <AvatarFallback
                      className={cn(
                        "text-sm font-black uppercase tracking-wider",
                        getAvatarColor(customer.name),
                      )}
                    >
                      {getInitials(customer.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-base font-bold text-text-primary">
                      {customer.name}
                    </p>
                    <p className="truncate text-xs font-medium text-text-muted">
                      {customer.email}
                    </p>
                  </div>

                  <div className="text-right space-y-0.5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                      Amount
                    </p>
                    <p className="font-secondary text-base font-black text-text-primary">
                      {formatCurrency(customer.default_amount ?? 0, "NGN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="border-t py-3 border-surface-3 bg-white px-8 sm:justify-end items-center">
          <Button
            type="button"
            variant="ghost"
            className="rounded-lg px-4 py-5"
            onClick={onBack}
            disabled={isSubmitting}
          >
            Back
          </Button>
          <Button
            type="button"
            className=" rounded-lg bg-brand-primary-2 px-6 py-5 uppercase tracking-widest text-white hover:bg-brand-primary-2/90 shadow-sm"
            disabled={
              isSubmitting ||
              !batchName.trim() ||
              selectedCustomerObjects.length === 0
            }
            onClick={onSubmit}
          >
            {isSubmitting ? "Creating..." : "Create Bulk Payout"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
