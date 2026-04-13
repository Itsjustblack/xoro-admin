"use client"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import type { ChangeEvent, ReactNode } from "react"
import {
  type FieldValues,
  useController,
  type UseControllerProps,
} from "react-hook-form"

type AmountInputProps<TFieldValues extends FieldValues = FieldValues> =
  UseControllerProps<TFieldValues> & {
    disabled?: boolean
    placeholder?: string
    prefix?: ReactNode
    showPrefix?: boolean
    wrapperClassName?: string
    inputClassName?: string
    prefixClassName?: string
  }

export function AmountInput<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  disabled,
  placeholder = "0.00",
  prefix = "\u20A6",
  showPrefix = true,
  wrapperClassName,
  inputClassName,
  prefixClassName,
}: AmountInputProps<TFieldValues>) {
  const { field } = useController({ name, control })

  const formatAmount = (value: number | string) => {
    if (value == null || value === "") return ""
    const [intPart, decimalPart] = value.toString().split(".")
    const formattedInt = Number(intPart).toLocaleString("en-US")
    return decimalPart !== undefined
      ? `${formattedInt}.${decimalPart}`
      : formattedInt
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/,/g, "")
    if (!/^\d*\.?\d{0,2}$/.test(rawValue)) return

    field.onChange(rawValue === "" ? 0 : parseFloat(rawValue))
  }

  return (
    <div className={cn("flex items-center", wrapperClassName)}>
      {showPrefix ? (
        <span
          className={cn(
            "mr-3 text-base font-medium text-text-primary",
            prefixClassName,
          )}
        >
          {prefix}
        </span>
      ) : null}

      <Input
        type="text"
        placeholder={placeholder}
        className={cn(
          "border-0 bg-transparent p-0 shadow-none focus-visible:ring-0",
          inputClassName,
        )}
        name={field.name}
        ref={field.ref}
        onBlur={field.onBlur}
        disabled={disabled}
        value={formatAmount(field.value)}
        onChange={handleChange}
      />
    </div>
  )
}
