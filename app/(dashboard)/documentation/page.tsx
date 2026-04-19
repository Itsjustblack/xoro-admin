import { Metadata } from "next"
import { DocumentationContent } from "@/components/documentation/documentation-content"

export const metadata: Metadata = {
  title: "Documentation | Xoro Admin",
  description: "Developer guides and API references for XoroPay integration.",
}

export default function DocumentationPage() {
  return <DocumentationContent />
}
