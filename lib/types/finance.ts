import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import type { assets, investments, expenses, income } from '../../db/schema/finance';

export type Asset = InferSelectModel<typeof assets>;
export type NewAsset = InferInsertModel<typeof assets>;

export type Investment = InferSelectModel<typeof investments>;
export type NewInvestment = InferInsertModel<typeof investments>;

export type Expense = InferSelectModel<typeof expenses>;
export type NewExpense = InferInsertModel<typeof expenses>;

export type Income = InferSelectModel<typeof income>;
export type NewIncome = InferInsertModel<typeof income>;

export const ASSET_TYPES = [
    { value: 'real_estate', label: 'Real Estate' },
    { value: 'vehicle', label: 'Vehicle' },
    { value: 'cash', label: 'Cash' },
    { value: 'savings', label: 'Savings Account' },
    { value: 'other', label: 'Other' },
] as const;

export const INVESTMENT_TYPES = [
    { value: 'stocks', label: 'Stocks' },
    { value: 'bonds', label: 'Bonds' },
    { value: 'crypto', label: 'Cryptocurrency' },
    { value: 'mutual_funds', label: 'Mutual Funds' },
    { value: 'etf', label: 'ETF' },
    { value: 'commodities', label: 'Commodities' },
    { value: 'other', label: 'Other' },
] as const;

export const EXPENSE_CATEGORIES = [
    { value: 'housing', label: 'Housing' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'food', label: 'Food & Dining' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'education', label: 'Education' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'personal_care', label: 'Personal Care' },
    { value: 'debt_payments', label: 'Debt Payments' },
    { value: 'taxes', label: 'Taxes' },
    { value: 'savings', label: 'Savings' },
    { value: 'other', label: 'Other' },
] as const;

export const INCOME_TYPES = [
    { value: 'salary', label: 'Salary' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'business', label: 'Business Income' },
    { value: 'investments', label: 'Investment Income' },
    { value: 'rental', label: 'Rental Income' },
    { value: 'pension', label: 'Pension' },
    { value: 'benefits', label: 'Government Benefits' },
    { value: 'other', label: 'Other' },
] as const;

export const RECURRING_OPTIONS = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
] as const;