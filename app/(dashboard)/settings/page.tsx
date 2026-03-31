import { Metadata } from "next"
import { SettingsContent } from "@/components/settings/settings-content"

export const metadata: Metadata = {
  title: "Settings | Xoro Admin",
  description: "Manage your account, security, and integrations.",
}

export default function SettingsPage() {
  return <SettingsContent />
}
