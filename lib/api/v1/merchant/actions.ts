import ApiClient from "@/lib/api-client"
import { APIKeys, IMerchant } from "@/lib/types"

export async function createNewMerchant(payload: {
  name: string
  email: string
}) {
  const res = await ApiClient.post<IMerchant>("/create-merchant", payload)
  return res.data
}

export async function getMerchantAPIKeys(merchantId: string) {
  const res = await ApiClient.post<APIKeys>("/get-token", {
    id: merchantId,
  })

  return res.data
}
