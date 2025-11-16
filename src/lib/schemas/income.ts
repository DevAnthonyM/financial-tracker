import { z } from "zod";

export const incomeSchema = z.object({
  amount: z.number().positive(),
  source: z.string().min(2, "Provide an income source"),
  paymentType: z.enum(["mid_month", "start_month", "one_time"]),
  description: z.string().max(160).optional(),
  transactionDate: z.string().min(1, "Provide a date"),
});

export type IncomeFormValues = z.infer<typeof incomeSchema>;
