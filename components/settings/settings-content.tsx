"use client"

import { useQuery } from "@tanstack/react-query"
import { KeyRound } from "lucide-react"
import { getMerchantAPIKeys } from "@/lib/api/v1/merchant/actions"
import { merchantQueryKeys } from "@/lib/api/v1/query-key-factory"
import { useCurrentMerchant } from "@/store/merchant"
import { MerchantProfileCard } from "./merchant-profile-card"
import { APIKeyCard } from "./api-key-card"
import { WebhooksCard } from "./webhooks-card"
import { AccountActions } from "./account-actions"
import { AccountMetadata } from "./account-metadata"

export function SettingsContent() {
  const merchant = useCurrentMerchant()
  const { data } = useQuery({
    queryKey: merchantQueryKeys.apiKeys(merchant?.id ?? ""),
    queryFn: () => getMerchantAPIKeys(merchant!.id),
    enabled: !!merchant?.id,
  })

  const livePublicKey = data?.live.public ?? "***************"
  const liveSecretKey = data?.live.secret ?? "***************"
  const testPublicKey = data?.test.public ?? "***************"
  const testSecretKey = data?.test.secret ?? "***************"

  return (
    <div className="flex h-full w-full flex-col gap-10 p-4 sm:p-6 lg:p-10 max-w-6xl mx-auto">
      <section className="space-y-2">
        <h1 className="font-primary text-5xl font-black text-text-primary tracking-tight">
          Settings
        </h1>
        <p className="font-primary text-base font-medium text-text-secondary">
          Manage your account, security, and integrations
        </p>
      </section>

      <MerchantProfileCard />

      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <KeyRound className="size-6 -rotate-45 -scale-x-100 text-brand-primary-2" />
          <h2 className="font-secondary text-2xl font-black text-text-primary tracking-tight">
            API Integrations
          </h2>
        </div>

        <div className="flex flex-col gap-8">
          <APIKeyCard
            isCols
            type="Live"
            publicKey={livePublicKey}
            secretKey={liveSecretKey}
          />
          <APIKeyCard
            type="Test"
            publicKey={testPublicKey}
            secretKey={testSecretKey}
          />
        </div>
      </div>

      <WebhooksCard />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7">
          <AccountActions />
        </div>
        <div className="lg:col-span-5">
          <AccountMetadata />
        </div>
      </div>
    </div>
  )
}
