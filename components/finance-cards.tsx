'use client';

import { useEffect, useState } from 'react';
import { IconTrendingDown, IconTrendingUp, IconPigMoney, IconCoin, IconChartLine, IconWallet } from '@tabler/icons-react';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface FinancialSummary {
  totalAssets: number;
  totalInvestments: number;
  totalExpenses: number;
  totalIncome: number;
  netWorth: number;
  cashFlow: number;
  period: {
    startDate: string;
    endDate: string;
  };
}

export function FinanceCards() {
  const [summary, setSummary] = useState<FinancialSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const response = await fetch('/api/finance/summary');
        if (!response.ok) {
          throw new Error('Failed to fetch financial summary');
        }
        const data = await response.json();
        if (data.success) {
          setSummary(data.data);
        } else {
          setError(data.error || 'Failed to load data');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="@container/card">
            <CardHeader>
              <CardDescription>Loading...</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                $--.--
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 lg:px-6">
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          Error loading financial data: {error}
        </div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="px-4 lg:px-6">
        <div className="rounded-lg border border-border p-4 text-muted-foreground">
          No financial data available. Start by adding your assets, income, and expenses.
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const isPositiveCashFlow = summary.cashFlow >= 0;
  const isPositiveNetWorth = summary.netWorth >= 0;

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            <IconWallet className="h-4 w-4" />
            Net Worth
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatCurrency(summary.netWorth)}
          </CardTitle>
          <CardAction>
            <Badge variant={isPositiveNetWorth ? "outline" : "destructive"}>
              {isPositiveNetWorth ? <IconTrendingUp /> : <IconTrendingDown />}
              {isPositiveNetWorth ? 'Positive' : 'Negative'}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Total financial position
          </div>
          <div className="text-muted-foreground">
            Assets: {formatCurrency(summary.totalAssets)}
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            <IconChartLine className="h-4 w-4" />
            Cash Flow
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatCurrency(summary.cashFlow)}
          </CardTitle>
          <CardAction>
            <Badge variant={isPositiveCashFlow ? "outline" : "destructive"}>
              {isPositiveCashFlow ? <IconTrendingUp /> : <IconTrendingDown />}
              {isPositiveCashFlow ? 'Positive' : 'Negative'}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Income vs Expenses
          </div>
          <div className="text-muted-foreground">
            Income: {formatCurrency(summary.totalIncome)}
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            <IconPigMoney className="h-4 w-4" />
            Total Assets
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatCurrency(summary.totalAssets)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              Stable
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Liquid and fixed assets
          </div>
          <div className="text-muted-foreground">
            Includes savings, property, vehicles
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            <IconCoin className="h-4 w-4" />
            Investments
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatCurrency(summary.totalInvestments)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              Growing
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Investment portfolio
          </div>
          <div className="text-muted-foreground">
            Stocks, bonds, crypto, funds
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}