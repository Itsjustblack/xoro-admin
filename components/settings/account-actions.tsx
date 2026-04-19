"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function AccountActions() {
  return (
    <Card className="rounded-4xl border font-manrope border-surface-3 bg-white p-8 ring-0 h-full">
      <div className="flex flex-col gap-8">
        <div className="space-y-1">
          <h2 className="font-secondary text-xl font-bold text-text-primary">
            Account Actions
          </h2>
          <p className=" text-sm font-medium text-text-secondary">
            Manage session and lifecycle
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Button className="flex h-12 items-center gap-2 rounded-none bg-amber-700 px-6 font-bold text-white hover:bg-status-danger/90">
            <LogOut size={18} />
            <span>Logout</span>
          </Button>
          <button className="text-sm text-text-heading hover:text-status-danger transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </Card>
  )
}
