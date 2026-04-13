import { SubscriptionsApiClient } from "@/lib/api-client"
import type {
  BillingPreviewResponse,
  SubscriptionItem,
  SubscriptionListParams,
  SubscriptionListResponse,
} from "@/lib/types"

export async function getSubscriptions(params: SubscriptionListParams = {}) {
  const res = await SubscriptionsApiClient.get<SubscriptionListResponse>(
    "/subscriptions",
    {
      params,
    },
  )

  return res.data
}

export async function getSubscriptionById(subscriptionId: string) {
  const res = await SubscriptionsApiClient.get<SubscriptionItem>(
    `/subscriptions/${subscriptionId}`,
  )

  return res.data
}

export async function getSubscriptionBillingPreview(
  subscriptionId: string,
  discountCode?: string,
) {
  const res = await SubscriptionsApiClient.get<BillingPreviewResponse>(
    `/subscriptions/${subscriptionId}/billing-preview`,
    {
      params: {
        ...(discountCode ? { discount_code: discountCode } : {}),
      },
    },
  )

  return res.data
}
