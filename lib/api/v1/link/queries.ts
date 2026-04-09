import ApiClient from "@/lib/api-client"
import {
  mockCheckoutLinkDetails,
  mockCheckoutLinks,
} from "@/lib/mock-data"
import { isMockDataMode } from "@/lib/mock-mode"
import { CheckoutLink, CheckoutLinkDetails } from "@/lib/types"

export async function getAllCheckoutLinks(merchant_id: string) {
  if (isMockDataMode()) {
    return mockCheckoutLinks.map((link) => ({ ...link, merchant_id }))
  }

  const res = await ApiClient.get<CheckoutLink[]>(
    `/links/merchant/${merchant_id}`,
  )
  return res.data
}

export async function getCheckoutLinkById(link_id: string) {
  if (isMockDataMode()) {
    return (
      mockCheckoutLinkDetails.find((link) => link.id === link_id) ??
      mockCheckoutLinkDetails[0]
    )
  }

  const res = await ApiClient.get<CheckoutLinkDetails>(`/links/${link_id}`)
  return res.data
}

export async function getCheckoutLinkByReference(reference: string) {
  if (isMockDataMode()) {
    return (
      mockCheckoutLinks.find((link) => link.reference === reference) ??
      mockCheckoutLinks[0]
    )
  }

  const res = await ApiClient.get<CheckoutLink>(
    `/links/r/${reference}`,
  )
  return res.data
}
