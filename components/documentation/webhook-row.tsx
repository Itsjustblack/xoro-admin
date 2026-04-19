"use client"

interface WebhookRowProps {
  event: string
  description: string
}

export function WebhookRow({ event, description }: WebhookRowProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-4xl bg-surface-4">
      <code className="font-code text-sm font-bold text-brand-primary-2">
        {event}
      </code>
      <p className="font-primary text-xs text-text-secondary font-medium">
        {description}
      </p>
    </div>
  )
}
