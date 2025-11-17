import type { SupabaseClient } from "@supabase/supabase-js";
import { format, startOfMonth } from "date-fns";

export const recalculateBudgetTotals = async (
  supabase: SupabaseClient,
  userId: string,
) => {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("monthly_limit")
    .eq("user_id", userId)
    .eq("is_active", true);

  if (error) {
    console.error("[budget] failed to load categories for recalc", error);
    throw error;
  }

  const totalBudget =
    categories?.reduce(
      (sum, category) => sum + Number(category.monthly_limit ?? 0),
      0,
    ) ?? 0;

  const currentMonth = format(startOfMonth(new Date()), "yyyy-MM");

  await supabase
    .from("budget_periods")
    .update({ total_budget: totalBudget })
    .eq("user_id", userId)
    .eq("month", currentMonth);

  return totalBudget;
};
