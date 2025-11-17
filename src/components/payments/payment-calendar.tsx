"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";

import type { RecurringPayment } from "@/types/dashboard";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

type Props = {
  initialPayments: RecurringPayment[];
};

type MutationInput = {
  id: string;
  data?: Partial<Pick<RecurringPayment, "amount" | "next_due_date" | "frequency">>;
  mark_paid?: boolean;
  snooze_days?: number;
};

export const PaymentCalendar = ({ initialPayments }: Props) => {
  const queryClient = useQueryClient();
  const { data: payments = [] } = useQuery<RecurringPayment[]>({
    queryKey: ["recurring-payments"],
    queryFn: async () => {
      const res = await fetch("/api/recurring-payments");
      if (!res.ok) throw new Error("Failed to load recurring payments");
      return (await res.json()) as RecurringPayment[];
    },
    initialData: initialPayments,
    refetchInterval: 60000,
  });

  const mutation = useMutation({
    mutationFn: async (payload: MutationInput) => {
      const res = await fetch(`/api/recurring-payments/${payload.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload.data,
          mark_paid: payload.mark_paid,
          snooze_days: payload.snooze_days,
        }),
      });
      if (!res.ok) throw new Error("Unable to update payment");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recurring-payments"] });
      toast.success("Payment updated");
    },
    onError: () => toast.error("Failed to update payment"),
  });

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold">Payment Calendar</p>
          <p className="text-sm text-white/60">Upcoming recurring bills and commitments.</p>
        </div>
      </div>
      <div className="space-y-3">
        {payments.map((payment) => (
          <PaymentItem key={payment.id} payment={payment} onMutate={mutation.mutate} />
        ))}
        {!payments.length && (
          <p className="text-sm text-white/60">No recurring payments configured.</p>
        )}
      </div>
    </div>
  );
};

const PaymentItem = ({
  payment,
  onMutate,
}: {
  payment: RecurringPayment;
  onMutate: (payload: MutationInput) => void;
}) => {
  const [amount, setAmount] = useState(payment.amount);
  const [dueDate, setDueDate] = useState(payment.next_due_date);

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-semibold">{payment.name}</p>
          <p className="text-xs text-white/60">
            Due {format(new Date(payment.next_due_date), "MMM d")} &middot;{" "}
            {payment.frequency}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onMutate({ id: payment.id, mark_paid: true })}
          >
            Mark Paid
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMutate({ id: payment.id, snooze_days: 3 })}
          >
            Snooze 3d
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMutate({ id: payment.id, snooze_days: 7 })}
          >
            Snooze 7d
          </Button>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="space-y-1">
          <label className="text-xs uppercase tracking-[0.3em] text-white/60">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(event) => setAmount(Number(event.currentTarget.value))}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white focus:outline focus:outline-emerald-400"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs uppercase tracking-[0.3em] text-white/60">
            Next Due
          </label>
          <input
            type="date"
            value={dueDate.slice(0, 10)}
            onChange={(event) => setDueDate(event.currentTarget.value)}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white focus:outline focus:outline-emerald-400"
          />
        </div>
        <div className="flex items-end">
          <Button
            className="w-full"
            onClick={() =>
              onMutate({
                id: payment.id,
                data: { amount, next_due_date: dueDate },
              })
            }
          >
            Save
          </Button>
        </div>
      </div>
      <p className="text-xs text-white/50">
        Current amount: {formatCurrency(payment.amount)} · Next due:{" "}
        {format(new Date(payment.next_due_date), "MMM d")}
      </p>
    </div>
  );
};
