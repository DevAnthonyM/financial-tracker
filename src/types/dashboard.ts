export type CategoryStat = {
  id: string;
  name: string;
  tier: string;
  monthly_limit: number;
  color: string | null;
  spent: number;
};

export type TransactionItem = {
  id: string;
  amount: number;
  type: "expense" | "income";
  transaction_date: string;
  category_id?: string | null;
  vendor: string | null;
  description: string | null;
  payment_method: string | null;
  category?: {
    name: string | null;
    tier: string | null;
  } | null;
};

export type DashboardMetrics = {
  totalBudget: number;
  spent: number;
  spentPercent: number;
  daysRemaining: number;
  dailyBudget: number;
  emergencyCurrent: number;
  emergencyTarget: number;
  nextPayment?: {
    name: string;
    amount: number;
    dueDate: string;
  } | null;
};

export type MpesaFeeRule = {
  transaction_type: string;
  min_amount: number;
  max_amount: number;
  fee: number;
  note: string | null;
};

export type AlertItem = {
  id: string;
  type: string;
  severity: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

export type RecurringPayment = {
  id: string;
  name: string;
  amount: number;
  category_id: string | null;
  frequency: string;
  next_due_date: string;
  is_active: boolean;
  reminder_days_before: number | null;
};

export type AlertFormState = {
  message: string;
  severity: "info" | "warning" | "critical";
  type: string;
};
