import { cn } from "@/lib/utils"
import { TableCell, TableRow } from "./ui/table"

export default function RowsSkeleton({
  columnCount,
  length,
  rowClassName,
  cellClassName,
}: {
  columnCount: number
  length: number
  rowClassName?: string
  cellClassName?: string
}) {
  return (
    <>
      {Array.from({ length }).map((_, idx) => (
        <TableRow
          key={`loading-row-${idx}`}
          className={cn("animate-pulse", rowClassName)}
        >
          {Array.from({ length: columnCount }).map((_, colIdx) => (
            <TableCell key={colIdx} className={cellClassName}>
              <div className="h-8 w-full bg-surface-3 rounded" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}
