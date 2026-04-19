import { CheckoutLinksContent } from "@/components/checkout-links/checkout-links-content"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Checkout Links | Xoro Admin",
  description: "Manage and share payment links for your products",
}

export default function CheckoutLinksPage() {
  return <CheckoutLinksContent />
}
