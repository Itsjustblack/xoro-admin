import { Metadata } from "next"
import { RefundsContent } from "@/components/refunds/refunds-content"

export const metadata: Metadata = {
  title: "Refunds | Xoro Admin",
  description: "Manage and track customer refund requests and processing status.",
}

export default function RefundsPage() {
  return <RefundsContent />
}
