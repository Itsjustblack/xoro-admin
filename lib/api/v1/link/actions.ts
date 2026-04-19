import ApiClient from "@/lib/api-client"
import type {
  CheckoutLink,
  CheckoutResponseBase,
  CheckoutResponses,
  PaymentLinkCreatePayload,
  PaymentLinkUpdatePayload,
  VerifyTransactionPayload,
  VerifyTransactionResponse,
} from "@/lib/types"

export async function createCheckoutLink(payload: PaymentLinkCreatePayload) {
  const res = await ApiClient.post<CheckoutLink>("/links/", payload)
  return res.data
}

export async function updateCheckoutLink(
  link_id: string,
  payload: PaymentLinkUpdatePayload,
) {
  const res = await ApiClient.put<CheckoutLink>(`/links/${link_id}`, payload)
  return res.data
}

export async function deactivateCheckoutLink(link_id: string) {
  const res = await ApiClient.delete<CheckoutLink>(`/links/${link_id}`)
  return res.data
}

export async function initializeCheckoutLink(
  reference: string,
  payload: {
    amount?: number | null
    customer_email?: string | null
    currency?: string | null
    narration?: string | null
    channel?: string | null
  },
) {
  const res = await ApiClient.post<CheckoutResponses | CheckoutResponseBase>(
    `/links/r/${reference}/checkout`,
    payload,
  )
  return res.data
}

export async function verifyCheckoutLinkTransaction(
  payload: VerifyTransactionPayload,
) {
  const res = await ApiClient.post<VerifyTransactionResponse>(
    "/links/verify-transaction",
    payload,
  )
  return res.data
}
