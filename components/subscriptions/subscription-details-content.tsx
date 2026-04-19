"use client"

import {
  cancelSubscription,
  pauseSubscription,
  resumeSubscription,
  retrySubscriptionPayment,
  updateSubscription,
} from "@/lib/api/v1/subscriptions/actions"
import { subscriptionQueryKeys } from "@/lib/api/v1/query-key-factory"
import {
  getSubscriptionBillingPreview,
  getSubscriptionById,
  getSubscriptions,
} from "@/lib/api/v1/subscriptions/queries"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SubscriptionKPIs } from "./subscription-kpis"
import { HealthOverview } from "./health-overview"
import { PlanSubscribersTable } from "./plan-subscribers-table"
import { PlanInfoSidebar } from "./plan-info-sidebar"
import { buildPlanDetails } from "./subscription-view-model"

export function SubscriptionDetailsContent() {
  const { id } = useParams()
  const productId = String(id)
  const queryClient = useQueryClient()
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState("")
  const [subscriberName, setSubscriberName] = useState("")
  const [subscriberPhone, setSubscriberPhone] = useState("")
  const [externalId, setExternalId] = useState("")
  const [priceOverride, setPriceOverride] = useState("")
  const [pauseReason, setPauseReason] = useState("")
  const [pauseResumeAt, setPauseResumeAt] = useState("")
  const [cancelReason, setCancelReason] = useState("")
  const [cancelAtPeriodEnd, setCancelAtPeriodEnd] = useState("true")
  const [discountCode, setDiscountCode] = useState("")

  const { data: subscriptionResponse } = useQuery({
    queryKey: subscriptionQueryKeys.list(1, 100, null, productId),
    queryFn: () => getSubscriptions({ product_id: productId, page_size: 100 }),
    enabled: Boolean(productId),
  })

  const subscriptions = subscriptionResponse?.items ?? []
  const plan = buildPlanDetails(productId, subscriptions)
  const activeSubscriptionId = selectedSubscriptionId || plan.activeSubscriptionId

  const { data: activeSubscription, isPending: isLoadingActiveSubscription } =
    useQuery({
      queryKey: subscriptionQueryKeys.detail(activeSubscriptionId ?? ""),
      queryFn: () => getSubscriptionById(activeSubscriptionId!),
      enabled: Boolean(activeSubscriptionId),
    })

  const { data: billingPreview } = useQuery({
    queryKey: subscriptionQueryKeys.billingPreview(activeSubscriptionId ?? ""),
    queryFn: () => getSubscriptionBillingPreview(activeSubscriptionId!),
    enabled: Boolean(activeSubscriptionId),
  })

  useEffect(() => {
    if (!selectedSubscriptionId && plan.activeSubscriptionId) {
      setSelectedSubscriptionId(plan.activeSubscriptionId)
    }
  }, [plan.activeSubscriptionId, selectedSubscriptionId])

  useEffect(() => {
    if (!activeSubscription) {
      return
    }

    setSubscriberName(activeSubscription.subscriber_name ?? "")
    setSubscriberPhone(activeSubscription.subscriber_phone ?? "")
    setExternalId(activeSubscription.external_id ?? "")
    setPriceOverride(
      activeSubscription.price_override === null ||
        activeSubscription.price_override === undefined
        ? ""
        : String(activeSubscription.price_override),
    )
  }, [activeSubscription])

  const invalidateSubscriptions = async () => {
    await queryClient.invalidateQueries({
      queryKey: subscriptionQueryKeys.all,
    })
  }

  const { mutate: submitSubscriptionUpdate, isPending: isUpdating } =
    useMutation({
      mutationFn: () =>
        updateSubscription(activeSubscriptionId!, {
          subscriber_name: subscriberName.trim() || undefined,
          subscriber_phone: subscriberPhone.trim() || null,
          external_id: externalId.trim() || null,
          price_override: priceOverride.trim() || null,
        }),
      onSuccess: async () => {
        await invalidateSubscriptions()
        toast.success("Subscription updated successfully")
      },
      onError: () => {
        toast.error("Unable to update subscription")
      },
    })

  const { mutate: submitPause, isPending: isPausing } = useMutation({
    mutationFn: () =>
      pauseSubscription(activeSubscriptionId!, {
        reason: pauseReason.trim() || null,
        resume_at: pauseResumeAt || null,
      }),
    onSuccess: async () => {
      await invalidateSubscriptions()
      toast.success("Subscription paused successfully")
    },
    onError: () => {
      toast.error("Unable to pause subscription")
    },
  })

  const { mutate: submitResume, isPending: isResuming } = useMutation({
    mutationFn: () => resumeSubscription(activeSubscriptionId!),
    onSuccess: async () => {
      await invalidateSubscriptions()
      toast.success("Subscription resumed successfully")
    },
    onError: () => {
      toast.error("Unable to resume subscription")
    },
  })

  const { mutate: submitCancel, isPending: isCancelling } = useMutation({
    mutationFn: () =>
      cancelSubscription(activeSubscriptionId!, {
        cancel_at_period_end: cancelAtPeriodEnd === "true",
        reason: cancelReason.trim() || null,
      }),
    onSuccess: async () => {
      await invalidateSubscriptions()
      toast.success("Subscription cancelled successfully")
    },
    onError: () => {
      toast.error("Unable to cancel subscription")
    },
  })

  const { mutate: submitRetryPayment, isPending: isRetrying } = useMutation({
    mutationFn: () =>
      retrySubscriptionPayment(
        activeSubscriptionId!,
        discountCode.trim() || undefined,
      ),
    onSuccess: async () => {
      await invalidateSubscriptions()
      toast.success("Retry payment link created successfully")
    },
    onError: () => {
      toast.error("Unable to retry subscription payment")
    },
  })

  const selectedSubscriptionLabel = useMemo(() => {
    if (!activeSubscription) {
      return "No active subscription selected"
    }

    return `${
      activeSubscription.subscriber_name || activeSubscription.subscriber_email
    } - ${activeSubscription.status}`
  }, [activeSubscription])

  return (
    <div className="flex h-full w-full flex-col gap-8 p-4 sm:p-6 lg:p-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="font-secondary text-5xl font-black tracking-tight text-text-primary">
            Subscription Details
          </h1>
          <p className="font-primary text-base font-medium text-text-secondary">
            View and manage this subscription plan
          </p>
        </div>
        <Button
          variant="outline"
          disabled={!activeSubscriptionId || isResuming}
          onClick={() => submitResume()}
          className="h-12 rounded-none border-text-primary/10 bg-transparent px-6 font-bold text-text-primary hover:bg-surface-2"
        >
          {isResuming ? "Resuming..." : "Resume Subscription"}
        </Button>
      </section>

      <section className="grid grid-cols-1 gap-4 rounded-3xl border border-surface-3 bg-surface-1 p-5 lg:grid-cols-4">
        <div className="space-y-2 lg:col-span-2">
          <Label>Active Subscription</Label>
          <Select
            value={activeSubscriptionId ?? ""}
            onValueChange={setSelectedSubscriptionId}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a subscription" />
            </SelectTrigger>
            <SelectContent>
              {subscriptions.map((subscription) => (
                <SelectItem key={subscription.id} value={subscription.id}>
                  {subscription.subscriber_name || subscription.subscriber_email}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Status</Label>
          <div className="rounded-xl border border-surface-3 px-3 py-2 text-sm font-medium text-text-primary">
            {activeSubscription?.status ?? plan.activeSubscriptionStatus ?? "N/A"}
          </div>
        </div>
        <div className="space-y-2">
          <Label>Billing End</Label>
          <div className="rounded-xl border border-surface-3 px-3 py-2 text-sm font-medium text-text-primary">
            {activeSubscription?.current_period_end ??
              plan.activeSubscriptionPeriodEnd ??
              "N/A"}
          </div>
        </div>
      </section>

      <SubscriptionKPIs plan={plan} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-8">
          <section className="rounded-3xl border border-surface-3 bg-surface-1 p-6 shadow-sm">
            <div className="mb-5 space-y-1">
              <h2 className="text-lg font-bold text-text-primary">
                Update Subscription
              </h2>
              <p className="text-sm text-text-secondary">
                Update subscriber details for the active subscription.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="subscriber-name-update">Subscriber Name</Label>
                <Input
                  id="subscriber-name-update"
                  value={subscriberName}
                  onChange={(event) => setSubscriberName(event.target.value)}
                  placeholder="Subscriber name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subscriber-phone-update">Subscriber Phone</Label>
                <Input
                  id="subscriber-phone-update"
                  value={subscriberPhone}
                  onChange={(event) => setSubscriberPhone(event.target.value)}
                  placeholder="Subscriber phone"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="external-id-update">External ID</Label>
                <Input
                  id="external-id-update"
                  value={externalId}
                  onChange={(event) => setExternalId(event.target.value)}
                  placeholder="External ID"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price-override-update">Price Override</Label>
                <Input
                  id="price-override-update"
                  value={priceOverride}
                  onChange={(event) => setPriceOverride(event.target.value)}
                  placeholder="Price override"
                />
              </div>
            </div>

            <div className="mt-5">
              <Button
                disabled={!activeSubscriptionId || isUpdating || isLoadingActiveSubscription}
                onClick={() => submitSubscriptionUpdate()}
                className="w-full"
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div className="rounded-3xl border border-surface-3 bg-surface-1 p-6 shadow-sm">
              <div className="mb-5 space-y-1">
                <h2 className="text-lg font-bold text-text-primary">
                  Pause Subscription
                </h2>
                <p className="text-sm text-text-secondary">
                  Set a pause reason and optional resume date.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pause-reason">Pause Reason</Label>
                  <Input
                    id="pause-reason"
                    value={pauseReason}
                    onChange={(event) => setPauseReason(event.target.value)}
                    placeholder="Optional pause reason"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pause-resume-at">Resume At</Label>
                  <Input
                    id="pause-resume-at"
                    type="datetime-local"
                    value={pauseResumeAt}
                    onChange={(event) => setPauseResumeAt(event.target.value)}
                  />
                </div>
                <Button
                  variant="outline"
                  disabled={!activeSubscriptionId || isPausing || isLoadingActiveSubscription}
                  onClick={() => submitPause()}
                  className="w-full"
                >
                  {isPausing ? "Pausing..." : "Pause Subscription"}
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-surface-3 bg-surface-1 p-6 shadow-sm">
              <div className="mb-5 space-y-1">
                <h2 className="text-lg font-bold text-text-primary">
                  Cancel Subscription
                </h2>
                <p className="text-sm text-text-secondary">
                  Choose whether cancellation happens now or at period end.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Cancel Timing</Label>
                  <Select
                    value={cancelAtPeriodEnd}
                    onValueChange={setCancelAtPeriodEnd}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">End of current period</SelectItem>
                      <SelectItem value="false">Cancel immediately</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cancel-reason">Cancel Reason</Label>
                  <Input
                    id="cancel-reason"
                    value={cancelReason}
                    onChange={(event) => setCancelReason(event.target.value)}
                    placeholder="Optional cancel reason"
                  />
                </div>
                <Button
                  variant="outline"
                  disabled={!activeSubscriptionId || isCancelling || isLoadingActiveSubscription}
                  onClick={() => submitCancel()}
                  className="w-full"
                >
                  {isCancelling ? "Cancelling..." : "Cancel Subscription"}
                </Button>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-surface-3 bg-surface-1 p-6 shadow-sm">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-text-primary">
                Billing Preview
              </h2>
              <p className="text-sm text-text-secondary">
                {selectedSubscriptionLabel}
              </p>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-surface-3 p-4">
                <p className="text-xs font-bold uppercase text-text-muted">
                  Product
                </p>
                <p className="mt-2 font-semibold text-text-primary">
                  {billingPreview?.product_name ?? "N/A"}
                </p>
              </div>
              <div className="rounded-2xl border border-surface-3 p-4">
                <p className="text-xs font-bold uppercase text-text-muted">
                  Total
                </p>
                <p className="mt-2 font-semibold text-text-primary">
                  {billingPreview
                    ? `${billingPreview.total} ${billingPreview.currency}`
                    : "N/A"}
                </p>
              </div>
              <div className="rounded-2xl border border-surface-3 p-4">
                <p className="text-xs font-bold uppercase text-text-muted">
                  Billing Interval
                </p>
                <p className="mt-2 font-semibold text-text-primary">
                  {billingPreview?.billing_interval ?? "N/A"}
                </p>
              </div>
              <div className="rounded-2xl border border-surface-3 p-4">
                <p className="text-xs font-bold uppercase text-text-muted">
                  Base Price
                </p>
                <p className="mt-2 font-semibold text-text-primary">
                  {billingPreview
                    ? `${billingPreview.base_price} ${billingPreview.currency}`
                    : "N/A"}
                </p>
              </div>
              <div className="rounded-2xl border border-surface-3 p-4">
                <p className="text-xs font-bold uppercase text-text-muted">
                  Discount
                </p>
                <p className="mt-2 font-semibold text-text-primary">
                  {billingPreview
                    ? `${billingPreview.discount_amount} ${billingPreview.currency}`
                    : "N/A"}
                </p>
              </div>
              <div className="rounded-2xl border border-surface-3 p-4">
                <p className="text-xs font-bold uppercase text-text-muted">
                  Entity Charges
                </p>
                <p className="mt-2 font-semibold text-text-primary">
                  {billingPreview
                    ? `${billingPreview.entity_charges} ${billingPreview.currency}`
                    : "N/A"}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-surface-3 p-4">
              <div className="mb-4 space-y-1">
                <h3 className="text-base font-bold text-text-primary">
                  Retry Payment
                </h3>
                <p className="text-sm text-text-secondary">
                  Generate a fresh payment link for this subscription.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="discount-code">Discount Code</Label>
                  <Input
                    id="discount-code"
                    value={discountCode}
                    onChange={(event) => setDiscountCode(event.target.value)}
                    placeholder="Optional discount code"
                  />
                </div>
                <Button
                  disabled={!activeSubscriptionId || isRetrying || isLoadingActiveSubscription}
                  onClick={() => submitRetryPayment()}
                  className="w-full"
                >
                  {isRetrying ? "Retrying..." : "Retry Payment"}
                </Button>
              </div>
            </div>
          </section>

          <HealthOverview stats={plan.healthStats} />
          <PlanSubscribersTable data={plan.subscribers} />
        </div>

        <div className="lg:col-span-4">
          <PlanInfoSidebar plan={plan} />
        </div>
      </div>
    </div>
  )
}
