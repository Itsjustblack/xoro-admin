"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check, Copy } from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"
import { toast } from "sonner"

async function copyToClipboard(text: string | number) {
  const content = typeof text === "number" ? text.toLocaleString() : text

  try {
    await navigator.clipboard.writeText(content)
    toast.success("Copied to clipboard")
    return true
  } catch {
    toast.error("Unable to copy to clipboard")
    return false
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
  const [isCopied, setIsCopied] = useState(false)
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current)
      }
    }
  }, [])

  const handleCopy = async () => {
    const wasCopied = await copyToClipboard(value)

    if (!wasCopied) {
      setIsCopied(false)
      return
    }

    setIsCopied(true)

    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current)
    }

    resetTimeoutRef.current = setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn(
        "text-muted-foreground transition-colors hover:text-foreground",
        className,
      )}
      onClick={handleCopy}
    >
      {isCopied ? (
        <Check className={cn("h-4 w-4", iconClassName)} />
      ) : (
        <Copy className={cn("h-4 w-4", iconClassName)} />
      )}
      {children}
      <span className="sr-only">Copy to clipboard</span>
    </Button>
  )
}
