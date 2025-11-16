import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

import { env } from "@/lib/env";

type Mode = "read-only" | "mutable";

export const createServerSupabaseClient = (mode: Mode = "read-only") => {
  const cookieStorePromise = cookies();
  const allowMutations = mode === "mutable";

  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        async get(name: string) {
          const store = await cookieStorePromise;
          return store.get(name)?.value;
        },
        async set(name: string, value: string, options?: Record<string, unknown>) {
          if (!allowMutations) return;
          const store = await cookieStorePromise;
          store.set({ name, value, ...(options ?? {}) });
        },
        async remove(name: string, options?: Record<string, unknown>) {
          if (!allowMutations) return;
          const store = await cookieStorePromise;
          store.delete({ name, ...(options ?? {}) });
        },
      },
    },
  );
};
