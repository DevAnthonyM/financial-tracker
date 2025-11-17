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
    .from("family_money")
    .select("id,family_member_name,current_balance,total_deposited,total_released,last_activity")
    .eq("user_id", appUser.id)
    .order("family_member_name");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}

export async function POST(request: Request) {
  const supabase = createServerSupabaseClient("mutable");
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const appUser = await ensureAppUser(supabase, session.user);
  const payload = await request.json();

  const { data, error } = await supabase
    .from("family_money")
    .insert({
      user_id: appUser.id,
      family_member_name: payload.family_member_name ?? "New Member",
      current_balance: 0,
      total_deposited: 0,
      total_released: 0,
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
