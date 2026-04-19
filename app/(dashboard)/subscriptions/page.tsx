import { SubscriptionsContent } from "@/components/subscriptions/subscriptions-content"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Subscriptions | Xoro Admin",
  description: "Manage your billing plans and monitor subscriber growth.",
}

export default function SubscriptionsPage() {
  return <SubscriptionsContent />
}
