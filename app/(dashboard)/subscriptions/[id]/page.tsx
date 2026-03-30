import { Metadata } from "next"
import { SubscriptionDetailsContent } from "@/components/subscriptions/subscription-details-content"

export const metadata: Metadata = {
  title: "Subscription Details | Xoro Admin",
  description: "View comprehensive information for a specific subscription.",
}

export default function SubscriptionDetailsPage() {
  return <SubscriptionDetailsContent />
}
