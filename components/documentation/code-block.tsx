"use client"

import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  label?: string
  className?: string
  codeContainer?: string
}

export function CodeBlock({ code, label, className, codeContainer }: CodeBlockProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <span className="font-primary text-[10px] font-bold uppercase tracking-widest text-text-muted">
          {label}
        </span>
      )}
      <div className={cn("rounded-4xl text-text-primary bg-surface-4 p-6 overflow-x-auto custom-scrollbar", codeContainer)}>
        <pre className="text-sm leading-relaxed">
          <code className="font-tertiary">{code}</code>
        </pre>
      </div>
    </div>
  )
}
