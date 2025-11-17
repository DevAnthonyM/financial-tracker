import { NextResponse } from "next/server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { ensureAppUser } from "@/lib/server/user";

export async function GET() {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const appUser = await ensureAppUser(supabase, session.user);
  const { data, error } = await supabase
    .from("recurring_payments")
    .select(
      "id,name,amount,category_id,frequency,next_due_date,is_active,reminder_days_before",
    )
    .eq("user_id", appUser.id)
    .order("next_due_date", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}
