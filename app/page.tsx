"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  DollarSign,
  PieChart,
  TrendingUp,
  Wallet,
  Target,
  Shield,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuthButtons, HeroAuthButtons } from "@/components/auth-buttons";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <div className="text-center py-12 sm:py-16 relative px-4">
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <AuthButtons />
            <ThemeToggle />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 mb-4">
          <div className="flex items-center space-x-3">
            <DollarSign className="h-12 w-12 text-primary" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              Kimi Finance
            </h1>
          </div>
        </div>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4 mb-8">
          Take Control of Your Financial Future. Track assets, investments, expenses, and income all in one place.
        </p>
        
        <HeroAuthButtons />
      </div>

      <main className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-8 max-w-5xl">
        {/* Features Overview */}
        <div className="text-center mb-8">
          <div className="text-4xl sm:text-5xl mb-2">💰</div>
          <div className="font-bold text-lg sm:text-xl mb-2">Complete Financial Management</div>
          <div className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Track all aspects of your financial life in one secure platform. From daily expenses to long-term investments,
            get complete visibility and control over your money.
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Assets */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-green-200/50 dark:border-green-700/30">
            <div className="flex items-center gap-3 mb-3">
              <Wallet className="w-6 h-6 text-green-600 dark:text-green-400" />
              <h3 className="font-semibold text-lg">Assets</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Cash and bank accounts</li>
              <li>• Real estate properties</li>
              <li>• Vehicles and equipment</li>
              <li>• Other valuable assets</li>
            </ul>
          </Card>

          {/* Investments */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 border-blue-200/50 dark:border-blue-700/30">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h3 className="font-semibold text-lg">Investments</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Stocks and bonds</li>
              <li>• Cryptocurrency</li>
              <li>• Mutual funds and ETFs</li>
              <li>• Portfolio tracking</li>
            </ul>
          </Card>

          {/* Expenses */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/10 dark:to-pink-900/10 border-red-200/50 dark:border-red-700/30">
            <div className="flex items-center gap-3 mb-3">
              <DollarSign className="w-6 h-6 text-red-600 dark:text-red-400" />
              <h3 className="font-semibold text-lg">Expenses</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Category tracking</li>
              <li>• Spending analytics</li>
              <li>• Budget monitoring</li>
              <li>• Receipt management</li>
            </ul>
          </Card>

          {/* Income */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 border-purple-200/50 dark:border-purple-700/30">
            <div className="flex items-center gap-3 mb-3">
              <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h3 className="font-semibold text-lg">Income</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Salary tracking</li>
              <li>• Investment income</li>
              <li>• Side business</li>
              <li>• Growth analytics</li>
            </ul>
          </Card>
        </div>

        {/* Security & Analytics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/10 dark:to-slate-900/10 border-gray-200/50 dark:border-gray-700/30">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              <h3 className="font-semibold text-lg">Security First</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Bank-level encryption</li>
              <li>• Secure authentication</li>
              <li>• Data privacy protection</li>
              <li>• Regular security audits</li>
            </ul>
          </Card>

          <Card className="p-4 sm:p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 border-amber-200/50 dark:border-amber-700/30">
            <div className="flex items-center gap-3 mb-3">
              <Target className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              <h3 className="font-semibold text-lg">Smart Analytics</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Real-time insights</li>
              <li>• Spending patterns</li>
              <li>• Investment performance</li>
              <li>• Financial goals tracking</li>
            </ul>
          </Card>
        </div>
      </main>
    </div>
  );
}
