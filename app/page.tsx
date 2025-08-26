"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  TrendingUp,
  PieChart,
  BarChart3,
  Shield,
  Zap,
  DollarSign,
  Home,
  Car,
  CreditCard,
  PiggyBank,
  ChartNoAxesCombined,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuthButtons, HeroAuthButtons } from "@/components/auth-buttons";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="text-center py-16 sm:py-24 relative px-4">
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <AuthButtons />
            <ThemeToggle />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Wallet className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-blue-400 bg-clip-text text-transparent">
              Claude Finance
            </h1>
          </div>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto px-4 mb-8">
            Take control of your financial future with comprehensive personal finance management
          </p>
          
          <HeroAuthButtons />
        </div>
      </div>

      <main className="container mx-auto px-4 sm:px-6 pb-16 sm:pb-20 max-w-6xl">
        {/* Features Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Why Choose Claude Finance?</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
            A complete financial management solution that helps you track, analyze, and optimize your personal finances
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* Asset Tracking */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 border-blue-200/50 dark:border-blue-700/30">
              <div className="flex items-center gap-3 mb-4">
                <Home className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <h3 className="font-semibold text-lg">Asset Tracking</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Track all your assets including real estate, vehicles, savings accounts, and investments in one place
              </p>
            </Card>

            {/* Investment Monitoring */}
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-green-200/50 dark:border-green-700/30">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
                <h3 className="font-semibold text-lg">Investment Monitoring</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Monitor stocks, bonds, crypto, and funds with real-time performance tracking and portfolio analysis
              </p>
            </Card>

            {/* Expense Management */}
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 border-purple-200/50 dark:border-purple-700/30">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                <h3 className="font-semibold text-lg">Expense Management</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Categorize and analyze your spending patterns across multiple categories with detailed insights
              </p>
            </Card>

            {/* Income Tracking */}
            <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 border-orange-200/50 dark:border-orange-700/30">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                <h3 className="font-semibold text-lg">Income Tracking</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Record income from all sources including salary, freelance, investments, and passive income streams
              </p>
            </Card>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-6">Complete Financial Picture</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <PieChart className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Net Worth Calculation</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatically calculate your net worth by combining all assets and liabilities
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BarChart3 className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Cash Flow Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Monitor your monthly cash flow with detailed income vs expense comparisons
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ChartNoAxesCombined className="w-6 h-6 text-purple-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Financial Trends</h4>
                  <p className="text-sm text-muted-foreground">
                    Track financial progress over time with visual charts and trend analysis
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">Smart Financial Insights</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-cyan-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Secure & Private</h4>
                  <p className="text-sm text-muted-foreground">
                    Your financial data is encrypted and never shared with third parties
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="w-6 h-6 text-yellow-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Fast & Responsive</h4>
                  <p className="text-sm text-muted-foreground">
                    Built with modern technology for lightning-fast performance on all devices
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <PiggyBank className="w-6 h-6 text-emerald-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Savings Optimization</h4>
                  <p className="text-sm text-muted-foreground">
                    Identify opportunities to save more and optimize your financial strategy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="p-8 bg-gradient-to-r from-blue-600 to-green-500 text-white text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Transform Your Finances?</h3>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of users who have taken control of their financial future with Claude Finance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
