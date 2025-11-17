"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

import type { AlertItem } from "@/types/dashboard";
import { Button } from "@/components/ui/button";

type Props = {
  initialAlerts: AlertItem[];
};

export const AlertsPanel = ({ initialAlerts }: Props) => {
  const queryClient = useQueryClient();
  const { data: alerts = [] } = useQuery<AlertItem[]>({
    queryKey: ["alerts"],
    queryFn: async () => {
      const res = await fetch("/api/alerts");
      if (!res.ok) throw new Error("Failed to load alerts");
      return (await res.json()) as AlertItem[];
    },
    initialData: initialAlerts,
    refetchInterval: 60000,
  });

  const mutation = useMutation({
    mutationFn: async (payload: { id: string; is_read: boolean }) => {
      const res = await fetch(`/api/alerts/${payload.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_read: payload.is_read }),
      });
      if (!res.ok) throw new Error("Unable to update alert");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
    },
    onError: () => toast.error("Failed to update alert"),
  });

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold">Alert Center</p>
          <p className="text-sm text-white/60">
            Budget and payment alerts. Mark them as resolved when you take action.
          </p>
        </div>
      </div>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-3"
          >
            <div>
              <p className="font-semibold">{alert.message}</p>
              <p className="text-xs text-white/50">
                {alert.severity.toUpperCase()} &middot;{" "}
                {formatDistanceToNow(new Date(alert.created_at), { addSuffix: true })}
              </p>
            </div>
            <Button
              variant={alert.is_read ? "ghost" : "secondary"}
              size="sm"
              onClick={() =>
                mutation.mutate({ id: alert.id, is_read: !alert.is_read })
              }
            >
              {alert.is_read ? "Unread" : "Mark read"}
            </Button>
          </div>
        ))}
        {!alerts.length && <p className="text-sm text-white/60">No alerts right now.</p>}
      </div>
    </div>
  );
};
