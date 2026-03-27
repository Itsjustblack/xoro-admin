import { Metadata } from "next"
import { BulkPayoutsContent } from "@/components/bulk-payouts/bulk-payouts-content"

export const metadata: Metadata = {
  title: "Bulk Payouts | Xoro Admin",
  description: "Manage and monitor your bulk payouts",
}

export default function BulkPayoutsPage() {
  return <BulkPayoutsContent />
}
