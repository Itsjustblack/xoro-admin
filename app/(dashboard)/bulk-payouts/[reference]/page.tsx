import { BulkPayoutDetailsContent } from "@/components/bulk-payouts/bulk-payout-details-content"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bulk Payout Details | Xoro Admin",
  description: "View and manage this payout batch execution history.",
}

export default async function BulkPayoutDetailsPage({
  params,
}: {
  params: Promise<{ reference: string }>
}) {
  const { reference } = await params
  return <BulkPayoutDetailsContent reference={reference} />
}
