"use client"

import { cn } from "@/lib/utils"

interface ProInsightsProps {
  content: string
  className?: string
}

export function ProInsights({ content, className }: ProInsightsProps) {
  return (
    <section 
      className={cn(
        "rounded-3xl bg-brand-primary-dark/5 border border-brand-primary-dark/10 p-6",
        className
      )}
    >
      <h3 className="text-xs font-bold text-brand-primary-dark uppercase mb-2">
        Pro Insights
      </h3>
      <p className="text-sm font-medium text-text-subtitle leading-relaxed">
        {content}
      </p>
    </section>
  )
}
