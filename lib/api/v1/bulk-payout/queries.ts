import ApiClient from "@/lib/api-client"
import { Mode } from "@/lib/types"

type GetBulkPayoutParams = {
  merchant_id: string
  mode: Mode
  page?: number
  page_size?: number
}

export async function getBulkPayout({
  merchant_id,
  mode,
  page = 1,
  page_size = 10,
}: GetBulkPayoutParams) {
  const res = await ApiClient.get("/bulk-payout", {
    params: { merchant_id, page, page_size, mode },
  })

  return res.data
}

export async function getBulkPayoutByReference(reference: string) {
  const res = await ApiClient.get("/bulk-payout-by-reference", {
    params: { reference },
  })
  return res.data
}
