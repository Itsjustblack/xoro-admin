"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit2 } from "lucide-react"
import { StoreIcon } from "../icons"

export function MerchantProfileCard() {
  return (
    <Card className="rounded-4xl border border-surface-3 bg-white font-manrope p-10 shadow-xs ring-0">
      <div className="flex flex-col gap-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-full bg-brand-primary-light text-brand-primary">
              <StoreIcon size={28} />
            </div>
            <div className="space-y-1">
              <h2 className="font-secondary text-lg font-black text-text-primary tracking-tight">
                Merchant Profile
              </h2>
              <p className="font-manrope text-sm font-medium text-text-secondary">
                Your public business identity
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="flex h-9 text-sm items-center border-none gap-2 rounded-none bg-surface-4 px-4 py-2 font-bold text-text-primary hover:bg-surface-5"
          >
            <Edit2 size={16} />
            <span>Edit Profile</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          <div className="space-y-1.5">
            <p className=" text-[10px] font-bold uppercase tracking-widest text-text-muted">
              Full Name
            </p>
            <p className=" text-base font-bold text-text-primary">
              Alexander Thorne
            </p>
          </div>
          <div className="space-y-1.5">
            <p className=" text-[10px] font-bold uppercase tracking-widest text-text-muted">
              Business Email
            </p>
            <p className=" text-base font-bold text-text-primary">
              a.thorne@globallogistics.com
            </p>
          </div>
          <div className="space-y-1.5">
            <p className=" text-[10px] font-bold uppercase tracking-widest text-text-muted">
              Business Legal Name
            </p>
            <p className=" text-base font-bold text-text-primary">
              Global Logistics Solutions Ltd.
            </p>
          </div>
          <div className="space-y-1.5">
            <p className=" text-[10px] font-bold uppercase tracking-widest text-text-muted">
              Phone Number
            </p>
            <p className=" text-base font-bold text-text-primary">
              +1 (555) 902-1142
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
