import { SubscriptionsApiClient } from "@/lib/api-client"
import type { PaymentLinkDetails, PortalPaymentLinkDetails } from "@/lib/types"

export async function getPaymentLinkByReference(reference: string) {
  const res = await SubscriptionsApiClient.get<PaymentLinkDetails>(
    `/payment-links/${reference}`,
  )

  return res.data
}

export async function getPortalPaymentLinkByReference(reference: string) {
  const res = await SubscriptionsApiClient.get<PortalPaymentLinkDetails>(
    `/payment-links/portal/${reference}`,
  )

  return res.data
}
