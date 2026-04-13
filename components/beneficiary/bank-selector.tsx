"use client"

import type { IBank } from "@/lib/types"
import { memo } from "react"
import { ComboBox } from "@/components/ui/combo-box"

interface BankSelectorProps {
  name: string
  banks: IBank[]
  disabled?: boolean
  className?: string
}

function BankSelectorInner({
  name,
  banks,
  disabled,
  className,
}: BankSelectorProps) {
  return (
    <ComboBox
      name={name}
      data={banks}
      getLabel={(bank) => bank.name.trim()}
      getValue={(bank) => bank.code}
      className={className}
      disabled={disabled}
      placeholder="Select a Bank"
    />
  )
}

export default memo(BankSelectorInner)
