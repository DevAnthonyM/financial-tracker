import { formatCurrency } from "@/lib/utils";

const mockTransactions = [
  {
    id: "1",
    description: "Food - Githeri",
    category: "Food",
    amount: 60,
    timeAgo: "2h ago",
  },
  {
    id: "2",
    description: "Wifi Payment",
    category: "Fixed",
    amount: 1523,
    timeAgo: "Yesterday",
  },
  {
    id: "3",
    description: "Family Support",
    category: "Family",
    amount: 500,
    timeAgo: "2d ago",
  },
];

export const RecentTransactions = () => (
  <div className="card space-y-4">
    <div className="flex items-center justify-between">
      <p className="text-lg font-semibold">Recent Transactions</p>
      <p className="text-xs uppercase tracking-[0.3em] text-white/60">Live Feed</p>
    </div>
    <div className="space-y-3">
      {mockTransactions.map((tx) => (
        <div
          key={tx.id}
          className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-3"
        >
          <div>
            <p className="font-medium">{tx.description}</p>
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">
              {tx.category}
            </p>
          </div>
          <div className="text-right">
            <p className="text-base font-semibold">{formatCurrency(tx.amount)}</p>
            <p className="text-xs text-white/50">{tx.timeAgo}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
