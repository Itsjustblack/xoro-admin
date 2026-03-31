"use client"

import { Card } from "@/components/ui/card"
import { ShieldCheck } from "lucide-react"

export function AccountMetadata() {
  return (
    <Card className="rounded-4xl bg-surface-4 font-manrope p-8 ring-0 h-full">
      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-1">
            <p className=" text-[10px] font-bold uppercase tracking-widest text-text-heading-2">
              Account ID
            </p>
            <p className="font-tertiary text-xs font-bold text-text-primary">
              ACC_INFRA_88291004X
            </p>
          </div>
          <div className="space-y-1">
            <p className=" text-[10px] font-bold uppercase tracking-widest text-text-heading-2">
              Platform Version
            </p>
            <p className="font-tertiary text-xs font-bold text-text-primary">
              v4.12.0-stable
            </p>
          </div>
        </div>

        <div className="pt-10 border-t border-surface-9 flex items-center justify-between">
          <div className="space-y-1">
            <p className=" text-[10px] font-bold uppercase tracking-widest text-text-heading-2">
              Member Since
            </p>
            <p className=" text-sm font-bold text-text-primary">
              November 24, 2022
            </p>
          </div>
          <div className="size-10 rounded-full bg-surface-9 flex items-center justify-center text-text-heading-2">
            <ShieldCheck size={20} />
          </div>
        </div>
      </div>
    </Card>
  )
}
