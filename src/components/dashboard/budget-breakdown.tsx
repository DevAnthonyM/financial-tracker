import type { CategoryStat } from "@/types/dashboard";
import { formatCurrency } from "@/lib/utils";

const tierOrder: Record<string, number> = {
  Fixed: 1,
  Essential: 2,
  Controlled: 3,
  Emergency: 4,
};

type Props = {
  categories: CategoryStat[];
};

export const BudgetBreakdown = ({ categories }: Props) => {
  const sorted = [...categories].sort(
    (a, b) => (tierOrder[a.tier] ?? 99) - (tierOrder[b.tier] ?? 99),
  );
  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Categories</p>
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Tiered Limits</p>
      </div>
      <div className="space-y-4">
        {sorted.map((category) => {
          const percentage = Math.min(1, category.spent / category.monthly_limit);
          return (
            <div key={category.id} className="space-y-1">
              <div className="flex items-center justify-between text-sm text-white/80">
                <div>
                  <p className="font-medium">{category.name}</p>
                  <p className="text-xs text-white/60">{category.tier}</p>
                </div>
                <p>
                  {formatCurrency(category.spent)} / {formatCurrency(category.monthly_limit)}
                </p>
              </div>
              <div className="h-2 rounded-full bg-white/10">
                <div
                  className={`h-2 rounded-full ${
                    percentage < 0.7
                      ? "bg-emerald-400"
                      : percentage < 1
                        ? "bg-amber-400"
                        : "bg-rose-500"
                  }`}
                  style={{ width: `${Math.min(100, percentage * 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
