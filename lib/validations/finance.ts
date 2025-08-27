import { z } from 'zod';

export const createAssetSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
    type: z.enum(['real_estate', 'vehicle', 'cash', 'savings', 'other']),
    value: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
        message: 'Value must be a positive number'
    }),
    description: z.string().max(500, 'Description must be less than 500 characters').optional(),
    purchaseDate: z.string().optional(),
});

export const updateAssetSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters').optional(),
    type: z.enum(['real_estate', 'vehicle', 'cash', 'savings', 'other']).optional(),
    value: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
        message: 'Value must be a positive number'
    }).optional(),
    description: z.string().max(500, 'Description must be less than 500 characters').optional(),
    purchaseDate: z.string().optional(),
});

export const createInvestmentSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
    type: z.enum(['stocks', 'bonds', 'crypto', 'mutual_funds', 'etf', 'commodities', 'other']),
    symbol: z.string().max(10, 'Symbol must be less than 10 characters').optional(),
    quantity: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: 'Quantity must be a positive number'
    }),
    purchasePrice: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: 'Purchase price must be a positive number'
    }),
    currentPrice: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
        message: 'Current price must be a positive number'
    }).optional(),
    description: z.string().max(500, 'Description must be less than 500 characters').optional(),
    purchaseDate: z.string(),
});

export const updateInvestmentSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters').optional(),
    type: z.enum(['stocks', 'bonds', 'crypto', 'mutual_funds', 'etf', 'commodities', 'other']).optional(),
    symbol: z.string().max(10, 'Symbol must be less than 10 characters').optional(),
    quantity: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: 'Quantity must be a positive number'
    }).optional(),
    purchasePrice: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: 'Purchase price must be a positive number'
    }).optional(),
    currentPrice: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
        message: 'Current price must be a positive number'
    }).optional(),
    description: z.string().max(500, 'Description must be less than 500 characters').optional(),
    purchaseDate: z.string().optional(),
});

export const createExpenseSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
    amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: 'Amount must be a positive number'
    }),
    category: z.enum(['housing', 'transportation', 'food', 'utilities', 'insurance', 'healthcare', 'entertainment', 'education', 'clothing', 'personal_care', 'debt_payments', 'taxes', 'savings', 'other']),
    description: z.string().max(500, 'Description must be less than 500 characters').optional(),
    date: z.string(),
    isRecurring: z.enum(['weekly', 'monthly', 'yearly']).optional(),
});

export const updateExpenseSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters').optional(),
    amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: 'Amount must be a positive number'
    }).optional(),
    category: z.enum(['housing', 'transportation', 'food', 'utilities', 'insurance', 'healthcare', 'entertainment', 'education', 'clothing', 'personal_care', 'debt_payments', 'taxes', 'savings', 'other']).optional(),
    description: z.string().max(500, 'Description must be less than 500 characters').optional(),
    date: z.string().optional(),
    isRecurring: z.enum(['weekly', 'monthly', 'yearly']).optional(),
});

export const createIncomeSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
    amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: 'Amount must be a positive number'
    }),
    type: z.enum(['salary', 'freelance', 'business', 'investments', 'rental', 'pension', 'benefits', 'other']),
    description: z.string().max(500, 'Description must be less than 500 characters').optional(),
    date: z.string(),
    isRecurring: z.enum(['weekly', 'monthly', 'yearly']).optional(),
});

export const updateIncomeSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters').optional(),
    amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: 'Amount must be a positive number'
    }).optional(),
    type: z.enum(['salary', 'freelance', 'business', 'investments', 'rental', 'pension', 'benefits', 'other']).optional(),
    description: z.string().max(500, 'Description must be less than 500 characters').optional(),
    date: z.string().optional(),
    isRecurring: z.enum(['weekly', 'monthly', 'yearly']).optional(),
});