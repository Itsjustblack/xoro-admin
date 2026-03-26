"use server"

import ApiClient, { handleApiError } from "@/lib/api-client"
import { IMerchant } from "@/lib/types"

export async function getMerchantData(merchantId: string) {
  try {
    const res = await ApiClient.get<IMerchant>("/get-merchant", {
      params: { merchant_id: merchantId },
    })
    return res.data
  } catch (error) {
    throw handleApiError(error)
  }
}
