import { CheckoutLinkDetailsContent } from "@/components/checkout-links/checkout-link-details-content"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Checkout Link Details | Xoro Admin",
  description: "View and manage this checkout link execution history.",
}

export default async function CheckoutLinkDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return <CheckoutLinkDetailsContent id={id} />
}
