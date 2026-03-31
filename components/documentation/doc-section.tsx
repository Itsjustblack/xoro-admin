"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { IconComponent } from "../icons"

interface DocSectionProps {
  title: string
  icon: IconComponent,
  children: React.ReactNode
  className?: string
}

export function DocSection({ title, icon: Icon, children, className }: DocSectionProps) {
  return (
    <Card className={cn("rounded-4xl border border-surface-3 bg-white p-10 shadow-sm ring-0", className)}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Icon className="size-6 text-brand-primary-2" />
          <h2 className="font-primary text-2xl font-bold text-text-primary tracking-tight">
            {title}
          </h2>
        </div>
        <div>
          {children}
        </div>
      </div>
    </Card>
  )
}
