import { CRYPTO_CURRENCIES } from "./constants"

export type Mode = "test" | "live"
export type Status = "success" | "abandoned" | "pending" | "failed"
export type Period =
  | "today"
  | "week"
  | "month"
  | "year"
  | "quarter"
  | "all_time"
export type Interval = "day" | "week" | "month"
export type Currency = "USD" | "NGN" | (typeof CRYPTO_CURRENCIES)[number]

export interface IRevenueMetrics {
  total_revenue: number
  total_transactions: number
  total_charges: number
  net_revenue: number
  average_transaction_value: number
  success_rate: number
}

export interface ITransactionBreakdown {
  successful: number
  pending: number
  failed: number
  total: number
}

export interface ITopCurrencyAnalytics {
  currency: string
  total_revenue: number
  transaction_count: number
  total_charges: number
  net_revenue: number
  average_transaction_value: number
}

export interface IRevenueTimeSeriesPoint {
  date: string
  value: number
  count: number
}

export interface IChannelBreakdown {
  channel: string
  total_revenue: number
  transaction_count: number
  success_rate: number
}

export interface IDashboardAnalytics {
  mode: string
  period: string
  revenue_metrics: IRevenueMetrics
  transaction_breakdown: ITransactionBreakdown
  top_currency: ITopCurrencyAnalytics | null
  wallet_count: number
  total_balance: number
  pending_payouts: number
  pending_payout_amount: number
}

export interface IRevenueAnalytics {
  mode: string
  start_date: string
  end_date: string
  currency: string
  revenue_metrics: IRevenueMetrics
  time_series: IRevenueTimeSeriesPoint[]
  currency_breakdown: ITopCurrencyAnalytics[]
}

export interface ITransactionAnalytics {
  mode: string
  start_date: string
  end_date: string
  currency: string
  transaction_breakdown: ITransactionBreakdown
  channel_breakdown: IChannelBreakdown[]
  time_series: IRevenueTimeSeriesPoint[]
  average_processing_time: number
}

export interface IWalletAnalyticsItem {
  wallet_id: number
  currency: string
  current_balance: number
  total_credits: number
  total_debits: number
  credit_count: number
  debit_count: number
  total_charges_earned: number
  net_flow: number
}

export interface IWalletAnalytics {
  mode: string
  wallets: IWalletAnalyticsItem[]
  total_balance: number
  total_credits: number
  total_debits: number
  total_charges_earned: number
  currency_count: number
}

export interface ITopCustomerAnalytics {
  customer_email: string
  total_spent: number
  transaction_count: number
  last_transaction_date: string
}

export interface ICustomerAnalytics {
  mode: string
  start_date: string
  end_date: string
  total_customers: number
  active_customers: number
  new_customers: number
  top_customers: ITopCustomerAnalytics[]
  repeat_customer_rate: number
}

export interface IPayoutsAnalytics {
  mode: string
  start_date: string
  end_date: string
  currency: string
  total_payouts: number
  payout_count: number
  successful_payouts: number
  failed_payouts: number
  pending_payouts: number
  total_payout_charges: number
  average_payout_amount: number
  time_series: IRevenueTimeSeriesPoint[]
}

export interface IHourlyDistribution {
  hour: number
  transaction_count: number
  total_revenue: number
}

export interface IDayOfWeekDistribution {
  day: string
  transaction_count: number
  total_revenue: number
}

export interface IPatternsAnalytics {
  mode: string
  start_date: string
  end_date: string
  hourly_distribution: IHourlyDistribution[]
  day_of_week_distribution: IDayOfWeekDistribution[]
  peak_hour: number
  peak_day: string
  average_daily_transactions: number
}

export interface IUser {
  id: string
  name: string
  email: string
  created_at: string
  updated_at: string
  is_verified: boolean
  merchants: IMerchant[]
}

export interface IMerchant {
  id: string
  name: string
  email: string
  is_verified: boolean
  is_active: boolean
  joined_at: string
  test_balance: number
  live_balance: number
  percentage_charge: number
  flat_charge: number
  role: string | null
}

// REMOVE LATER, NOT NEEDED
export interface ChatItem {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timeAway: string
  unread: number
}

export interface Message {
  id: string
  content: string
  timestamp: string
  isAgent: boolean
}

export interface CustomerData {
  id: string
  name: string
  avatar: string
  email: string
  phone: string
  joinDate: string
  totalOrders: number
  totalSpent: string
  lastPurchase: string
  status: "active" | "inactive" | "pending"
}

export interface Product {
  id: string
  name: string
  image?: string
  price: string
  stock: number
  category: string
  description: string
  sku: string
}

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: string
}

export interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  items: OrderItem[]
  totalAmount: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "paid" | "unpaid" | "refunded"
  orderDate: string
  shippingAddress: string
}

export interface Notification {
  id: string
  title: string
  description: string
  timestamp: string
  read: boolean
  type: "info" | "warning" | "success" | "order"
}

export interface BalanceTransaction {
  id: string
  type: "Payout" | "Sales Income" | "Refund" | "Top-up"
  reference: string
  amount: string
  status: "Completed" | "Pending" | "Failed"
  date: string
}
