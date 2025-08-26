"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Target,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import Link from "next/link";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";

export default function DashboardPage() {
  const mockData = {
    totalAssets: 125000,
    totalInvestments: 85000,
    monthlyExpenses: 3200,
    monthlyIncome: 7500,
    netWorth: 206800,
    investmentGain: 8.5,
    expenseChange: -2.1,
    incomeChange: 5.2,
  };

  const recentTransactions = [
    { id: 1, title: "Groceries", amount: -120.50, category: "Food", date: "2024-01-15" },
    { id: 2, title: "Salary", amount: 5000, category: "Income", date: "2024-01-14" },
    { id: 3, title: "Gas", amount: -55.20, category: "Transportation", date: "2024-01-13" },
  ];

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
            <div className="text-2xl font-bold">${mockData.totalAssets.toLocaleString()}</div>
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
            <div className="text-2xl font-bold">${mockData.totalInvestments.toLocaleString()}</div>
            <p className="text-xs text-green-600 flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +{mockData.investmentGain}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockData.monthlyExpenses.toLocaleString()}</div>
            <p className="text-xs text-green-600 flex items-center">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              {mockData.expenseChange}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockData.monthlyIncome.toLocaleString()}</div>
            <p className="text-xs text-green-600 flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +{mockData.incomeChange}% from last month
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
            <div className="text-3xl font-bold text-emerald-600">
              ${mockData.netWorth.toLocaleString()}
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Assets</span>
                <span className="font-medium">${mockData.totalAssets.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Investments</span>
                <span className="font-medium">${mockData.totalInvestments.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground border-t pt-2">
                <span>Total Net Worth</span>
                <span className="font-medium">${mockData.netWorth.toLocaleString()}</span>
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
                    {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}