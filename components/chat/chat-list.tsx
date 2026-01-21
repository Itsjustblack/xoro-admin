"use client";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ChatItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface ChatListProps {
	chats: ChatItem[];
	selectedChatId: string | null;
	onSelectChat: (chatId: string) => void;
}

export function ChatList({
	chats,
	selectedChatId,
	onSelectChat,
}: ChatListProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [filter, setFilter] = useState<"all" | "unread" | "escalated">("all");

	const filteredChats = chats.filter((chat) => {
		const matchesSearch =
			chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());

		if (filter === "unread") return matchesSearch && chat.unread > 0;
		if (filter === "escalated") return matchesSearch;
		return matchesSearch;
	});

	return (
		<div className="flex flex-col h-full w-full">
			{/* Fixed Header */}
			<div className="p-8 pb-4 space-y-4">
				<h2 className="text-xl font-semibold text-foreground">Inbox</h2>
				<div className="flex gap-2">
					{/* Search with icon */}
					<div className="relative flex-1">
						<Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="pl-8"
						/>
					</div>
					{/* Filter dropdown */}
					<Select
						value={filter}
						onValueChange={(value: "all" | "unread" | "escalated") =>
							setFilter(value)
						}
					>
						<SelectTrigger className="w-28">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="all">All</SelectItem>
								<SelectItem value="unread">Unread</SelectItem>
								<SelectItem value="escalated">Escalated</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>

			{/* Scrollable Chat List */}
			<ScrollArea className="flex-1">
				<div className="px-8 pb-8 space-y-2">
					{filteredChats.map((chat) => (
						<button
							key={chat.id}
							onClick={() => onSelectChat(chat.id)}
							className={cn(
								"flex items-start gap-3 p-3 w-xs text-wrap overflow-hidden rounded-lg transition-colors text-left cursor-pointer",
								selectedChatId === chat.id
									? "bg-primary/10 border border-primary"
									: "hover:bg-accent",
							)}
						>
							<Avatar className="mt-1">
								<AvatarFallback>{chat.avatar}</AvatarFallback>
							</Avatar>
							<div className="flex-1 min-w-0">
								<div className="flex items-center justify-between gap-2 mb-1">
									<p className="font-medium text-foreground truncate">
										{chat.name}
									</p>
									{chat.unread > 0 && (
										<Badge
											variant="default"
											className="text-xs py-0 px-2"
										>
											{chat.unread}
										</Badge>
									)}
								</div>
								<p className="text-xs text-muted-foreground truncate mb-1">
									{chat.lastMessage}
								</p>
								<p className="text-xs text-muted-foreground">{chat.timeAway}</p>
							</div>
						</button>
					))}
				</div>
			</ScrollArea>
		</div>
	);
}
