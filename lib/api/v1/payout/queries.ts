import ApiClient from "@/lib/api-client"
import {
  mockBeneficiariesResponse,
  mockBulkPayouts,
  mockBulkPayoutsResponse,
  mockCategories,
} from "@/lib/mock-data"
import { isMockDataMode } from "@/lib/mock-mode"
import type {
  BeneficiariesResponse,
  BulkPayoutsResponse,
  Category,
  GetPayoutBeneficiariesParams,
  IBulkTransactionData,
  Mode,
} from "@/lib/types"

type GetBulkPayoutParams = {
  merchant_id: string
  mode: Mode
  page?: number
  page_size?: number
}

export async function getBulkPayout({
  merchant_id,
  mode,
  page = 1,
  page_size = 10,
}: GetBulkPayoutParams) {
  if (isMockDataMode()) {
    return {
      ...mockBulkPayoutsResponse,
      current_page: page,
      page_size,
    }
  }

  const res = await ApiClient.get<BulkPayoutsResponse>("/bulk-payouts", {
    params: { merchant_id, page, page_size, mode },
  })
  return res.data
}

export async function getBulkPayoutByReference(reference: string) {
  if (isMockDataMode()) {
    const batch =
      mockBulkPayouts.find((payout) => payout.reference === reference) ??
      mockBulkPayouts[0]

    return {
      id: batch.id,
      name: batch.name,
      reference: batch.reference,
      status: batch.status,
      remarks: null,
      created_at: batch.created_at,
      transactions: [
        {
          id: 101,
          type: "debit",
          mode: "test",
          reference: `${batch.reference}-001`,
          status: "success",
          amount: 125000,
          charge: 1250,
          processor: "mock-bank",
          customer: { name: "Kemi Supplies Ltd", email: "accounts@kemi.example" },
          details: {
            account_number: "0123456789",
            bank: "Access Bank",
            customer_name: "Kemi Supplies Ltd",
          },
          created_at: batch.created_at,
        },
      ],
    }
  }

  const res = await ApiClient.get<IBulkTransactionData>(
    `/bulk-payouts/${reference}`,
  )
  return res.data
}

export async function getPayoutCategories(merchant_id: string) {
  if (isMockDataMode()) {
    return mockCategories.map((category) => ({ ...category, merchant_id }))
  }

  const res = await ApiClient.get<Category[]>("/payout-category", {
    params: { merchant_id },
  })
  return res.data
}

export async function getPayoutCategoryById(
  category_id: number,
  merchant_id: string,
) {
  if (isMockDataMode()) {
    return (
      mockCategories.find((category) => category.id === category_id) ??
      mockCategories[0]
    )
  }

  const res = await ApiClient.get<Category>(`/payout-category/${category_id}`, {
    params: { merchant_id },
  })
  return res.data
}

export async function getPayoutBeneficiaries({
  merchant_id,
  page = 1,
  size = 10,
  category_id,
}: GetPayoutBeneficiariesParams) {
  if (isMockDataMode()) {
    const beneficiaries = category_id
      ? mockBeneficiariesResponse.beneficiaries.filter(
          (beneficiary) => beneficiary.category_id === category_id,
        )
      : mockBeneficiariesResponse.beneficiaries

    return {
      ...mockBeneficiariesResponse,
      beneficiaries,
      current_page: page,
      page_size: size,
      total_items: beneficiaries.length,
      total_pages: Math.max(Math.ceil(beneficiaries.length / size), 1),
    }
  }

  const res = await ApiClient.get<BeneficiariesResponse>(
    "/payout-beneficiary",
    {
      params: {
        merchant_id,
        page,
        size,
        ...(category_id ? { category_id } : {}),
      },
    },
  )
  return res.data
}
