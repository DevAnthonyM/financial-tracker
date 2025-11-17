import { NextRequest, NextResponse } from "next/server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { ensureAppUser } from "@/lib/server/user";

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

  if (payload.family_member_name) {
    updates.family_member_name = payload.family_member_name;
  }

  const { data, error } = await supabase
    .from("family_money")
    .update(updates)
    .eq("id", id)
    .eq("user_id", appUser.id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

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
    .from("family_money")
    .delete()
    .eq("id", id)
    .eq("user_id", appUser.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
