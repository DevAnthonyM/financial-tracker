import Link from "next/link";

import { AuthForm } from "@/components/forms/auth-form";

export default function SignInPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-10">
      <div className="space-y-3 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-white/60">Authentication</p>
        <h1 className="text-3xl font-semibold">Secure your cockpit</h1>
        <p className="text-white/70">
          Accounts live in Supabase Auth. After sign up we drop you straight into the
          dashboard.
        </p>
      </div>
      <AuthForm />
      <p className="text-center text-sm text-white/60">
        Need Supabase keys?{" "}
        <Link href="https://supabase.com/dashboard" target="_blank" className="text-white">
          Open the Supabase dashboard
        </Link>
        .
      </p>
    </div>
  );
}
