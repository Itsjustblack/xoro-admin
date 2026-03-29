import ApiClient from "@/lib/api-client"
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
  const res = await ApiClient.get<BulkPayoutsResponse>("/bulk-payouts", {
    params: { merchant_id, page, page_size, mode },
  })
  return res.data
}

export async function getBulkPayoutByReference(reference: string) {
  const res = await ApiClient.get<IBulkTransactionData>(
    `/bulk-payouts/${reference}`,
  )
  return res.data
}

export async function getPayoutCategories(merchant_id: string) {
  const res = await ApiClient.get<Category[]>("/payout-category", {
    params: { merchant_id },
  })
  return res.data
}

export async function getPayoutCategoryById(
  category_id: number,
  merchant_id: string,
) {
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
