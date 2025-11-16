/* eslint-disable react-hooks/incompatible-library */
"use client";

import { useMemo, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createIncomeAction } from "@/app/(app)/actions";
import {
  incomeSchema,
  type IncomeFormValues,
} from "@/lib/schemas/income";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const allocationPlan = [
  { id: "emergency", label: "Emergency Fund", percent: 0.27 },
  { id: "general", label: "Operating Cash", percent: 0.54 },
  { id: "business", label: "Business Growth", percent: 0.11 },
  { id: "family", label: "Family Savings", percent: 0.08 },
];

const today = new Date().toISOString().slice(0, 10);

const defaultValues: IncomeFormValues = {
  amount: 0,
  source: "",
  paymentType: "mid_month",
  description: "",
  transactionDate: today,
};

export const IncomeForm = () => {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const form = useForm<IncomeFormValues>({
    resolver: zodResolver(incomeSchema),
    defaultValues,
  });

  const amount = form.watch("amount");

  const allocations = useMemo(() => {
    if (!amount || amount <= 0) {
      return allocationPlan.map((entry) => ({ ...entry, amount: 0 }));
    }

    return allocationPlan.map((entry) => ({
      ...entry,
      amount: Math.round(amount * entry.percent * 100) / 100,
    }));
  }, [amount]);

  const handleSubmit = (values: IncomeFormValues) => {
    startTransition(async () => {
      const result = await createIncomeAction(values);
      if (result?.error) {
        toast.error(result.error);
        return;
      }
      toast.success("Income captured & allocations queued");
      queryClient.invalidateQueries({ queryKey: ["recent-transactions"] });
      form.reset({ ...defaultValues, transactionDate: new Date().toISOString().slice(0, 10) });
    });
  };

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.3em] text-white/60">Amount</label>
        <input
          type="number"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-lg font-semibold text-white focus:outline focus:outline-emerald-400"
          {...form.register("amount", { valueAsNumber: true })}
        />
      </div>
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.3em] text-white/60">Source</label>
        <input
          type="text"
          placeholder="Freelance client, Wifi sharing, etc."
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline focus:outline-emerald-400"
          {...form.register("source")}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.3em] text-white/60">Payment Type</label>
          <select
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline focus:outline-emerald-400"
            {...form.register("paymentType")}
          >
            <option value="mid_month">Mid-month</option>
            <option value="start_month">Start of month</option>
            <option value="one_time">One-time</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.3em] text-white/60">Date</label>
          <input
            type="date"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline focus:outline-emerald-400"
            {...form.register("transactionDate")}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.3em] text-white/60">Notes</label>
        <textarea
          rows={3}
          placeholder="How will this income be used?"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline focus:outline-emerald-400"
          {...form.register("description")}
        />
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Suggested Allocations</p>
        <div className="mt-3 space-y-2 text-sm text-white/80">
          {allocations.map((entry) => (
            <div key={entry.id} className="flex items-center justify-between">
              <span>{entry.label}</span>
              <span>{formatCurrency(entry.amount)}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-white/50">
          We automatically log deposits into the respective savings accounts so balances stay in sync.
        </p>
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Saving..." : "Log Income"}
      </Button>
    </form>
  );
};
