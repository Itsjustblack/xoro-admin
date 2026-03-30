import { PayOutsContent } from "@/components/pay-outs/pay-outs-content"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pay-Outs | Xoro Admin",
  description: "Manage and track your outgoing merchant transfers and vendor payments.",
}

export default function PayOutsPage() {
  return <PayOutsContent />
}
