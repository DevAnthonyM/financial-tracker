import { NextRequest, NextResponse } from "next/server";
import { addDays, addMonths, addWeeks, addYears, format } from "date-fns";
import { revalidatePath } from "next/cache";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { ensureAppUser } from "@/lib/server/user";

const advanceDate = (current: string, frequency: string) => {
  const baseDate = current ? new Date(current) : new Date();
  switch (frequency) {
    case "weekly":
      return format(addWeeks(baseDate, 1), "yyyy-MM-dd");
    case "quarterly":
      return format(addMonths(baseDate, 3), "yyyy-MM-dd");
    case "yearly":
      return format(addYears(baseDate, 1), "yyyy-MM-dd");
    default:
      return format(addMonths(baseDate, 1), "yyyy-MM-dd");
  }
};

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const supabase = createServerSupabaseClient("mutable");
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const appUser = await ensureAppUser(supabase, session.user);
  const payload = await request.json();
  const updates: Record<string, unknown> = {};

  if (payload.name) updates.name = payload.name;
  if (payload.amount !== undefined) updates.amount = Number(payload.amount);
  if (payload.frequency) updates.frequency = payload.frequency;
  if (payload.next_due_date) updates.next_due_date = payload.next_due_date;
  if (payload.is_active !== undefined) updates.is_active = Boolean(payload.is_active);
  if (payload.reminder_days_before !== undefined) {
    updates.reminder_days_before = Number(payload.reminder_days_before);
  }

  if (payload.mark_paid) {
    const { data: payment } = await supabase
      .from("recurring_payments")
      .select("frequency,next_due_date")
      .eq("id", id)
      .eq("user_id", appUser.id)
      .single();
    const frequency = payload.frequency ?? payment?.frequency ?? "monthly";
    const currentDue = payload.next_due_date ?? payment?.next_due_date ?? undefined;
    updates.next_due_date = advanceDate(currentDue ?? "", frequency);
  }

  if (payload.snooze_days) {
    const days = Number(payload.snooze_days);
    if (!Number.isNaN(days) && days > 0) {
      const current = updates.next_due_date ?? payload.next_due_date;
      const baseDate = current ? new Date(current) : new Date();
      updates.next_due_date = format(addDays(baseDate, days), "yyyy-MM-dd");
    }
  }

  const { data, error } = await supabase
    .from("recurring_payments")
    .update(updates)
    .eq("id", id)
    .eq("user_id", appUser.id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath("/dashboard");
  return NextResponse.json(data);
}
