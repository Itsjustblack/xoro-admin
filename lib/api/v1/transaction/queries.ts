import ApiClient from "@/lib/api-client"
import {
  MerchantTransactionType,
  Mode,
  TransactionsResponse,
} from "@/lib/types"

type GetMerchantTransactionsParams = {
  merchant_id: string
  mode: Mode
  page?: number
  page_size?: number
  wallet_id?: string | number
  currency?: string
  transaction_type?: MerchantTransactionType
}

export async function getMerchantTransactions({
  merchant_id,
  mode,
  page = 1,
  page_size = 10,
  wallet_id,
  currency,
  transaction_type,
}: GetMerchantTransactionsParams) {
  const res = await ApiClient.get<TransactionsResponse>(
    "/merchant-transactions",
    {
      params: {
        merchant_id,
        page,
        page_size,
        mode,
        ...(wallet_id ? { wallet_id } : {}),
        ...(currency ? { currency } : {}),
        ...(transaction_type ? { transaction_type } : {}),
      },
    },
  )
  return res.data
}

export async function getWalletTransactions(
  wallet_id: string,
  page: number,
  page_size: number,
  transaction_type?: MerchantTransactionType,
) {
  const res = await ApiClient.get("/wallet-transactions", {
    params: {
      wallet_id,
      page,
      page_size,
      ...(transaction_type ? { transaction_type } : {}),
    },
  })
  return res.data
}
