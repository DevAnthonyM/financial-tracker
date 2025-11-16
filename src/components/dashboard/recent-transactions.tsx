"use client";

import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";

import type { TransactionItem } from "@/types/dashboard";
import { formatCurrency } from "@/lib/utils";

type Props = {
  initialData: TransactionItem[];
};

export const RecentTransactions = ({ initialData }: Props) => {
  const { data, isLoading, error } = useQuery<TransactionItem[]>({
    queryKey: ["recent-transactions"],
    queryFn: async () => {
      const res = await fetch("/api/recent-transactions");
      if (!res.ok) {
        throw new Error("Failed to load transactions");
      }
      return (await res.json()) as TransactionItem[];
    },
    initialData,
    refetchInterval: 60000,
  });

  const transactions = data ?? [];

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Recent Transactions</p>
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Live Feed</p>
      </div>
      {isLoading && <p className="text-sm text-white/60">Loading...</p>}
      {error && (
        <p className="text-sm text-rose-300">
          Unable to fetch transactions. Please try again.
        </p>
      )}
      <div className="space-y-3">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-3"
          >
            <div>
              <p className="font-medium">
                {tx.category?.name ?? "Uncategorized"}{" "}
                {tx.type === "income" ? "income" : "expense"}
              </p>
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                {tx.vendor ?? tx.description ?? "No notes"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-base font-semibold">
                {tx.type === "income" ? "+" : "-"}
                {formatCurrency(tx.amount)}
              </p>
              <p className="text-xs text-white/50">
                {formatDistanceToNow(new Date(tx.transaction_date), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
        ))}
        {!transactions.length && !isLoading && (
          <p className="text-sm text-white/60">No transactions yet.</p>
        )}
      </div>
    </div>
  );
};
