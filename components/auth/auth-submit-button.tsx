"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowRight, Loader2 } from "lucide-react"

type AuthSubmitButtonProps = {
  idleText: string
  loadingText: string
  isLoading: boolean
  showArrow?: boolean
  className?: string
}

export function AuthSubmitButton({
  idleText,
  loadingText,
  isLoading,
  showArrow = true,
  className,
}: AuthSubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={cn(
        "h-14 w-full rounded-3xl border-0 bg-brand-primary-dark text-lg font-semibold text-white transition-colors hover:bg-primary font-primary flex items-center justify-center gap-2",
        className,
      )}
    >
      {isLoading ? (
        <>
          <Loader2 className="size-5 animate-spin" />
          {loadingText}
        </>
      ) : (
        <>
          {idleText}
          {showArrow && <ArrowRight className="size-5" />}
        </>
      )}
    </Button>
  )
}
