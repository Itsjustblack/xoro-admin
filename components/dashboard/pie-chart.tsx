"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "@/components/ui/chart";

export const description = "A donut chart with text";

const chartData = [
	{ channel: "whatsapp", messages: 450, fill: "var(--color-whatsapp)" },
	{ channel: "instagram", messages: 320, fill: "var(--color-instagram)" },
	{ channel: "facebook", messages: 280, fill: "var(--color-facebook)" },
	{ channel: "sms", messages: 150, fill: "var(--color-sms)" },
];

const chartConfig = {
	messages: {
		label: "Messages",
	},
	whatsapp: {
		label: "WhatsApp",
		color: "var(--chart-1)",
	},
	instagram: {
		label: "Instagram",
		color: "var(--chart-2)",
	},
	facebook: {
		label: "Facebook",
		color: "var(--chart-3)",
	},
	sms: {
		label: "SMS",
		color: "var(--chart-4)",
	},
} satisfies ChartConfig;

export function ChartPieDonutText() {
	const totalMessages = React.useMemo(() => {
		return chartData.reduce((acc, curr) => acc + curr.messages, 0);
	}, []);

	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle>Channel Distribution</CardTitle>
				<CardDescription>Messages by channel</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-62.5"
				>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie
							data={chartData}
							dataKey="messages"
							nameKey="channel"
							innerRadius={60}
							strokeWidth={5}
						>
							<Label
								content={({ viewBox }) => {
									if (viewBox && "cx" in viewBox && "cy" in viewBox) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor="middle"
												dominantBaseline="middle"
											>
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className="fill-foreground text-3xl font-bold"
												>
													{totalMessages.toLocaleString()}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 24}
													className="fill-muted-foreground"
												>
													Messages
												</tspan>
											</text>
										);
									}
								}}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
