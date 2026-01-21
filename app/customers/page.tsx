import CustomerTable from "@/components/customer/customer-table";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";

export default function Page() {
	return (
		<div className="p-8 h-full">
			{/* Header Section */}
			<div className="mb-8 flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-foreground mb-2">Customers</h1>
					<p className="text-muted-foreground">
						Manage and view all your customers
					</p>
				</div>
				<div className="flex items-center gap-3">
					<Button
						variant="outline"
						className="gap-2 bg-transparent"
						// onClick={handleExport}
					>
						<Download className="w-4 h-4" />
						Export
					</Button>
					<Button className="gap-2">
						<Plus className="w-4 h-4" />
						Add Customer
					</Button>
				</div>
			</div>

			<CustomerTable />
		</div>
	);
}
