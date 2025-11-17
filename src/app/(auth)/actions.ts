"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { createServerSupabaseClient } from "@/lib/supabase/server";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type AuthValues = z.infer<typeof credentialsSchema>;

export async function signInAction(values: AuthValues) {
  const parsed = credentialsSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Invalid credentials" };
  }

  const supabase = createServerSupabaseClient("mutable");
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard");
}

export async function signUpAction(values: AuthValues) {
  const parsed = credentialsSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Invalid credentials" };
  }

  const supabase = createServerSupabaseClient("mutable");
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard");
}

export async function signOutAction() {
  const supabase = createServerSupabaseClient("mutable");
  await supabase.auth.signOut();
  redirect("/");
}
