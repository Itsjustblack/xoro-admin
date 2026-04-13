"use client"

import { useState } from "react"
import { CopyButton } from "@/components/copy-button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Info } from "lucide-react"

interface APIKeyCardProps {
  type: "Live" | "Test"
  publicKey: string
  secretKey: string
  isActive?: boolean
  isCols?: boolean
}

export function APIKeyCard({
  type,
  publicKey,
  secretKey,
  isActive = true,
  isCols = false,
}: APIKeyCardProps) {
  const [showSecret, setShowSecret] = useState(false)

  return (
    <Card className="overflow-hidden rounded-4xl border-none bg-white p-0 font-manrope shadow-sm ring-0">
      <div
        className={cn(
          "flex h-full flex-col gap-10 p-10",
          type === "Live" && "border-l-[5px] border-l-brand-primary-dark",
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <Badge
              className={cn(
                "flex h-auto items-center justify-center rounded-full border-0 px-2 py-1 text-[10px] font-bold uppercase tracking-wider",
                type === "Live"
                  ? "bg-accent-violet-soft text-brand-primary-2"
                  : "bg-surface-9 text-text-heading-2",
              )}
            >
              {type} Mode
            </Badge>
            <h3 className="font-secondary text-xl font-bold text-text-primary">
              {type === "Live" ? "Production Keys" : "Sandbox Keys"}
            </h3>
          </div>
          {isActive && (
            <Badge className="shrink-0 rounded-full border-0 bg-success-5 px-3 py-1 text-xs font-bold text-green-700">
              Active
            </Badge>
          )}
        </div>

        <div
          className={cn(
            isCols ? "space-y-3" : "grid grid-cols-1 gap-8 lg:grid-cols-2",
          )}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-text-heading-2">
                Public Key
              </p>
              <button className="shrink-0 text-[10px] font-bold text-brand-primary-dark hover:underline">
                Regenerate
              </button>
            </div>
            <div className="flex min-w-0 items-center gap-2">
              <div className="min-w-0 flex-1 bg-surface-4 px-6 py-4">
                <code className="block truncate font-code text-sm text-text-primary">
                  {publicKey}
                </code>
              </div>
              <CopyButton
                value={publicKey}
                className="size-12 shrink-0 rounded-none border-surface-4 bg-surface-4 hover:border-surface-2 hover:bg-surface-2"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <p className="font-secondary text-[10px] font-bold uppercase tracking-widest text-text-heading-2">
                Secret Key
              </p>
              <button className="shrink-0 text-[10px] font-bold text-brand-primary-dark hover:underline">
                Regenerate
              </button>
            </div>
            <div className="flex min-w-0 items-center gap-2">
              <div className="flex min-w-0 flex-1 items-center gap-4 bg-surface-4 px-6 py-4">
                <code className="block min-w-0 flex-1 truncate font-code text-sm text-text-primary">
                  {showSecret ? secretKey : "••••••••••••••••••••••••••••••••"}
                </code>
                <button
                  onClick={() => setShowSecret(!showSecret)}
                  className="flex shrink-0 items-center gap-1 text-xs font-tertiary font-bold text-brand-primary-2 hover:underline"
                >
                  <span>{showSecret ? "Hide" : "Reveal"}</span>
                </button>
              </div>
              <CopyButton
                value={secretKey}
                className="size-12 shrink-0 rounded-none border-surface-4 bg-surface-4 hover:border-surface-2 hover:bg-surface-2"
              />
            </div>
          </div>
        </div>

        {type === "Live" && (
          <div className="flex items-start gap-3 rounded-full bg-surface-4 p-6">
            <Info className="mt-0.5 size-5 shrink-0 text-text-heading-2" />
            <p className="text-xs font-medium leading-relaxed text-text-heading-2">
              Keep this key secure. Never expose it in client-side code or
              public repositories. Use environment variables to store production
              keys.
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
