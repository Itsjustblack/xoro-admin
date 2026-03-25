import ApiClient, { handleApiError } from "@/lib/api-client";
import {
  Currency,
  ICustomerAnalytics,
  IDashboardAnalytics,
  IPatternsAnalytics,
  IPayoutsAnalytics,
  IRevenueAnalytics,
  ITransactionAnalytics,
  IWalletAnalytics,
  Interval,
  Mode,
  Period,
} from "@/lib/types";

export async function getDashboardAnalytics(
  merchantId: string,
  mode: Mode,
  period?: Period,
) {
  try {
    const res = await ApiClient.get<IDashboardAnalytics>(
      "/analytics/dashboard",
      {
        params: { merchant_id: merchantId, mode, period },
      },
    );
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function getRevenueAnalytics(
  merchantId: string,
  mode: Mode,
  startDate?: string,
  endDate?: string,
  currency?: string,
  interval?: Interval,
) {
  try {
    const res = await ApiClient.get<IRevenueAnalytics>("/analytics/revenue", {
      params: {
        merchant_id: merchantId,
        mode,
        start_date: startDate,
        end_date: endDate,
        currency,
        interval,
      },
    });
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function getTransactionAnalytics(
  merchantId: string,
  mode: Mode,
  startDate?: string,
  endDate?: string,
  currency?: string,
  interval?: Interval,
) {
  try {
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
    );
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function getWalletAnalytics(merchantId: string, mode: Mode) {
  try {
    const res = await ApiClient.get<IWalletAnalytics>("/analytics/wallet", {
      params: { merchant_id: merchantId, mode },
    });
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function getCustomerAnalytics(
  merchantId: string,
  mode: Mode,
  startDate?: string,
  endDate?: string,
  limit?: number,
) {
  try {
    const res = await ApiClient.get<ICustomerAnalytics>(
      "/analytics/customers",
      {
        params: {
          merchant_id: merchantId,
          mode,
          start_date: startDate,
          end_date: endDate,
          limit,
        },
      },
    );
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function getPayoutsAnalytics(
  merchantId: string,
  mode: Mode,
  startDate?: string,
  endDate?: string,
  currency?: string,
  interval?: Interval,
) {
  try {
    const res = await ApiClient.get<IPayoutsAnalytics>("/analytics/payouts", {
      params: {
        merchant_id: merchantId,
        mode,
        start_date: startDate,
        end_date: endDate,
        currency,
        interval,
      },
    });
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function getPatternsAnalytics(
  merchantId: string,
  mode: Mode,
  startDate?: string,
  endDate?: string,
) {
  try {
    const res = await ApiClient.get<IPatternsAnalytics>("/analytics/patterns", {
      params: {
        merchant_id: merchantId,
        mode,
        start_date: startDate,
        end_date: endDate,
      },
    });
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function getComparisonAnalytics(
  merchantId: string,
  mode: Mode,
  currentPeriod: Period,
  compareWith: string,
  currency?: Currency,
) {
  try {
    const res = await ApiClient.get<IDashboardAnalytics>(
      "/analytics/comparison",
      {
        params: {
          merchant_id: merchantId,
          mode,
          current_period: currentPeriod,
          compare_with: compareWith,
          currency,
        },
      },
    );
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
}
