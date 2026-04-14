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
import { cn, formatCurrency } from "@/lib/utils"

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

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase()

const getAvatarColor = (name: string) => {
  const colors = [
    "bg-[#EBE9F8] text-[#251481]",
    "bg-green-100 text-green-800",
    "bg-blue-100 text-blue-800",
    "bg-orange-100 text-orange-800",
    "bg-black/[0.08] text-text-secondary",
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
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-hidden border-0 bg-[#F9F9F9] p-0 sm:max-w-2xl">
        <DialogHeader className="border-b border-border px-6 pb-4 pt-6">
          <DialogTitle className="font-secondary text-3xl font-bold tracking-tight text-text-primary">
            Review Bulk Payout
          </DialogTitle>
          <DialogDescription className="text-[15px] font-medium text-text-secondary">
            Confirm beneficiaries, review their saved payout amounts, and submit
            this batch.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 overflow-y-auto px-6 py-6">
          <div className="rounded-3xl border border-surface-3 bg-white p-5 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
              Batch Setup
            </p>
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="bulk-payout-batch-name"
                  className="text-sm font-semibold text-text-primary"
                >
                  Batch Name
                </label>
                <Input
                  id="bulk-payout-batch-name"
                  value={batchName}
                  onChange={(event) => onBatchNameChange(event.target.value)}
                  placeholder="e.g. April salary run"
                  className="h-12 rounded-xl border-surface-3 bg-surface-1"
                />
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-text-secondary">
                <span>
                  {selectedCustomerObjects.length} beneficiaries selected
                </span>
                <span>Total: {formatCurrency(totalSelectedAmount, "NGN")}</span>
                {selectedCategoryName ? (
                  <span>Category: {selectedCategoryName}</span>
                ) : null}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[12px] font-bold tracking-[0.08em] text-text-muted uppercase">
              Beneficiaries and Amounts
            </p>
            <div className="space-y-3">
              {selectedCustomerObjects.map((customer) => (
                <div
                  key={customer.id}
                  className="flex items-center gap-4 rounded-xl bg-white px-5 py-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                >
                  <Avatar className="size-11.5">
                    <AvatarFallback
                      className={cn(
                        "text-[15px] font-bold tracking-tight",
                        getAvatarColor(customer.name),
                      )}
                    >
                      {getInitials(customer.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[16px] font-bold text-[#1a1a1a]">
                      {customer.name}
                    </p>
                    <p className="truncate text-[14px] text-[#666666]">
                      {customer.email}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                      Amount
                    </p>
                    <p className="text-base font-bold text-text-primary">
                      {formatCurrency(customer.default_amount ?? 0, "NGN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="border-t border-border bg-white px-6 py-4 sm:justify-between">
          <Button
            type="button"
            variant="outline"
            className="h-12 rounded-xl"
            onClick={onBack}
            disabled={isSubmitting}
          >
            Back
          </Button>
          <Button
            type="button"
            className="h-12 rounded-sm bg-[#251481] px-6 text-base font-bold text-white hover:bg-[#251481]/90 focus-visible:ring-[#251481] disabled:opacity-50"
            disabled={
              isSubmitting ||
              !batchName.trim() ||
              selectedCustomerObjects.length === 0
            }
            onClick={onSubmit}
          >
            {isSubmitting ? "Creating Bulk Payout..." : "Create Bulk Payout"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
