"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";

import type { AlertItem } from "@/types/dashboard";
import { Button } from "@/components/ui/button";

const severities = ["info", "warning", "critical"] as const;

type Props = {
  initialAlerts: AlertItem[];
};

type Severity = "info" | "warning" | "critical";

export const AlertsPanel = ({ initialAlerts }: Props) => {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<{ message: string; severity: Severity }>({
    message: "",
    severity: "info",
  });

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

  const toggleMutation = useMutation({
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

  const createMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: form.message,
          severity: form.severity,
          type: "manual",
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Unable to create alert");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
      toast.success("Alert created");
      setForm({ message: "", severity: "info" });
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Failed"),
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

      <div className="rounded-2xl border border-white/10 bg-black/20 p-3 space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Manual Alert</p>
        <textarea
          rows={2}
          value={form.message}
          placeholder="What do you want to remember?"
          onChange={(event) => setForm((prev) => ({ ...prev, message: event.currentTarget.value }))}
          className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white focus:outline focus:outline-emerald-400"
        />
        <div className="flex items-center gap-2 text-xs text-white/60">
          {severities.map((sev) => (
            <button
              key={sev}
              type="button"
              className={`rounded-full border px-3 py-1 ${form.severity === sev ? "border-emerald-400 text-emerald-200" : "border-white/10 text-white/60"}`}
              onClick={() => setForm((prev) => ({ ...prev, severity: sev }))}
            >
              {sev}
            </button>
          ))}
        </div>
        <Button
          size="sm"
          className="self-start"
          onClick={() => createMutation.mutate()}
          disabled={!form.message || createMutation.isPending}
        >
          Create Alert
        </Button>
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
                toggleMutation.mutate({ id: alert.id, is_read: !alert.is_read })
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
