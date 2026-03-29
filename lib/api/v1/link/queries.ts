import ApiClient from "@/lib/api-client"
import { CheckoutLink, CheckoutLinkDetails } from "@/lib/types"

export async function getAllCheckoutLinks(merchant_id: string) {
  const res = await ApiClient.get<CheckoutLink[]>(
    `/links/merchant/${merchant_id}`,
  )
  return res.data
}

export async function getCheckoutLinkById(link_id: string) {
  const res = await ApiClient.get<CheckoutLinkDetails>(`/links/${link_id}`)
  return res.data
}

export async function getCheckoutLinkByReference(reference: string) {
  const res = await ApiClient.get<CheckoutLink>(
    `/links/r/${reference}`,
  )
  return res.data
}
