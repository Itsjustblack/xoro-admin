"use client"

import { useState, useMemo } from "react"
import { mockCustomers } from "@/lib/mock-data"
import { CustomerData } from "@/lib/types"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, X, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface CreateBatchPayoutSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase()
}

const getAvatarColor = (name: string) => {
  const colors = [
    "bg-[#EBE9F8] text-[#251481]", // purple
    "bg-green-100 text-green-800",
    "bg-blue-100 text-blue-800",
    "bg-orange-100 text-orange-800",
    "bg-black/[0.08] text-text-secondary", // default gray
  ]
  // simple hash
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

export function CreateBatchPayoutSheet({
  isOpen,
  onOpenChange,
}: CreateBatchPayoutSheetProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "active",
  )
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCustomers, setSelectedCustomers] = useState<Set<string>>(
    new Set(),
  )

  const categories = useMemo(() => {
    return {
      active: mockCustomers.filter((c) => c.status === "active").length,
      pending: mockCustomers.filter((c) => c.status === "pending").length,
      inactive: mockCustomers.filter((c) => c.status === "inactive").length,
    }
  }, [])

  const categoryLabels: Record<string, string> = {
    active: "Marketing Team",
    pending: "Vendors",
    inactive: "Contractors",
  }

  const filteredCustomers = useMemo(() => {
    let filtered = mockCustomers

    if (selectedCategory) {
      filtered = filtered.filter((c) => c.status === selectedCategory)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.email.toLowerCase().includes(query),
      )
    }

    return filtered
  }, [selectedCategory, searchQuery])

  const areAllSelected =
    filteredCustomers.length > 0 &&
    filteredCustomers.every((c) => selectedCustomers.has(c.id))

  const handleSelectAll = (checked: boolean) => {
    const newSelected = new Set(selectedCustomers)
    if (checked) {
      filteredCustomers.forEach((c) => newSelected.add(c.id))
    } else {
      filteredCustomers.forEach((c) => newSelected.delete(c.id))
    }
    setSelectedCustomers(newSelected)
  }

  const handleCustomerToggle = (customerId: string, checked: boolean) => {
    const newSelected = new Set(selectedCustomers)
    if (checked) {
      newSelected.add(customerId)
    } else {
      newSelected.delete(customerId)
    }
    setSelectedCustomers(newSelected)
  }

  const selectedCustomerObjects = mockCustomers.filter((c) =>
    selectedCustomers.has(c.id),
  )

  const handleRemoveSelected = (customerId: string) => {
    const newSelected = new Set(selectedCustomers)
    newSelected.delete(customerId)
    setSelectedCustomers(newSelected)
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col font-manrope bg-[#F9F9F9] p-0 data-[side=right]:sm:max-w-125">
        <SheetHeader className="px-8 pb-4 pt-10">
          <div className="space-y-2 pr-6">
            <h2 className="text-[32px] font-bold leading-tight tracking-tight text-text-primary">
              Bulk Payout
            </h2>
            <p className="text-[15px] font-medium text-text-secondary">
              Select categories or beneficiaries to send payments
            </p>
          </div>
        </SheetHeader>

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
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-13 rounded-lg border-0 bg-black/4 pl-10.5 text-[15px] font-medium placeholder:text-text-muted focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="space-y-4">
            <p className="text-[12px] font-bold tracking-[0.08em] text-text-muted">
              QUICK SELECT CATEGORIES
            </p>
            <div className="flex flex-wrap gap-3">
              {Object.entries(categories).map(([key, count]) => {
                const isSelected = selectedCategory === key
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(isSelected ? null : key)}
                    className={cn(
                      "flex h-10.5 items-center gap-2 rounded-full px-5 text-[14px] transition-colors",
                      isSelected
                        ? "bg-[#251481] font-semibold text-white"
                        : "bg-black/4 font-medium text-text-secondary hover:bg-black/6",
                    )}
                  >
                    <span>
                      {categoryLabels[key] || "Management"} ({count})
                    </span>
                    {isSelected && (
                      <CheckCircle2
                        className="size-4"
                        fill="white"
                        color="#251481"
                        strokeWidth={1}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="space-y-4 pb-8">
            <div className="flex items-center justify-between pb-2">
              <p className="text-[12px] font-bold tracking-[0.08em] text-text-muted uppercase">
                ALL BENEFICIARIES
              </p>
              <button
                onClick={() => handleSelectAll(!areAllSelected)}
                className="text-[13px] font-bold text-[#251481] hover:underline"
              >
                {areAllSelected ? "Deselect All" : "Select All"}
              </button>
            </div>

            <div className="space-y-3">
              {filteredCustomers.length === 0 ? (
                <p className="py-8 text-center text-sm text-text-muted">
                  No beneficiaries found
                </p>
              ) : (
                filteredCustomers.map((customer) => (
                  <BeneficiaryRow
                    key={customer.id}
                    customer={customer}
                    isSelected={selectedCustomers.has(customer.id)}
                    onToggle={handleCustomerToggle}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        <SheetFooter className="mt-auto flex flex-col gap-5 border-t border-border bg-white px-6 py-6 shadow-[0_-4px_24px_rgba(0,0,0,0.02)]">
          {selectedCustomerObjects.length > 0 && (
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
                      onClick={() => handleRemoveSelected(customer.id)}
                      className="ml-0.5 text-text-muted transition-colors hover:text-text-primary"
                    >
                      <X className="size-3.5" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <p className="text-sm text-text-secondary">Summary</p>
            <p className="text-2xl font-bold tracking-tight text-text-primary">
              Total selected: {selectedCustomerObjects.length} recipient
              {selectedCustomerObjects.length !== 1 ? "s" : ""}
            </p>
          </div>

          <Button
            className="h-14 w-full rounded-sm bg-[#251481] text-lg font-medium text-white hover:bg-[#251481]/90 focus-visible:ring-[#251481] disabled:opacity-50"
            disabled={selectedCustomerObjects.length === 0}
          >
            Continue to Bulk Payout
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

interface BeneficiaryRowProps {
  customer: CustomerData
  isSelected: boolean
  onToggle: (id: string, checked: boolean) => void
}

function BeneficiaryRow({
  customer,
  isSelected,
  onToggle,
}: BeneficiaryRowProps) {
  const isInactive = customer.status === "inactive"

  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-xl px-5 py-4 transition-colors",
        isSelected
          ? "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
          : "bg-transparent",
        isInactive && "opacity-60",
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
            onToggle(customer.id, checked as boolean)
          }
          className="size-6 rounded-[6px] bg-transparent border-black/30 shadow-none data-[state=checked]:border-brand-primary data-[state=checked]:bg-brand-primary *:text-white!"
        />
      </div>
    </div>
  )
}
