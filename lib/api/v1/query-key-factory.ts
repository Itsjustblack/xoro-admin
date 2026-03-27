const MERCHANT_KEY = "merchant" as const
const USER_KEY = "users" as const
const ANALYTICS_KEY = "analytics" as const
const WALLET_KEY = "wallets" as const
const TRANSACTION_KEY = "transactions" as const

export const merchantQueryKeys = {
  all: [MERCHANT_KEY] as const,
  list: () => [...merchantQueryKeys.all, "list"] as const,
  detail: (id: string) => [...merchantQueryKeys.all, "detail", id] as const,
}

export const userQueryKeys = {
  all: [USER_KEY] as const,

  current: [USER_KEY, "current"] as const,
}

export const analyticsQueryKeys = {
  all: [ANALYTICS_KEY] as const,
  dashboard: (merchantId: string, mode: string, period?: string | null) =>
    [
      ...analyticsQueryKeys.all,
      "dashboard",
      merchantId,
      mode,
      period ?? null,
    ] as const,
  revenue: (
    merchantId: string,
    mode: string,
    startDate?: string,
    endDate?: string,
    currency?: string,
    interval?: string,
  ) =>
    [
      ...analyticsQueryKeys.all,
      "revenue",
      merchantId,
      mode,
      startDate ?? null,
      endDate ?? null,
      currency ?? null,
      interval ?? null,
    ] as const,
}

export const walletQueryKeys = {
  all: [WALLET_KEY] as const,
  list: (merchantId: string, mode: string) =>
    [...walletQueryKeys.all, "list", merchantId, mode] as const,
  summary: (merchantId: string, mode: string) =>
    [...walletQueryKeys.all, "summary", merchantId, mode] as const,
}

export const transactionQueryKeys = {
  all: [TRANSACTION_KEY] as const,
  merchantTransactions: (
    merchantId: string,
    mode: string,
    page: number,
    pageSize: number,
    walletId?: string | number | null,
    currency?: string | null,
    transactionType?: string | null,
  ) =>
    [
      ...transactionQueryKeys.all,
      "merchant-transactions",
      merchantId,
      mode,
      page,
      pageSize,
      walletId ?? null,
      currency ?? null,
      transactionType ?? null,
    ] as const,
}
