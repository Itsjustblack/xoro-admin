import { SubscriptionsApiClient } from "@/lib/api-client"
import type { PaymentLinkCreateRequest, PaymentLinkDetails } from "@/lib/types"

export async function createPaymentLink(
  payload: PaymentLinkCreateRequest,
  idempotencyKey?: string,
) {
  const res = await SubscriptionsApiClient.post<PaymentLinkDetails>(
    "/payment-links",
    payload,
    {
      headers: {
        ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
      },
    },
  )

  return res.data
}
