"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";

import type { FamilyMoneyAccount, FamilyMoneyTransaction } from "@/types/dashboard";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

type Props = {
  accounts: FamilyMoneyAccount[];
  transactions: FamilyMoneyTransaction[];
};

export const FamilyMoneyCard = ({ accounts, transactions }: Props) => {
  const queryClient = useQueryClient();
  const { data: liveAccounts = accounts } = useQuery({
    queryKey: ["family-money"],
    queryFn: async () => {
      const res = await fetch("/api/family-money");
      if (!res.ok) throw new Error("Failed to load family accounts");
      return (await res.json()) as FamilyMoneyAccount[];
    },
    initialData: accounts,
    refetchInterval: 60000,
  });

  const [selectedId, setSelectedId] = useState<string | null>(accounts[0]?.id ?? null);
  const effectiveId = selectedId ?? liveAccounts[0]?.id ?? null;

  const { data: memberTransactions = [] } = useQuery({
    queryKey: ["family-money-transactions", effectiveId],
    queryFn: async () => {
      if (!effectiveId) return [] as FamilyMoneyTransaction[];
      const res = await fetch(`/api/family-money/${effectiveId}/transactions`);
      if (!res.ok) throw new Error("Failed to load transactions");
      return (await res.json()) as FamilyMoneyTransaction[];
    },
    initialData: transactions.filter((tx) => tx.family_money_id === effectiveId),
    enabled: Boolean(effectiveId),
  });

  const mutation = useMutation({
    mutationFn: async (payload: {
      family_money_id: string;
      type: "deposit" | "release";
      amount: number;
      note?: string;
    }) => {
      const res = await fetch(`/api/family-money/${payload.family_money_id}/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to save transaction");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["family-money"] });
      if (effectiveId) {
        queryClient.invalidateQueries({ queryKey: ["family-money-transactions", effectiveId] });
      }
      toast.success("Family balance updated");
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Error"),
  });

  if (!liveAccounts.length) {
    return (
      <div className="card space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold">Family Money</p>
            <p className="text-sm text-white/60">Add each person you hold money for.</p>
          </div>
          <AddMemberButton onAdded={() => queryClient.invalidateQueries({ queryKey: ["family-money"] })} />
        </div>
        <p className="text-sm text-white/60">No members yet. Add one to start tracking.</p>
      </div>
    );
  }

  const selectedAccount = liveAccounts.find((account) => account.id === effectiveId) ?? liveAccounts[0];

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold">Family Money</p>
          <p className="text-sm text-white/60">Track deposits you are holding for relatives.</p>
        </div>
        <AddMemberButton onAdded={() => queryClient.invalidateQueries({ queryKey: ["family-money"] })} />
      </div>

      <div className="flex flex-wrap gap-2">
        {liveAccounts.map((account) => (
          <button
            key={account.id}
            type="button"
            onClick={() => setSelectedId(account.id)}
            className={`rounded-2xl border px-4 py-2 text-left text-sm ${
              effectiveId === account.id
                ? "border-emerald-400 bg-emerald-500/10"
                : "border-white/10 text-white/70"
            }`}
          >
            <p className="font-semibold">{account.family_member_name}</p>
            <p className="text-xs text-white/60">Balance: {formatCurrency(account.current_balance)}</p>
          </button>
        ))}
      </div>

      {selectedAccount && (
        <div className="space-y-3 rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
            <p>
              Balance: <span className="font-semibold text-white">{formatCurrency(selectedAccount.current_balance)}</span>
            </p>
            <p>
              Last activity:{" "}
              {selectedAccount.last_activity
                ? formatDistanceToNow(new Date(selectedAccount.last_activity), { addSuffix: true })
                : "never"}
            </p>
          </div>
          <TransactionForm
            onSubmit={(payload) =>
              mutation.mutate({
                family_money_id: selectedAccount.id,
                ...payload,
              })
            }
          />
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">History</p>
            <div className="space-y-2">
              {memberTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-2 text-sm"
                >
                  <div>
                    <p className="font-medium">
                      {tx.type === "deposit" ? "Deposit" : "Release"} · {formatCurrency(tx.amount)}
                    </p>
                    <p className="text-xs text-white/60">{tx.note ?? "No note"}</p>
                  </div>
                  <p className="text-xs text-white/60">
                    {formatDistanceToNow(new Date(tx.transaction_date), { addSuffix: true })}
                  </p>
                </div>
              ))}
              {!memberTransactions.length && (
                <p className="text-sm text-white/60">No transactions recorded yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AddMemberButton = ({ onAdded }: { onAdded: () => void }) => (
  <Button
    variant="secondary"
    onClick={() => {
      const name = prompt("Family member name");
      if (!name) return;
      fetch("/api/family-money", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ family_member_name: name }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Request failed");
        })
        .then(onAdded)
        .then(() => toast.success("Member added"))
        .catch(() => toast.error("Unable to add member"));
    }}
  >
    + Add Member
  </Button>
);

const TransactionForm = ({
  onSubmit,
}: {
  onSubmit: (payload: { type: "deposit" | "release"; amount: number; note?: string }) => void;
}) => {
  const [type, setType] = useState<"deposit" | "release">("deposit");
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState("");

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3 space-y-3">
      <div className="flex gap-2 text-xs text-white/60">
        {(["deposit", "release"] as const).map((option) => (
          <button
            key={option}
            onClick={() => setType(option)}
            type="button"
            className={`rounded-full border px-4 py-1 ${
              type === option ? "border-emerald-400 text-emerald-200" : "border-white/10"
            }`}
          >
            {option === "deposit" ? "Deposit" : "Release"}
          </button>
        ))}
      </div>
      <input
        type="number"
        value={amount}
        onChange={(event) => setAmount(Number(event.currentTarget.value))}
        className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white"
        placeholder="Amount"
      />
      <input
        type="text"
        value={note}
        onChange={(event) => setNote(event.currentTarget.value)}
        className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white"
        placeholder="Note (optional)"
      />
      <Button
        className="w-full"
        onClick={() => {
          onSubmit({ type, amount, note });
          setAmount(0);
          setNote("");
        }}
        disabled={amount <= 0}
      >
        Log {type === "deposit" ? "Deposit" : "Release"}
      </Button>
    </div>
  );
};
