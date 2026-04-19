import { SubscriptionsApiClient } from "@/lib/api-client"
import type {
  CancelSubscriptionPayload,
  CreateSubscriptionPayload,
  PauseSubscriptionPayload,
  RetryPaymentResponse,
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

export async function pauseSubscription(
  subscriptionId: string,
  payload?: PauseSubscriptionPayload,
) {
  const res = await SubscriptionsApiClient.post<SubscriptionItem>(
    `/subscriptions/${subscriptionId}/pause`,
    payload ?? {},
  )

  return res.data
}

export async function resumeSubscription(subscriptionId: string) {
  const res = await SubscriptionsApiClient.post<SubscriptionItem>(
    `/subscriptions/${subscriptionId}/resume`,
    {},
  )

  return res.data
}

export async function cancelSubscription(
  subscriptionId: string,
  payload?: CancelSubscriptionPayload,
) {
  const res = await SubscriptionsApiClient.post<SubscriptionItem>(
    `/subscriptions/${subscriptionId}/cancel`,
    payload ?? {},
  )

  return res.data
}

export async function retrySubscriptionPayment(
  subscriptionId: string,
  discountCode?: string,
) {
  const res = await SubscriptionsApiClient.post<RetryPaymentResponse>(
    `/subscriptions/${subscriptionId}/retry-payment`,
    {},
    {
      params: {
        ...(discountCode ? { discount_code: discountCode } : {}),
      },
    },
  )

  return res.data
}
