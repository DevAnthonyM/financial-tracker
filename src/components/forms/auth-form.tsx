"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { signInAction, signUpAction } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type AuthValues = z.infer<typeof authSchema>;

export const AuthForm = () => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [isPending, startTransition] = useTransition();
  const form = useForm<AuthValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: AuthValues) => {
    startTransition(async () => {
      const result =
        mode === "signin" ? await signInAction(values) : await signUpAction(values);

      if (result?.error) {
        toast.error(result.error);
      }
    });
  };

  return (
    <div className="card space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">
          {mode === "signin" ? "Welcome Back" : "Create an Account"}
        </p>
        <div className="flex rounded-full border border-white/10 p-1 text-xs">
          <button
            type="button"
            onClick={() => setMode("signin")}
            className={cn(
              "rounded-full px-3 py-1 transition",
              mode === "signin" ? "bg-emerald-500/20 text-white" : "text-white/60",
            )}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={cn(
              "rounded-full px-3 py-1 transition",
              mode === "signup" ? "bg-emerald-500/20 text-white" : "text-white/60",
            )}
          >
            Sign up
          </button>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.3em] text-white/60">
            Email
          </label>
          <input
            type="email"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline focus:outline-emerald-400"
            placeholder="precious@example.com"
            {...form.register("email")}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.3em] text-white/60">
            Password
          </label>
          <input
            type="password"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline focus:outline-emerald-400"
            placeholder="******"
            {...form.register("password")}
          />
          <p className="text-xs text-white/50">
            {mode === "signup"
              ? "Password must be at least 6 characters."
              : "Use the credentials you registered with."}
          </p>
        </div>
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Please wait..." : mode === "signin" ? "Sign in" : "Create account"}
        </Button>
      </form>
    </div>
  );
};
