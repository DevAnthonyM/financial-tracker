import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { ensureAppUser } from "@/lib/server/user";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const appUser = await ensureAppUser(supabase, session.user);

  const { error: ownershipError } = await supabase
    .from("family_money")
    .select("id")
    .eq("id", id)
    .eq("user_id", appUser.id)
    .single();

  if (ownershipError) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const { data, error } = await supabase
    .from("family_money_transactions")
    .select("id,family_money_id,type,amount,note,transaction_date,created_at")
    .eq("family_money_id", id)
    .order("transaction_date", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const payload = await request.json();
  const supabase = createServerSupabaseClient("mutable");
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const appUser = await ensureAppUser(supabase, session.user);

  const { error: ownershipError } = await supabase
    .from("family_money")
    .select("id")
    .eq("id", id)
    .eq("user_id", appUser.id)
    .single();

  if (ownershipError) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const amount = Number(payload.amount ?? 0);
  const type = payload.type === "release" ? "release" : "deposit";

  const { data: transaction, error } = await supabase
    .from("family_money_transactions")
    .insert({
      family_money_id: id,
      type,
      amount,
      note: payload.note ?? null,
      transaction_date: payload.transaction_date ?? new Date().toISOString().slice(0, 10),
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const delta = type === "deposit" ? amount : -amount;
  await supabase.rpc("update_family_money_balance", {
    p_family_money_id: id,
    p_delta: delta,
    p_type: type,
  });

  revalidatePath("/dashboard");
  return NextResponse.json(transaction, { status: 201 });
}
