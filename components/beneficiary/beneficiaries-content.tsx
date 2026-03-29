"use client"

import { Button } from "@/components/ui/button"
import { getPayoutBeneficiaries } from "@/lib/api/v1/payout/queries"
import { payoutQueryKeys } from "@/lib/api/v1/query-key-factory"
import { PAGE_SIZE } from "@/lib/constants"
import { useCurrentMerchant } from "@/store/merchant"
import { useQuery } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { useMemo, useState } from "react"
import { CategoriesSheet } from "../category/categories-sheet"
import MetricCard from "../dashboard/metric-card"
import { GroupIcon, PaymentIcon } from "../icons"
import { AddBeneficiarySheet } from "./add-beneficiary-sheet"
import { BeneficiariesTable } from "./beneficiaries-table"

import { ProInsights } from "../shared/pro-insights"
import { SiteFooter } from "../shared/site-footer"

export function BeneficiariesContent() {
  const merchant = useCurrentMerchant()
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  })

  const { data: beneficiaryResponse, isPending } = useQuery({
    queryKey: payoutQueryKeys.beneficiaries(
      merchant?.id ?? "",
      pagination.pageIndex + 1,
      pagination.pageSize,
      null,
    ),
    queryFn: () =>
      getPayoutBeneficiaries({
        merchant_id: merchant!.id,
        page: pagination.pageIndex + 1,
        size: pagination.pageSize,
    }),
    enabled: !!merchant?.id,
  })

  const beneficiaries = useMemo(
    () => beneficiaryResponse?.beneficiaries ?? [],
    [beneficiaryResponse?.beneficiaries],
  )
  const totalBeneficiaries = beneficiaryResponse?.total_items ?? beneficiaries.length
  const totalAmount = useMemo(
    () =>
      beneficiaries.reduce(
        (sum, beneficiary) => sum + (beneficiary.default_amount ?? 0),
        0,
      ),
    [beneficiaries],
  )
  const pageCount =
    beneficiaryResponse?.total_pages ??
    Math.max(Math.ceil(totalBeneficiaries / pagination.pageSize), 1)

  return (
    <div className="flex min-h-full w-full flex-col">
      <div className="flex flex-1 p-4 sm:p-6 lg:p-8 flex-col gap-6 md:gap-8">
        <section className="flex flex-col gap-6 md:justify-between">
          <div>
            <h1 className="text-2xl font-black text-text-primary md:text-3xl">
              Beneficiaries Management
            </h1>
            <p className="mt-1 text-sm text-text-secondary md:text-base">
              Manage and organize your payout recipients in one place.
            </p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <CategoriesSheet />
            <AddBeneficiarySheet>
              <Button className="flex items-center rounded-xl gap-2 px-4 py-2 h-auto bg-brand-primary text-white hover:bg-brand-primary/90">
                <Plus className="size-4" />
                <span>Add Beneficiary</span>
              </Button>
            </AddBeneficiarySheet>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <MetricCard
            title="TOTAL AMOUNT (ACROSS ALL ACCOUNTS)"
            value={`NGN ${totalAmount.toLocaleString("en-NG", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
            changeLabel=""
            icon={<PaymentIcon className="size-5" />}
            borderClassName="border-transparent"
            iconClassName="p-2 rounded-lg bg-brand-primary-dark/10 text-brand-primary"
          />
          <MetricCard
            title="TOTAL BENEFICIARIES"
            value={String(totalBeneficiaries)}
            changeLabel=""
            icon={<GroupIcon className="size-5" />}
            iconClassName="p-2 rounded-lg bg-brand-primary-dark/10 text-brand-primary"
            borderClassName="border-transparent"
          />
        </section>

        <section className="flex flex-col gap-4 w-full">
          <BeneficiariesTable
            data={beneficiaries}
            isPending={isPending}
            pagination={pagination}
            setPagination={setPagination}
            pageCount={pageCount}
          />
        </section>

        <ProInsights 
          content="Pro Tip: You can organize your beneficiaries into categories to streamline your bulk payout process and filter them more effectively."
          className="mt-4"
        />
      </div>
      <SiteFooter />
    </div>
  )
}
