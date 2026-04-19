"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { createBulkPayout } from "@/lib/api/v1/payout/actions"
import {
  getPayoutBeneficiaries,
  getPayoutCategories,
} from "@/lib/api/v1/payout/queries"
import {
  bulkPayoutQueryKeys,
  payoutQueryKeys,
} from "@/lib/api/v1/query-key-factory"
import { getApiErrorMessage } from "@/lib/get-api-error-message"
import { BeneficiariesResponse, Beneficiary, Category } from "@/lib/types"
import { cn, formatCurrency, getInitials } from "@/lib/utils"
import { useCurrentMerchant, useCurrentMode } from "@/store/merchant"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CheckCircle2, Plus, Search, X } from "lucide-react"
import { useMemo, useState } from "react"
import { toast } from "sonner"
import { ReviewBulkPayoutDialog } from "./review-bulk-payout-dialog"

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

export function CreateBatchPayoutSheet() {
  const merchant = useCurrentMerchant()
  const mode = useCurrentMode()
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [isReviewOpen, setIsReviewOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCustomers, setSelectedCustomers] = useState<Set<string>>(
    new Set(),
  )
  const [batchName, setBatchName] = useState("")
  const beneficiaryPage = 1
  const beneficiaryPageSize = 50

  const { data: payoutCategories = [] } = useQuery<Category[]>({
    queryKey: payoutQueryKeys.categories(merchant?.id ?? ""),
    queryFn: () => getPayoutCategories(merchant!.id),
    enabled: !!merchant?.id,
  })

  const { data: beneficiaryResponse, isPending: isBeneficiariesPending } =
    useQuery<BeneficiariesResponse>({
      queryKey: payoutQueryKeys.bulkPayoutBeneficiaries(
        merchant?.id ?? "",
        beneficiaryPage,
        beneficiaryPageSize,
        selectedCategory ? Number(selectedCategory) : null,
      ),
      queryFn: () =>
        getPayoutBeneficiaries({
          merchant_id: merchant!.id,
          page: beneficiaryPage,
          size: beneficiaryPageSize,
          ...(selectedCategory
            ? { category_id: Number(selectedCategory) }
            : {}),
        }),
      enabled: !!merchant?.id,
    })

  const beneficiaryList = useMemo(
    () => beneficiaryResponse?.beneficiaries ?? [],
    [beneficiaryResponse?.beneficiaries],
  )

  const filteredCustomers = useMemo(() => {
    let filtered = beneficiaryList

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (beneficiary) =>
          beneficiary.name.toLowerCase().includes(query) ||
          beneficiary.email.toLowerCase().includes(query),
      )
    }

    return filtered
  }, [beneficiaryList, searchQuery])

  const selectedCustomerObjects = useMemo(
    () =>
      beneficiaryList.filter((beneficiary) =>
        selectedCustomers.has(String(beneficiary.id)),
      ),
    [beneficiaryList, selectedCustomers],
  )

  const areAllSelected =
    filteredCustomers.length > 0 &&
    filteredCustomers.every((customer) =>
      selectedCustomers.has(String(customer.id)),
    )

  const totalSelectedAmount = useMemo(
    () =>
      selectedCustomerObjects.reduce(
        (sum, beneficiary) => sum + (beneficiary.default_amount ?? 0),
        0,
      ),
    [selectedCustomerObjects],
  )

  const resetState = () => {
    setIsReviewOpen(false)
    setSelectedCategory(null)
    setSearchQuery("")
    setSelectedCustomers(new Set())
    setBatchName("")
  }

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)

    if (!nextOpen) {
      resetState()
    }
  }

  const handleSelectAll = (checked: boolean) => {
    const nextSelected = new Set(selectedCustomers)

    if (checked) {
      filteredCustomers.forEach((customer) =>
        nextSelected.add(String(customer.id)),
      )
    } else {
      filteredCustomers.forEach((customer) =>
        nextSelected.delete(String(customer.id)),
      )
    }

    setSelectedCustomers(nextSelected)
  }

  const handleCustomerToggle = (customerId: string, checked: boolean) => {
    const nextSelected = new Set(selectedCustomers)

    if (checked) {
      nextSelected.add(customerId)
    } else {
      nextSelected.delete(customerId)
    }

    setSelectedCustomers(nextSelected)
  }

  const handleRemoveSelected = (customerId: string) => {
    const nextSelected = new Set(selectedCustomers)
    nextSelected.delete(customerId)
    setSelectedCustomers(nextSelected)
  }

  const { mutate: submitBulkPayout, isPending: isSubmitting } = useMutation({
    mutationFn: () => {
      if (!merchant?.id) {
        throw new Error("No merchant selected")
      }

      if (selectedCustomerObjects.length === 0) {
        throw new Error("Select at least one beneficiary")
      }

      const trimmedBatchName = batchName.trim()
      if (!trimmedBatchName) {
        throw new Error("Batch name is required")
      }

      return createBulkPayout({
        merchant_id: merchant.id,
        mode,
        name: trimmedBatchName,
        data: null,
        beneficiary_ids: selectedCustomerObjects.map(
          (beneficiary: Beneficiary) => beneficiary.id,
        ),
        category_ids: selectedCategory ? [Number(selectedCategory)] : undefined,
      })
    },
    onSuccess: async () => {
      if (merchant?.id) {
        await queryClient.invalidateQueries({
          queryKey: bulkPayoutQueryKeys.all,
        })
      }

      toast.success("Bulk payout created successfully")
      handleOpenChange(false)
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Unable to create bulk payout"))
    },
  })

  const selectedCategoryName =
    payoutCategories.find(
      (category: Category) => String(category.id) === selectedCategory,
    )?.name ?? null

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button className="flex h-auto items-center gap-2 rounded-xl bg-brand-primary px-5 py-2 text-white hover:bg-brand-primary/90">
          <Plus className="size-4" />
          <span>Create Bulk Payout</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col bg-[#F9F9F9] p-0 font-manrope data-[side=right]:sm:max-w-125">
        <SheetTitle className="sr-only">Create Bulk Payout</SheetTitle>

        <div className="px-8 pb-4 pt-10">
          <div className="pr-6">
            <h2 className="font-secondary text-4xl font-bold leading-tight tracking-tight text-text-primary">
              Bulk Payout
            </h2>
            <p className="text-[15px] font-medium text-text-secondary">
              Select categories or beneficiaries to send payments
            </p>
          </div>
        </div>

        <div className="flex-1 space-y-8 overflow-y-auto px-8 py-2">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-text-muted"
              strokeWidth={2}
            />
            <Input
              type="text"
              placeholder="Search beneficiaries..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="h-13 rounded-lg border-0 bg-black/4 pl-10.5 text-[15px] font-medium placeholder:text-text-muted focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="space-y-4">
            <p className="text-[12px] font-bold tracking-[0.08em] text-text-muted">
              QUICK SELECT CATEGORIES
            </p>
            <div className="flex flex-wrap gap-3">
              {payoutCategories.map((category: Category) => {
                const categoryKey = String(category.id)
                const isSelected = selectedCategory === categoryKey

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() =>
                      setSelectedCategory(isSelected ? null : categoryKey)
                    }
                    className={cn(
                      "flex h-10.5 items-center gap-2 rounded-full px-5 text-[14px] transition-colors",
                      isSelected
                        ? "bg-brand-primary-dark font-semibold text-white"
                        : "bg-black/4 font-medium text-text-secondary hover:bg-black/6",
                    )}
                  >
                    <span>{category.name}</span>
                    {isSelected ? (
                      <CheckCircle2
                        className="size-4"
                        fill="white"
                        color="#251481"
                        strokeWidth={1}
                      />
                    ) : null}
                  </button>
                )
              })}
              {payoutCategories.length === 0 ? (
                <p className="text-sm text-text-muted">No categories found</p>
              ) : null}
            </div>
          </div>

          <div className="space-y-4 pb-8">
            <div className="flex items-center justify-between pb-2">
              <p className="text-[12px] font-bold tracking-[0.08em] text-text-muted uppercase">
                ALL BENEFICIARIES
              </p>
              <button
                type="button"
                onClick={() => handleSelectAll(!areAllSelected)}
                className="text-[13px] font-bold text-[#251481] hover:underline"
              >
                {areAllSelected ? "Deselect All" : "Select All"}
              </button>
            </div>

            <div className="space-y-3">
              {isBeneficiariesPending ? (
                <p className="py-8 text-center text-sm text-text-muted">
                  Loading beneficiaries...
                </p>
              ) : filteredCustomers.length === 0 ? (
                <p className="py-8 text-center text-sm text-text-muted">
                  No beneficiaries found
                </p>
              ) : (
                filteredCustomers.map((customer) => (
                  <BeneficiaryRow
                    key={customer.id}
                    customer={customer}
                    isSelected={selectedCustomers.has(String(customer.id))}
                    onToggle={handleCustomerToggle}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-6 border-t border-border bg-white px-6 py-6 shadow-[0_-4px_24px_rgba(0,0,0,0.02)]">
          {selectedCustomerObjects.length > 0 ? (
            <div className="space-y-3">
              <p className="text-[11px] font-semibold tracking-wider text-text-muted">
                SELECTED RECIPIENTS
              </p>
              <div className="flex max-h-22.5 flex-wrap gap-2 overflow-y-auto pb-1">
                {selectedCustomerObjects.map((customer) => (
                  <Badge
                    key={customer.id}
                    variant="secondary"
                    className="flex h-8 items-center gap-1.5 rounded-full border-0 bg-surface-2 px-3 py-0 font-medium text-text-primary hover:bg-black/5"
                  >
                    <span>{customer.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSelected(String(customer.id))}
                      className="ml-0.5 text-text-muted transition-colors hover:text-text-primary"
                    >
                      <X className="size-3.5" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}

          <div className="flex flex-col gap-1">
            <p className="text-xs text-text-secondary">Summary</p>
            <p className="text-xl font-bold tracking-tight text-text-primary">
              Total selected: {selectedCustomerObjects.length} recipient
              {selectedCustomerObjects.length !== 1 ? "s" : ""}
            </p>
            <p className="text-sm text-text-secondary">
              Total amount: {formatCurrency(totalSelectedAmount, "NGN")}
            </p>
          </div>

          <Button
            type="button"
            className="h-14 w-full rounded-sm bg-[#251481] text-lg font-bold text-white hover:bg-[#251481]/90 focus-visible:ring-[#251481] disabled:opacity-50"
            disabled={selectedCustomerObjects.length === 0}
            onClick={() => setIsReviewOpen(true)}
          >
            Continue to Bulk Payout
          </Button>
        </div>
      </SheetContent>

      <ReviewBulkPayoutDialog
        open={isReviewOpen}
        onOpenChange={setIsReviewOpen}
        batchName={batchName}
        isSubmitting={isSubmitting}
        onBack={() => setIsReviewOpen(false)}
        onBatchNameChange={setBatchName}
        onSubmit={() => submitBulkPayout()}
        selectedCategoryName={selectedCategoryName}
        selectedCustomerObjects={selectedCustomerObjects}
        totalSelectedAmount={totalSelectedAmount}
      />
    </Sheet>
  )
}

interface BeneficiaryRowProps {
  customer: Beneficiary
  isSelected: boolean
  onToggle: (id: string, checked: boolean) => void
}

function BeneficiaryRow({
  customer,
  isSelected,
  onToggle,
}: BeneficiaryRowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-xl px-5 py-4 transition-colors",
        isSelected
          ? "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
          : "bg-transparent",
      )}
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

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
        <p className="truncate text-[16px] font-bold text-[#1a1a1a]">
          {customer.name}
        </p>
        <p className="truncate text-[14px] text-[#666666]">{customer.email}</p>
      </div>

      <div className="flex items-center pl-2">
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked) =>
            onToggle(String(customer.id), checked === true)
          }
          className="size-6 rounded-[6px] border-black/30 bg-transparent shadow-none data-[state=checked]:border-brand-primary data-[state=checked]:bg-brand-primary *:text-white!"
        />
      </div>
    </div>
  )
}
