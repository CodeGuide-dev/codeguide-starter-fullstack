"use client";

import { useSession } from "@/lib/auth-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Landmark, TrendingUpIcon, Wallet, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";

interface FinanceSummary {
  totalAssets: number;
  totalInvestments: number;
  monthlyExpenses: number;
  monthlyIncome: number;
  netWorth: number;
}

export function FinanceSummaryCards() {
  const { data: session } = useSession();
  const [summary, setSummary] = useState<FinanceSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSummary() {
      if (!session?.user) return;
      
      try {
        setLoading(true);
        // In a real implementation, this would fetch from your API
        // For now, we'll use mock data
        const mockSummary: FinanceSummary = {
          totalAssets: 125000,
          totalInvestments: 87500,
          monthlyExpenses: 3250,
          monthlyIncome: 7500,
          netWorth: 212500
        };
        setSummary(mockSummary);
      } catch (err) {
        setError("Failed to load financial summary");
        console.error("Error fetching summary:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSummary();
  }, [session]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 px-4 lg:px-6">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mt-2"></div>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 lg:px-6">
        <Card className="bg-destructive/10 border-destructive">
          <CardContent className="pt-6">
            <p className="text-destructive text-center">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!summary) {
    return null;
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const cards = [
    {
      title: "Net Worth",
      value: formatCurrency(summary.netWorth),
      description: "Total Assets - Liabilities",
      icon: Landmark,
      trend: "up" as const,
      trendValue: "+8.2%",
      footer: "Growing steadily"
    },
    {
      title: "Total Assets",
      value: formatCurrency(summary.totalAssets),
      description: "Real estate, vehicles, valuables",
      icon: Landmark,
      trend: "up" as const,
      trendValue: "+5.1%",
      footer: "Appreciation growth"
    },
    {
      title: "Investments",
      value: formatCurrency(summary.totalInvestments),
      description: "Stocks, bonds, crypto, funds",
      icon: TrendingUpIcon,
      trend: "up" as const,
      trendValue: "+12.3%",
      footer: "Strong performance"
    },
    {
      title: "Monthly Income",
      value: formatCurrency(summary.monthlyIncome),
      description: "Salary, bonuses, passive income",
      icon: DollarSign,
      trend: "up" as const,
      trendValue: "+3.5%",
      footer: "Steady increase"
    },
    {
      title: "Monthly Expenses",
      value: formatCurrency(summary.monthlyExpenses),
      description: "Living costs, bills, discretionary",
      icon: Wallet,
      trend: "down" as const,
      trendValue: "-2.1%",
      footer: "Good cost control"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 px-4 lg:px-6">
      {cards.map((card, index) => (
        <Card key={index} className="@container/card">
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              <card.icon className="w-4 h-4" />
              {card.title}
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {card.value}
            </CardTitle>
            <div>
              <Badge variant={card.trend === "up" ? "default" : "secondary"}>
                {card.trend === "up" ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                {card.trendValue}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{card.description}</p>
            <p className="text-xs text-muted-foreground mt-2">{card.footer}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}