"use client";

import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Notification } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
	AlertCircleIcon,
	CheckCircleIcon,
	InfoIcon,
	ShoppingCartIcon,
	XIcon,
} from "lucide-react";

interface NotificationPaneProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	notifications: Notification[];
	setNotifications: Dispatch<SetStateAction<Notification[]>>;
}

function getNotificationIcon(type: Notification["type"]) {
	switch (type) {
		case "order":
			return <ShoppingCartIcon className="size-4" />;
		case "warning":
			return <AlertCircleIcon className="size-4 text-amber-500" />;
		case "success":
			return <CheckCircleIcon className="size-4 text-green-500" />;
		case "info":
		default:
			return <InfoIcon className="size-4 text-blue-500" />;
	}
}

function NotificationItem({ notification }: { notification: Notification }) {
	return (
		<div
			className={cn(
				"flex gap-3 rounded-lg p-3 transition-colors hover:bg-muted/50 cursor-pointer",
				!notification.read && "bg-muted/30",
			)}
		>
			<div className="mt-0.5 shrink-0">
				{getNotificationIcon(notification.type)}
			</div>
			<div className="flex-1 space-y-1">
				<div className="flex items-start justify-between gap-2">
					<p
						className={cn(
							"text-sm leading-tight",
							!notification.read && "font-medium",
						)}
					>
						{notification.title}
					</p>
					{!notification.read && (
						<span className="mt-1 size-2 shrink-0 rounded-full bg-blue-500" />
					)}
				</div>
				<p className="text-xs text-muted-foreground">
					{notification.description}
				</p>
				<p className="text-xs text-muted-foreground/70">
					{notification.timestamp}
				</p>
			</div>
		</div>
	);
}

export function NotificationPane({
	open,
	onOpenChange,
	notifications,
	setNotifications,
}: NotificationPaneProps) {
	const unreadCount = notifications.filter((n) => !n.read).length;

	const handleMarkAllAsRead = () => {
		setNotifications((prev) =>
			prev.map((notification) => ({ ...notification, read: true }))
		);
	};

	return (
		<Drawer
			direction="left"
			open={open}
			onOpenChange={onOpenChange}
		>
			<DrawerContent>
				<DrawerHeader className="border-b">
					<DrawerTitle className="flex items-center justify-between">
						<span>Notifications</span>
						<div className="flex items-center gap-2">
							{unreadCount > 0 && (
								<span className="rounded-full bg-blue-500 px-2 py-0.5 text-xs font-medium text-white">
									{unreadCount} new
								</span>
							)}
							<DrawerClose asChild>
								<Button
									variant="destructive"
									size="icon-xs"
								>
									<XIcon className="size-4" />
									<span className="sr-only">Close</span>
								</Button>
							</DrawerClose>
						</div>
					</DrawerTitle>
				</DrawerHeader>
				<ScrollArea className="flex-1 overflow-auto">
					<div className="flex flex-col gap-4 p-4">
						{notifications.map((notification) => (
							<NotificationItem
								key={notification.id}
								notification={notification}
							/>
						))}
					</div>
				</ScrollArea>
				<DrawerFooter className="border-t">
					<Button
						variant="outline"
						className="w-full"
						onClick={handleMarkAllAsRead}
						disabled={unreadCount === 0}
					>
						Mark all as read
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
