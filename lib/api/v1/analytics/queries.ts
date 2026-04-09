import ApiClient, { SubscriptionsApiClient } from "@/lib/api-client"
import {
  mockDashboardAnalytics,
  mockPayoutsAnalytics,
  mockRevenueAnalytics,
  mockSubscriptionAnalytics,
  mockWallets,
} from "@/lib/mock-data"
import { isMockDataMode } from "@/lib/mock-mode"
import {
  Currency,
  ICustomerAnalytics,
  IDashboardAnalytics,
  IPatternsAnalytics,
  IPayoutsAnalytics,
  IRevenueAnalytics,
  ITransactionAnalytics,
  ISubscriptionAnalytics,
  IWalletAnalytics,
  Interval,
  Mode,
  Period,
} from "@/lib/types"

export async function getDashboardAnalytics(
  merchantId: string,
  mode: Mode,
  period?: Period,
) {
  if (isMockDataMode()) {
    return { ...mockDashboardAnalytics, mode, period: period ?? "month" }
  }

  const res = await ApiClient.get<IDashboardAnalytics>("/analytics/dashboard", {
    params: { merchant_id: merchantId, mode, period },
  })
  return res.data
}

export async function getRevenueAnalytics(
  merchantId: string,
  mode: Mode,
  startDate?: string,
  endDate?: string,
  currency?: string,
  interval?: Interval,
) {
  if (isMockDataMode()) {
    return {
      ...mockRevenueAnalytics,
      mode,
      start_date: startDate ?? mockRevenueAnalytics.start_date,
      end_date: endDate ?? mockRevenueAnalytics.end_date,
      currency: currency ?? mockRevenueAnalytics.currency,
    }
  }

  const res = await ApiClient.get<IRevenueAnalytics>("/analytics/revenue", {
    params: {
      merchant_id: merchantId,
      mode,
      start_date: startDate,
      end_date: endDate,
      currency,
      interval,
    },
  })
  return res.data
}

export async function getTransactionAnalytics(
  merchantId: string,
  mode: Mode,
  startDate?: string,
  endDate?: string,
  currency?: string,
  interval?: Interval,
) {
  if (isMockDataMode()) {
    return {
      mode,
      start_date: startDate ?? "2026-03-01",
      end_date: endDate ?? "2026-04-08",
      currency: currency ?? "NGN",
      transaction_breakdown: mockDashboardAnalytics.transaction_breakdown,
      channel_breakdown: [
        {
          channel: "card",
          total_revenue: 2850000,
          transaction_count: 720,
          success_rate: 96,
        },
        {
          channel: "transfer",
          total_revenue: 1975000,
          transaction_count: 564,
          success_rate: 91,
        },
      ],
      time_series: mockRevenueAnalytics.time_series,
      average_processing_time: 42,
    }
  }

  const res = await ApiClient.get<ITransactionAnalytics>(
    "/analytics/transactions",
    {
      params: {
        merchant_id: merchantId,
        mode,
        start_date: startDate,
        end_date: endDate,
        currency,
        interval,
      },
    },
  )
  return res.data
}

export async function getWalletAnalytics(merchantId: string, mode: Mode) {
  if (isMockDataMode()) {
    return {
      mode,
      wallets: mockWallets.map((wallet) => ({
        wallet_id: wallet.id,
        currency: wallet.currency,
        current_balance: wallet.balance,
        total_credits: wallet.balance * 1.4,
        total_debits: wallet.balance * 0.4,
        credit_count: 84,
        debit_count: 21,
        total_charges_earned: wallet.balance * 0.015,
        net_flow: wallet.balance,
      })),
      total_balance: mockWallets.reduce((sum, wallet) => sum + wallet.balance, 0),
      total_credits: 3400000,
      total_debits: 910000,
      total_charges_earned: 51200,
      currency_count: mockWallets.length,
    }
  }

  const res = await ApiClient.get<IWalletAnalytics>("/analytics/wallet", {
    params: { merchant_id: merchantId, mode },
  })
  return res.data
}

export async function getCustomerAnalytics(
  merchantId: string,
  mode: Mode,
  startDate?: string,
  endDate?: string,
  limit?: number,
) {
  if (isMockDataMode()) {
    return {
      mode,
      start_date: startDate ?? "2026-03-01",
      end_date: endDate ?? "2026-04-08",
      total_customers: 314,
      active_customers: 248,
      new_customers: 36,
      top_customers: [
        {
          customer_email: "amina@example.com",
          total_spent: 840000,
          transaction_count: 12,
          last_transaction_date: "2026-04-02",
        },
      ],
      repeat_customer_rate: 42,
    }
  }

  const res = await ApiClient.get<ICustomerAnalytics>("/analytics/customers", {
    params: {
      merchant_id: merchantId,
      mode,
      start_date: startDate,
      end_date: endDate,
      limit,
    },
  })
  return res.data
}

export async function getPayoutsAnalytics(
  merchantId: string,
  mode: Mode,
  startDate?: string,
  endDate?: string,
  currency?: string,
  interval?: Interval,
) {
  if (isMockDataMode()) {
    return {
      ...mockPayoutsAnalytics,
      mode,
      start_date: startDate ?? mockPayoutsAnalytics.start_date,
      end_date: endDate ?? mockPayoutsAnalytics.end_date,
      currency: currency ?? mockPayoutsAnalytics.currency,
    }
  }

  const res = await ApiClient.get<IPayoutsAnalytics>("/analytics/payouts", {
    params: {
      merchant_id: merchantId,
      mode,
      start_date: startDate,
      end_date: endDate,
      currency,
      interval,
    },
  })
  return res.data
}

export async function getPatternsAnalytics(
  merchantId: string,
  mode: Mode,
  startDate?: string,
  endDate?: string,
) {
  if (isMockDataMode()) {
    return {
      mode,
      start_date: startDate ?? "2026-03-01",
      end_date: endDate ?? "2026-04-08",
      hourly_distribution: [
        { hour: 9, transaction_count: 84, total_revenue: 315000 },
        { hour: 13, transaction_count: 120, total_revenue: 512000 },
      ],
      day_of_week_distribution: [
        { day: "Mon", transaction_count: 280, total_revenue: 980000 },
        { day: "Fri", transaction_count: 340, total_revenue: 1220000 },
      ],
      peak_hour: 13,
      peak_day: "Fri",
      average_daily_transactions: 184,
    }
  }

  const res = await ApiClient.get<IPatternsAnalytics>("/analytics/patterns", {
    params: {
      merchant_id: merchantId,
      mode,
      start_date: startDate,
      end_date: endDate,
    },
  })
  return res.data
}

export async function getComparisonAnalytics(
  merchantId: string,
  mode: Mode,
  currentPeriod: Period,
  compareWith: string,
  currency?: Currency,
) {
  if (isMockDataMode()) {
    return { ...mockDashboardAnalytics, mode, period: currentPeriod }
  }

  const res = await ApiClient.get<IDashboardAnalytics>("/analytics/comparison", {
    params: {
      merchant_id: merchantId,
      mode,
      current_period: currentPeriod,
      compare_with: compareWith,
      currency,
    },
  })
  return res.data
}

export async function getSubscriptionAnalytics() {
  if (isMockDataMode()) {
    return mockSubscriptionAnalytics
  }

  const res = await SubscriptionsApiClient.get<ISubscriptionAnalytics>(
    "/analytics/subscriptions",
  )
  return res.data
}
