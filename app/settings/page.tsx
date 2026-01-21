import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs";

export default function Page() {
	return (
		<div className="p-8 h-full">
			{/* Header Section */}
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
				<p className="text-muted-foreground">
					Manage your account and application settings
				</p>
			</div>

			<Tabs defaultValue="channels">
				<TabsList className="w-full h-12">
					<TabsTrigger value="channels" className="flex-1 h-full text-base">
						Channels
					</TabsTrigger>
					<TabsTrigger value="agent-config" className="flex-1 h-full text-base">
						Agent Config
					</TabsTrigger>
					<TabsTrigger value="notifications" className="flex-1 h-full text-base">
						Notifications
					</TabsTrigger>
				</TabsList>
				<TabsContent value="channels" className="mt-6">
					<p className="text-muted-foreground">
						Configure your communication channels here.
					</p>
				</TabsContent>
				<TabsContent value="agent-config" className="mt-6">
					<p className="text-muted-foreground">
						Configure your agent settings here.
					</p>
				</TabsContent>
				<TabsContent value="notifications" className="mt-6">
					<p className="text-muted-foreground">
						Manage your notification preferences here.
					</p>
				</TabsContent>
			</Tabs>
		</div>
	);
}
