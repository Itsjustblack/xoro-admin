const MERCHANT_KEY = "merchant" as const
const USER_KEY = "users" as const
const ANALYTICS_KEY = "analytics" as const
const WALLET_KEY = "wallets" as const
const TRANSACTION_KEY = "transactions" as const
const BULK_PAYOUT_KEY = "bulk-payouts" as const
const PAYOUT_KEY = "payout" as const
const CHECKOUT_LINK_KEY = "checkout-links" as const
const PAYMENT_LINK_KEY = "payment-links" as const
const SUBSCRIPTION_KEY = "subscriptions" as const

export const merchantQueryKeys = {
  all: [MERCHANT_KEY] as const,
  list: () => [...merchantQueryKeys.all, "list"] as const,
  detail: (id: string) => [...merchantQueryKeys.all, "detail", id] as const,
  apiKeys: (id: string) => [...merchantQueryKeys.all, "api-keys", id] as const,
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
  payouts: (
    merchantId: string,
    mode: string,
    startDate?: string,
    endDate?: string,
    currency?: string,
    interval?: string,
  ) =>
    [
      ...analyticsQueryKeys.all,
      "payouts",
      merchantId,
      mode,
      startDate ?? null,
      endDate ?? null,
      currency ?? null,
      interval ?? null,
    ] as const,
  subscriptions: () => [...analyticsQueryKeys.all, "subscriptions"] as const,
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
  merchantPayIns: (
    merchantId: string,
    mode: string,
    page: number,
    pageSize: number,
    currency?: string | null,
  ) =>
    [
      ...transactionQueryKeys.all,
      "merchant-payins",
      merchantId,
      mode,
      page,
      pageSize,
      currency ?? null,
      "credit",
    ] as const,
  merchantPayOuts: (
    merchantId: string,
    mode: string,
    page: number,
    pageSize: number,
    currency?: string | null,
  ) =>
    [
      ...transactionQueryKeys.all,
      "merchant-payouts",
      merchantId,
      mode,
      page,
      pageSize,
      currency ?? null,
      "debit",
    ] as const,
}

export const bulkPayoutQueryKeys = {
  all: [BULK_PAYOUT_KEY] as const,
  list: (merchantId: string, mode: string, page: number, pageSize: number) =>
    [
      ...bulkPayoutQueryKeys.all,
      "list",
      merchantId,
      mode,
      page,
      pageSize,
    ] as const,
  detail: (reference: string) =>
    [...bulkPayoutQueryKeys.all, "detail", reference] as const,
}

export const payoutQueryKeys = {
  all: [PAYOUT_KEY] as const,
  banks: () => [...payoutQueryKeys.all, "banks"] as const,
  categories: (merchantId: string) =>
    [...payoutQueryKeys.all, "categories", merchantId] as const,
  category: (merchantId: string, categoryId: number) =>
    [...payoutQueryKeys.all, "category", merchantId, categoryId] as const,
  beneficiariesList: (merchantId: string) =>
    [...payoutQueryKeys.all, "beneficiaries", merchantId] as const,
  beneficiaries: (
    merchantId: string,
    page: number,
    size: number,
    categoryId?: number | null,
  ) =>
    [
      ...payoutQueryKeys.beneficiariesList(merchantId),
      page,
      size,
      categoryId ?? null,
    ] as const,
}

export const checkoutLinkQueryKeys = {
  all: [CHECKOUT_LINK_KEY] as const,
  list: (merchantId: string) =>
    [...checkoutLinkQueryKeys.all, "list", merchantId] as const,
  detail: (linkId: string) =>
    [...checkoutLinkQueryKeys.all, "detail", linkId] as const,
  reference: (reference: string) =>
    [...checkoutLinkQueryKeys.all, "reference", reference] as const,
}

export const paymentLinkQueryKeys = {
  all: [PAYMENT_LINK_KEY] as const,
  detail: (reference: string) =>
    [...paymentLinkQueryKeys.all, "detail", reference] as const,
  portalDetail: (reference: string) =>
    [...paymentLinkQueryKeys.all, "portal-detail", reference] as const,
}

export const subscriptionQueryKeys = {
  all: [SUBSCRIPTION_KEY] as const,
  list: (
    page = 1,
    pageSize = 20,
    status?: string | null,
    productId?: string | null,
    subscriberId?: string | null,
    subscriberEmail?: string | null,
    customerId?: string | null,
  ) =>
    [
      ...subscriptionQueryKeys.all,
      "list",
      page,
      pageSize,
      status ?? null,
      productId ?? null,
      subscriberId ?? null,
      subscriberEmail ?? null,
      customerId ?? null,
    ] as const,
  detail: (subscriptionId: string) =>
    [...subscriptionQueryKeys.all, "detail", subscriptionId] as const,
  billingPreview: (subscriptionId: string, discountCode?: string | null) =>
    [
      ...subscriptionQueryKeys.all,
      "billing-preview",
      subscriptionId,
      discountCode ?? null,
    ] as const,
}
