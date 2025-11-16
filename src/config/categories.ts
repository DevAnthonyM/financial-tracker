export type BudgetCategory = {
  id: string;
  name: string;
  tier: "Fixed" | "Essential" | "Controlled" | "Emergency";
  limit: number;
};

export const budgetCategories: BudgetCategory[] = [
  { id: "rent", name: "Rent", tier: "Fixed", limit: 3560 },
  { id: "ai-tool-1", name: "AI Tool 1", tier: "Fixed", limit: 3046 },
  { id: "wifi", name: "Wifi", tier: "Fixed", limit: 1523 },
  { id: "family-support", name: "Family Support", tier: "Controlled", limit: 2033 },
  { id: "food", name: "Food", tier: "Essential", limit: 2039 },
  { id: "transport", name: "Transport", tier: "Essential", limit: 666 },
  { id: "shopping", name: "Shopping", tier: "Controlled", limit: 1356 },
  { id: "street-food", name: "Street Food", tier: "Controlled", limit: 235 },
  { id: "emergency-medical", name: "Medical", tier: "Emergency", limit: 1000 },
];
