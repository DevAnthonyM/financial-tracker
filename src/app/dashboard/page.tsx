import { redirect } from "next/navigation";

import { QuickExpenseForm } from "@/components/forms/quick-expense-form";
import { BudgetBreakdown } from "@/components/dashboard/budget-breakdown";
import { DashboardHero } from "@/components/dashboard/dashboard-hero";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="space-y-12">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Dashboard</p>
        <h1 className="text-3xl font-semibold">November Financial Control Center</h1>
        <p className="text-white/70">
          Syncs directly with Supabase tables once you run the migrations. Until then, the
          widgets below act as your interaction design reference for Phase 1.
        </p>
      </div>

      <DashboardHero />

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="card space-y-6">
          <p className="text-lg font-semibold">Quick Expense Entry</p>
          <QuickExpenseForm />
        </div>
        <RecentTransactions />
      </div>

      <BudgetBreakdown />
    </div>
  );
}
