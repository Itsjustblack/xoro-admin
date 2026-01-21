"use client";

import { ChartAreaInteractive } from "./interactive-chart";
import { MetricCard } from "./metric-card";
import { ChartPieDonutText } from "./pie-chart";

export function DashboardContent() {
	const metrics = [
		{
			title: "Total Revenue",
			value: "₦1,250,000",
			change: "+12.5%",
			period: "vs last week",
		},
		{
			title: "Conversations",
			value: "1.8K",
			change: "+8.2%",
			period: "vs last week",
		},
		{
			title: "Payments",
			value: "423",
			change: "+3.1%",
			period: "vs last week",
		},
	];

	return (
		<div className="p-8">
			{/* Welcome Section */}
			<div className="mb-8">
				<h2 className="text-3xl font-bold text-foreground mb-2">
					Welcome back!
				</h2>
				<p className="text-muted-foreground">
					Here&apos;s an overview of your business performance
				</p>
			</div>

			{/* Metrics Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
				{metrics.map((metric, index) => (
					<MetricCard
						key={index}
						{...metric}
					/>
				))}
			</div>

			<div className="grid md:grid-cols-2 gap-6">
				<ChartAreaInteractive />
				<ChartPieDonutText />
			</div>
		</div>
	);
}
