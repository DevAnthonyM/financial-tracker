import { z } from "zod";

export const expenseSchema = z.object({
  amount: z.number().positive(),
  categoryId: z.string().min(1, "Pick a category"),
  vendor: z
    .string()
    .max(60)
    .optional(),
  description: z
    .string()
    .max(160)
    .optional(),
  transactionDate: z.string().min(1, "Provide a date"),
  mpesaFee: z.number().nonnegative(),
  paymentMethod: z.enum(["cash", "m-pesa", "card"]),
});

export type ExpenseFormValues = z.infer<typeof expenseSchema>;
