import { z } from "zod";

// Asset validation schemas
export const assetCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["cash", "real_estate", "vehicle", "jewelry", "electronics", "other"]),
  value: z.number().positive("Value must be positive"),
  purchaseDate: z.string().optional(),
  description: z.string().optional(),
});

export const assetUpdateSchema = assetCreateSchema.partial();

// Investment validation schemas
export const investmentCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["stocks", "bonds", "mutual_funds", "crypto", "real_estate", "retirement", "other"]),
  amount: z.number().positive("Amount must be positive"),
  currentValue: z.number().positive("Current value must be positive"),
  purchaseDate: z.string(),
  tickerSymbol: z.string().optional(),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
});

export const investmentUpdateSchema = investmentCreateSchema.partial();

// Expense validation schemas
export const expenseCreateSchema = z.object({
  description: z.string().min(1, "Description is required"),
  amount: z.number().positive("Amount must be positive"),
  category: z.enum(["housing", "food", "transportation", "utilities", "healthcare", "entertainment", "education", "clothing", "personal_care", "debt", "savings", "gifts", "other"]),
  date: z.string(),
  isRecurring: z.boolean().default(false),
  recurringFrequency: z.string().optional(),
  notes: z.string().optional(),
});

export const expenseUpdateSchema = expenseCreateSchema.partial();

// Income validation schemas
export const incomeCreateSchema = z.object({
  source: z.string().min(1, "Source is required"),
  amount: z.number().positive("Amount must be positive"),
  frequency: z.enum(["weekly", "biweekly", "monthly", "quarterly", "yearly", "one_time"]),
  date: z.string(),
  isRecurring: z.boolean().default(true),
  description: z.string().optional(),
});

export const incomeUpdateSchema = incomeCreateSchema.partial();

// Common response schema
export const apiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
});

export type ApiResponse = z.infer<typeof apiResponseSchema>;