"use client";

import { ChatList } from "@/components/chat/chat-list";
import { ConversationPanel } from "@/components/chat/conversation-panel";
import { CustomerProfile } from "@/components/chat/customer-profile";
import {
	mockChats as initialMockChats,
	mockCustomersById,
	mockMessages as initialMockMessages,
} from "@/lib/mock-data";
import { ChatItem, Message } from "@/lib/types";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function Page() {
	const [selectedChatId, setSelectedChatId] = useState<string>("1");
	const [chats, setChats] = useState<ChatItem[]>(initialMockChats);
	const [messages, setMessages] =
		useState<Record<string, Message[]>>(initialMockMessages);

	const [showProfilePanel, setShowProfilePanel] = useState(false);

	const selectedChat = chats.find((c) => c.id === selectedChatId);

	const selectedCustomer = selectedChatId
		? mockCustomersById[selectedChatId]
		: null;

	const handleSelectChat = (chatId: string) => {
		setSelectedChatId(chatId);
		setChats(chats.map((c) => (c.id === chatId ? { ...c, unread: 0 } : c)));
	};

	const handleSendMessage = (messageText: string) => {
		if (!selectedChatId) return;

		const newMessage: Message = {
			id: Date.now().toString(),
			content: messageText,
			timestamp: new Date().toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			}),
			isAgent: true,
		};

		setMessages((prev) => ({
			...prev,
			[selectedChatId]: [...(prev[selectedChatId] || []), newMessage],
		}));

		setChats(
			chats.map((c) =>
				c.id === selectedChatId
					? { ...c, lastMessage: messageText, timeAway: "Just now" }
					: c,
			),
		);
	};

	return (
		<div className="grid grid-cols-[384px_1fr] h-full overflow-hidden">
			<ChatList
				chats={chats}
				selectedChatId={selectedChatId}
				onSelectChat={handleSelectChat}
			/>
			<div className="flex w-full">
				{selectedChat && (
					<ConversationPanel
						customerName={selectedChat.name}
						messages={messages[selectedChatId] || []}
						onSendMessage={handleSendMessage}
						onProfileClick={() => setShowProfilePanel(true)}
					/>
				)}

				<AnimatePresence>
					{showProfilePanel && (
						<motion.div
							initial={{ width: 0, opacity: 0 }}
							animate={{ width: "30%", opacity: 1 }}
							exit={{ width: 0, opacity: 0 }}
							transition={{ duration: 0.2, ease: "easeOut" }}
							className="overflow-hidden"
						>
							<CustomerProfile
								customer={selectedCustomer}
								onBack={() => setShowProfilePanel(false)}
							/>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}
