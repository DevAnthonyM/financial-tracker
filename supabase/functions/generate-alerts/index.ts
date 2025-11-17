import { createClient } from "@supabase/supabase-js";

declare const Deno: {
  env: {
    get(name: string): string | undefined;
  };
};

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars");
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

const SPEND_THRESHOLD_WARNING = 0.7;
const SPEND_THRESHOLD_CRITICAL = 0.9;

async function createAlert(userId: string, message: string, severity: "warning" | "critical") {
  await supabase.from("alerts").insert({
    user_id: userId,
    type: "auto",
    severity,
    message,
    is_read: false,
  });
}

async function checkCategorySpend(userId: string) {
  const { data: categories } = await supabase
    .from("categories")
    .select("id,name,monthly_limit")
    .eq("user_id", userId)
    .eq("is_active", true);

  if (!categories) return;

  for (const category of categories) {
    const { data: totals } = await supabase
      .from("transactions")
      .select("amount")
      .eq("user_id", userId)
      .eq("category_id", category.id)
      .eq("type", "expense");

    const spent = totals?.reduce((sum, tx) => sum + Number(tx.amount), 0) ?? 0;
    const ratio = spent / Number(category.monthly_limit ?? 1);

    if (ratio >= SPEND_THRESHOLD_CRITICAL) {
      await createAlert(
        userId,
        `${category.name} is ${Math.round(ratio * 100)}% of its limit`,
        "critical",
      );
    } else if (ratio >= SPEND_THRESHOLD_WARNING) {
      await createAlert(
        userId,
        `${category.name} has crossed ${Math.round(ratio * 100)}% of its limit`,
        "warning",
      );
    }
  }
}

async function checkUpcomingPayments(userId: string) {
  const today = new Date();
  const { data: payments } = await supabase
    .from("recurring_payments")
    .select("name,next_due_date,reminder_days_before")
    .eq("user_id", userId)
    .eq("is_active", true);

  if (!payments) return;

  for (const payment of payments) {
    if (!payment.next_due_date) continue;
    const dueDate = new Date(payment.next_due_date);
    const diffDays = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const lead = payment.reminder_days_before ?? 2;
    if (diffDays <= lead && diffDays >= 0) {
      await createAlert(
        userId,
        `${payment.name} is due in ${diffDays} day(s)`,
        "warning",
      );
    }
  }
}

export default async function handler(_req: Request) {
  const { data: users } = await supabase.from("users").select("id");
  if (!users) {
    return new Response("ok");
  }

  for (const user of users) {
    await checkCategorySpend(user.id);
    await checkUpcomingPayments(user.id);
  }

  return new Response("alerts generated", { status: 200 });
}
