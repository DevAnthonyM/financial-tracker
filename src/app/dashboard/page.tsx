import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { QuickExpenseForm } from "@/components/forms/quick-expense-form";
import { IncomeForm } from "@/components/forms/income-form";
import { BudgetBreakdown } from "@/components/dashboard/budget-breakdown";
import { DashboardHero } from "@/components/dashboard/dashboard-hero";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { CategoryManager } from "@/components/categories/category-manager";
import { AlertsPanel } from "@/components/alerts/alerts-panel";
import { PaymentCalendar } from "@/components/payments/payment-calendar";
import { FamilyMoneyCard } from "@/components/family/family-money-card";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { ensureAppUser } from "@/lib/server/user";
import { fetchDashboardData } from "@/lib/server/dashboard";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const cookieNames = cookieStore.getAll().map((cookie) => cookie.name);
  console.log("[dashboard] incoming cookie names:", cookieNames);

  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("[dashboard] session lookup result:", session?.user?.id ?? "none");

  if (!session) {
    console.log("[dashboard] no session found, redirecting to /sign-in");
    redirect("/sign-in");
  }

  const appUser = await ensureAppUser(supabase, session.user);
  console.log("[dashboard] ensured app user:", appUser.id);
  const dashboardData = await fetchDashboardData(supabase, appUser.id);
  console.log("[dashboard] metrics snapshot:", {
    totalBudget: dashboardData.metrics.totalBudget,
    spent: dashboardData.metrics.spent,
    categories: dashboardData.categories.length,
  });

  return (
    <div className="space-y-12">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Dashboard</p>
        <h1 className="text-3xl font-semibold">November Financial Control Center</h1>
        <p className="text-white/70">
          This dashboard reflects your live Supabase data – log expenses or income below and
          watch budgets, balances, and alerts update instantly.
        </p>
      </div>

      <DashboardHero metrics={dashboardData.metrics} />

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="card space-y-6">
            <p className="text-lg font-semibold">Quick Expense Entry</p>
            <QuickExpenseForm
              categories={dashboardData.categories}
              mpesaRules={dashboardData.mpesaRules}
              budgetRemaining={dashboardData.budgetRemaining}
            />
          </div>
          <div className="card space-y-6">
            <p className="text-lg font-semibold">Income Entry</p>
            <IncomeForm />
          </div>
        </div>
        <RecentTransactions initialData={dashboardData.recentTransactions} />
      </div>

      <BudgetBreakdown categories={dashboardData.categories} />
      <div className="grid gap-8 lg:grid-cols-2">
        <AlertsPanel initialAlerts={dashboardData.alerts} />
        <PaymentCalendar initialPayments={dashboardData.recurringPayments} />
      </div>
      <FamilyMoneyCard
        accounts={dashboardData.familyAccounts}
        transactions={dashboardData.familyTransactions}
      />
      <CategoryManager initialCategories={dashboardData.categories} />
    </div>
  );
}
