/* eslint-disable react-hooks/incompatible-library */
"use client";

// React Compiler (Next 16) cannot yet analyze react-hook-form's watch API,
// so we disable the lint guard for this component only.

import { useEffect, useMemo, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { createExpenseAction } from "@/app/(app)/actions";
import {
  expenseSchema,
  type ExpenseFormValues,
} from "@/lib/schemas/expense";
import { cn, formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { CategoryStat, MpesaFeeRule } from "@/types/dashboard";

const today = new Date().toISOString().slice(0, 10);

const defaultValues: ExpenseFormValues = {
  amount: 0,
  categoryId: "",
  vendor: "",
  description: "",
  mpesaFee: 0,
  paymentMethod: "m-pesa",
  transactionDate: today,
};

const estimateMpesaFee = (amount: number, rules: MpesaFeeRule[]) => {
  if (!amount || amount <= 0) return 0;
  const rule = rules.find(
    (r) => amount >= Number(r.min_amount) && amount <= Number(r.max_amount),
  );
  if (rule) return Number(rule.fee);
  return Math.round(amount * 0.006);
};

type Props = {
  categories: CategoryStat[];
  mpesaRules: MpesaFeeRule[];
  budgetRemaining: number;
};

export const QuickExpenseForm = ({
  categories,
  mpesaRules,
  budgetRemaining,
}: Props) => {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues,
  });

  const { data: liveCategories = categories } = useQuery<CategoryStat[]>({
    queryKey: ["categories-management"],
    queryFn: async () => {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error("Failed to load categories");
      return (await res.json()) as CategoryStat[];
    },
    initialData: categories,
  });

  const amount = form.watch("amount");
  const paymentMethod = form.watch("paymentMethod");
  const selectedCategory = form.watch("categoryId");

  useEffect(() => {
    if (!selectedCategory && liveCategories.length > 0) {
      form.setValue("categoryId", liveCategories[0].id, { shouldDirty: true });
    }
  }, [liveCategories, form, selectedCategory]);

  useEffect(() => {
    if (paymentMethod === "m-pesa" && amount && amount > 0) {
      form.setValue("mpesaFee", estimateMpesaFee(amount, mpesaRules), {
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }, [amount, paymentMethod, form, mpesaRules]);

  const handleSubmit = (values: ExpenseFormValues) => {
    startTransition(async () => {
      const result = await createExpenseAction(values);
      if (result?.error) {
        toast.error(result.error);
        return;
      }
      toast.success("Expense logged");
      queryClient.invalidateQueries({ queryKey: ["recent-transactions"] });
      form.reset({ ...defaultValues, transactionDate: new Date().toISOString().slice(0, 10) });
    });
  };

  const projectedBudget = useMemo(() => {
    if (!amount) return budgetRemaining;
    return Math.max(0, budgetRemaining - amount);
  }, [amount, budgetRemaining]);

  if (!liveCategories.length) {
    return (
      <p className="text-sm text-white/70">
        No categories found. Seed categories for this user to enable expense tracking.
      </p>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-widest text-white/60">
          Amount
        </label>
        <input
          type="number"
          placeholder="KES 0"
          inputMode="numeric"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-lg font-semibold text-white focus:outline focus:outline-emerald-400"
          {...form.register("amount", { valueAsNumber: true })}
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase tracking-widest text-white/60">
          Category
        </label>
        <div className="flex flex-wrap gap-2">
          {liveCategories.map((category) => (
            <button
              type="button"
              key={category.id}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition",
                selectedCategory === category.id
                  ? "border-emerald-400 bg-emerald-500/10 text-emerald-200"
                  : "border-white/10 text-white/70 hover:border-white/40",
              )}
              onClick={() => form.setValue("categoryId", category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-white/60">
            Vendor / Description
          </label>
          <input
            type="text"
            placeholder="Mama mboga"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline focus:outline-emerald-400"
            {...form.register("vendor")}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-white/60">
            Date
          </label>
          <input
            type="date"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline focus:outline-emerald-400"
            {...form.register("transactionDate")}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-white/60">
            Payment Method
          </label>
          <select
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline focus:outline-emerald-400"
            {...form.register("paymentMethod")}
          >
            <option value="m-pesa">M-Pesa</option>
            <option value="cash">Cash</option>
            <option value="card">Card</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="flex items-center justify-between text-xs uppercase tracking-widest text-white/60">
            M-Pesa Fee
            <span className="text-white/40">
              {paymentMethod === "m-pesa"
                ? "Auto"
                : "Manual when not on M-Pesa"}
            </span>
          </label>
          <input
            type="number"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline focus:outline-emerald-400"
            {...form.register("mpesaFee", { valueAsNumber: true })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase tracking-widest text-white/60">
          Notes
        </label>
        <textarea
          rows={3}
          placeholder="Street food treat?"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline focus:outline-emerald-400"
          {...form.register("description")}
        />
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            Budget Remaining
          </p>
          <p className="text-lg font-semibold text-white">
            {formatCurrency(projectedBudget)}
          </p>
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Log Expense"}
        </Button>
      </div>
    </form>
  );
};
