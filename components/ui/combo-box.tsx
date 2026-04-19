"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"
import { memo, type ReactElement, useMemo, useState } from "react"
import { useController, useFormContext } from "react-hook-form"

interface ComboBoxProps<TData> {
  name: string
  data: TData[]
  getLabel: (item: TData) => string
  getValue: (item: TData) => string | number
  placeholder?: string
  className?: string
  disabled?: boolean
}

function ComboBoxInner<TData>({
  name,
  data,
  disabled,
  getLabel,
  getValue,
  placeholder = "Select an option",
  className,
}: ComboBoxProps<TData>) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const form = useFormContext()

  const {
    field: { value, onChange },
  } = useController({
    name,
    control: form.control,
  })

  const selectedItem = data.find(
    (item) => String(getValue(item)) === String(value ?? ""),
  )

  const filteredData = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) return data

    return data.filter((item) =>
      getLabel(item).toLowerCase().includes(normalizedQuery),
    )
  }, [data, getLabel, query])

  const handleSelect = (item: TData) => {
    onChange(getValue(item))
    setOpen(false)
    setQuery("")
  }

  return (
    <Popover
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen)
        if (!nextOpen) {
          setQuery("")
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "h-11.5 w-full justify-between rounded-lg border-border-light bg-surface-1 px-3 font-normal shadow-none hover:bg-surface-1",
            !selectedItem && "text-text-muted",
            className,
          )}
        >
          <span className="truncate">
            {selectedItem ? getLabel(selectedItem) : placeholder}
          </span>
          <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        side="bottom"
        align="start"
      >
        <div className="border-b border-surface-6 p-2">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search..."
            className="h-9 border-0 bg-transparent px-2 shadow-none focus-visible:ring-0"
          />
        </div>

        <div className="max-h-72 overflow-y-auto p-1">
          {filteredData.length === 0 ? (
            <div className="py-6 text-center text-sm text-text-muted">
              No results found.
            </div>
          ) : (
            filteredData.map((item) => {
              const itemValue = String(getValue(item))
              const isSelected = itemValue === String(value ?? "")

              return (
                <button
                  key={itemValue}
                  type="button"
                  onClick={() => handleSelect(item)}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-text-primary transition-colors hover:bg-brand-primary/10"
                >
                  <span className="flex-1 truncate">{getLabel(item)}</span>
                  <Check
                    className={cn(
                      "size-4",
                      isSelected ? "opacity-100" : "opacity-0",
                    )}
                  />
                </button>
              )
            })
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export const ComboBox = memo(ComboBoxInner) as <T>(
  props: ComboBoxProps<T>,
) => ReactElement
