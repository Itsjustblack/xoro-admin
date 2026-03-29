"use client"

import { ShieldCheck } from "lucide-react"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="mt-auto flex w-full flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-4 text-xs font-medium text-text-muted sm:flex-row sm:gap-6">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-success-2 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
          <span>System Status: <span className="text-text-muted">Operational</span></span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-4" />
          <span>Secure AES-256 Encryption</span>
        </div>
      </div>
      <div className="flex items-center gap-3 text-xs font-medium text-text-muted">
        <Link href="#" className="hover:text-text-primary transition-colors">
          Documentation
        </Link>
        <span className="text-surface-6">•</span>
        <Link href="#" className="hover:text-text-primary transition-colors">
          Support Center
        </Link>
      </div>
    </footer>
  )
}
