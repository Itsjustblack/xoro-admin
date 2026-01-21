interface MessageBubbleProps {
	content: string;
	timestamp: string;
	isAgent: boolean;
}

export function MessageBubble({
	content,
	timestamp,
	isAgent,
}: MessageBubbleProps) {
	return (
		<div className={`flex gap-3 mb-4 ${isAgent ? "flex-row-reverse" : ""}`}>
			<div
				className={`max-w-xs px-4 py-2 rounded-lg ${
					isAgent
						? "bg-primary text-primary-foreground rounded-tr-none"
						: "bg-muted text-foreground rounded-tl-none"
				}`}
			>
				<p className="text-sm wrap-break-word">{content}</p>
			</div>
			<p className="text-xs text-muted-foreground self-end">{timestamp}</p>
		</div>
	);
}
