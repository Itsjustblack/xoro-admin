"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Webhook, Link2 } from "lucide-react"

export function WebhooksCard() {
  return (
    <Card className="rounded-4xl font-manrope border border-surface-3 bg-white p-10 ring-0">
      <div className="flex flex-col gap-10">
        <div className="flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-full bg-amber-400 text-amber-950">
            <Webhook size={28} />
          </div>
          <div className="space-y-1">
            <h2 className="font-secondary text-2xl font-black text-text-primary tracking-tight">
              Webhooks
            </h2>
            <p className="text-sm font-medium text-text-heading-2">
              Real-time payment event notifications
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="font-primary text-[10px] font-bold uppercase tracking-widest text-text-heading-2">
            Endpoint URL
          </p>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-surface-4 px-6 py-4 flex items-center gap-3">
              <Link2 size={18} className="text-text-heading-2" />
              <code className="font-tertiary text-sm text-text-primary">
                https://api.globallogistics.com/webhooks/xoropay
              </code>
            </div>
            <Button className="h-14 px-8 rounded-none bg-brand-primary-dark text-white font-bold hover:bg-brand-primary-2/90">
              Edit Endpoint
            </Button>
          </div>
          <p className="text-[10px] font-medium text-text-heading-2">
            XoroPay will send POST requests to this URL when events occur in your account.
          </p>
        </div>
      </div>
    </Card>
  )
}
