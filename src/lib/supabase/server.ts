import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

import { env } from "@/lib/env";

export const createServerSupabaseClient = () => {
  const cookieStorePromise = cookies();
  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        async get(name) {
          const store = await cookieStorePromise;
          return store.get(name)?.value;
        },
        async set(name, value, options) {
          const store = await cookieStorePromise;
          store.set({ name, value, ...options });
        },
        async remove(name, options) {
          const store = await cookieStorePromise;
          store.delete({ name, ...options });
        },
      },
    },
  );
};
