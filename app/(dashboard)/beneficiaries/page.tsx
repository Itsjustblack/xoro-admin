import { BeneficiariesContent } from "@/components/beneficiary/beneficiaries-content"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Beneficiaries | Xoro Admin",
  description: "Manage and organize your payout recipients in one place.",
}

export default function BeneficiariesPage() {
  return <BeneficiariesContent />
}
