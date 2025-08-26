"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Target,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { useFinanceSummary, useFinanceData } from "@/hooks/use-finance-data";

export default function DashboardPage() {
  const { totalAssets, totalInvestments, monthlyExpenses, monthlyIncome, netWorth, isLoading: summaryLoading, error: summaryError } = useFinanceSummary();
  const { data: financeData, isLoading: dataLoading, error: dataError, refetch } = useFinanceData();

  const isLoading = summaryLoading || dataLoading;
  const error = summaryError || dataError;

  // Get recent transactions from expenses and income (last 5)
  const recentTransactions = [
    ...financeData.expenses.slice(-3).map(expense => ({
      id: `expense-${expense.id}`,
      title: expense.description || 'Expense',
      amount: -expense.amount,
      category: expense.category,
      date: new Date(expense.date).toLocaleDateString(),
    })),
    ...financeData.income.slice(-2).map(income => ({
      id: `income-${income.id}`,
      title: income.description || income.source,
      amount: income.amount,
      category: income.source,
      date: new Date(income.date).toLocaleDateString(),
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  if (error) {
    return (
      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Financial Overview</h1>
          <p className="text-muted-foreground">
            Track your financial health and make informed decisions
          </p>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Error loading financial data: {error}
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              className="ml-2"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Financial Overview</h1>
        <p className="text-muted-foreground">
          Track your financial health and make informed decisions
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24 mb-2" />
            ) : (
              <div className="text-2xl font-bold">${totalAssets.toLocaleString()}</div>
            )}
            <p className="text-xs text-muted-foreground">
              Real estate, vehicles, savings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investments</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24 mb-2" />
            ) : (
              <div className="text-2xl font-bold">${totalInvestments.toLocaleString()}</div>
            )}
            <p className="text-xs text-muted-foreground">
              Stocks, bonds, crypto
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24 mb-2" />
            ) : (
              <div className="text-2xl font-bold">${monthlyExpenses.toLocaleString()}</div>
            )}
            <p className="text-xs text-muted-foreground">
              This month's spending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24 mb-2" />
            ) : (
              <div className="text-2xl font-bold">${monthlyIncome.toLocaleString()}</div>
            )}
            <p className="text-xs text-muted-foreground">
              This month's earnings
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Net Worth and Chart */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Net Worth</CardTitle>
            <CardDescription>Your total financial position</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-12 w-32 mb-4" />
            ) : (
              <div className="text-3xl font-bold text-emerald-600">
                ${netWorth.toLocaleString()}
              </div>
            )}
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Assets</span>
                {isLoading ? (
                  <Skeleton className="h-4 w-16" />
                ) : (
                  <span className="font-medium">${totalAssets.toLocaleString()}</span>
                )}
              </div>
              <div className="flex justify-between text-sm">
                <span>Investments</span>
                {isLoading ? (
                  <Skeleton className="h-4 w-16" />
                ) : (
                  <span className="font-medium">${totalInvestments.toLocaleString()}</span>
                )}
              </div>
              <div className="flex justify-between text-sm text-muted-foreground border-t pt-2">
                <span>Total Net Worth</span>
                {isLoading ? (
                  <Skeleton className="h-4 w-16" />
                ) : (
                  <span className="font-medium">${netWorth.toLocaleString()}</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Financial Trends</CardTitle>
            <CardDescription>Track your financial progress over time</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartAreaInteractive />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Add new financial data</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/assets?action=add">
              <Plus className="mr-2 h-4 w-4" />
              Add Asset
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/investments?action=add">
              <Plus className="mr-2 h-4 w-4" />
              Add Investment
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/expenses?action=add">
              <Plus className="mr-2 h-4 w-4" />
              Add Expense
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/income?action=add">
              <Plus className="mr-2 h-4 w-4" />
              Add Income
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest financial transactions</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentTransactions.length > 0 ? (
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-medium">{transaction.title}</span>
                    <span className="text-sm text-muted-foreground">{transaction.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{transaction.date}</span>
                    <Badge variant={transaction.amount > 0 ? "default" : "secondary"}>
                      {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              No recent transactions found. Start by adding some expenses or income.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}