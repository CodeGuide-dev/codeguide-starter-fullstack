"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  TrendingUp,
  Wallet,
  PieChart,
  Shield,
  BarChart3,
  Target,
  CreditCard,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuthButtons, HeroAuthButtons } from "@/components/auth-buttons";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="text-center py-12 sm:py-16 relative px-4">
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <AuthButtons />
            <ThemeToggle />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Claude Finance
          </h1>
        </div>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4 mb-8">
          Take control of your financial future with intelligent tracking, insightful analytics, and personalized recommendations
        </p>
        
        <HeroAuthButtons />
      </div>

      <main className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-8 max-w-5xl">
        {/* Features Overview */}
        <div className="text-center mb-8">
          <div className="text-4xl sm:text-5xl mb-2">💰</div>
          <div className="font-bold text-lg sm:text-xl mb-2">Complete Financial Management</div>
          <div className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Track your assets, monitor investments, manage expenses, and optimize your income all in one place.
            Make informed financial decisions with powerful insights and analytics.
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {/* Asset Tracking */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 border-emerald-200/50 dark:border-emerald-700/30 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <Wallet className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-semibold text-lg">Asset Tracking</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Track real estate, vehicles, savings, and other assets. Monitor your net worth growth over time.
            </p>
          </Card>

          {/* Investment Monitoring */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border-blue-200/50 dark:border-blue-700/30 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h3 className="font-semibold text-lg">Investments</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Monitor stocks, bonds, crypto, and other investments. Track performance and calculate gains.
            </p>
          </Card>

          {/* Expense Management */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/10 dark:to-pink-900/10 border-red-200/50 dark:border-red-700/30 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <CreditCard className="w-8 h-8 text-red-600 dark:text-red-400" />
              <h3 className="font-semibold text-lg">Expenses</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Categorize and track expenses. Set budgets and identify spending patterns to save money.
            </p>
          </Card>

          {/* Income Tracking */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/10 dark:to-violet-900/10 border-purple-200/50 dark:border-purple-700/30 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <Target className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              <h3 className="font-semibold text-lg">Income</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Track salary, freelance, business, and passive income streams. Optimize your earning potential.
            </p>
          </Card>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900/50 dark:to-gray-900/50">
            <div className="flex items-center gap-3 mb-4">
              <PieChart className="w-6 h-6 text-emerald-600" />
              <h3 className="font-bold text-xl">Smart Analytics</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Visual dashboards with interactive charts</li>
              <li>• Monthly and yearly financial reports</li>
              <li>• Spending pattern analysis</li>
              <li>• Investment performance tracking</li>
            </ul>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900/50 dark:to-gray-900/50">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
              <h3 className="font-bold text-xl">Secure & Private</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Bank-level security encryption</li>
              <li>• Your data stays private and secure</li>
              <li>• Multi-factor authentication</li>
              <li>• Regular security audits</li>
            </ul>
          </Card>
        </div>

        {/* Testimonials */}
        <Card className="p-8 bg-gradient-to-r from-emerald-50 via-blue-50 to-purple-50 dark:from-emerald-900/10 dark:via-blue-900/10 dark:to-purple-900/10 mb-8">
          <h3 className="font-bold text-2xl text-center mb-6">What Our Users Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="text-lg mb-2">"Claude Finance transformed how I manage my money. The insights are incredible!"</div>
              <div className="text-sm text-muted-foreground">- Sarah M., Financial Advisor</div>
            </div>
            <div className="text-center">
              <div className="text-lg mb-2">"Finally, a finance app that's both powerful and easy to use. Highly recommended!"</div>
              <div className="text-sm text-muted-foreground">- Michael R., Entrepreneur</div>
            </div>
          </div>
        </Card>

        {/* Call to Action */}
        <Card className="p-8 text-center bg-gradient-to-r from-emerald-500 to-blue-600 text-white">
          <h3 className="font-bold text-2xl mb-4">Ready to Take Control of Your Finances?</h3>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of users who have transformed their financial lives with Claude Finance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-base px-8 py-3">
              <a href="/sign-up">Start Free Trial</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base px-8 py-3 bg-white/10 hover:bg-white/20 border-white/30">
              <a href="/sign-in">Sign In</a>
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
