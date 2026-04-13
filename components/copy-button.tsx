"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Copy } from "lucide-react"
import type { ReactNode } from "react"
import { toast } from "sonner"

async function copyToClipboard(text: string | number) {
  const content = typeof text === "number" ? text.toLocaleString() : text

  try {
    await navigator.clipboard.writeText(content)
    toast.success("Copied to clipboard")
  } catch {
    toast.error("Unable to copy to clipboard")
  }
}

export function CopyButton({
  children,
  className,
  iconClassName,
  value,
}: {
  children?: ReactNode
  className?: string
  iconClassName?: string
  value: string | number
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn(
        "text-muted-foreground transition-colors hover:text-foreground",
        className,
      )}
      onClick={() => copyToClipboard(value)}
    >
      <Copy className={cn("h-4 w-4", iconClassName)} />
      {children}
      <span className="sr-only">Copy to clipboard</span>
    </Button>
  )
}
