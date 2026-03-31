import { SubscriptionsApiClient } from "@/lib/api-client"
import type {
  CreateSubscriptionPayload,
  SubscriptionItem,
  UpdateSubscriptionPayload,
} from "@/lib/types"

export async function createSubscription(payload: CreateSubscriptionPayload) {
  const res = await SubscriptionsApiClient.post<SubscriptionItem>(
    "/subscriptions",
    payload,
  )

  return res.data
}

export async function updateSubscription(
  subscriptionId: string,
  payload: UpdateSubscriptionPayload,
) {
  const res = await SubscriptionsApiClient.patch<SubscriptionItem>(
    `/subscriptions/${subscriptionId}`,
    payload,
  )

  return res.data
}

export async function pauseSubscription(subscriptionId: string) {
  const res = await SubscriptionsApiClient.post(
    `/subscriptions/${subscriptionId}/pause`,
  )

  return res.data
}

export async function resumeSubscription(subscriptionId: string) {
  const res = await SubscriptionsApiClient.post(
    `/subscriptions/${subscriptionId}/resume`,
  )

  return res.data
}

export async function cancelSubscription(subscriptionId: string) {
  const res = await SubscriptionsApiClient.post(
    `/subscriptions/${subscriptionId}/cancel`,
  )

  return res.data
}
