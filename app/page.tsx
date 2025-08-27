"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Wallet, 
  TrendingUp, 
  ShoppingCart, 
  PiggyBank, 
  BarChart3, 
  ShieldCheck,
  DollarSign,
  CreditCard
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuthButtons, HeroAuthButtons } from "@/components/auth-buttons";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="text-center py-12 sm:py-16 relative px-4">
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <AuthButtons />
            <ThemeToggle />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-3 rounded-xl">
            <Wallet className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent font-parkinsans">
            Qwen Finance
          </h1>
        </div>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4 mb-8">
          Take control of your finances with our all-in-one personal finance management platform
        </p>
        
        <HeroAuthButtons />
      </div>

      <main className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-8 max-w-5xl">
        {/* Project Overview */}
        <div className="text-center mb-12">
          <div className="text-4xl sm:text-5xl mb-4">💰</div>
          <div className="font-bold text-xl sm:text-2xl mb-3">Smart Personal Finance Management</div>
          <div className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Track your assets, investments, expenses, and income in one place. Make informed financial decisions with real-time insights and analytics.
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {/* Assets */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border-blue-200/50 dark:border-blue-700/30 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <PiggyBank className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h3 className="font-semibold text-lg">Asset Tracking</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Keep track of all your valuable assets including property, vehicles, jewelry, and more with detailed information and valuation history.
            </p>
          </Card>

          {/* Investments */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-green-200/50 dark:border-green-700/30 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              <h3 className="font-semibold text-lg">Investment Management</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Monitor your stock portfolio, bonds, mutual funds, and cryptocurrency investments with real-time performance tracking and analytics.
            </p>
          </Card>

          {/* Expenses */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 border-amber-200/50 dark:border-amber-700/30 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <ShoppingCart className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              <h3 className="font-semibold text-lg">Expense Tracking</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Categorize and analyze your spending habits with detailed expense reports and budgeting tools to help you save more.
            </p>
          </Card>

          {/* Income */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 border-purple-200/50 dark:border-purple-700/30 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h3 className="font-semibold text-lg">Income Management</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Track all sources of income including salary, freelance work, investments, and passive income with detailed categorization.
            </p>
          </Card>

          {/* Analytics */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/10 dark:to-blue-900/10 border-cyan-200/50 dark:border-cyan-700/30 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <BarChart3 className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              <h3 className="font-semibold text-lg">Financial Analytics</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Gain insights into your financial health with comprehensive reports, charts, and trends to make informed financial decisions.
            </p>
          </Card>

          {/* Security */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/10 dark:to-purple-900/10 border-indigo-200/50 dark:border-indigo-700/30 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <h3 className="font-semibold text-lg">Bank-Level Security</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Your financial data is protected with enterprise-grade security, encryption, and privacy controls to keep your information safe.
            </p>
          </Card>
        </div>

        {/* Benefits Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Why Choose Qwen Finance?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-500" />
                All-in-One Dashboard
              </h3>
              <p className="text-muted-foreground">
                View all your financial data in one centralized dashboard. No more switching between multiple apps or spreadsheets.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-3">Real-Time Insights</h3>
              <p className="text-muted-foreground">
                Get instant insights into your spending patterns, investment performance, and overall financial health.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-3">Goal Tracking</h3>
              <p className="text-muted-foreground">
                Set financial goals and track your progress with customizable targets and milestone notifications.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-3">Export & Reports</h3>
              <p className="text-muted-foreground">
                Generate detailed financial reports and export data in multiple formats for tax preparation or financial planning.
              </p>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="p-8 text-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
          <h2 className="text-2xl font-bold mb-3">Ready to take control of your finances?</h2>
          <p className="mb-6 max-w-2xl mx-auto opacity-90">
            Join thousands of users who have transformed their financial lives with Qwen Finance. 
            Start your journey to financial freedom today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => window.location.href = '/sign-up'}
            >
              Get Started - It's Free
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/10"
              onClick={() => window.location.href = '/sign-in'}
            >
              Sign In
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}