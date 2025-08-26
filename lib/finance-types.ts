// Finance Data Types for Claude Finance

export interface Asset {
  id: string;
  name: string;
  category: 'cash' | 'real_estate' | 'vehicle' | 'personal_item' | 'other';
  currentValue: number;
  currency: string;
  description?: string;
  lastUpdated: string;
  purchaseValue?: number;
  purchaseDate?: string;
  location?: string;
}

export interface Investment {
  id: string;
  name: string;
  symbol?: string;
  category: 'stocks' | 'bonds' | 'crypto' | 'mutual_funds' | 'etf' | 'retirement_401k' | 'retirement_ira' | 'other';
  shares?: number;
  currentPricePerShare: number;
  totalValue: number;
  costBasis: number;
  currency: string;
  broker?: string;
  lastUpdated: string;
  dividendYield?: number;
  notes?: string;
}

export interface Expense {
  id: string;
  name: string;
  amount: number;
  currency: string;
  category: 'housing' | 'transportation' | 'food' | 'healthcare' | 'entertainment' | 'shopping' | 'bills' | 'subscriptions' | 'education' | 'other';
  date: string;
  isRecurring: boolean;
  recurringFrequency?: 'weekly' | 'monthly' | 'quarterly' | 'annually';
  isEssential: boolean;
  paymentMethod?: string;
  vendor?: string;
  notes?: string;
  tags?: string[];
}

export interface Income {
  id: string;
  source: string;
  amount: number;
  currency: string;
  category: 'salary' | 'freelance' | 'business' | 'passive' | 'dividends' | 'interest' | 'bonus' | 'other';
  frequency: 'weekly' | 'bi_weekly' | 'monthly' | 'quarterly' | 'annually' | 'one_time';
  date: string;
  isAfterTax: boolean;
  taxWithholding?: number;
  employer?: string;
  description?: string;
  notes?: string;
}

export interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  currency: string;
  targetDate: string;
  category: 'emergency_fund' | 'retirement' | 'house' | 'vacation' | 'education' | 'investment' | 'debt_payoff' | 'other';
  priority: 'low' | 'medium' | 'high';
  status: 'planning' | 'in_progress' | 'completed' | 'paused';
  monthlyContribution?: number;
  notes?: string;
}

export interface FinanceData {
  assets: Asset[];
  investments: Investment[];
  expenses: Expense[];
  income: Income[];
  goals?: FinancialGoal[];
  lastUpdated: string;
  user?: {
    preferredCurrency: string;
    timezone: string;
  };
}

// Helper types for calculations
export interface NetWorthSummary {
  totalAssets: number;
  totalInvestments: number;
  totalLiabilities: number;
  netWorth: number;
  currency: string;
}

export interface CashFlowSummary {
  totalIncome: number;
  totalExpenses: number;
  netCashFlow: number;
  currency: string;
  period: 'monthly' | 'quarterly' | 'annually';
}

export interface InvestmentSummary {
  totalValue: number;
  totalGain: number;
  totalGainPercent: number;
  currency: string;
  byCategory: Record<Investment['category'], {
    value: number;
    count: number;
  }>;
}