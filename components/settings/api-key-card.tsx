"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, Info } from "lucide-react"
import { cn } from "@/lib/utils"

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
  isCols = false
}: APIKeyCardProps) {
  const [showSecret, setShowSecret] = useState(false)

  return (
    <Card className="rounded-4xl font-manrope bg-white shadow-sm ring-0 border-none overflow-hidden p-0">
      <div
        className={cn(
          "p-10 flex flex-col gap-10 h-full",
          type === "Live" && "border-l-[5px] border-l-brand-primary-dark",
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge
              className={cn(
                "rounded-full h-auto px-2 py-1 flex items-center justify-center font-bold text-[10px] uppercase tracking-wider border-0",
                type === "Live"
                  ? "bg-accent-violet-soft text-brand-primary-2"
                  : "bg-surface-9 text-text-heading-2 ",
              )}
            >
              {type} Mode
            </Badge>
            <h3 className="font-secondary text-xl font-bold text-text-primary">
              {type === "Live" ? "Production Keys" : "Sandbox Keys"}
            </h3>
          </div>
          {isActive && (
            <Badge className="bg-success-5 text-green-700 border-0 rounded-full px-3 py-1 text-xs font-bold">
              ● Active
            </Badge>
          )}
        </div>

        <div className={cn(isCols ? "space-y-3" : "grid grid-cols-1 lg:grid-cols-2 gap-8")}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className=" text-[10px] font-bold uppercase tracking-widest text-text-heading-2">
                Public Key
              </p>
              <button className="text-[10px] font-bold text-brand-primary-dark hover:underline">
                Regenerate
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-surface-4 px-6 py-4">
                <code className="font-code text-sm text-text-primary truncate block">
                  {publicKey}
                </code>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="size-12 rounded-none border-surface-4 hover:border-surface-2 bg-surface-4 hover:bg-surface-2"
              >
                <Copy size={18} className="text-text-heading" />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="font-secondary text-[10px] font-bold uppercase tracking-widest text-text-heading-2">
                Secret Key
              </p>
              <button className="text-[10px] font-bold text-brand-primary-dark hover:underline">
                Regenerate
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-surface-4 px-6 py-4 flex items-center justify-between">
                <code className="font-code text-sm text-text-primary">
                  {showSecret ? secretKey : "••••••••••••••••••••••••••••••••"}
                </code>
                <button
                  onClick={() => setShowSecret(!showSecret)}
                  className="text-xs font-tertiary font-bold text-brand-primary-2 hover:underline flex items-center gap-1"
                >
                  <span>{showSecret ? "Hide" : "Reveal"}</span>
                </button>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="size-12 rounded-none border-surface-4 hover:border-surface-2 bg-surface-4 hover:bg-surface-2"
              >
                <Copy size={18} className="text-text-heading" />
              </Button>
            </div>
          </div>
        </div>

        {type === "Live" && (
          <div className="flex items-start gap-3 bg-surface-4 p-6 rounded-full">
            <Info className="size-5 text-text-heading-2 mt-0.5 shrink-0" />
            <p className="text-xs font-medium text-text-heading-2 leading-relaxed">
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
