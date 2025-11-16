"use server";

import { revalidatePath } from "next/cache";

import { expenseSchema, type ExpenseFormValues } from "@/lib/schemas/expense";
import { incomeSchema, type IncomeFormValues } from "@/lib/schemas/income";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { ensureAppUser } from "@/lib/server/user";
import { ensureCurrentBudgetPeriod } from "@/lib/server/dashboard";

const incomeAllocations = [
  { accountType: "emergency", percent: 0.27 },
  { accountType: "general", percent: 0.54 },
  { accountType: "business", percent: 0.11 },
  { accountType: "family", percent: 0.08 },
];

export async function createExpenseAction(input: ExpenseFormValues) {
  const parsed = expenseSchema.safeParse(input);
  if (!parsed.success) {
    console.log("[auth] createExpenseAction validation failed", parsed.error.flatten().fieldErrors);
    return {
      error: "Invalid expense payload",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = createServerSupabaseClient("mutable");
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.log("[auth] createExpenseAction user lookup failed", userError);
    return { error: "Please sign in to log expenses." };
  }

  const appUser = await ensureAppUser(supabase, user);
  const { period } = await ensureCurrentBudgetPeriod(supabase, appUser.id);

  const { error } = await supabase.from("transactions").insert({
    user_id: appUser.id,
    budget_period_id: period.id,
    amount: parsed.data.amount,
    category_id: parsed.data.categoryId,
    vendor: parsed.data.vendor,
    description: parsed.data.description,
    transaction_date: parsed.data.transactionDate,
    mpesa_fee: parsed.data.mpesaFee,
    payment_method: parsed.data.paymentMethod,
    type: "expense",
  });

  if (error) {
    console.error("[auth] createExpenseAction Supabase insert error", error);
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

export async function createIncomeAction(input: IncomeFormValues) {
  const parsed = incomeSchema.safeParse(input);
  if (!parsed.success) {
    console.log("[auth] createIncomeAction validation failed", parsed.error.flatten().fieldErrors);
    return {
      error: "Invalid income payload",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = createServerSupabaseClient("mutable");
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.log("[auth] createIncomeAction user lookup failed", userError);
    return { error: "Please sign in to log income." };
  }

  const appUser = await ensureAppUser(supabase, user);
  const { period } = await ensureCurrentBudgetPeriod(supabase, appUser.id);

  const { error } = await supabase.from("transactions").insert({
    user_id: appUser.id,
    budget_period_id: period.id,
    amount: parsed.data.amount,
    vendor: parsed.data.source,
    description: parsed.data.description,
    transaction_date: parsed.data.transactionDate,
    payment_method: parsed.data.paymentType,
    type: "income",
  });

  if (error) {
    console.error("[auth] Supabase income insert error", error);
    return { error: error.message };
  }

  const { data: accountsResponse } = await supabase
    .from("savings_accounts")
    .select("id, account_type, current_balance")
    .eq("user_id", appUser.id);
  const accounts = accountsResponse ?? [];

  const allocationRows = incomeAllocations
    .map((allocation) => {
      const account = accounts.find(
        (acct) => acct.account_type === allocation.accountType,
      );
      if (!account) return null;
      const amount =
        Math.round(parsed.data.amount * allocation.percent * 100) / 100;
      if (amount <= 0) return null;
      return {
        savings_account_id: account.id,
        amount,
        reason: `Allocation from ${parsed.data.source}`,
        transaction_date: parsed.data.transactionDate,
        accountBalance: Number(account.current_balance ?? 0),
      };
    })
    .filter(Boolean) as {
    savings_account_id: string;
    amount: number;
    reason: string;
    transaction_date: string;
    accountBalance: number;
  }[];

  if (allocationRows.length > 0) {
    await supabase
      .from("savings_transactions")
      .insert(
        allocationRows.map((row) => ({
          savings_account_id: row.savings_account_id,
          type: "deposit",
          amount: row.amount,
          reason: row.reason,
          transaction_date: row.transaction_date,
        })),
      );

    await Promise.all(
      allocationRows.map(({ savings_account_id, amount, accountBalance }) =>
        supabase
          .from("savings_accounts")
          .update({
            current_balance: accountBalance + amount,
          })
          .eq("id", savings_account_id),
      ),
    );
  }

  revalidatePath("/dashboard");
  return { success: true };
}
