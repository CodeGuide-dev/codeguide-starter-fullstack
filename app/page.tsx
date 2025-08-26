"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Code,
  Database,
  Shield,
  Zap,
  Globe,
  Palette,
  Package,
  Landmark,
  TrendingUp,
  Wallet,
  DollarSign,
  PiggyBank,
  BarChart3,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuthButtons, HeroAuthButtons } from "@/components/auth-buttons";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="text-center py-12 sm:py-16 relative px-4">
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <AuthButtons />
            <ThemeToggle />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-500 to-teal-400 bg-clip-text text-transparent font-parkinsans">
            Deepseek Finance
          </h1>
        </div>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4 mb-8">
          Take control of your financial future. Track assets, investments, expenses, and income in one powerful platform.
        </p>
        
        <HeroAuthButtons />
      </div>

      <main className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-8 max-w-5xl">
        {/* Project Overview */}
        <div className="text-center mb-8">
          <div className="text-4xl sm:text-5xl mb-2">💰</div>
          <div className="font-bold text-lg sm:text-xl mb-2">Comprehensive Financial Management</div>
          <div className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Manage your entire financial life in one place. Track assets, monitor investments, 
            analyze expenses, and optimize your income with powerful analytics and insights.
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {/* Assets Tracking */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border-blue-200/50 dark:border-blue-700/30">
            <div className="flex items-center gap-3 mb-3">
              <Landmark className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h3 className="font-semibold text-lg">Assets Tracking</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Track real estate, vehicles, and valuables</li>
              <li>• Monitor asset appreciation over time</li>
              <li>• Categorize by type and location</li>
              <li>• Calculate total net worth</li>
            </ul>
          </Card>

          {/* Investment Management */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-green-200/50 dark:border-green-700/30">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              <h3 className="font-semibold text-lg">Investment Management</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Monitor stocks, bonds, and crypto</li>
              <li>• Track portfolio performance</li>
              <li>• Set investment goals</li>
              <li>• Analyze returns and dividends</li>
            </ul>
          </Card>

          {/* Expense Tracking */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 border-purple-200/50 dark:border-purple-700/30">
            <div className="flex items-center gap-3 mb-3">
              <Wallet className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h3 className="font-semibold text-lg">Expense Tracking</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Categorize spending habits</li>
              <li>• Set monthly budgets</li>
              <li>• Identify cost-saving opportunities</li>
              <li>• Track recurring payments</li>
            </ul>
          </Card>

          {/* Income Management */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/10 dark:to-blue-900/10 border-cyan-200/50 dark:border-cyan-700/30">
            <div className="flex items-center gap-3 mb-3">
              <DollarSign className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              <h3 className="font-semibold text-lg">Income Management</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Track multiple income sources</li>
              <li>• Monitor salary and bonuses</li>
              <li>• Analyze income trends</li>
              <li>• Plan for tax optimization</li>
            </ul>
          </Card>

          {/* Savings Goals */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 border-orange-200/50 dark:border-orange-700/30">
            <div className="flex items-center gap-3 mb-3">
              <PiggyBank className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              <h3 className="font-semibold text-lg">Savings Goals</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Set financial targets</li>
              <li>• Track progress towards goals</li>
              <li>• Automate savings plans</li>
              <li>• Celebrate milestones</li>
            </ul>
          </Card>

          {/* Analytics & Reports */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/10 dark:to-purple-900/10 border-indigo-200/50 dark:border-indigo-700/30">
            <div className="flex items-center gap-3 mb-3">
              <BarChart3 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <h3 className="font-semibold text-lg">Analytics & Reports</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Visual financial dashboards</li>
              <li>• Customizable reports</li>
              <li>• Historical trend analysis</li>
              <li>• Export to PDF/CSV</li>
            </ul>
          </Card>
        </div>

        {/* Get Started Today */}
        <Card className="p-6 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border-emerald-200/50 dark:border-emerald-700/30">
          <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-600" />
            Start Your Financial Journey
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-emerald-800 dark:text-emerald-400">New to Deepseek Finance?</h4>
              <div className="bg-emerald-500/10 dark:bg-emerald-400/10 rounded-lg p-3 text-sm">
                <div>• Sign up for free account</div>
                <div>• Connect your financial data</div>
                <div>• Set up your first budget</div>
                <div>• Start tracking immediately</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-emerald-800 dark:text-emerald-400">Existing User?</h4>
              <div className="bg-emerald-500/10 dark:bg-emerald-400/10 rounded-lg p-3 text-sm">
                <div>• Sign in to your dashboard</div>
                <div>• Review your financial health</div>
                <div>• Update recent transactions</div>
                <div>• Check progress on goals</div>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
