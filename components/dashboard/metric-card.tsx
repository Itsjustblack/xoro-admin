import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type MetricCardProps = {
  title: string;
  value: string;
  change: string;
  changeLabel: string;
  icon: ReactNode;
  iconClassName: string;
  changeClassName: string;
  sparklineClassName: string;
  sparklineValues: number[];
};

const buildSparklinePoints = (values: number[]) => {
  const width = 78;
  const height = 30;
  const padding = 2;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const normalized = (value - min) / range;
      const y = height - normalized * (height - padding * 2) - padding;

      return `${x},${y}`;
    })
    .join(" ");
};

const MetricCard = ({
  title,
  value,
  change,
  changeLabel,
  icon,
  iconClassName,
  changeClassName,
  sparklineClassName,
  sparklineValues,
}: MetricCardProps) => {
  return (
    <Card className="rounded-3xl border border-brand-primary-dark/10 bg-surface-1 p-0 ring-0 shadow">
      <div className="flex h-41.5 flex-col justify-between gap-5 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-4">
            <p className="text-sm font-semibold leading-6 text-text-secondary">
              {title}
            </p>
            <div className="space-y-1.5">
              <p className="text-2xl leading-none font-bold text-text-primary">
                {value}
              </p>
              <p className="max-w-40 text-sm leading-5">
                <span className={cn("font-semibold", changeClassName)}>
                  {change}
                </span>{" "}
                <span className="font-medium text-text-muted">
                  {changeLabel}
                </span>
              </p>
            </div>
          </div>
          <div className={cn("shrink-0", iconClassName)}>{icon}</div>
        </div>

        <div className="flex justify-end">
          <svg aria-hidden="true" viewBox="0 0 78 30" className="h-7.5 w-19.5">
            <polyline
              className={cn("stroke-current", sparklineClassName)}
              fill="none"
              points={buildSparklinePoints(sparklineValues)}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.2"
            />
          </svg>
        </div>
      </div>
    </Card>
  );
};

export default MetricCard;
