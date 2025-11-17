import type { SupabaseClient } from "@supabase/supabase-js";
import {
  differenceInCalendarDays,
  endOfMonth,
  format,
  startOfMonth,
} from "date-fns";

import type {
  CategoryStat,
  DashboardMetrics,
  MpesaFeeRule,
  TransactionItem,
  AlertItem,
  RecurringPayment,
} from "@/types/dashboard";

export const ensureCurrentBudgetPeriod = async (
  supabase: SupabaseClient,
  userId: string,
) => {
  const monthStart = startOfMonth(new Date());
  const monthEnd = endOfMonth(new Date());
  const monthKey = format(monthStart, "yyyy-MM");

  const { data: existing, error } = await supabase
    .from("budget_periods")
    .select("*")
    .eq("user_id", userId)
    .eq("month", monthKey)
    .single();

  if (existing) {
    return { period: existing, monthStart, monthEnd, monthKey };
  }

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  const { data: categories } = await supabase
    .from("categories")
    .select("monthly_limit")
    .eq("user_id", userId)
    .eq("is_active", true);

  const totalBudget = categories?.reduce(
    (sum, cat) => sum + Number(cat.monthly_limit ?? 0),
    0,
  );

  const { data: inserted, error: insertError } = await supabase
    .from("budget_periods")
    .insert({
      user_id: userId,
      month: monthKey,
      total_budget: totalBudget ?? 0,
      total_spent: 0,
      total_income: 0,
      status: "on-track",
      start_date: monthStart.toISOString().slice(0, 10),
      end_date: monthEnd.toISOString().slice(0, 10),
    })
    .select("*")
    .single();

  if (insertError || !inserted) {
    throw insertError ?? new Error("Unable to seed budget period");
  }

  return { period: inserted, monthStart, monthEnd, monthKey };
};

export const fetchDashboardData = async (
  supabase: SupabaseClient,
  userId: string,
) => {
  const { period, monthStart, monthEnd } = await ensureCurrentBudgetPeriod(
    supabase,
    userId,
  );

  const { data: categoriesResponse } = await supabase
    .from("categories")
    .select("id,name,tier,monthly_limit,color,sort_order")
    .eq("user_id", userId)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  const categoriesData = categoriesResponse ?? [];

  const { data: monthTransactionsResponse } = await supabase
    .from("transactions")
    .select(
      "id, amount, type, transaction_date, vendor, description, payment_method, category_id, category:categories(name,tier)",
    )
    .eq("user_id", userId)
    .gte("transaction_date", monthStart.toISOString().slice(0, 10))
    .lte("transaction_date", monthEnd.toISOString().slice(0, 10))
    .order("transaction_date", { ascending: false });
  const monthTransactions = (monthTransactionsResponse ?? []).map((tx) => ({
    ...tx,
    category: Array.isArray(tx.category) ? tx.category[0] : tx.category,
  }));
  const typedTransactions = monthTransactions as TransactionItem[];

  const totalSpent = typedTransactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const categoryStats: CategoryStat[] = categoriesData.map((category) => {
    const spentForCategory = typedTransactions
      .filter(
        (tx) => tx.category_id === category.id && tx.type === "expense",
      )
      .reduce((sum, tx) => sum + Number(tx.amount), 0);
    return {
      id: category.id,
      name: category.name,
      tier: category.tier,
      monthly_limit: Number(category.monthly_limit),
      color: category.color,
      spent: spentForCategory,
    };
  });

  const daysRemaining = Math.max(
    0,
    differenceInCalendarDays(monthEnd, new Date()) + 1,
  );
  const dailyBudget =
    daysRemaining > 0
      ? Math.max(0, Number(period.total_budget) - totalSpent) / daysRemaining
      : 0;

  const { data: emergencyAccount } = await supabase
    .from("savings_accounts")
    .select("account_type,current_balance,target_amount")
    .eq("user_id", userId)
    .eq("account_type", "emergency")
    .maybeSingle();

  const { data: nextRecurring } = await supabase
    .from("recurring_payments")
    .select("name, amount, next_due_date")
    .eq("user_id", userId)
    .eq("is_active", true)
    .gte("next_due_date", new Date().toISOString().slice(0, 10))
    .order("next_due_date", { ascending: true })
    .limit(1);

  const { data: mpesaRulesResponse } = await supabase
    .from("mpesa_fee_rules")
    .select("transaction_type,min_amount,max_amount,fee,note")
    .eq("transaction_type", "send_money")
    .order("min_amount", { ascending: true });
  const mpesaRules = mpesaRulesResponse ?? [];

  const { data: alertsResponse } = await supabase
    .from("alerts")
    .select("id,type,severity,message,is_read,created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(10);
  const alerts = alertsResponse ?? [];

  const { data: recurringResponse } = await supabase
    .from("recurring_payments")
    .select(
      "id,name,amount,category_id,frequency,next_due_date,is_active,reminder_days_before",
    )
    .eq("user_id", userId)
    .eq("is_active", true)
    .order("next_due_date", { ascending: true });
  const recurringPayments = recurringResponse ?? [];

  return {
    metrics: {
      totalBudget: Number(period.total_budget ?? 0),
      spent: totalSpent,
      spentPercent:
        Number(period.total_budget) > 0
          ? totalSpent / Number(period.total_budget)
          : 0,
      daysRemaining,
      dailyBudget,
      emergencyCurrent: Number(emergencyAccount?.current_balance ?? 0),
      emergencyTarget: Number(emergencyAccount?.target_amount ?? 0),
      nextPayment: nextRecurring?.[0]
        ? {
            name: nextRecurring[0].name,
            amount: Number(nextRecurring[0].amount),
            dueDate: nextRecurring[0].next_due_date,
          }
        : null,
    } satisfies DashboardMetrics,
    recentTransactions: typedTransactions.slice(0, 5),
    categories: categoryStats,
    mpesaRules: mpesaRules as MpesaFeeRule[],
    alerts: alerts as AlertItem[],
    recurringPayments: recurringPayments as RecurringPayment[],
    budgetPeriodId: period.id as string,
    budgetRemaining: Math.max(
      0,
      Number(period.total_budget ?? 0) - totalSpent,
    ),
  };
};
