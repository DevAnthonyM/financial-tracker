"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { CategoryStat } from "@/types/dashboard";
import { Button } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";

const tiers = ["Fixed", "Essential", "Controlled", "Emergency"] as const;

type Props = {
  initialCategories: CategoryStat[];
};

type CategoryPayload = {
  id: string;
  name: string;
  tier: string;
  monthly_limit: number;
  color: string | null;
  sort_order?: number;
  is_active?: boolean;
};

export const CategoryManager = ({ initialCategories }: Props) => {
  const queryClient = useQueryClient();

  const { data: categories = [] } = useQuery<CategoryPayload[]>({
    queryKey: ["categories-management"],
    queryFn: async () => {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error("Failed to load categories");
      return (await res.json()) as CategoryPayload[];
    },
    initialData: initialCategories.map((category, index) => ({
      id: category.id,
      name: category.name,
      tier: category.tier,
      monthly_limit: category.monthly_limit,
      color: category.color,
      sort_order: index,
      is_active: true,
    })),
  });

  const mutation = useMutation({
    mutationFn: async (payload: {
      id?: string;
      data?: Partial<CategoryPayload>;
      method: "POST" | "PATCH" | "DELETE";
    }) => {
      const url = payload.id ? `/api/categories/${payload.id}` : "/api/categories";
      const res = await fetch(url, {
        method: payload.method,
        headers: { "Content-Type": "application/json" },
        body:
          payload.method === "DELETE" ? undefined : JSON.stringify(payload.data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Request failed");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories-management"] });
      toast.success("Categories updated");
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Update failed");
    },
  });

  const handleCreate = () => {
    mutation.mutate({
      method: "POST",
      data: {
        name: "New Category",
        tier: "Controlled",
        monthly_limit: 0,
        sort_order: categories.length,
      },
    });
  };

  const handleFieldChange = (
    categoryId: string,
    field: keyof CategoryPayload,
    value: string | number,
  ) => {
    mutation.mutate({
      id: categoryId,
      method: "PATCH",
      data: { [field]: value },
    });
  };

  const handleDelete = (categoryId: string) => {
    if (!confirm("Delete this category? Transactions linked to it will become uncategorized.")) {
      return;
    }
    mutation.mutate({ id: categoryId, method: "DELETE" });
  };

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold">Category Manager</p>
          <p className="text-sm text-white/60">
            Adjust limits or add/remove categories. Changes update the current budget.
          </p>
        </div>
        <Button variant="secondary" onClick={handleCreate} disabled={mutation.isPending}>
          + Add Category
        </Button>
      </div>

      <div className="space-y-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:flex-row md:items-center md:gap-4"
          >
            <div className="flex-1 space-y-2">
              <input
                type="text"
                value={category.name}
                onChange={(event) =>
                  handleFieldChange(category.id, "name", event.currentTarget.value)
                }
                className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white focus:outline focus:outline-emerald-400"
              />
              <div className="flex flex-wrap gap-2 text-xs text-white/60">
                {tiers.map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    className={cn(
                      "rounded-full border px-3 py-1",
                      category.tier === tier
                        ? "border-emerald-400 text-emerald-200"
                        : "border-white/10 text-white/60 hover:border-white/30",
                    )}
                    onClick={() => handleFieldChange(category.id, "tier", tier)}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 md:w-48">
              <label className="text-xs uppercase tracking-[0.3em] text-white/50">
                Monthly Limit
              </label>
              <input
                type="number"
                value={category.monthly_limit}
                onChange={(event) =>
                  handleFieldChange(
                    category.id,
                    "monthly_limit",
                    Number(event.currentTarget.value),
                  )
                }
                className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white focus:outline focus:outline-emerald-400"
              />
              <p className="text-xs text-white/50">
                {formatCurrency(category.monthly_limit)}
              </p>
            </div>
            <div className="flex flex-col gap-2 md:w-32">
              <label className="text-xs uppercase tracking-[0.3em] text-white/50">
                Sort
              </label>
              <input
                type="number"
                value={category.sort_order ?? 0}
                onChange={(event) =>
                  handleFieldChange(
                    category.id,
                    "sort_order",
                    Number(event.currentTarget.value),
                  )
                }
                className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white focus:outline focus:outline-emerald-400"
              />
            </div>
            <Button
              variant="ghost"
              className="text-rose-300 hover:text-rose-200"
              onClick={() => handleDelete(category.id)}
              disabled={mutation.isPending}
            >
              Delete
            </Button>
          </div>
        ))}

        {!categories.length && (
          <p className="text-sm text-white/60">No categories yet. Add your first one above.</p>
        )}
      </div>
    </div>
  );
};
