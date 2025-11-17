"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "sonner";

import type { RecurringPayment } from "@/types/dashboard";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

type Props = {
  initialPayments: RecurringPayment[];
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
    mutationFn: async (payload: { id: string; mark_paid?: boolean }) => {
      const res = await fetch(`/api/recurring-payments/${payload.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mark_paid: payload.mark_paid }),
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
          <div
            key={payment.id}
            className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-3 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="font-semibold">{payment.name}</p>
              <p className="text-xs text-white/60">
                Due {format(new Date(payment.next_due_date), "MMM d")} &middot;{" "}
                {payment.frequency}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-semibold">{formatCurrency(payment.amount)}</p>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => mutation.mutate({ id: payment.id, mark_paid: true })}
                disabled={mutation.isPending}
              >
                Mark Paid
              </Button>
            </div>
          </div>
        ))}
        {!payments.length && (
          <p className="text-sm text-white/60">No recurring payments configured.</p>
        )}
      </div>
    </div>
  );
};
