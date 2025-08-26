import { FinanceData } from "@/lib/finance-types";

export async function loadFinanceData(): Promise<FinanceData> {
  // In a real app, this would come from an API or database
  // For now, we'll load from our static JSON file
  try {
    const data = await import("@/app/dashboard/data.json");
    return data.default as FinanceData;
  } catch (error) {
    console.error("Failed to load finance data:", error);
    // Return empty data structure as fallback
    return {
      assets: [],
      investments: [],
      expenses: [],
      income: [],
      goals: [],
      lastUpdated: new Date().toISOString(),
      user: {
        preferredCurrency: "USD",
        timezone: "America/New_York"
      }
    };
  }
}

export function formatCurrency(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCurrencyDetailed(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(dateString));
}

export function formatPercentage(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(value / 100);
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    // Asset categories
    cash: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    real_estate: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    vehicle: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    personal_item: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    
    // Investment categories
    stocks: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
    bonds: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    crypto: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    etf: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
    mutual_funds: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300",
    retirement_401k: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
    retirement_ira: "bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-300",
    
    // Expense categories
    housing: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    transportation: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    food: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    healthcare: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    entertainment: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    shopping: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
    bills: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    subscriptions: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
    
    // Income categories
    salary: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
    freelance: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    business: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    passive: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    dividends: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
    interest: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    bonus: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    
    // Default
    other: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  };
  
  return colors[category] || colors.other;
}