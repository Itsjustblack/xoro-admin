import ApiClient from "@/lib/api-client"
import { IMerchant } from "@/lib/types"

export async function createNewMerchant(payload: {
  name: string
  email: string
}) {
  const res = await ApiClient.post<IMerchant>("/create-merchant", payload)
  return res.data
}
