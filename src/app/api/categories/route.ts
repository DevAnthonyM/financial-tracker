import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { ensureAppUser } from "@/lib/server/user";
import { recalculateBudgetTotals } from "@/lib/server/budget";

const tierOptions = ["Fixed", "Essential", "Controlled", "Emergency"];

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
    .from("categories")
    .select("id,name,tier,monthly_limit,color,sort_order,is_active")
    .eq("user_id", appUser.id)
    .order("sort_order", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsedTier = tierOptions.includes(body.tier) ? body.tier : "Controlled";

  const supabase = createServerSupabaseClient("mutable");
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const appUser = await ensureAppUser(supabase, session.user);

  const { data: inserted, error } = await supabase
    .from("categories")
    .insert({
      user_id: appUser.id,
      name: String(body.name ?? "New Category"),
      tier: parsedTier,
      monthly_limit: Number(body.monthly_limit ?? 0),
      color: body.color ?? "#16a34a",
      sort_order: Number(body.sort_order ?? 999),
      is_active: body.is_active ?? true,
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await recalculateBudgetTotals(supabase, appUser.id);
  revalidatePath("/dashboard");

  return NextResponse.json(inserted, { status: 201 });
}
