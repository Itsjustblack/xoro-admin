import { PayInsContent } from "@/components/pay-ins/pay-ins-content"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pay-Ins | Xoro Admin",
  description: "Real-time overview of all incoming merchant transactions.",
}

export default function PayInsPage() {
  return <PayInsContent />
}
