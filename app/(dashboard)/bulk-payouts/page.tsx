import { BulkPayoutsContent } from "@/components/bulk-payouts/bulk-payouts-content"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bulk Payouts | Xoro Admin",
  description: "Manage and monitor your bulk payouts",
}

export default function BulkPayoutsPage() {
  return <BulkPayoutsContent />
}
