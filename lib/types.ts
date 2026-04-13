import { CRYPTO_CURRENCIES } from "@/lib/constants"

export type Mode = "test" | "live"
export type Status = "success" | "abandoned" | "pending" | "failed"
export type TransactionType = "credit" | "debit"
export type PaymentChannel = "card" | "transfer" | "crypto" | "bank"
export type CheckoutType = "static" | "dynamic"
export type ChargeType = "one_time" | "recurring"
export type Currency = "USD" | "NGN" | (typeof CRYPTO_CURRENCIES)[number]

export type Period =
  | "today"
  | "week"
  | "month"
  | "year"
  | "quarter"
  | "all_time"
export type Interval = "day" | "week" | "month"

export type QueryParams = {
  pageIndex: number
  pageSize: number
  mode?: Mode
}

export type BankAccount = {
  bank_code: string
  account_number: string
}

export type CountryPhoneCode = {
  name: string
  dial_code: string
  code: string
}

export type LoginCredentials = {
  email: string
  password: string
}

export type SignupCredentials = LoginCredentials & {
  name: string
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
  role?: string | null
}

export interface IUser {
  id?: string
  name: string
  email: string
  created_at: string
  updated_at: string
  is_verified: boolean
  merchants: IMerchant[]
}

export interface APIKeys {
  live: { secret: string | null; public: string | null }
  test: { secret: string | null; public: string | null }
  merchant_id: string
}

export interface Wallet {
  id: number
  merchant_id: string
  currency: string
  balance: number
  mode: string
  percentage_charge: number
  flat_charge: number
  payout_percentage_charge: number
  payout_flat_charge: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface WalletBalanceSummary {
  total_balance: number
}

export interface ITransaction {
  id: number
  type: TransactionType
  status: Status
  mode: Mode
  amount: number
  charge: number
  processor_reference: string
  reference: string
  customer: { name: string; email: string }
  created_at: string
}

export interface TransactionsResponse {
  transactions: ITransaction[]
  total_items: number
  total_pages: number
  current_page: number
  page_size: number
}

export type MerchantTransactionType =
  | "Payout"
  | "Refund"
  | "Sales Income"
  | "Top-up"

export interface MerchantTransactionsResponse {
  transactions: BalanceTransaction[]
  total_items: number
  total_pages: number
  current_page: number
  page_size: number
  data?: BalanceTransaction[]
  items?: BalanceTransaction[]
  results?: BalanceTransaction[]
}

export interface BalanceTransaction {
  id: string
  type: string
  reference: string
  amount: string
  currency?: string
  paymentMethod?: string
  status: string
  date: string
}

export interface Beneficiary extends BankAccount {
  id: number
  name: string
  email: string
  merchant_id: string
  phone_number?: string
  whatsapp_number?: string
  default_amount: number
  narration?: string
  is_active: boolean
  category_id: number | null
  created_at: string
  updated_at: string
}

export type BeneficiaryPayload = Omit<
  Beneficiary,
  "id" | "is_active" | "created_at" | "updated_at"
>

export interface BeneficiariesResponse {
  beneficiaries: Beneficiary[]
  current_page: number
  page_size: number
  total_items: number
  total_pages: number
}

export interface Category {
  id: number
  name: string
  description: string
  merchant_id: string
}

export interface GetPayoutBeneficiariesParams {
  merchant_id: string
  page?: number
  size?: number
  category_id?: number
}

export interface BulkPayoutCustomerPayload {
  account_number: string
  bank_slug: string
  email: string
  whatsapp_number: string
  phone_number: string
}

export interface BulkPayoutItemPayload {
  merchant_id: string
  amount: number
  currency: string
  customer: BulkPayoutCustomerPayload
  narration: string
}

export interface CreateBulkPayoutPayload {
  merchant_id: string
  mode: Mode
  name: string
  data: BulkPayoutItemPayload[]
  category_ids?: number[]
  beneficiary_ids?: number[]
}

export interface IndividualPayoutDetail {
  txn_id: number
  txn_message: string
  status: boolean
}

export interface BulkPayout {
  id: number
  name: string
  reference: string
  status: string
  transaction_details: IndividualPayoutDetail[]
  created_at: string
}

export interface BulkPayoutsResponse {
  payouts: BulkPayout[]
  total_items: number
  total_pages: number
  current_page: number
  page_size: number
  pending_count: number
  success_count: number
  partial_count: number
  failed_count: number
  success_rate: number
}

export interface PaymentRecord {
  id: string
  amount: string
  date: string
  method: string
  reference: string
  status: "Success" | "Failed" | "Pending"
}

export interface Notification {
  id: string
  title: string
  description: string
  timestamp: string
  read: boolean
  type: "order" | "warning" | "success" | "info"
}

export interface Product {
  id: string
  name: string
  image?: string
  price: string
  stock: number
  category: string
  sku: string
  description: string
}

export interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  items: Array<{
    productName: string
    quantity: number
    price: string
  }>
  totalAmount: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "paid" | "unpaid" | "refunded"
  orderDate: string
  shippingAddress: string
}

export interface CustomerData {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  status: "active" | "pending" | "inactive"
  totalOrders: number
  totalSpent: string
  joinDate: string
  lastPurchase: string
}

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

export interface ActivityEvent {
  id: string
  type: "renewed" | "successful" | "created"
  title: string
  timestamp: string
}

export interface HealthStats {
  active: number
  cancelled: number
  pastDue: number
}

export interface DetailedPlanSubscription {
  id: string
  planName: string
  price: string
  billingCycle: string
  trialPeriod: string
  createdDate: string
  totalSubscribers: number
  activeSubscribers: number
  monthlyRevenue: string
  churnRate: string
  healthStats: HealthStats
  recentActivity: ActivityEvent[]
  subscribers: IndividualSubscriber[]
  activeSubscriptionId?: string | null
  activeSubscriptionStatus?: string
  activeSubscriptionEmail?: string
  activeSubscriptionName?: string
  activeSubscriptionPeriodEnd?: string | null
  activeSubscriptionAmountValue?: number | null
}

export interface IndividualSubscriber {
  id: string
  customerName: string
  email: string
  planType: string
  status: "Active" | "Past Due" | "Canceled"
  nextBillingDate: string
  amount: string
}

export interface BulkPayoutBatch {
  id: string
  batchName: string
  reference: string
  transactions: number
  amount: string
  status: "Success" | "Pending" | "Partial" | "Failed"
  createdAt: string
}

export interface MonthlyPayoutPoint {
  month: string
  value: number
  payoutCount: number
}

export interface PayInTransaction {
  id: string
  customerName: string
  email: string
  reference: string
  amount: string
  method: "Card" | "Transfer" | "Crypto"
  status: "Success" | "Pending" | "Failed"
  date: string
}

export interface PayInKPIs {
  totalVolume: string
  transactionCount: string
  averagePayIn: string
  volumeChange: string
  countChange: string
}

export interface RefundRequest {
  id: string
  customerName: string
  avatarColor: string
  transactionId: string
  amount: string
  reason: string
  status: "Completed" | "Processing" | "Failed" | "Pending"
  date: string
}

export interface RefundKPIs {
  pending: string
  processing: string
  completed: string
  failed: string
}

export interface PayOutTransaction {
  id: string
  recipientName: string
  recipientType: string
  reference: string
  amount: string
  method: "Bank Transfer" | "Xoro Wallet" | "Card Payout"
  status: "Completed" | "Pending" | "Processing" | "Failed"
  date: string
}

export interface PayOutKPIs {
  totalPaid: string
  pendingProcessing: string
  failedPayouts: string
}

export interface DetailedSubscription {
  id: string
  customerName: string
  email: string
  planName: string
  billingCycle: string
  status: "Active" | "Trialing" | "Past Due" | "Canceled"
  startDate: string
  nextBilling: string
  amount: string
  totalPaid: string
}

export interface ISubscriptionAnalytics {
  total: number,
  active: number,
  pending: number,
  past_due: number,
  grace: number,
  expired: number,
  cancelled: number,
  paused: number
}

export type SubscriptionStatus =
  | "pending"
  | "active"
  | "past_due"
  | "grace"
  | "expired"
  | "cancelled"
  | "paused"

export type SubscriptionMetadata = Record<string, unknown>

export interface SubscriptionItem {
  id: string
  merchant_id: string
  product_id: string
  customer_id: string | null
  subscriber_id: string | null
  subscriber_email: string
  subscriber_name: string
  subscriber_phone: string | null
  status: SubscriptionStatus | string
  current_period_start: string | null
  current_period_end: string | null
  grace_period_days: number
  grace_period_end: string | null
  trial_end: string | null
  cancelled_at: string | null
  cancel_at_period_end: boolean
  cancellation_reason: string | null
  paused_at: string | null
  price_override: number | string | null
  metadata: SubscriptionMetadata | null
  external_id: string | null
  bulk_subscription_id: string | null
  created_at: string
  updated_at: string
}

export interface SubscriptionListResponse {
  items: SubscriptionItem[]
  total: number
  page: number
  page_size: number
  total_pages: number
}

export interface SubscriptionListParams {
  page?: number
  page_size?: number
  status?: SubscriptionStatus | string | null
  product_id?: string | null
  subscriber_id?: string | null
  subscriber_email?: string | null
  customer_id?: string | null
}

export interface CreateSubscriptionPayload {
  product_id: string
  subscriber_id: string
  subscriber_email: string
  subscriber_name?: string | null
  subscriber_phone?: string | null
  grace_period_days?: number
  metadata?: SubscriptionMetadata | null
  external_id?: string | null
  price_override?: number | string | null
  trial_days?: number
  start_date?: string | null
  customer_id?: string | null
}

export interface UpdateSubscriptionPayload {
  subscriber_name?: string
  subscriber_phone?: string | null
  grace_period_days?: number
  metadata?: SubscriptionMetadata | null
  external_id?: string | null
  price_override?: number | string | null
}

export interface PauseSubscriptionPayload {
  resume_at?: string | null
  reason?: string | null
}

export interface CancelSubscriptionPayload {
  cancel_at_period_end?: boolean
  reason?: string | null
}

export interface BillingPreviewBreakdownItem {
  [key: string]: unknown
}

export interface BillingPreviewResponse {
  subscription_id: string
  product_id: string
  product_name: string
  base_price: string
  entity_charges: string
  subtotal: string
  discount_code: string | null
  discount_amount: string
  total: string
  currency: string
  billing_interval: string
  entity_breakdown: BillingPreviewBreakdownItem[]
}

export interface RetryPaymentResponse {
  id: string
  subscription_id: string
  merchant_id: string
  reference: string
  amount: string
  currency: string
  discount_amount: string
  final_amount: string
  status: string
  checkout_url: string | null
  expires_at: string
  period_start: string
  period_end: string
  link_type: string
  paid_at: string | null
  created_at: string | null
  updated_at: string | null
}

export interface IBulkTransactionData {
  id: number
  name: string
  reference: string
  status: string
  remarks: string | null
  created_at: string
  transactions: IBulkTransaction[]
}

export interface IBulkTransaction {
  id: number
  type: string
  mode: Mode
  reference: string
  status: string
  amount: number
  charge: number
  processor: string
  customer: { name: string | null; email: string }
  details: { account_number: string; bank: string; customer_name: string }
  created_at: string
}

export interface PayoutPayload {
  merchant_id: string
  amount: number
  currency: string
  customer: BankAccount
  narration?: string
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

export interface PaymentLinkPayload {
  merchant_id: string
  amount: number
  currency: string
  customer: { name: string; email: string }
  narration: string
  processor: string
  mode: Mode
}

export interface PaymentLinkResponse {
  reference: string
  checkout_url: string
  processor: string
}

export interface CheckoutLink {
  id: string
  reference: string
  title: string
  merchant_id: string
  url: string
  description: string | null
  amount_type: CheckoutType
  mode: Mode
  type: ChargeType
  currency: string
  amount: number | null
  max_uses: number | null
  current_uses: number
  redirect_url: string | null
  expires_at: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CheckoutLinkDetails extends CheckoutLink {
  transactions: ITransaction[]
}

export type CheckoutResponseBase = {
  status: boolean
  reference: string
  processor_reference: string
  currency: "NGN"
  amount: number
  fee: number
  customer_email: string
  merchant_id: string
}

export type CheckoutTransferResponse = CheckoutResponseBase & {
  channel: "transfer"
  seconds_until_expiry: number
  bank_account: BankAccount & {
    account_name: string
    bank_name: string
    expiry_date: string
  }
}

export type CheckoutCardResponse = CheckoutResponseBase & {
  channel: "card"
  checkout_url: string
}

export type CheckoutResponses = CheckoutTransferResponse | CheckoutCardResponse

export type VerifyTransactionPayload = {
  reference: string
  customer_email: string
  merchant_id: string
}

export type VerifyTransactionResponse = {
  id: number
  type: TransactionType
  mode: Mode
  reference: string
  status: Status
  amount: number
  charge: number
  processor_reference: string
  processor: string
  customer: { name: string | null; email: string }
  details: string | null
  created_at: string
}

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

export type IBank = {
  name: string
  slug: string
  code: string
  nibss_bank_code: string | null
  country: string
}

export interface KoraPayload {
  account: string
  bank: string
  currency: string
}
