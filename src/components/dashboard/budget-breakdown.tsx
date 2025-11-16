import { budgetCategories } from "@/config/categories";
import { formatCurrency } from "@/lib/utils";

type BudgetCategory = (typeof budgetCategories)[number];

const sampleSpend: Record<string, number> = {
  rent: 3560,
  "ai-tool-1": 2800,
  wifi: 800,
  "family-support": 2500,
  food: 1200,
  transport: 500,
  shopping: 800,
  "street-food": 180,
  "emergency-medical": 0,
};

const tierOrder: Record<BudgetCategory["tier"], number> = {
  Fixed: 1,
  Essential: 2,
  Controlled: 3,
  Emergency: 4,
};

export const BudgetBreakdown = () => {
  const categories = [...budgetCategories].sort(
    (a, b) => tierOrder[a.tier] - tierOrder[b.tier],
  );
  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Categories</p>
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Tiered Limits</p>
      </div>
      <div className="space-y-4">
        {categories.map((category) => {
          const spent = sampleSpend[category.id] ?? 0;
          const percentage = Math.min(1, spent / category.limit);
          return (
            <div key={category.id} className="space-y-1">
              <div className="flex items-center justify-between text-sm text-white/80">
                <div>
                  <p className="font-medium">{category.name}</p>
                  <p className="text-xs text-white/60">{category.tier}</p>
                </div>
                <p>
                  {formatCurrency(spent)} / {formatCurrency(category.limit)}
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
