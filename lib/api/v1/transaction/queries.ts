import ApiClient from "@/lib/api-client"
import { mockMerchantTransactions } from "@/lib/mock-data"
import { isMockDataMode } from "@/lib/mock-mode"
import {
  MerchantTransactionsResponse,
  MerchantTransactionType,
  Mode,
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
  if (isMockDataMode()) {
    const filteredTransactions = mockMerchantTransactions.transactions.filter(
      (transaction) =>
        (!currency || transaction.currency === currency) &&
        (!transaction_type || transaction.type === transaction_type),
    )

    return {
      ...mockMerchantTransactions,
      transactions: filteredTransactions,
      total_items: filteredTransactions.length,
    }
  }

  const res = await ApiClient.get<MerchantTransactionsResponse>(
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
  if (isMockDataMode()) {
    return mockMerchantTransactions
  }

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
