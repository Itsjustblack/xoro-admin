import { SubscriptionsApiClient } from "@/lib/api-client"
import type {
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
