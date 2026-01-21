"use client";

import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageBubble } from "./message-bubble";
import { MoreVertical, Send } from "lucide-react";

export interface Message {
	id: string;
	content: string;
	timestamp: string;
	isAgent: boolean;
}

interface ConversationPanelProps {
	customerName: string;
	messages: Message[];
	onSendMessage: (message: string) => void;
	onProfileClick: () => void;
}

export function ConversationPanel({
	customerName,
	messages,
	onSendMessage,
	onProfileClick,
}: ConversationPanelProps) {
	const [messageInput, setMessageInput] = useState("");
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	const handleSend = () => {
		if (messageInput.trim()) {
			onSendMessage(messageInput);
			setMessageInput("");
		}
	};

	return (
		<div className="flex flex-col flex-1 min-w-0 bg-background border-l border-border">
			{/* Header */}
			<div className="p-4 border-b border-border flex items-center justify-between">
				<h3 className="font-semibold text-foreground truncate">
					{customerName}
				</h3>
				<Button
					variant="ghost"
					size="icon"
					onClick={onProfileClick}
				>
					<MoreVertical className="w-4 h-4" />
				</Button>
			</div>

			{/* Messages Area */}
			<ScrollArea className="flex-1 p-8">
				<div>
					{messages.map((msg) => (
						<MessageBubble
							key={msg.id}
							content={msg.content}
							timestamp={msg.timestamp}
							isAgent={msg.isAgent}
						/>
					))}
					<div ref={scrollRef} />
				</div>
			</ScrollArea>

			{/* Input Area */}
			<div className="flex gap-4 py-4 px-8 border-t border-border">
				<Input
					placeholder="Type your message..."
					value={messageInput}
					onChange={(e) => setMessageInput(e.target.value)}
					onKeyPress={(e) => e.key === "Enter" && handleSend()}
					className="flex-1"
				/>
				<Button
					onClick={handleSend}
					size="icon"
					disabled={!messageInput.trim()}
				>
					<Send className="w-4 h-4" />
				</Button>
			</div>
		</div>
	);
}
