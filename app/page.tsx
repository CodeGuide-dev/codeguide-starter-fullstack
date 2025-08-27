"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  TrendingUp,
  PieChart,
  Wallet,
  CreditCard,
  BarChart3,
  Shield,
  Zap,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuthButtons, HeroAuthButtons } from "@/components/auth-buttons";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="text-center py-12 sm:py-16 relative px-4">
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <AuthButtons />
            <ThemeToggle />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 mb-4">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-2xl">
            <DollarSign className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 bg-clip-text text-transparent">
            Claude Finance
          </h1>
        </div>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4 mb-8">
          Take control of your financial future with intelligent tracking and insights for your assets, investments, expenses, and income.
        </p>
        
        <HeroAuthButtons />
      </div>

      <main className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-8 max-w-5xl">
        {/* Features Overview */}
        <div className="text-center mb-8">
          <div className="text-4xl sm:text-5xl mb-2">💰</div>
          <div className="font-bold text-lg sm:text-xl mb-2">Complete Financial Management</div>
          <div className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Track all aspects of your financial life in one place. Monitor assets, investments, expenses, and income 
            with beautiful visualizations and smart insights to help you make better financial decisions.
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {/* Assets Tracking */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-green-200/50 dark:border-green-700/30">
            <div className="flex items-center gap-3 mb-3">
              <Wallet className="w-6 h-6 text-green-600 dark:text-green-400" />
              <h3 className="font-semibold text-lg">Asset Tracking</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>Cash & Savings</strong> - Track all bank accounts</li>
              <li>• <strong>Real Estate</strong> - Property values and equity</li>
              <li>• <strong>Vehicles</strong> - Cars, boats, and more</li>
              <li>• <strong>Personal Items</strong> - Valuable possessions</li>
            </ul>
          </Card>

          {/* Investment Portfolio */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border-blue-200/50 dark:border-blue-700/30">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h3 className="font-semibold text-lg">Investments</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>Stocks & ETFs</strong> - Equity investments</li>
              <li>• <strong>Bonds</strong> - Fixed income securities</li>
              <li>• <strong>Cryptocurrency</strong> - Digital assets</li>
              <li>• <strong>Retirement Funds</strong> - 401k, IRA tracking</li>
            </ul>
          </Card>

          {/* Expense Management */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/10 dark:to-pink-900/10 border-red-200/50 dark:border-red-700/30">
            <div className="flex items-center gap-3 mb-3">
              <CreditCard className="w-6 h-6 text-red-600 dark:text-red-400" />
              <h3 className="font-semibold text-lg">Expenses</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>Categories</strong> - Organize spending habits</li>
              <li>• <strong>Monthly Budgets</strong> - Set spending limits</li>
              <li>• <strong>Recurring Bills</strong> - Track subscriptions</li>
              <li>• <strong>Tax Planning</strong> - Deductible expenses</li>
            </ul>
          </Card>

          {/* Income Tracking */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 border-purple-200/50 dark:border-purple-700/30">
            <div className="flex items-center gap-3 mb-3">
              <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h3 className="font-semibold text-lg">Income</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>Salary</strong> - Primary employment income</li>
              <li>• <strong>Side Hustles</strong> - Freelance and gig work</li>
              <li>• <strong>Passive Income</strong> - Dividends and interest</li>
              <li>• <strong>Tax Withholding</strong> - Track deductions</li>
            </ul>
          </Card>

          {/* Analytics & Reports */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-900/10 dark:to-teal-900/10 border-cyan-200/50 dark:border-cyan-700/30">
            <div className="flex items-center gap-3 mb-3">
              <BarChart3 className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              <h3 className="font-semibold text-lg">Analytics</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>Net Worth</strong> - Total assets minus liabilities</li>
              <li>• <strong>Cash Flow</strong> - Income vs expenses trends</li>
              <li>• <strong>ROI Tracking</strong> - Investment performance</li>
              <li>• <strong>Financial Goals</strong> - Progress monitoring</li>
            </ul>
          </Card>

          {/* Security & Privacy */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/10 dark:to-yellow-900/10 border-orange-200/50 dark:border-orange-700/30">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              <h3 className="font-semibold text-lg">Security</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>Data Encryption</strong> - Bank-level security</li>
              <li>• <strong>Private</strong> - Your data stays with you</li>
              <li>• <strong>Secure Access</strong> - Multi-factor authentication</li>
              <li>• <strong>Privacy First</strong> - No data selling</li>
            </ul>
          </Card>
        </div>

        {/* Getting Started */}
        <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-green-600" />
            Get Started Today
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-green-800 dark:text-green-300">Track Your Wealth</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>📊 Add your assets and investments</li>
                <li>💳 Record your monthly expenses</li>
                <li>💰 Track all income sources</li>
                <li>📈 Watch your net worth grow</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-green-800 dark:text-green-300">Smart Insights</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>📉 Visualize spending patterns</li>
                <li>🎯 Set and track financial goals</li>
                <li>📅 Monitor investment performance</li>
                <li>🔍 Discover optimization opportunities</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2">
              Start Managing Your Finances
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
