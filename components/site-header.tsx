"use client";

import { useState } from "react";
import { BellIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import { NotificationPane } from "./notifications/notification-pane";
import { mockNotifications } from "@/lib/mock-data";

export function SiteHeader() {
	const [notificationsOpen, setNotificationsOpen] = useState(false);
	const [notifications, setNotifications] = useState(mockNotifications);
	const unreadCount = notifications.filter((n) => !n.read).length;

	return (
		<>
			<header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
				<div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
					<SidebarTrigger className="-ml-1" />
					<Separator
						orientation="vertical"
						className="mx-2 data-[orientation=vertical]:h-4"
					/>
					<h1 className="text-base font-medium">Documents</h1>
					<div className="ml-auto flex items-center gap-2">
						<Button
							variant="ghost"
							size="icon-sm"
							className="relative"
							onClick={() => setNotificationsOpen(true)}
						>
							<BellIcon className="size-4" />
							{unreadCount > 0 && (
								<span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
									{unreadCount}
								</span>
							)}
							<span className="sr-only">Notifications</span>
						</Button>
						<Button
							variant="ghost"
							size="sm"
							className="hidden sm:flex"
							asChild
						>
							<a
								href="https://github.com/shadcn-ui/ui"
								rel="noopener noreferrer"
								target="_blank"
								className="dark:text-foreground"
							>
								GitHub
							</a>
						</Button>
					</div>
				</div>
			</header>
			<NotificationPane
				open={notificationsOpen}
				onOpenChange={setNotificationsOpen}
				notifications={notifications}
				setNotifications={setNotifications}
			/>
		</>
	);
}
