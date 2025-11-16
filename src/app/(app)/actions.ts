"use server";

import { revalidatePath } from "next/cache";

import { expenseSchema, type ExpenseFormValues } from "@/lib/schemas/expense";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function createExpenseAction(input: ExpenseFormValues) {
  const parsed = expenseSchema.safeParse(input);
  if (!parsed.success) {
    return {
      error: "Invalid expense payload",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = createServerSupabaseClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Please sign in to log expenses." };
  }

  const { error } = await supabase.from("transactions").insert({
    user_id: user.id,
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
    console.error("Supabase error", error);
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return { success: true };
}
