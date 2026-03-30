import ApiClient from "@/lib/api-client"
import {
  Beneficiary,
  BeneficiaryPayload,
  Category,
  CreateBulkPayoutPayload,
  PayoutPayload,
} from "@/lib/types"

export async function createBeneficiary(payload: BeneficiaryPayload) {
  const res = await ApiClient.post<Beneficiary>("/payout-beneficiary", payload)
  return res.data
}

export async function updateBeneficiary(payload: BeneficiaryPayload) {
  const res = await ApiClient.put<Beneficiary>("/payout-beneficiary", payload)
  return res.data
}

export async function deleteBeneficiary(
  beneficiary_id: number,
  merchant_id: string,
) {
  const res = await ApiClient.delete(`/payout-beneficiary/${beneficiary_id}`, {
    params: { merchant_id },
  })
  return res.data
}

export async function createPayoutCategory(
  merchant_id: string,
  name: string,
  description?: string,
) {
  const res = await ApiClient.post<Category>("/payout-category", {
    merchant_id,
    name,
    description,
  })

  return res.data
}

export async function updatePayoutCategory(
  category_id: number,
  merchant_id: string,
  name: string,
  description?: string,
) {
  const res = await ApiClient.put<Category>(`/payout-category/${category_id}`, {
    merchant_id,
    name,
    description,
  })

  return res.data
}

export async function deletePayoutCategory(
  category_id: number,
  merchant_id: string,
) {
  const res = await ApiClient.delete<Category>(
    `/payout-category/${category_id}`,
    {
      params: { merchant_id },
    },
  )
  return res.data
}

export async function createBulkPayout(payload: CreateBulkPayoutPayload) {
  const res = await ApiClient.post("/bulk-payout", payload)

  return res.data
}

export async function merchantPayout(payload: PayoutPayload) {
  const res = await ApiClient.post("/payout", payload)
  return res.data
}
