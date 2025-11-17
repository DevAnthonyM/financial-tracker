import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { ensureAppUser } from "@/lib/server/user";
import { recalculateBudgetTotals } from "@/lib/server/budget";

const tierOptions = ["Fixed", "Essential", "Controlled", "Emergency"];

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
  if (payload.name) updates.name = String(payload.name);
  if (payload.tier && tierOptions.includes(payload.tier)) {
    updates.tier = payload.tier;
  }
  if (payload.monthly_limit !== undefined) {
    updates.monthly_limit = Number(payload.monthly_limit);
  }
  if (payload.color) updates.color = payload.color;
  if (payload.sort_order !== undefined) {
    updates.sort_order = Number(payload.sort_order);
  }
  if (payload.is_active !== undefined) {
    updates.is_active = Boolean(payload.is_active);
  }

  const { data, error } = await supabase
    .from("categories")
    .update(updates)
    .eq("id", id)
    .eq("user_id", appUser.id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await recalculateBudgetTotals(supabase, appUser.id);
  revalidatePath("/dashboard");

  return NextResponse.json(data);
}

export async function DELETE(
  _request: NextRequest,
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

  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id)
    .eq("user_id", appUser.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await recalculateBudgetTotals(supabase, appUser.id);
  revalidatePath("/dashboard");

  return NextResponse.json({ success: true });
}
