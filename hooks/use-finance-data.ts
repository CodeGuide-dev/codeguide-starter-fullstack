"use client";

import { useState, useEffect } from 'react';
import { Asset, Investment, Expense, Income } from '@/lib/types/finance';

interface FinanceData {
  assets: Asset[];
  investments: Investment[];
  expenses: Expense[];
  income: Income[];
}

interface UseFinanceDataReturn {
  data: FinanceData;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useFinanceData(): UseFinanceDataReturn {
  const [data, setData] = useState<FinanceData>({
    assets: [],
    investments: [],
    expenses: [],
    income: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFinanceData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [assetsRes, investmentsRes, expensesRes, incomeRes] = await Promise.all([
        fetch('/api/finance/assets'),
        fetch('/api/finance/investments'),
        fetch('/api/finance/expenses'),
        fetch('/api/finance/income'),
      ]);

      if (!assetsRes.ok || !investmentsRes.ok || !expensesRes.ok || !incomeRes.ok) {
        throw new Error('Failed to fetch finance data');
      }

      const [assetsData, investmentsData, expensesData, incomeData] = await Promise.all([
        assetsRes.json(),
        investmentsRes.json(),
        expensesRes.json(),
        incomeRes.json(),
      ]);

      setData({
        assets: assetsData.data || [],
        investments: investmentsData.data || [],
        expenses: expensesData.data || [],
        income: incomeData.data || [],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFinanceData();
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch: fetchFinanceData,
  };
}

interface FinanceSummary {
  totalAssets: number;
  totalInvestments: number;
  monthlyExpenses: number;
  monthlyIncome: number;
  netWorth: number;
}

export function useFinanceSummary(): FinanceSummary & { isLoading: boolean; error: string | null } {
  const { data, isLoading, error } = useFinanceData();

  const summary = {
    totalAssets: data.assets.reduce((sum, asset) => sum + asset.value, 0),
    totalInvestments: data.investments.reduce((sum, investment) => sum + investment.currentValue, 0),
    monthlyExpenses: data.expenses
      .filter(expense => {
        const expenseDate = new Date(expense.date);
        const now = new Date();
        return expenseDate.getMonth() === now.getMonth() && expenseDate.getFullYear() === now.getFullYear();
      })
      .reduce((sum, expense) => sum + expense.amount, 0),
    monthlyIncome: data.income
      .filter(income => {
        const incomeDate = new Date(income.date);
        const now = new Date();
        return incomeDate.getMonth() === now.getMonth() && incomeDate.getFullYear() === now.getFullYear();
      })
      .reduce((sum, income) => sum + income.amount, 0),
    netWorth: 0,
  };

  // Calculate net worth (assets + investments - debts)
  summary.netWorth = summary.totalAssets + summary.totalInvestments;

  return {
    ...summary,
    isLoading,
    error,
  };
}