import { format } from "date-fns";

import type { DashboardMetrics } from "@/types/dashboard";
import { formatCurrency } from "@/lib/utils";

const statusColor = (spentPercent: number) => {
  if (spentPercent < 0.7) return "text-emerald-300";
  if (spentPercent < 0.9) return "text-amber-300";
  return "text-rose-300";
};

type Props = {
  metrics: DashboardMetrics;
};

export const DashboardHero = ({ metrics }: Props) => {
  const spentPercent =
    metrics.totalBudget > 0 ? metrics.spent / metrics.totalBudget : 0;
  return (
    <div className="grid gap-4 lg:grid-cols-4">
      <HeroCard label="Current Budget" value={formatCurrency(metrics.totalBudget)} />
      <HeroCard
        label="Spent So Far"
        value={`${formatCurrency(metrics.spent)} - ${(spentPercent * 100).toFixed(0)}%`}
        valueClass={statusColor(spentPercent)}
      />
      <HeroCard label="Days Remaining" value={`${metrics.daysRemaining} days`} />
      <HeroCard label="Daily Budget" value={formatCurrency(metrics.dailyBudget)} />
      <HeroCard
        label="Emergency Fund"
        value={`${formatCurrency(metrics.emergencyCurrent)} / ${formatCurrency(metrics.emergencyTarget)}`}
        className="lg:col-span-2"
      />
      <HeroCard
        label="Next Payment"
        value={
          metrics.nextPayment
            ? `${metrics.nextPayment.name} - ${formatCurrency(metrics.nextPayment.amount)} (${format(new Date(metrics.nextPayment.dueDate), "MMM d")})`
            : "All clear"
        }
        className="lg:col-span-2"
      />
    </div>
  );
};

type HeroCardProps = {
  label: string;
  value: string;
  valueClass?: string;
  className?: string;
};

const HeroCard = ({ label, value, valueClass, className }: HeroCardProps) => (
  <div className={`rounded-2xl border border-white/10 bg-white/5 p-4 ${className ?? ""}`}>
    <p className="text-xs uppercase tracking-[0.3em] text-white/60">{label}</p>
    <p className={`mt-2 text-lg font-semibold ${valueClass ?? ""}`}>{value}</p>
  </div>
);
