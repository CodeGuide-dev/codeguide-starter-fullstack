"use client";

import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BudgetProgress {
  category: string;
  spent: number;
  budget: number;
  percentage: number;
}

export function BudgetProgressIndicator({ data }: { data: BudgetProgress[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm mb-1">
              <span>{item.category}</span>
              <span>${item.spent} / ${item.budget}</span>
            </div>
            <Progress 
              value={item.percentage} 
              className={item.percentage > 90 ? "bg-red-500" : item.percentage > 75 ? "bg-yellow-500" : "bg-green-500"} 
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

interface NetWorthProgress {
  current: number;
  previous: number;
  target: number;
}

export function NetWorthProgressIndicator({ data }: { data: NetWorthProgress }) {
  const progressPercentage = Math.min(100, (data.current / data.target) * 100);
  const growth = data.current - data.previous;
  const growthPercentage = ((growth / data.previous) * 100).toFixed(1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Net Worth Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-2">${data.current.toLocaleString()}</div>
        <div className="text-sm text-muted-foreground mb-4">
          {growth >= 0 ? '+' : ''}{growthPercentage}% from last month
        </div>
        <Progress value={progressPercentage} className="mb-2" />
        <div className="text-xs text-muted-foreground">
          {progressPercentage.toFixed(1)}% of ${data.target.toLocaleString()} goal
        </div>
      </CardContent>
    </Card>
  );
}