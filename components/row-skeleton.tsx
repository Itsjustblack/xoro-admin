import { TableCell, TableRow } from "./ui/table";

export default function RowsSkeleton({
	columnCount,
	length,
}: {
	columnCount: number;
	length: number;
}) {
	return (
		<>
			{Array.from({ length }).map((_, idx) => (
				<TableRow
					key={`loading-row-${idx}`}
					className="animate-pulse"
				>
					{Array.from({ length: columnCount }).map((_, colIdx) => (
						<TableCell key={colIdx}>
							<div className="h-8 w-full bg-muted rounded" />
						</TableCell>
					))}
				</TableRow>
			))}
		</>
	);
}
