# XoroPay Merchant API Endpoint Reference

Generated from the authenticated OpenAPI spec at `https://merchant.xoropay.com/openapi.json` on 2026-04-13.

## Auth

- Docs access uses HTTP Basic auth. The supplied docs credentials successfully unlocked `/openapi.json`.
- Most application endpoints use `HTTPBearer` and expect a bearer token in the `Authorization` header.
- `/auth/validate-key` also uses bearer auth, but its description says the bearer value should be a merchant secret key with the `aggsk_...` format.
- Public auth endpoints like login, signup, OTP verification, and forgot-password do not require bearer auth.

## Endpoint Groups

- Admin: 11 endpoints
- Analytics: 8 endpoints
- Auth: 8 endpoints
- Merchants: 5 endpoints
- payment_links: 8 endpoints
- Payout beneficiaries: 5 endpoints
- Payout categories: 5 endpoints
- System: 3 endpoints
- Transactions: 12 endpoints
- Users: 2 endpoints
- V1: 6 endpoints
- V2 Checkout: 2 endpoints
- Wallets: 9 endpoints
- Webhooks: 1 endpoint

## Admin

### POST /admin/activate-merchant

- Summary: Activatate Merchant
- Auth: HTTPBearer
- Query/Path Params:
- none
- Request Body:
- content-type: application/json | schema: `ActivateMerchantRequest` | required
  - `merchant_id`: string | required
- Responses:
- `200`: Successful Response | schema: `MerchantResponse`
  - `id`: string | required
  - `name`: string | required
  - `email`: string | required
  - `is_verified`: boolean | required
  - `is_active`: boolean | required
  - `joined_at`: string | required
  - `test_balance`: number | required
  - `live_balance`: number | required
  - `percentage_charge`: number | required
  - `flat_charge`: number | required
  - `role`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /admin/balances-by-currency

- Summary: Get Balances By Currency
- Description: Get wallet balances grouped by currency for a specific mode
- Auth: HTTPBearer
- Query/Path Params:
- `mode`: query | TokenMode | Mode: test or live | default: "test"
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `BalancesByCurrencyResponse`
  - `mode`: string | required
  - `balances`: object | required
    - type: object
  - `total_currencies`: integer | required
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /admin/charges-by-currency

- Summary: Get Charges By Currency
- Description: Get system charges and processor charges grouped by currency
- Auth: HTTPBearer
- Query/Path Params:
- `mode`: query | TokenMode | Mode: test or live | default: "test"
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `ChargesByCurrencyResponse`
  - `mode`: string | required
  - `charges`: object | required
    - type: object
  - `total_currencies`: integer | required
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### POST /admin/deactivate-merchant

- Summary: Deactivatate Merchant
- Auth: HTTPBearer
- Query/Path Params:
- none
- Request Body:
- content-type: application/json | schema: `ActivateMerchantRequest` | required
  - `merchant_id`: string | required
- Responses:
- `200`: Successful Response | schema: `MerchantResponse`
  - `id`: string | required
  - `name`: string | required
  - `email`: string | required
  - `is_verified`: boolean | required
  - `is_active`: boolean | required
  - `joined_at`: string | required
  - `test_balance`: number | required
  - `live_balance`: number | required
  - `percentage_charge`: number | required
  - `flat_charge`: number | required
  - `role`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### POST /admin/login

- Summary: Admin Login
- Auth: none documented
- Query/Path Params:
- none
- Request Body:
- content-type: application/json | schema: `AdminLoginRequest` | required
  - `email`: string | required
  - `password`: string | required
- Responses:
- `200`: Successful Response | schema: `LoginResponse`
  - `status`: boolean | required
  - `message`: string | required
  - `data`: AdminResponse | required
    - `name`: string | required
    - `email`: string | required
    - `is_active`: boolean | required
  - `access_token`: string | required
  - `token_type`: string | required
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /admin/merchant-amounts

- Summary: Get Merchant Total Amounts
- Description: Get merchant charges and profit, optionally filtered by currency
- Auth: HTTPBearer
- Query/Path Params:
- `mode`: query | TokenMode | Mode: test or live | default: "test"
- `merchant_id`: query | string | null | Merchant ID
- `merchant_email`: query | string | null | Merchant email
- `currency`: query | string | null | Filter by currency (e.g., NGN, USD)
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `MerchantAmountsResponse`
  - `merchant`: MerchantResponse | required
    - `id`: string | required
    - `name`: string | required
    - `email`: string | required
    - `is_verified`: boolean | required
    - `is_active`: boolean | required
    - `joined_at`: string | required
    - `test_balance`: number | required
    - `live_balance`: number | required
    - `percentage_charge`: number | required
    - `flat_charge`: number | required
    - `role`: string | null
  - `merchant_processor_charges`: number | required
  - `merchant_system_charges`: number | required
  - `profit`: number | required
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /admin/merchant-balance

- Summary: Get Total Merchant Balance
- Description: Get total merchant wallet balances across all merchants, optionally filtered by currency
- Auth: HTTPBearer
- Query/Path Params:
- `currency`: query | string | null | Filter by currency (e.g., NGN, USD)
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `TotalBalanceResponse`
  - `test_balance`: number | required
  - `live_balance`: number | required
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /admin/merchants

- Summary: Get All Merchants
- Auth: HTTPBearer
- Query/Path Params:
- none
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `array<MerchantResponse>`
  - items: MerchantResponse
    - `id`: string | required
    - `name`: string | required
    - `email`: string | required
    - `is_verified`: boolean | required
    - `is_active`: boolean | required
    - `joined_at`: string | required
    - `test_balance`: number | required
    - `live_balance`: number | required
    - `percentage_charge`: number | required
    - `flat_charge`: number | required
    - `role`: string | null

### GET /admin/system-balance-by-currency

- Summary: Get System Balance By Currency
- Description: Get system balance (merchant balance + profit) grouped by currency
- Auth: HTTPBearer
- Query/Path Params:
- `mode`: query | TokenMode | Mode: test or live | default: "test"
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `SystemBalanceByCurrencyResponse`
  - `mode`: string | required
  - `balances`: object | required
    - type: object
  - `total_currencies`: integer | required
  - `grand_total`: number | required
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /admin/total-amounts

- Summary: Get Total Amounts
- Description: Get total charges and profit, optionally filtered by currency
- Auth: HTTPBearer
- Query/Path Params:
- `mode`: query | TokenMode | Mode: test or live | default: "test"
- `currency`: query | string | null | Filter by currency (e.g., NGN, USD)
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `TotalAmountsResponse`
  - `processor_charges`: number | required
  - `system_charges`: number | required
  - `profit`: number | required
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /admin/total-balance

- Summary: Get Total Balance
- Description: Get total system balance, optionally filtered by currency
- Auth: HTTPBearer
- Query/Path Params:
- `currency`: query | string | null | Filter by currency (e.g., NGN, USD)
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `TotalBalanceResponse`
  - `test_balance`: number | required
  - `live_balance`: number | required
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

## Analytics

### GET /analytics/comparison

- Summary: Get Comparison Analytics
- Description: Compare metrics between current and previous periods Shows growth trends and changes
- Auth: HTTPBearer
- Query/Path Params:
- `merchant_id`: query | string | required | Merchant ID
- `mode`: query | TokenMode | Mode: test or live | default: "test"
- `current_period`: query | string | Current period: week, month, quarter, year | default: "month"
- `compare_with`: query | string | Compare with: previous (same period before) | default: "previous"
- `currency`: query | string | null | Filter by currency
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /analytics/customers

- Summary: Get Customer Analytics
- Description: Get customer analytics including top customers and repeat rate
- Auth: HTTPBearer
- Query/Path Params:
- `merchant_id`: query | string | required | Merchant ID
- `mode`: query | TokenMode | Mode: test or live | default: "test"
- `start_date`: query | string | null | Start date (ISO format)
- `end_date`: query | string | null | End date (ISO format)
- `top_limit`: query | integer | Number of top customers to return | default: 10
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `CustomerAnalyticsResponse`
  - `mode`: string | required
  - `start_date`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
  - `end_date`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
  - `total_customers`: integer | required
  - `active_customers`: integer | required
  - `new_customers`: integer | required
  - `top_customers`: array<TopCustomer> | required
    - items: TopCustomer
  - `repeat_customer_rate`: number | required
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /analytics/dashboard

- Summary: Get Dashboard Summary
- Description: Get comprehensive dashboard summary for merchant Includes revenue metrics, transaction breakdown, top currency, and wallet stats
- Auth: HTTPBearer
- Query/Path Params:
- `merchant_id`: query | string | required | Merchant ID
- `mode`: query | TokenMode | Mode: test or live | default: "test"
- `period`: query | string | Period: today, week, month, quarter, year, all_time | default: "month"
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `DashboardSummaryResponse`
  - `mode`: string | required
  - `period`: string | required
  - `revenue_metrics`: RevenueMetrics | required
    - `total_revenue`: number | required
    - `total_transactions`: integer | required
    - `total_charges`: number | required
    - `net_revenue`: number | required
    - `average_transaction_value`: number | required
    - `success_rate`: number | required
  - `transaction_breakdown`: TransactionBreakdown | required
    - `successful`: integer | required
    - `pending`: integer | required
    - `failed`: integer | required
    - `total`: integer | required
  - `top_currency`: CurrencyMetrics | null | required
    - anyOf[1]: CurrencyMetrics
    - anyOf[2]: null
  - `wallet_count`: integer | required
  - `total_balance`: number | required
  - `pending_payouts`: integer | required
  - `pending_payout_amount`: number | required
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /analytics/patterns

- Summary: Get Transaction Patterns
- Description: Get transaction patterns - hourly and day-of-week distribution Helps identify peak transaction times
- Auth: HTTPBearer
- Query/Path Params:
- `merchant_id`: query | string | required | Merchant ID
- `mode`: query | TokenMode | Mode: test or live | default: "test"
- `start_date`: query | string | null | Start date (ISO format)
- `end_date`: query | string | null | End date (ISO format)
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `TransactionPatternResponse`
  - `mode`: string | required
  - `start_date`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
  - `end_date`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
  - `hourly_distribution`: array<HourlyDistribution> | required
    - items: HourlyDistribution
  - `day_of_week_distribution`: array<DayOfWeekDistribution> | required
    - items: DayOfWeekDistribution
  - `peak_hour`: integer | required
  - `peak_day`: string | required
  - `average_daily_transactions`: number | required
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /analytics/payouts

- Summary: Get Payout Analytics
- Description: Get payout analytics with time series data
- Auth: HTTPBearer
- Query/Path Params:
- `merchant_id`: query | string | required | Merchant ID
- `mode`: query | TokenMode | Mode: test or live | default: "test"
- `start_date`: query | string | null | Start date (ISO format)
- `end_date`: query | string | null | End date (ISO format)
- `currency`: query | string | null | Filter by currency
- `interval`: query | string | Time series interval: day, week, month | default: "day"
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `PayoutAnalyticsResponse`
  - `mode`: string | required
  - `start_date`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
  - `end_date`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
  - `currency`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
  - `total_payouts`: number | required
  - `payout_count`: integer | required
  - `successful_payouts`: integer | required
  - `failed_payouts`: integer | required
  - `pending_payouts`: integer | required
  - `total_payout_charges`: number | required
  - `average_payout_amount`: number | required
  - `time_series`: array<TimeSeriesDataPoint> | required
    - items: TimeSeriesDataPoint
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /analytics/revenue

- Summary: Get Revenue Analytics
- Description: Get detailed revenue analytics with time series data
- Auth: HTTPBearer
- Query/Path Params:
- `merchant_id`: query | string | required | Merchant ID
- `mode`: query | TokenMode | Mode: test or live | default: "test"
- `start_date`: query | string | null | Start date (ISO format)
- `end_date`: query | string | null | End date (ISO format)
- `currency`: query | string | null | Filter by currency
- `interval`: query | string | Time series interval: day, week, month | default: "day"
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `RevenueAnalyticsResponse`
  - `mode`: string | required
  - `start_date`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
  - `end_date`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
  - `currency`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
  - `revenue_metrics`: RevenueMetrics | required
    - `total_revenue`: number | required
    - `total_transactions`: integer | required
    - `total_charges`: number | required
    - `net_revenue`: number | required
    - `average_transaction_value`: number | required
    - `success_rate`: number | required
  - `time_series`: array<TimeSeriesDataPoint> | required
    - items: TimeSeriesDataPoint
  - `currency_breakdown`: array<CurrencyMetrics> | required
    - items: CurrencyMetrics
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /analytics/transactions

- Summary: Get Transaction Analytics
- Description: Get detailed transaction analytics including channel breakdown
- Auth: HTTPBearer
- Query/Path Params:
- `merchant_id`: query | string | required | Merchant ID
- `mode`: query | TokenMode | Mode: test or live | default: "test"
- `start_date`: query | string | null | Start date (ISO format)
- `end_date`: query | string | null | End date (ISO format)
- `currency`: query | string | null | Filter by currency
- `interval`: query | string | Time series interval: day, week, month | default: "day"
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `TransactionAnalyticsResponse`
  - `mode`: string | required
  - `start_date`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
  - `end_date`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
  - `currency`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
  - `transaction_breakdown`: TransactionBreakdown | required
    - `successful`: integer | required
    - `pending`: integer | required
    - `failed`: integer | required
    - `total`: integer | required
  - `channel_breakdown`: array<ChannelMetrics> | required
    - items: ChannelMetrics
  - `time_series`: array<TimeSeriesDataPoint> | required
    - items: TimeSeriesDataPoint
  - `average_processing_time`: number | null | required
    - anyOf[1]: number
    - anyOf[2]: null
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /analytics/wallets

- Summary: Get Wallet Analytics
- Description: Get comprehensive wallet analytics for all merchant wallets
- Auth: HTTPBearer
- Query/Path Params:
- `merchant_id`: query | string | required | Merchant ID
- `mode`: query | TokenMode | Mode: test or live | default: "test"
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `WalletAnalyticsResponse`
  - `mode`: string | required
  - `wallets`: array<WalletAnalytics> | required
    - items: WalletAnalytics
  - `total_balance`: number | required
  - `total_credits`: number | required
  - `total_debits`: number | required
  - `total_charges_earned`: number | required
  - `currency_count`: integer | required
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

## Auth

### POST /auth/change-password

- Summary: Change Password
- Auth: HTTPBearer
- Query/Path Params:
- none
- Request Body:
- content-type: application/json | schema: `ChangePasswordRequest` | required
  - `current_password`: string | required
  - `new_password`: string | required
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### POST /auth/forgot-password

- Summary: Forgot Password
- Auth: none documented
- Query/Path Params:
- none
- Request Body:
- content-type: application/json | schema: `ForgotPasswordRequest` | required
  - `email`: string | required
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### POST /auth/forgot-password/verify-reset

- Summary: Forgot Password
- Auth: none documented
- Query/Path Params:
- none
- Request Body:
- content-type: application/json | schema: `VerifyForgotPasswordRequest` | required
  - `email`: string | required
  - `new_password`: string | required
  - `token`: string | required
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### POST /auth/login

- Summary: Login
- Auth: none documented
- Query/Path Params:
- none
- Request Body:
- content-type: application/json | schema: `LoginRequest` | required
  - `email`: string | required
  - `password`: string | required
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### POST /auth/login/verify-otp

- Summary: Login Otp
- Auth: none documented
- Query/Path Params:
- none
- Request Body:
- content-type: application/json | schema: `VerifyLoginOtpRequest` | required
  - `email`: string | required
  - `password`: string | required
  - `otp`: string | required
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### POST /auth/signup

- Summary: Signup
- Auth: none documented
- Query/Path Params:
- none
- Request Body:
- content-type: application/json | schema: `LoginRequest` | required
  - `email`: string | required
  - `password`: string | required
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### POST /auth/signup/verify-otp

- Summary: Signup Otp
- Auth: none documented
- Query/Path Params:
- none
- Request Body:
- content-type: application/json | schema: `VerifySignupOtpRequest` | required
  - `name`: string | required
  - `email`: string | required
  - `password`: string | required
  - `otp`: string | required
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /auth/validate-key

- Summary: Validate an API secret key
- Description: Validates a merchant's API secret key (aggsk_...) passed as a Bearer token. Returns the merchant's details if the key is valid.
- Auth: HTTPBearer
- Query/Path Params:
- none
- Request Body:
- none
- Responses:
- `200`: Key is valid — merchant details returned | schema: `MerchantResponse`
  - `id`: string | required
  - `name`: string | required
  - `email`: string | required
  - `is_verified`: boolean | required
  - `is_active`: boolean | required
  - `joined_at`: string | required
  - `test_balance`: number | required
  - `live_balance`: number | required
  - `percentage_charge`: number | required
  - `flat_charge`: number | required
  - `role`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - example: `{"id":"agg-683c3","name":"Acme Inc.","email":"merchant@example.com","is_verified":false,"is_active":true,"joined_at":"2024-01-01T00:00:00Z","test_balance":0,"live_balance":0,"percentage_charge":1.5,"flat_charge":0}`
- `403`: Invalid or malformed API key
  - example invalid_format: `{"detail":"Invalid API key format"}`
  - example invalid_key: `{"detail":"Invalid API key"}`
- `404`: Merchant associated with key not found
  - example: `{"detail":"Merchant not found"}`

## Merchants

### POST /create-merchant

- Summary: Create Merchant
- Auth: HTTPBearer
- Query/Path Params:
- none
- Request Body:
- content-type: application/json | schema: `MerchantCreateRequest` | required
  - `name`: string | required
  - `email`: string | required
  - `role`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
- Responses:
- `201`: Successful Response | schema: `object`
  - type: object
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /get-merchant

- Summary: Get Merchant
- Auth: HTTPBearer
- Query/Path Params:
- `email`: query | string | required | Merchant email
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### POST /get-token

- Summary: Get Merchant Tokens
- Auth: HTTPBearer
- Query/Path Params:
- none
- Request Body:
- content-type: application/json | schema: `MerchantGetRequest` | required
  - `id`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `email`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /merchant/periodic-revenue

- Summary: Get Merchant Periodic Revenue
- Auth: HTTPBearer
- Query/Path Params:
- `id`: query | string | required | Mrchant's Id
- `mode`: query | TokenMode | live or test | default: "test"
- `group_by`: query | GroupBy | Group by 'day', 'week' or 'month' | default: "month"
- `start_date`: query | string | null
- `end_date`: query | string | null
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /merchant/revenue

- Summary: Get Merchant Revenue
- Auth: HTTPBearer
- Query/Path Params:
- `id`: query | string | required | Merchant ID
- `mode`: query | TokenMode | required | Merchant ID
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

## payment_links

### POST /links/

- Summary: Create Link
- Auth: HTTPBearer
- Query/Path Params:
- none
- Request Body:
- content-type: application/json | schema: `PaymentLinkCreateRequest` | required
  - `title`: string | required | example: "Support My Project"
  - `description`: string | null | example: "Donation link for open source work"
    - anyOf[1]: string
    - anyOf[2]: null
  - `amount_type`: AmountType | required | example: "static"
    - type: static | dynamic
  - `mode`: LinkMode | required | example: "test"
    - type: live | test
  - `type`: LinkType | required | example: "recurring"
    - type: one_time | subgroup | recurring
  - `currency`: TransactionCurrency | required | example: "NGN"
    - type: NGN | KES | GES | XAF | XOF | EGP | TZS | BTC | ETH | USDT | SOL
  - `amount`: number | null | example: 1000
    - anyOf[1]: number
    - anyOf[2]: null
  - `max_uses`: integer | null | example: 10
    - anyOf[1]: integer
    - anyOf[2]: null
  - `redirect_url`: string | null | example: "https://example.com/thank-you"
    - anyOf[1]: string
    - anyOf[2]: null
  - `expires_at`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `metadata`: string | null | example: "campaign=donation2025"
    - anyOf[1]: string
    - anyOf[2]: null
  - `merchant_id`: string | required | example: "merchant_123"
- Responses:
- `200`: Successful Response | schema: `PaymentLinkResponse`
  - `id`: string | required
  - `reference`: string | required
  - `title`: string | required
  - `merchant_id`: string | required
  - `url`: string | required
  - `description`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
  - `amount_type`: AmountType | required
    - type: static | dynamic
  - `mode`: LinkMode | required
    - type: live | test
  - `type`: LinkType | required
    - type: one_time | subgroup | recurring
  - `currency`: TransactionCurrency | required
    - type: NGN | KES | GES | XAF | XOF | EGP | TZS | BTC | ETH | USDT | SOL
  - `amount`: number | null | required
    - anyOf[1]: number
    - anyOf[2]: null
  - `max_uses`: integer | null | required
    - anyOf[1]: integer
    - anyOf[2]: null
  - `current_uses`: integer | required
  - `redirect_url`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
  - `expires_at`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
  - `is_active`: boolean | required
  - `created_at`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
  - `updated_at`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### DELETE /links/{link_id}

- Summary: Deactivate Link
- Auth: HTTPBearer
- Query/Path Params:
- `link_id`: path | string | required
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `PaymentLinkResponse`
  - `id`: string | required
  - `reference`: string | required
  - `title`: string | required
  - `merchant_id`: string | required
  - `url`: string | required
  - `description`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
  - `amount_type`: AmountType | required
    - type: static | dynamic
  - `mode`: LinkMode | required
    - type: live | test
  - `type`: LinkType | required
    - type: one_time | subgroup | recurring
  - `currency`: TransactionCurrency | required
    - type: NGN | KES | GES | XAF | XOF | EGP | TZS | BTC | ETH | USDT | SOL
  - `amount`: number | null | required
    - anyOf[1]: number
    - anyOf[2]: null
  - `max_uses`: integer | null | required
    - anyOf[1]: integer
    - anyOf[2]: null
  - `current_uses`: integer | required
  - `redirect_url`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
  - `expires_at`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
  - `is_active`: boolean | required
  - `created_at`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
  - `updated_at`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /links/{link_id}

- Summary: Get Link Detail
- Auth: HTTPBearer
- Query/Path Params:
- `link_id`: path | string | required
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `PaymentLinkDetailResponse`
  - `id`: string | required
  - `reference`: string | required
  - `title`: string | required
  - `merchant_id`: string | required
  - `url`: string | required
  - `description`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
  - `amount_type`: AmountType | required
    - type: static | dynamic
  - `mode`: LinkMode | required
    - type: live | test
  - `type`: LinkType | required
    - type: one_time | subgroup | recurring
  - `currency`: TransactionCurrency | required
    - type: NGN | KES | GES | XAF | XOF | EGP | TZS | BTC | ETH | USDT | SOL
  - `amount`: number | null | required
    - anyOf[1]: number
    - anyOf[2]: null
  - `max_uses`: integer | null | required
    - anyOf[1]: integer
    - anyOf[2]: null
  - `current_uses`: integer | required
  - `redirect_url`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
  - `expires_at`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
  - `is_active`: boolean | required
  - `created_at`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
  - `updated_at`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
  - `transactions`: array<TransactionResponse> | default: []
    - items: TransactionResponse
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### PUT /links/{link_id}

- Summary: Update Link
- Auth: HTTPBearer
- Query/Path Params:
- `link_id`: path | string | required
- Request Body:
- content-type: application/json | schema: `PaymentLinkUpdateRequest` | required
  - `title`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `description`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `amount`: number | null
    - anyOf[1]: number
    - anyOf[2]: null
  - `max_uses`: integer | null
    - anyOf[1]: integer
    - anyOf[2]: null
  - `redirect_url`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `expires_at`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `metadata`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `is_active`: boolean | null
    - anyOf[1]: boolean
    - anyOf[2]: null
- Responses:
- `200`: Successful Response | schema: `PaymentLinkResponse`
  - `id`: string | required
  - `reference`: string | required
  - `title`: string | required
  - `merchant_id`: string | required
  - `url`: string | required
  - `description`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
  - `amount_type`: AmountType | required
    - type: static | dynamic
  - `mode`: LinkMode | required
    - type: live | test
  - `type`: LinkType | required
    - type: one_time | subgroup | recurring
  - `currency`: TransactionCurrency | required
    - type: NGN | KES | GES | XAF | XOF | EGP | TZS | BTC | ETH | USDT | SOL
  - `amount`: number | null | required
    - anyOf[1]: number
    - anyOf[2]: null
  - `max_uses`: integer | null | required
    - anyOf[1]: integer
    - anyOf[2]: null
  - `current_uses`: integer | required
  - `redirect_url`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
  - `expires_at`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
  - `is_active`: boolean | required
  - `created_at`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
  - `updated_at`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /links/merchant/{merchant_id}

- Summary: List Links
- Auth: HTTPBearer
- Query/Path Params:
- `merchant_id`: path | string | required
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `array<PaymentLinkResponse>`
  - items: PaymentLinkResponse
    - `id`: string | required
    - `reference`: string | required
    - `title`: string | required
    - `merchant_id`: string | required
    - `url`: string | required
    - `description`: string | null | required
    - `amount_type`: AmountType | required
    - `mode`: LinkMode | required
    - `type`: LinkType | required
    - `currency`: TransactionCurrency | required
    - `amount`: number | null | required
    - `max_uses`: integer | null | required
    - `current_uses`: integer | required
    - `redirect_url`: string | null | required
    - `expires_at`: string | null | required
    - `is_active`: boolean | required
    - `created_at`: string | null | required
    - `updated_at`: string | null | required
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /links/r/{reference}

- Summary: Public Fetch By Reference
- Auth: none documented
- Query/Path Params:
- `reference`: path | string | required
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `PaymentLinkResponse`
  - `id`: string | required
  - `reference`: string | required
  - `title`: string | required
  - `merchant_id`: string | required
  - `url`: string | required
  - `description`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
  - `amount_type`: AmountType | required
    - type: static | dynamic
  - `mode`: LinkMode | required
    - type: live | test
  - `type`: LinkType | required
    - type: one_time | subgroup | recurring
  - `currency`: TransactionCurrency | required
    - type: NGN | KES | GES | XAF | XOF | EGP | TZS | BTC | ETH | USDT | SOL
  - `amount`: number | null | required
    - anyOf[1]: number
    - anyOf[2]: null
  - `max_uses`: integer | null | required
    - anyOf[1]: integer
    - anyOf[2]: null
  - `current_uses`: integer | required
  - `redirect_url`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
  - `expires_at`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
  - `is_active`: boolean | required
  - `created_at`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
  - `updated_at`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### POST /links/r/{reference}/checkout

- Summary: Init Checkout
- Auth: none documented
- Query/Path Params:
- `reference`: path | string | required
- Request Body:
- content-type: application/json | schema: `CheckoutRequest` | required
  - `amount`: number | null
    - anyOf[1]: number
    - anyOf[2]: null
  - `customer_email`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `currency`: string | null | default: "NGN"
    - anyOf[1]: string
    - anyOf[2]: null
  - `narration`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `channel`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### POST /links/verify-transaction

- Summary: Verify Transaction
- Auth: none documented
- Query/Path Params:
- none
- Request Body:
- content-type: application/json | schema: `VerifyTransactionRequest` | required
  - `reference`: string | required
  - `customer_email`: string | required
  - `merchant_id`: string | required
- Responses:
- `200`: Successful Response | schema: `TransactionResponse`
  - `id`: integer | required
  - `type`: TransactionType | null | required
    - anyOf[1]: TransactionType
    - anyOf[2]: null
  - `mode`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
  - `reference`: string | required
  - `status`: TransactionStatus | required
    - type: pending | success | failed | refunded | abandoned
  - `currency`: TransactionCurrency | required
    - type: NGN | KES | GES | XAF | XOF | EGP | TZS | BTC | ETH | USDT | SOL
  - `amount`: number | required
  - `charge`: number | required
  - `processor_reference`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `customer`: CustomerModel | required
    - `name`: string | null
    - `email`: string | string | required
  - `details`: object | null | required
    - anyOf[1]: object
    - anyOf[2]: null
  - `created_at`: string | required
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

## Payout beneficiaries

### GET /payout-beneficiary

- Summary: List Beneficiaries
- Auth: HTTPBearer
- Query/Path Params:
- `merchant_id`: query | string | required
- `page`: query | integer | default: 1
- `size`: query | integer | default: 10
- `category_id`: query | integer | null
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### POST /payout-beneficiary

- Summary: Create Beneficiary
- Auth: HTTPBearer
- Query/Path Params:
- none
- Request Body:
- content-type: application/json | schema: `PayoutBeneficiaryCreate` | required
  - `name`: string | required
  - `bank_code`: string | required
  - `account_number`: string | required
  - `email`: string | required
  - `merchant_id`: string | required
  - `phone_number`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `whatsapp_number`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `default_amount`: number | null
    - anyOf[1]: number
    - anyOf[2]: null
  - `narration`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `category_id`: integer | null
    - anyOf[1]: integer
    - anyOf[2]: null
- Responses:
- `200`: Successful Response | schema: `PayoutBeneficiaryResponse`
  - `name`: string | required
  - `bank_code`: string | required
  - `account_number`: string | required
  - `email`: string | required
  - `merchant_id`: string | required
  - `phone_number`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `whatsapp_number`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `default_amount`: number | null
    - anyOf[1]: number
    - anyOf[2]: null
  - `narration`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `id`: integer | required
  - `category_id`: integer | null
    - anyOf[1]: integer
    - anyOf[2]: null
  - `created_at`: string | required
  - `updated_at`: string | required
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### DELETE /payout-beneficiary/{beneficiary_id}

- Summary: Delete Beneficiary
- Auth: HTTPBearer
- Query/Path Params:
- `beneficiary_id`: path | integer | required
- `merchant_id`: query | string | required
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /payout-beneficiary/{beneficiary_id}

- Summary: Get Beneficiary
- Auth: HTTPBearer
- Query/Path Params:
- `beneficiary_id`: path | integer | required
- `merchant_id`: query | string | required
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `PayoutBeneficiaryResponse`
  - `name`: string | required
  - `bank_code`: string | required
  - `account_number`: string | required
  - `email`: string | required
  - `merchant_id`: string | required
  - `phone_number`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `whatsapp_number`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `default_amount`: number | null
    - anyOf[1]: number
    - anyOf[2]: null
  - `narration`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `id`: integer | required
  - `category_id`: integer | null
    - anyOf[1]: integer
    - anyOf[2]: null
  - `created_at`: string | required
  - `updated_at`: string | required
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### PUT /payout-beneficiary/{beneficiary_id}

- Summary: Update Beneficiary
- Auth: HTTPBearer
- Query/Path Params:
- `beneficiary_id`: path | integer | required
- `merchant_id`: query | string | required
- Request Body:
- content-type: application/json | schema: `PayoutBeneficiaryUpdate` | required
  - `name`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `bank_code`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `account_number`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `email`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `phone_number`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `whatsapp_number`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `default_amount`: number | null
    - anyOf[1]: number
    - anyOf[2]: null
  - `narration`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `category_id`: integer | null
    - anyOf[1]: integer
    - anyOf[2]: null
- Responses:
- `200`: Successful Response | schema: `PayoutBeneficiaryResponse`
  - `name`: string | required
  - `bank_code`: string | required
  - `account_number`: string | required
  - `email`: string | required
  - `merchant_id`: string | required
  - `phone_number`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `whatsapp_number`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `default_amount`: number | null
    - anyOf[1]: number
    - anyOf[2]: null
  - `narration`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `id`: integer | required
  - `category_id`: integer | null
    - anyOf[1]: integer
    - anyOf[2]: null
  - `created_at`: string | required
  - `updated_at`: string | required
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

## Payout categories

### GET /payout-category

- Summary: List Categories
- Auth: HTTPBearer
- Query/Path Params:
- `merchant_id`: query | string | required
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `array<PayoutCategoryResponse>`
  - items: PayoutCategoryResponse
    - `name`: string | required | examples: "Vendors", "Employees", "Freelancers"
    - `description`: string | null
    - `id`: integer | required
    - `merchant_id`: string | required
    - `created_at`: string | required
    - `updated_at`: string | required
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### POST /payout-category

- Summary: Create Category
- Auth: HTTPBearer
- Query/Path Params:
- none
- Request Body:
- content-type: application/json | schema: `PayoutCategoryCreate` | required
  - `name`: string | required | examples: "Vendors", "Employees", "Freelancers"
  - `description`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `merchant_id`: string | required
- Responses:
- `200`: Successful Response | schema: `PayoutCategoryResponse`
  - `name`: string | required | examples: "Vendors", "Employees", "Freelancers"
  - `description`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `id`: integer | required
  - `merchant_id`: string | required
  - `created_at`: string | required
  - `updated_at`: string | required
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### DELETE /payout-category/{category_id}

- Summary: Delete Category
- Auth: HTTPBearer
- Query/Path Params:
- `category_id`: path | integer | required
- `merchant_id`: query | string | required
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /payout-category/{category_id}

- Summary: Get Category
- Auth: HTTPBearer
- Query/Path Params:
- `category_id`: path | integer | required
- `merchant_id`: query | string | required
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /payout-category/{category_id}/beneficiaries

- Summary: Fetch Beneficiaries
- Auth: HTTPBearer
- Query/Path Params:
- `category_id`: path | integer | required
- `merchant_id`: query | string | required
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `array<PayoutBeneficiaryResponse>`
  - items: PayoutBeneficiaryResponse
    - `name`: string | required
    - `bank_code`: string | required
    - `account_number`: string | required
    - `email`: string | required
    - `merchant_id`: string | required
    - `phone_number`: string | null
    - `whatsapp_number`: string | null
    - `default_amount`: number | null
    - `narration`: string | null
    - `id`: integer | required
    - `category_id`: integer | null
    - `created_at`: string | required
    - `updated_at`: string | required
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

## System

### GET /docs

- Summary: Custom Swagger Ui
- Auth: HTTPBasic
- Query/Path Params:
- none
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object

### GET /openapi.json

- Summary: Protected Openapi
- Auth: HTTPBasic
- Query/Path Params:
- none
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object

### GET /redoc

- Summary: Custom Redoc Ui
- Auth: HTTPBasic
- Query/Path Params:
- none
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object

## Transactions

### POST /bulk-payout

- Summary: Bulk Payout
- Auth: HTTPBearer
- Query/Path Params:
- none
- Request Body:
- content-type: application/json | schema: `BulkPayoutRequest` | required
  - `merchant_id`: string | required
  - `mode`: TokenMode | default: "test"
    - type: live | test
  - `name`: string | null | examples: "Farmer's market employee payroll"
    - anyOf[1]: string
    - anyOf[2]: null
  - `data`: array<BulkPayoutItem> | null
    - anyOf[1]: array<BulkPayoutItem>
    - anyOf[2]: null
  - `category_ids`: array<integer> | null
    - anyOf[1]: array<integer>
    - anyOf[2]: null
  - `beneficiary_ids`: array<integer> | null
    - anyOf[1]: array<integer>
    - anyOf[2]: null
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /bulk-payout/{reference}

- Summary: Get Bulk Payout Detail
- Auth: HTTPBearer
- Query/Path Params:
- `reference`: path | string | required
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /bulk-payouts

- Summary: Get Merchant Transactions
- Auth: HTTPBearer
- Query/Path Params:
- `merchant_id`: query | string | required | Merchant ID
- `page`: query | integer | default: 1
- `page_size`: query | integer | default: 10
- `mode`: query | TokenMode | default: "test"
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /checkout-reference

- Summary: Get Checkout Reference
- Description: Get transaction by reference and datetime
- Auth: none documented
- Query/Path Params:
- `reference`: query | string | required
- `datetime`: query | string | required
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `TransactionResponse`
  - `id`: integer | required
  - `type`: TransactionType | null | required
    - anyOf[1]: TransactionType
    - anyOf[2]: null
  - `mode`: string | null | required
    - anyOf[1]: string
    - anyOf[2]: null
  - `reference`: string | required
  - `status`: TransactionStatus | required
    - type: pending | success | failed | refunded | abandoned
  - `currency`: TransactionCurrency | required
    - type: NGN | KES | GES | XAF | XOF | EGP | TZS | BTC | ETH | USDT | SOL
  - `amount`: number | required
  - `charge`: number | required
  - `processor_reference`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `customer`: CustomerModel | required
    - `name`: string | null
    - `email`: string | string | required
  - `details`: object | null | required
    - anyOf[1]: object
    - anyOf[2]: null
  - `created_at`: string | required
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### POST /generate-payment-link

- Summary: Generate Payment Url
- Auth: HTTPBearer
- Query/Path Params:
- none
- Request Body:
- content-type: application/json | schema: `PaymentLinkRequest` | required
  - `merchant_id`: string | required
  - `amount`: number | required
  - `currency`: TransactionCurrency | default: "NGN"
    - type: NGN | KES | GES | XAF | XOF | EGP | TZS | BTC | ETH | USDT | SOL
  - `customer`: CustomerResponse | required
    - `name`: string | null
    - `email`: string | string | required
  - `narration`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `processor`: TransactionProcessor | required
    - type: fltw | kora | pstk
  - `mode`: TokenMode | required
    - type: live | test
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### POST /generate-receipt

- Summary: Generate Receipt
- Auth: HTTPBearer
- Query/Path Params:
- none
- Request Body:
- content-type: application/json | schema: `GenerateReceiptRequest` | required
  - `merchant_id`: string | required
  - `reference`: string | required
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /merchant-transactions-by-wallet

- Summary: Get Merchant Transactions Grouped By Wallet
- Description: Get merchant transactions grouped by wallet.
- Auth: HTTPBearer
- Query/Path Params:
- `merchant_id`: query | string | required | Merchant ID
- `mode`: query | TokenMode | required | Mode: test or live
- `currency`: query | string | Filter by currency
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /merchant-transactions

- Summary: Get Merchant Transactions
- Description: Get merchant transactions with optional filters for wallet, currency, and type.
- Auth: HTTPBearer
- Query/Path Params:
- `merchant_id`: query | string | required | Merchant ID
- `page`: query | integer | default: 1
- `page_size`: query | integer | default: 10
- `mode`: query | TokenMode | default: "test"
- `wallet_id`: query | integer | Filter by wallet ID
- `currency`: query | string | Filter by currency
- `transaction_type`: query | TransactionType | Filter by transaction type
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### POST /payout

- Summary: Payout
- Auth: HTTPBearer
- Query/Path Params:
- none
- Request Body:
- content-type: application/json | schema: `schemas__transactionSchema__PayoutRequest` | required
  - `merchant_id`: string | required
  - `amount`: number | required
  - `currency`: TransactionCurrency | default: "NGN"
    - type: NGN | KES | GES | XAF | XOF | EGP | TZS | BTC | ETH | USDT | SOL
  - `customer`: PayoutCustomerDetails | required
    - `account_number`: string | required
    - `bank_code`: string | required
  - `narration`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /wallet-revenue-trends

- Summary: Get Wallet Revenue Trends
- Description: Get revenue trends for a wallet over time, grouped by day/week/month/year.
- Auth: HTTPBearer
- Query/Path Params:
- `wallet_id`: query | integer | required | Wallet ID
- `group_by`: query | GroupBy | Group by: day, week, month, year | default: "day"
- `start_date`: query | string | Start date (ISO format)
- `end_date`: query | string | End date (ISO format)
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /wallet-transaction-stats

- Summary: Get Wallet Transaction Statistics
- Description: Get transaction statistics for a specific wallet.
- Auth: HTTPBearer
- Query/Path Params:
- `wallet_id`: query | integer | required | Wallet ID
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /wallet-transactions

- Summary: Get Wallet Transactions
- Description: Get all transactions for a specific wallet with pagination.
- Auth: HTTPBearer
- Query/Path Params:
- `wallet_id`: query | integer | required | Wallet ID
- `page`: query | integer | default: 1
- `page_size`: query | integer | default: 10
- `transaction_type`: query | TransactionType | Filter by transaction type
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

## Users

### POST /add-user

- Summary: Add User
- Auth: HTTPBearer
- Query/Path Params:
- none
- Request Body:
- content-type: application/json | schema: `UserAddRequest` | required
  - `email`: string | required
  - `merchant_id`: string | required
  - `role`: UserRole | required
    - type: admin | owner | developer | operations
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /get-user

- Summary: Get User
- Auth: HTTPBearer
- Query/Path Params:
- none
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object

## V1

### POST /api/v1/initiate

- Summary: Initiate Checkout
- Auth: HTTPBearer
- Query/Path Params:
- none
- Request Body:
- content-type: application/json | schema: `InitializeTransactionRequest` | required
  - `customer`: Customer | required
    - `email`: string | required
    - `name`: string | null
  - `amount`: number | required
  - `currency`: TransactionCurrency | required | Currency in lower case
    - type: NGN | KES | GES | XAF | XOF | EGP | TZS | BTC | ETH | USDT | SOL
  - `reference`: string | required
  - `redirect_url`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `notification_url`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `narration`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `mode`: TransactionChannel | null
    - anyOf[1]: TransactionChannel
    - anyOf[2]: null
  - `metadata`: object | null
    - anyOf[1]: object
    - anyOf[2]: null
- Responses:
- `200`: Successful Response | schema: `InitializeTransactionResponse`
  - `status`: boolean | required | Indicates if the transaction initialization was successful | example: true
  - `message`: string | required | Human-readable message | example: "Charge created successfully"
  - `reference`: string | null | Transaction reference | example: "TXN_123456"
    - anyOf[1]: string
    - anyOf[2]: null
  - `checkout_url`: string | null | URL for customer to complete payment | example: "https://checkout.payment.com/tx/123"
    - anyOf[1]: string
    - anyOf[2]: null
- `400`: Bad request, e.g., duplicate transaction reference | schema: `InitializeErrorResponse`
  - `detail`: string | required | Error message describing what went wrong | example: "Error message"
  - example duplicate_reference: `{"detail":"Transaction reference not unique for merchant"}`
- `403`: Invalid payment secret key | schema: `InitializeErrorResponse`
  - `detail`: string | required | Error message describing what went wrong | example: "Error message"
  - example invalid_token: `{"detail":"Invalid payment secret key provided"}`
- `404`: Merchant not found | schema: `InitializeErrorResponse`
  - `detail`: string | required | Error message describing what went wrong | example: "Error message"
  - example merchant_not_found: `{"detail":"Merchant not found"}`
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### POST /api/v1/payout

- Summary: Payout
- Auth: HTTPBearer
- Query/Path Params:
- none
- Request Body:
- content-type: application/json | schema: `schemas__v1Schema__PayoutRequest` | required
  - `amount`: number | required | Amount to payout | example: 5000
  - `currency`: string | required | Currency code in ISO format | example: "NGN"
  - `reference`: string | required | Unique payout reference | example: "PAYOUT_123456"
  - `customer`: Customer | required | Customer details
    - `email`: string | required
    - `name`: string | null
  - `destination`: Destination | required | Destination bank details
    - `bank_code`: string | required | Bank code of the destination bank | example: "044"
    - `account_number`: string | required | Destination bank account number | example: "0123456789"
  - `metadata`: object | null | Custom metadata for the payout | example: {"order_id":"123"}
    - anyOf[1]: object
    - anyOf[2]: null
  - `narration`: string | null | Optional narration for the payout | example: "Payment for order 123"
    - anyOf[1]: string
    - anyOf[2]: null
- Responses:
- `200`: Successful Response | schema: `PayoutResponse`
  - `status`: boolean | required | Indicates if the payout was successful | example: true
  - `message`: string | required | Human-readable message | example: "Payout processed successfully"
  - `data`: object | required | Details of the payout including fees and customer information | example: {"amount":5000,"customer":{"email":"customer@example.com","name":"John Doe"},"fee":50,"reference":"PAYOUT_123456"}
    - type: object
- `400`: Bad request, e.g., insufficient balance or duplicate reference | schema: `PayoutErrorResponse`
  - `status_code`: integer | required | HTTP status code | examples: 400, 403, 404, 422
  - `detail`: string | required | Error message describing what went wrong | example: "Error message"
  - `email`: string | required | Customer's email address | example: "customer@example.com"
  - example insufficient_balance: `{"detail":"Insufficient balance"}`
  - example duplicate_reference: `{"detail":"Transaction reference not unique for merchant"}`
- `403`: Invalid token or bank code | schema: `PayoutErrorResponse`
  - `status_code`: integer | required | HTTP status code | examples: 400, 403, 404, 422
  - `detail`: string | required | Error message describing what went wrong | example: "Error message"
  - `email`: string | required | Customer's email address | example: "customer@example.com"
  - example invalid_token: `{"detail":"Invalid payment secret key"}`
  - example invalid_bank_code: `{"detail":"Invalid bank code provided"}`
- `404`: Merchant not found | schema: `PayoutErrorResponse`
  - `status_code`: integer | required | HTTP status code | examples: 400, 403, 404, 422
  - `detail`: string | required | Error message describing what went wrong | example: "Error message"
  - `email`: string | required | Customer's email address | example: "customer@example.com"
  - example merchant_not_found: `{"detail":"Merchant not found"}`
- `409`: Conflict - invalid account
  - example invalid_account: `{"status":false,"message":"Invalid account.","data":{"amount":5000,"fee":50,"reference":"PAYOUT_12346","customer":{"email":"user@example.com","name":"string"}}}`
- `422`: Invalid request, e.g., amount less than minimum 200 | schema: `PayoutErrorResponse`
  - `status_code`: integer | required | HTTP status code | examples: 400, 403, 404, 422
  - `detail`: string | required | Error message describing what went wrong | example: "Error message"
  - `email`: string | required | Customer's email address | example: "customer@example.com"
  - example amount_too_low: `{"detail":"Amount must be greater than 200"}`

### GET /api/v1/transactions/verify

- Summary: Verify
- Auth: HTTPBearer
- Query/Path Params:
- `reference`: query | string | required | Transaction reference
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `VerifyTransactionResponse`
  - `status`: boolean | required | Indicates if verification was successful | example: true
  - `message`: string | required | Human-readable message | example: "Verification successful"
  - `data`: TransactionData | required | Details of the verified transaction
    - `domain`: string | required | Transaction domain/mode | example: "TEST"
    - `type`: string | required | Transaction type | example: "PAYMENT"
    - `amount`: number | required | Transaction amount | example: 5000
    - `fee`: number | required | Transaction fee | example: 50
    - `currency`: string | required | Currency code in ISO format | example: "NGN"
    - `narration`: string | null | Optional narration | example: "Payment for order 123"
    - `metadata`: object | null | Custom metadata | example: {"order_id":"123"}
    - `created_at`: string | required | Timestamp when transaction was created | example: "2025-09-17T12:00:00Z"
    - `updated_at`: string | required | Timestamp when transaction was last updated | example: "2025-09-17T12:05:00Z"
    - `customer`: Customer | required | Customer details
- `400`: Bad request or verification failed | schema: `VerifyErrorResponse`
  - `status_code`: integer | required | HTTP status code | example: 404
  - `detail`: string | required | Error message describing what went wrong | example: "Transaction not found"
  - example invalid_ref: `{"detail":"Verification failed: invalid reference format"}`
- `403`: Invalid payment secret key | schema: `VerifyErrorResponse`
  - `status_code`: integer | required | HTTP status code | example: 404
  - `detail`: string | required | Error message describing what went wrong | example: "Transaction not found"
  - example invalid_token: `{"detail":"Invalid payment secret key provided"}`
- `404`: Merchant or transaction not found | schema: `VerifyErrorResponse`
  - `status_code`: integer | required | HTTP status code | example: 404
  - `detail`: string | required | Error message describing what went wrong | example: "Transaction not found"
  - example merchant_not_found: `{"detail":"Merchant not found"}`
  - example transaction_not_found: `{"detail":"Transaction not found"}`
  - example test_mode_error: `{"detail":"Test domain can only see transactions in test mode"}`
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### POST /api/v2/initiate

- Summary: Initiate Checkout V2
- Auth: HTTPBearer
- Query/Path Params:
- none
- Request Body:
- content-type: application/json | schema: `InitializeTransactionRequest` | required
  - `customer`: Customer | required
    - `email`: string | required
    - `name`: string | null
  - `amount`: number | required
  - `currency`: TransactionCurrency | required | Currency in lower case
    - type: NGN | KES | GES | XAF | XOF | EGP | TZS | BTC | ETH | USDT | SOL
  - `reference`: string | required
  - `redirect_url`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `notification_url`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `narration`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
  - `mode`: TransactionChannel | null
    - anyOf[1]: TransactionChannel
    - anyOf[2]: null
  - `metadata`: object | null
    - anyOf[1]: object
    - anyOf[2]: null
- Responses:
- `200`: Successful Response | schema: `InitializeTransactionResponse`
  - `status`: boolean | required | Indicates if the transaction initialization was successful | example: true
  - `message`: string | required | Human-readable message | example: "Charge created successfully"
  - `reference`: string | null | Transaction reference | example: "TXN_123456"
    - anyOf[1]: string
    - anyOf[2]: null
  - `checkout_url`: string | null | URL for customer to complete payment | example: "https://checkout.payment.com/tx/123"
    - anyOf[1]: string
    - anyOf[2]: null
- `400`: Bad request, e.g., duplicate transaction reference | schema: `InitializeErrorResponse`
  - `detail`: string | required | Error message describing what went wrong | example: "Error message"
  - example duplicate_reference: `{"detail":"Transaction reference not unique for merchant"}`
- `403`: Invalid payment secret key | schema: `InitializeErrorResponse`
  - `detail`: string | required | Error message describing what went wrong | example: "Error message"
  - example invalid_token: `{"detail":"Invalid payment secret key provided"}`
- `404`: Merchant not found | schema: `InitializeErrorResponse`
  - `detail`: string | required | Error message describing what went wrong | example: "Error message"
  - example merchant_not_found: `{"detail":"Merchant not found"}`
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /banks

- Summary: Get Banks
- Auth: none documented
- Query/Path Params:
- none
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object

### GET /cryptos

- Summary: Get Cryptos
- Auth: none documented
- Query/Path Params:
- none
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `array<CryptoDetail>`
  - items: CryptoDetail
    - `id`: string | required | Unique identifier for the cryptocurrency | example: "1"
    - `name`: string | required | The name of the cryptocurrency | example: "Bitcoin"
    - `slug`: string | required | A short identifier for the cryptocurrency | example: "btc"
    - `blockchain`: string | required | The blockchain network it belongs to | example: "bitcoin"
    - `standard`: string | required | Token standard (e.g., ERC20, native) | example: "native"
    - `symbol`: string | required | The symbol of the cryptocurrency | example: "BTC"

## V2 Checkout

### POST /api/v2/complete

- Summary: Complete Checkout V2
- Auth: none documented
- Query/Path Params:
- none
- Request Body:
- content-type: application/json | schema: `CompleteTransactionRequest` | required
  - `reference`: string | required
  - `datetime`: string | required
  - `channel`: TransactionChannel | required
    - type: card | bank_transfer | crypto | mobile_money
  - `mobile_money_number`: string | null
    - anyOf[1]: string
    - anyOf[2]: null
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### POST /api/v2/complete/authorize

- Summary: Authorize Mobile Money Checkout
- Description: Authorize mobile money transaction with OTP/PIN This endpoint is called after the initial mobile money charge has been initiated and the user has received an OTP or PIN prompt
- Auth: none documented
- Query/Path Params:
- none
- Request Body:
- content-type: application/json | schema: `AuthroizeMmRequest` | required
  - `reference`: string | required
  - `datetime`: string | required
  - `otp`: string | required
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

## Wallets

### GET /wallets

- Summary: Get Merchant Wallets
- Description: Get all wallets for a merchant, optionally filtered by mode.
- Auth: HTTPBearer
- Query/Path Params:
- `merchant_id`: query | string | required | Merchant ID
- `mode`: query | string | null | Filter by mode: test or live
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `array<WalletResponse>`
  - items: WalletResponse
    - `id`: integer | required
    - `merchant_id`: string | required
    - `currency`: string | required
    - `balance`: number | required
    - `mode`: string | required
    - `percentage_charge`: number | required
    - `flat_charge`: number | required
    - `payout_percentage_charge`: number | required
    - `payout_flat_charge`: number | required
    - `is_active`: boolean | required
    - `created_at`: string | required
    - `updated_at`: string | required
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### DELETE /wallets/{wallet_id}

- Summary: Delete Wallet
- Description: Delete a wallet (only if balance is zero).
- Auth: HTTPBearer
- Query/Path Params:
- `wallet_id`: path | integer | required
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /wallets/{wallet_id}

- Summary: Get Wallet By Id
- Description: Get a specific wallet by ID.
- Auth: HTTPBearer
- Query/Path Params:
- `wallet_id`: path | integer | required
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `WalletResponse`
  - `id`: integer | required
  - `merchant_id`: string | required
  - `currency`: string | required
  - `balance`: number | required
  - `mode`: string | required
  - `percentage_charge`: number | required
  - `flat_charge`: number | required
  - `payout_percentage_charge`: number | required
  - `payout_flat_charge`: number | required
  - `is_active`: boolean | required
  - `created_at`: string | required
  - `updated_at`: string | required
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### PATCH /wallets/{wallet_id}/charges

- Summary: Update Wallet Charges
- Description: Update charge configuration for a wallet.
- Auth: HTTPBearer
- Query/Path Params:
- `wallet_id`: path | integer | required
- Request Body:
- content-type: application/json | schema: `WalletUpdateChargesRequest` | required
  - `percentage_charge`: number | null | Payin percentage charge
    - anyOf[1]: number
    - anyOf[2]: null
  - `flat_charge`: number | null | Payin flat charge
    - anyOf[1]: number
    - anyOf[2]: null
  - `payout_percentage_charge`: number | null | Payout percentage charge
    - anyOf[1]: number
    - anyOf[2]: null
  - `payout_flat_charge`: number | null | Payout flat charge
    - anyOf[1]: number
    - anyOf[2]: null
- Responses:
- `200`: Successful Response | schema: `WalletResponse`
  - `id`: integer | required
  - `merchant_id`: string | required
  - `currency`: string | required
  - `balance`: number | required
  - `mode`: string | required
  - `percentage_charge`: number | required
  - `flat_charge`: number | required
  - `payout_percentage_charge`: number | required
  - `payout_flat_charge`: number | required
  - `is_active`: boolean | required
  - `created_at`: string | required
  - `updated_at`: string | required
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### PATCH /wallets/{wallet_id}/toggle-active

- Summary: Toggle Wallet Active
- Description: Toggle wallet active status.
- Auth: HTTPBearer
- Query/Path Params:
- `wallet_id`: path | integer | required
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `WalletResponse`
  - `id`: integer | required
  - `merchant_id`: string | required
  - `currency`: string | required
  - `balance`: number | required
  - `mode`: string | required
  - `percentage_charge`: number | required
  - `flat_charge`: number | required
  - `payout_percentage_charge`: number | required
  - `payout_flat_charge`: number | required
  - `is_active`: boolean | required
  - `created_at`: string | required
  - `updated_at`: string | required
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /wallets/balance/summary

- Summary: Get Wallet Balance Summary
- Description: Get balance summary for all merchant wallets.
- Auth: HTTPBearer
- Query/Path Params:
- `merchant_id`: query | string | required | Merchant ID
- `mode`: query | string | null | Filter by mode: test or live
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `WalletBalanceResponse`
  - `merchant_id`: string | required
  - `wallets`: array<WalletResponse> | required
    - items: WalletResponse
  - `total_balances_by_currency`: object | required
    - type: object
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### GET /wallets/by-criteria

- Summary: Get Wallets By Criteria
- Description: Get wallets by merchant, currencies (multiple), and optional mode.
- Auth: HTTPBearer
- Query/Path Params:
- `merchant_id`: query | string | required | Merchant ID
- `currencies`: query | string | null | Comma-separated list of currencies (e.g., 'NGN,USD,GHS')
- `mode`: query | string | null | Filter by mode: test or live
- Request Body:
- none
- Responses:
- `200`: Successful Response | schema: `array<WalletResponse>`
  - items: WalletResponse
    - `id`: integer | required
    - `merchant_id`: string | required
    - `currency`: string | required
    - `balance`: number | required
    - `mode`: string | required
    - `percentage_charge`: number | required
    - `flat_charge`: number | required
    - `payout_percentage_charge`: number | required
    - `payout_flat_charge`: number | required
    - `is_active`: boolean | required
    - `created_at`: string | required
    - `updated_at`: string | required
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### POST /wallets/create

- Summary: Create Wallet
- Description: Create a new wallet for a merchant with specific currency and mode.
- Auth: HTTPBearer
- Query/Path Params:
- none
- Request Body:
- content-type: application/json | schema: `WalletCreateRequest` | required
  - `merchant_id`: string | required
  - `currency`: string | required | examples: "NGN", "USD", "GHS", "KES"
  - `mode`: string | required | examples: "test", "live"
  - `percentage_charge`: number | null | Payin percentage charge | default: 1.5
    - anyOf[1]: number
    - anyOf[2]: null
  - `flat_charge`: number | null | Payin flat charge | default: 0
    - anyOf[1]: number
    - anyOf[2]: null
  - `payout_percentage_charge`: number | null | Payout percentage charge | default: 0
    - anyOf[1]: number
    - anyOf[2]: null
  - `payout_flat_charge`: number | null | Payout flat charge | default: 50
    - anyOf[1]: number
    - anyOf[2]: null
- Responses:
- `201`: Successful Response | schema: `WalletResponse`
  - `id`: integer | required
  - `merchant_id`: string | required
  - `currency`: string | required
  - `balance`: number | required
  - `mode`: string | required
  - `percentage_charge`: number | required
  - `flat_charge`: number | required
  - `payout_percentage_charge`: number | required
  - `payout_flat_charge`: number | required
  - `is_active`: boolean | required
  - `created_at`: string | required
  - `updated_at`: string | required
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

### POST /wallets/transfer

- Summary: Transfer Between Wallets
- Description: Transfer funds between two wallets (must belong to same merchant).
- Auth: HTTPBearer
- Query/Path Params:
- none
- Request Body:
- content-type: application/json | schema: `WalletTransferRequest` | required
  - `from_wallet_id`: integer | required
  - `to_wallet_id`: integer | required
  - `amount`: number | required | Amount to transfer
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError

## Webhooks

### POST /webhook/test-signature

- Summary: Test Webhook Signature
- Description: Generate a signed webhook payload using your full secret key and verify it — exactly as your merchant server should do. Pass your full secret token (e.g. aggsk_test_xxxxx_merchant_id). The raw HMAC secret is extracted automatically. Returns the payload string, the signature to expect in X-AGGREGATOR-SIGNATURE, and a tamper test confirming a wrong secret is rejected.
- Auth: none documented
- Query/Path Params:
- none
- Request Body:
- content-type: application/json | schema: `WebhookTestRequest` | required
  - `secret_key`: string | required
  - `payload`: object | null
    - anyOf[1]: object
    - anyOf[2]: null
- Responses:
- `200`: Successful Response | schema: `object`
  - type: object
- `422`: Validation Error | schema: `HTTPValidationError`
  - `detail`: array<ValidationError>
    - items: ValidationError
