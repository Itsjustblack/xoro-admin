"use client";

import { TrendingUp } from "lucide-react";

interface MetricCardProps {
	title: string;
	value: string;
	change: string;
	period: string;
}

export function MetricCard({ title, value, change, period }: MetricCardProps) {
	return (
		<div className="bg-card border border-border rounded-lg p-6 hover:shadow-sm transition-shadow">
			<div className="flex items-start justify-between mb-4">
				<h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
				<div className="p-2 bg-primary/10 rounded-lg">
					<TrendingUp className="w-4 h-4 text-primary" />
				</div>
			</div>

			<div className="space-y-2">
				<p className="text-2xl font-bold text-foreground">{value}</p>
				<div className="flex items-center gap-2">
					<span className="text-sm font-semibold text-green-600">{change}</span>
					<span className="text-xs text-muted-foreground">{period}</span>
				</div>
			</div>
		</div>
	);
}
