import ApiClient from "@/lib/api-client"
import { mockMerchant } from "@/lib/mock-data"
import { isMockDataMode } from "@/lib/mock-mode"
import { IMerchant } from "@/lib/types"

export async function getMerchantData(merchantId: string) {
  if (isMockDataMode()) {
    return { ...mockMerchant, id: merchantId || mockMerchant.id }
  }

  const res = await ApiClient.get<IMerchant>("/get-merchant", {
    params: { merchant_id: merchantId },
  })
  return res.data
}
