import type { SupabaseClient, User } from "@supabase/supabase-js";

type AppUser = {
  id: string;
  auth_user_id: string;
  full_name: string | null;
  currency: string | null;
};

export const ensureAppUser = async (
  supabase: SupabaseClient,
  authUser: User,
): Promise<AppUser> => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("auth_user_id", authUser.id)
    .single();

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  if (data) {
    return data as AppUser;
  }

  const { data: inserted, error: insertError } = await supabase
    .from("users")
    .insert({
      auth_user_id: authUser.id,
      full_name: authUser.user_metadata?.full_name ?? authUser.email,
      currency: "KES",
    })
    .select("*")
    .single();

  if (insertError || !inserted) {
    throw insertError ?? new Error("Unable to create user profile");
  }

  return inserted as AppUser;
};
