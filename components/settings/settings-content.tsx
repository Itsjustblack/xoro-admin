"use client"

import { MerchantProfileCard } from "./merchant-profile-card"
import { APIKeyCard } from "./api-key-card"
import { WebhooksCard } from "./webhooks-card"
import { AccountActions } from "./account-actions"
import { AccountMetadata } from "./account-metadata"
import { KeyRound } from "lucide-react"

export function SettingsContent() {
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
            publicKey="pk_live_51MvW2SHowZ9OvX9qJ...r6T7"
            secretKey="sk_live_51MvW2SHowZ9OvX9qJ...sk82"
          />
          <APIKeyCard 
            type="Test"
            publicKey="pk_test_x7y2...91ab"
            secretKey="sk_test_••••••••"
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
