import { formatCurrency } from "@/lib/utils";

const heroData = {
  budget: 21841,
  spent: 12450,
  daysRemaining: 18,
  dailyBudget: 522,
  emergencyFund: { current: 20000, target: 35000 },
  nextPayment: { label: "Wifi - Nov 15", amount: 1523 },
};

const statusColor = (spentPercent: number) => {
  if (spentPercent < 0.7) return "text-emerald-300";
  if (spentPercent < 0.9) return "text-amber-300";
  return "text-rose-300";
};

export const DashboardHero = () => {
  const spentPercent = heroData.spent / heroData.budget;
  return (
    <div className="grid gap-4 lg:grid-cols-4">
      <HeroCard label="Current Budget" value={formatCurrency(heroData.budget)} />
      <HeroCard
        label="Spent So Far"
        value={`${formatCurrency(heroData.spent)} - ${(spentPercent * 100).toFixed(0)}%`}
        valueClass={statusColor(spentPercent)}
      />
      <HeroCard label="Days Remaining" value={`${heroData.daysRemaining} days`} />
      <HeroCard label="Daily Budget" value={formatCurrency(heroData.dailyBudget)} />
      <HeroCard
        label="Emergency Fund"
        value={`${formatCurrency(heroData.emergencyFund.current)} / ${formatCurrency(heroData.emergencyFund.target)}`}
        className="lg:col-span-2"
      />
      <HeroCard
        label="Next Payment"
        value={`${heroData.nextPayment.label} - ${formatCurrency(heroData.nextPayment.amount)}`}
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
