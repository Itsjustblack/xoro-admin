import { SubscriptionsApiClient } from "@/lib/api-client"
import {
  mockSubscriptionItems,
  mockSubscriptionListResponse,
} from "@/lib/mock-data"
import { isMockDataMode } from "@/lib/mock-mode"
import type {
  SubscriptionItem,
  SubscriptionListParams,
  SubscriptionListResponse,
} from "@/lib/types"

export async function getSubscriptions(params: SubscriptionListParams = {}) {
  if (isMockDataMode()) {
    const filteredItems = mockSubscriptionItems.filter((subscription) => {
      return (
        (!params.status || subscription.status === params.status) &&
        (!params.product_id || subscription.product_id === params.product_id) &&
        (!params.subscriber_id ||
          subscription.subscriber_id === params.subscriber_id) &&
        (!params.subscriber_email ||
          subscription.subscriber_email === params.subscriber_email) &&
        (!params.customer_id || subscription.customer_id === params.customer_id)
      )
    })

    return {
      ...mockSubscriptionListResponse,
      items: filteredItems,
      total: filteredItems.length,
      page: params.page ?? 1,
      page_size: params.page_size ?? mockSubscriptionListResponse.page_size,
      total_pages: Math.max(
        Math.ceil(
          filteredItems.length /
            (params.page_size ?? mockSubscriptionListResponse.page_size),
        ),
        1,
      ),
    }
  }

  const res = await SubscriptionsApiClient.get<SubscriptionListResponse>(
    "/subscriptions",
    {
      params,
    },
  )

  return res.data
}

export async function getSubscriptionById(subscriptionId: string) {
  if (isMockDataMode()) {
    return (
      mockSubscriptionItems.find(
        (subscription) => subscription.id === subscriptionId,
      ) ?? mockSubscriptionItems[0]
    )
  }

  const res = await SubscriptionsApiClient.get<SubscriptionItem>(
    `/subscriptions/${subscriptionId}`,
  )

  return res.data
}
