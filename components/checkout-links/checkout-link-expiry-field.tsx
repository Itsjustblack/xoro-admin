"use client"

import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format, isValid, parseISO } from "date-fns"
import { ChevronDownIcon } from "lucide-react"
import { useState } from "react"

interface CheckoutLinkExpiryFieldProps {
  value?: string
  onChange: (value: string) => void
  error?: { message?: string }
}

const DEFAULT_TIME = "00:00:00"

function parseDateValue(value?: string) {
  if (!value?.trim()) {
    return undefined
  }

  const parsedDate = parseISO(value)
  return isValid(parsedDate) ? parsedDate : undefined
}

function mergeDateAndTime(date: Date, time: string) {
  const [hours = "0", minutes = "0", seconds = "0"] = time.split(":")
  const nextDate = new Date(date)

  nextDate.setHours(
    Number(hours) || 0,
    Number(minutes) || 0,
    Number(seconds) || 0,
    0,
  )

  return format(nextDate, "yyyy-MM-dd'T'HH:mm:ss")
}

export function CheckoutLinkExpiryField({
  value,
  onChange,
  error,
}: CheckoutLinkExpiryFieldProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [timeValue, setTimeValue] = useState(() => {
    const parsedDate = parseDateValue(value)
    return parsedDate ? format(parsedDate, "HH:mm:ss") : DEFAULT_TIME
  })

  const parsedDate = parseDateValue(value)
  const resolvedTimeValue = parsedDate
    ? format(parsedDate, "HH:mm:ss")
    : timeValue

  return (
    <Field data-invalid={Boolean(error)}>
      <FieldLabel className="text-sm font-semibold text-text-subtitle">
        Expires At
      </FieldLabel>

      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-3">
        <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              aria-label="Select expiry date"
              className={cn(
                "h-11.5 w-full min-w-0 justify-start gap-2 overflow-hidden rounded-lg border-border-light bg-surface-1 px-3 font-normal shadow-none hover:bg-surface-1",
                !value && "text-muted-foreground",
              )}
            >
              <span
                className="min-w-0 flex-1 truncate text-left"
                title={parsedDate ? format(parsedDate, "PPP") : "Select date"}
              >
                {parsedDate ? format(parsedDate, "PPP") : "Select date"}
              </span>
              <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              captionLayout="dropdown"
              selected={parsedDate}
              defaultMonth={parsedDate}
              onSelect={(selectedDate) => {
                if (!selectedDate) {
                  onChange("")
                  return
                }

                onChange(mergeDateAndTime(selectedDate, resolvedTimeValue))
                setIsDatePickerOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>

        <Input
          type="time"
          id="expires-at-time"
          step="1"
          value={resolvedTimeValue}
          onChange={(event) => {
            const nextTime = event.target.value
            setTimeValue(nextTime)

            if (parsedDate) {
              onChange(mergeDateAndTime(parsedDate, nextTime))
            }
          }}
          className="h-11.5 w-full min-w-0 appearance-none rounded-lg border-border-light bg-surface-1 transition-colors [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
      </div>

      {error ? <FieldError errors={[error]} /> : null}
    </Field>
  )
}
