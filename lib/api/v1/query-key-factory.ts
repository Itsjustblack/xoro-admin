const MERCHANT_KEY = "merchant" as const;
const USER_KEY = "users" as const;
const ANALYTICS_KEY = "analytics" as const;

export const merchantQueryKeys = {
  all: [MERCHANT_KEY] as const,
  list: () => [...merchantQueryKeys.all, "list"] as const,
  detail: (id: string) => [...merchantQueryKeys.all, "detail", id] as const,
};

export const userQueryKeys = {
  all: [USER_KEY] as const,

  current: [USER_KEY, "current"] as const,
};

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
};
