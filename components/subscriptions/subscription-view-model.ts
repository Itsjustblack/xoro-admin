import type {
  DetailedPlanSubscription,
  IndividualSubscriber,
  SubscriptionItem,
} from "@/lib/types"
import { formatCount, formatCurrency, formatPercent } from "@/lib/utils"

type ActivityType = DetailedPlanSubscription["recentActivity"][number]["type"]

export type SubscriptionPlanSummary = {
  id: string
  name: string
  subscribers: number
  price: string
  billingCycle: string
  status: string
}

export type SubscriptionOverview = {
  totalSubscriptions: number
  activeSubscriptions: number
  activeRate: string
  churnRate: string
}

export type SubscriptionTrendPoint = {
  month: string
  amount: number
}

function parseNumericValue(value: SubscriptionItem["price_override"]) {
  if (value === null || value === undefined || value === "") {
    return null
  }

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function formatDate(value?: string | null, options?: Intl.DateTimeFormatOptions) {
  if (!value) {
    return "N/A"
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return "N/A"
  }

  return new Intl.DateTimeFormat("en-NG", options).format(date)
}

function formatShortProductId(productId: string) {
  return `Product ${productId.slice(0, 8)}`
}

function getPlanStatus(subscriptions: SubscriptionItem[]) {
  const statuses = subscriptions.map((subscription) => subscription.status)

  if (statuses.every((status) => ["cancelled", "expired"].includes(status))) {
    return "Archived"
  }

  if (
    statuses.some((status) =>
      ["pending", "past_due", "grace", "paused"].includes(status),
    )
  ) {
    return "Review"
  }

  return "Active"
}

function buildActivity(subscription: SubscriptionItem) {
  const events: Array<{
    id: string
    type: ActivityType
    title: string
    timestamp: string
    sortKey: number
  }> = []

  const createdAt = new Date(subscription.created_at).getTime()
  if (!Number.isNaN(createdAt)) {
    events.push({
      id: `${subscription.id}-created`,
      type: "created",
      title: "Subscription created",
      timestamp: formatDate(subscription.created_at, {
        dateStyle: "medium",
        timeStyle: "short",
      }),
      sortKey: createdAt,
    })
  }

  const updatedAt = new Date(subscription.updated_at).getTime()
  if (
    !Number.isNaN(updatedAt) &&
    subscription.updated_at !== subscription.created_at
  ) {
    events.push({
      id: `${subscription.id}-updated`,
      type: "successful",
      title: "Subscription updated",
      timestamp: formatDate(subscription.updated_at, {
        dateStyle: "medium",
        timeStyle: "short",
      }),
      sortKey: updatedAt,
    })
  }

  const cancelledAt = new Date(subscription.cancelled_at ?? "").getTime()
  if (!Number.isNaN(cancelledAt)) {
    events.push({
      id: `${subscription.id}-cancelled`,
      type: "successful",
      title: "Subscription cancelled",
      timestamp: formatDate(subscription.cancelled_at, {
        dateStyle: "medium",
        timeStyle: "short",
      }),
      sortKey: cancelledAt,
    })
  }

  return events
}

export function buildSubscriptionPlans(
  subscriptions: SubscriptionItem[],
): SubscriptionPlanSummary[] {
  const grouped = new Map<string, SubscriptionItem[]>()

  subscriptions.forEach((subscription) => {
    const existing = grouped.get(subscription.product_id) ?? []
    existing.push(subscription)
    grouped.set(subscription.product_id, existing)
  })

  return Array.from(grouped.entries())
    .map(([productId, items]) => {
      const priceValues = items
        .map((item) => parseNumericValue(item.price_override))
        .filter((value): value is number => value !== null)
      const averagePrice =
        priceValues.length > 0
          ? priceValues.reduce((sum, value) => sum + value, 0) / priceValues.length
          : null

      return {
        id: productId,
        name: formatShortProductId(productId),
        subscribers: items.length,
        price: averagePrice === null ? "N/A" : formatCurrency(averagePrice),
        billingCycle: "N/A",
        status: getPlanStatus(items),
      }
    })
    .sort((left, right) => right.subscribers - left.subscribers)
}

export function buildSubscriptionOverview(
  subscriptions: SubscriptionItem[],
): SubscriptionOverview {
  const totalSubscriptions = subscriptions.length
  const activeSubscriptions = subscriptions.filter(
    (subscription) => subscription.status === "active",
  ).length
  const cancelledOrExpired = subscriptions.filter((subscription) =>
    ["cancelled", "expired"].includes(subscription.status),
  ).length

  const activeRate =
    totalSubscriptions === 0
      ? "0.0%"
      : formatPercent((activeSubscriptions / totalSubscriptions) * 100)
  const churnRate =
    totalSubscriptions === 0
      ? "0.0%"
      : formatPercent((cancelledOrExpired / totalSubscriptions) * 100)

  return {
    totalSubscriptions,
    activeSubscriptions,
    activeRate,
    churnRate,
  }
}

export function buildSubscriptionTrend(
  subscriptions: SubscriptionItem[],
): SubscriptionTrendPoint[] {
  const now = new Date()
  const monthKeys = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1)
    const key = `${date.getFullYear()}-${date.getMonth()}`

    return {
      key,
      label: new Intl.DateTimeFormat("en-NG", { month: "short" })
        .format(date)
        .toUpperCase(),
    }
  })

  const counts = new Map(monthKeys.map(({ key }) => [key, 0]))

  subscriptions.forEach((subscription) => {
    const createdAt = new Date(subscription.created_at)
    if (Number.isNaN(createdAt.getTime())) {
      return
    }

    const key = `${createdAt.getFullYear()}-${createdAt.getMonth()}`
    if (counts.has(key)) {
      counts.set(key, (counts.get(key) ?? 0) + 1)
    }
  })

  return monthKeys.map(({ key, label }) => ({
    month: label,
    amount: counts.get(key) ?? 0,
  }))
}

export function buildPlanDetails(
  productId: string,
  subscriptions: SubscriptionItem[],
): DetailedPlanSubscription {
  const sortedSubscriptions = [...subscriptions].sort((left, right) => {
    return (
      new Date(right.created_at).getTime() - new Date(left.created_at).getTime()
    )
  })

  const activeSubscribers = subscriptions.filter(
    (subscription) => subscription.status === "active",
  ).length
  const cancelledSubscribers = subscriptions.filter((subscription) =>
    ["cancelled", "expired"].includes(subscription.status),
  ).length
  const pastDueSubscribers = subscriptions.filter((subscription) =>
    ["past_due", "grace"].includes(subscription.status),
  ).length
  const totalSubscribers = subscriptions.length
  const revenueValues = subscriptions
    .map((subscription) => parseNumericValue(subscription.price_override))
    .filter((value): value is number => value !== null)
  const monthlyRevenue =
    revenueValues.length > 0
      ? formatCurrency(revenueValues.reduce((sum, value) => sum + value, 0))
      : "N/A"

  const subscribers: IndividualSubscriber[] = sortedSubscriptions.map(
    (subscription) => ({
      id: subscription.id,
      customerName:
        subscription.subscriber_name || subscription.subscriber_email,
      email: subscription.subscriber_email,
      planType: formatShortProductId(subscription.product_id),
      status:
        subscription.status === "active"
          ? "Active"
          : subscription.status === "cancelled" ||
              subscription.status === "expired"
            ? "Canceled"
            : "Past Due",
      nextBillingDate: formatDate(subscription.current_period_end, {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      amount:
        parseNumericValue(subscription.price_override) === null
          ? "N/A"
          : formatCurrency(parseNumericValue(subscription.price_override) ?? 0),
    }),
  )

  const recentActivity = sortedSubscriptions
    .flatMap(buildActivity)
    .sort((left, right) => right.sortKey - left.sortKey)
    .slice(0, 5)
    .map((event) => ({
      id: event.id,
      type: event.type,
      title: event.title,
      timestamp: event.timestamp,
    }))

  return {
    id: productId,
    planName: formatShortProductId(productId),
    price:
      revenueValues.length > 0
        ? formatCurrency(revenueValues[0] ?? 0)
        : "N/A",
    billingCycle: "N/A",
    trialPeriod:
      subscriptions.some((subscription) => Boolean(subscription.trial_end))
        ? "Trial available"
        : "None",
    createdDate: formatDate(sortedSubscriptions.at(-1)?.created_at, {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    totalSubscribers,
    activeSubscribers,
    monthlyRevenue,
    churnRate:
      totalSubscribers === 0
        ? "0.0%"
        : formatPercent((cancelledSubscribers / totalSubscribers) * 100),
    healthStats: {
      active:
        totalSubscribers === 0
          ? 0
          : Math.round((activeSubscribers / totalSubscribers) * 100),
      cancelled:
        totalSubscribers === 0
          ? 0
          : Math.round((cancelledSubscribers / totalSubscribers) * 100),
      pastDue:
        totalSubscribers === 0
          ? 0
          : Math.round((pastDueSubscribers / totalSubscribers) * 100),
    },
    recentActivity:
      recentActivity.length > 0
        ? recentActivity
        : [
            {
              id: `${productId}-empty`,
              type: "created",
              title: "No recent activity",
              timestamp: "No updates yet",
            },
          ],
    subscribers,
  }
}

export function getTrendChangeLabel(trend: SubscriptionTrendPoint[]) {
  if (trend.length < 2) {
    return "0.0%"
  }

  const previous = trend.at(-2)?.amount ?? 0
  const current = trend.at(-1)?.amount ?? 0

  if (previous === 0) {
    return current === 0 ? "0.0%" : "100.0%"
  }

  return formatPercent(((current - previous) / previous) * 100)
}

export function getSubscriptionCountLabel(count: number) {
  return `${formatCount(count)} subscription${count === 1 ? "" : "s"}`
}
