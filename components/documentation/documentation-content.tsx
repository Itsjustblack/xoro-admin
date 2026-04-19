"use client"

import {
  Rocket,
  ShoppingCart,
  Bell,
  AlertTriangle,
  Webhook,
  CheckCircle2,
  LockKeyholeOpen,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { DocSection } from "./doc-section"
import { CodeBlock } from "./code-block"
import { WebhookRow } from "./webhook-row"
import { ErrorTable } from "./error-table"
import { Card as CardIcon, GroupIcon, KeyIcon, LogoutCardIcon } from "../icons"

export function DocumentationContent() {
  return (
    <div className="flex h-full w-full flex-col gap-12 p-4 sm:p-6 lg:p-12 max-w-6xl mx-auto">
      <section className="space-y-3">
        <h1 className="font-primary text-5xl font-black text-text-primary tracking-tight">
          Documentation
        </h1>
        <p className="font-primary text-xl font-medium text-text-secondary">
          Everything you need to integrate XoroPay
        </p>
      </section>

      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <Rocket className="size-6 text-brand-primary-2" />
          <h2 className="font-primary text-2xl font-bold text-text-primary tracking-tight">
            Getting Started
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Create API Key",
              desc: "Secure your environment with production and sandbox keys.",
              icon: KeyIcon,
            },
            {
              title: "Initialize Payment",
              desc: "Start accepting funds with our simple payment intent API.",
              icon: LogoutCardIcon,
            },
            {
              title: "Handle Webhook",
              desc: "Respond to real-time events on your application backend.",
              icon: Webhook,
            },
          ].map((card) => (
            <Card
              key={card.title}
              className="rounded-4xl border border-surface-3 bg-surface-1 p-8 shadow-lg ring-0 flex flex-col gap-6 transition-all hover:shadow-md"
            >
              <card.icon className="size-6 text-brand-primary-2" />
              <div className="space-y-2">
                <h3 className="font-primary text-lg font-bold text-text-primary">
                  {card.title}
                </h3>
                <p className="font-primary text-sm text-text-muted leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <DocSection title="Authentication" icon={LockKeyholeOpen}>
        <div className="space-y-6 text-text-secondary font-primary font-medium leading-relaxed">
          <p>
            All XoroPay API requests must be authenticated using a Bearer token
            in the request header. You can find your secret keys in the
            Developer Dashboard.
          </p>
          <CodeBlock codeContainer="bg-surface-dark text-surface-1" code="Authorization: Bearer YOUR_SECRET_KEY" />
        </div>
      </DocSection>

      <DocSection title="Payments" icon={ShoppingCart}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <CodeBlock
            label="Request"
            code={JSON.stringify(
              {
                amount: 25000,
                currency: "USD",
                customer: "cust_9921",
                metadata: {
                  order_id: "8120",
                },
              },
              null,
              2,
            )}
          />
          <CodeBlock
            label="Response"
            code={JSON.stringify(
              {
                id: "pay_2b8z",
                status: "pending",
                url: "https://pay.xoro.com/...",
              },
              null,
              2,
            )}
          />
        </div>
      </DocSection>

      <DocSection title="Checkout" icon={CardIcon}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <p className="font-primary text-text-secondary font-medium leading-relaxed">
              Our hosted checkout page is the easiest way to accept payments. It
              supports Apple Pay, Google Pay, and localized methods
              automatically.
            </p>
            <ul className="space-y-4">
              {[
                "No PCI compliance worries",
                "Customizable branding",
                "Mobile optimized flow",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="flex size-5 items-center justify-center rounded-full">
                    <CheckCircle2 className="size-3.5 text-legal" />
                  </div>
                  <span className="font-primary text-sm font-bold text-text-primary">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-4xl bg-surface-2 p-10 flex items-center justify-center border border-surface-3">
            <Card className="w-full max-w-[280px] rounded-3xl bg-surface-1 p-8 shadow-2xl ring-0 flex flex-col items-center gap-6">
              <div className="size-12 rounded-2xl bg-surface-2 flex items-center justify-center">
                <ShoppingCart className="size-6 text-brand-primary-2" />
              </div>
              <div className="space-y-1 text-center">
                <p className="font-primary text-xs font-bold text-text-primary">
                  Checkout Preview
                </p>
                <p className="font-primary text-[10px] font-medium text-text-muted">
                  HOSTED UI INTERFACE
                </p>
              </div>
              <div className="w-full space-y-3 pt-4">
                <div className="h-2 w-full rounded-full bg-surface-3" />
                <div className="h-2 w-2/3 rounded-full bg-surface-3 mx-auto" />
                <div className="h-10 w-full rounded-xl bg-brand-primary-2 mt-4" />
              </div>
            </Card>
          </div>
        </div>
      </DocSection>

      <DocSection title="Bulk Payouts" icon={GroupIcon}>
        <CodeBlock
        codeContainer="bg-surface-dark text-surface-1"
          code={JSON.stringify(
            [
              { recipient: "user_4a", amount: 1200, currency: "EUR" },
              { recipient: "user_7c", amount: 450, currency: "GBP" },
              { recipient: "user_11", amount: 8900, currency: "USD" },
            ],
            null,
            2,
          )}
        />
      </DocSection>

      <DocSection title="Webhooks" icon={Bell}>
        <div className="flex flex-col gap-4">
          <WebhookRow
            event="payment.success"
            description="Triggered when a payment intent is completed."
          />
          <WebhookRow
            event="payment.failed"
            description="Triggered when a payment attempt is rejected."
          />
          <WebhookRow
            event="payout.completed"
            description="Triggered after a bulk payout batch process."
          />
        </div>
      </DocSection>

      <DocSection title="Errors" icon={AlertTriangle}>
        <ErrorTable />
      </DocSection>

      <div className="flex items-center justify-between pt-12 border-t border-surface-3">
        <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
          © 2024 XoroPay Infrastructure
        </p>
        <div className="flex gap-6 text-[10px] font-bold text-text-muted uppercase tracking-widest">
          <button className="hover:text-text-primary transition-colors">
            Support
          </button>
          <button className="hover:text-text-primary transition-colors">
            Status
          </button>
          <button className="hover:text-text-primary transition-colors">
            Security
          </button>
        </div>
      </div>
    </div>
  )
}
