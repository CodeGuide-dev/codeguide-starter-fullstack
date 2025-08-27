"use client"

import { IconTrendingDown, IconTrendingUp, IconWallet, IconCoin, IconTrendingUp2, IconTarget } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Asset, Investment, Income, Expense } from "@/lib/finance-types"
import { useFinance } from "@/contexts/finance-context"

function formatCurrency(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount)
}

function calculateNetWorth(assets: Asset[], investments: Investment[]): number {
  const totalAssets = assets.reduce((sum, asset) => sum + asset.currentValue, 0)
  const totalInvestments = investments.reduce((sum, investment) => sum + investment.totalValue, 0)
  return totalAssets + totalInvestments
}

function calculateMonthlyIncome(income: Income[]): number {
  return income.reduce((sum, inc) => {
    const monthlyAmount = inc.frequency === 'monthly' ? inc.amount :
                         inc.frequency === 'bi_weekly' ? inc.amount * 2 :
                         inc.frequency === 'weekly' ? inc.amount * 4 :
                         inc.frequency === 'quarterly' ? inc.amount / 3 :
                         inc.frequency === 'annually' ? inc.amount / 12 : 0
    return sum + monthlyAmount
  }, 0)
}

function calculateMonthlyExpenses(expenses: Expense[]): number {
  return expenses.reduce((sum, exp) => {
    if (!exp.isRecurring) return sum
    const monthlyAmount = exp.recurringFrequency === 'monthly' ? exp.amount :
                         exp.recurringFrequency === 'weekly' ? exp.amount * 4 :
                         exp.recurringFrequency === 'quarterly' ? exp.amount / 3 :
                         exp.recurringFrequency === 'annually' ? exp.amount / 12 : 0
    return sum + monthlyAmount
  }, 0)
}

function calculateTotalInvestmentGain(investments: Investment[]): { gain: number, percentage: number } {
  const totalValue = investments.reduce((sum, inv) => sum + inv.totalValue, 0)
  const totalCost = investments.reduce((sum, inv) => sum + inv.costBasis, 0)
  const gain = totalValue - totalCost
  const percentage = totalCost > 0 ? (gain / totalCost) * 100 : 0
  return { gain, percentage }
}

export function FinanceOverviewCards() {
  const { data } = useFinance()
  const netWorth = calculateNetWorth(data.assets, data.investments)
  const monthlyIncome = calculateMonthlyIncome(data.income)
  const monthlyExpenses = calculateMonthlyExpenses(data.expenses)
  const monthlyCashFlow = monthlyIncome - monthlyExpenses
  const investmentGain = calculateTotalInvestmentGain(data.investments)
  
  const totalAssets = data.assets.reduce((sum, asset) => sum + asset.currentValue, 0)

  return (
    <div className="*:data-[slot=card]:from-green-50/50 *:data-[slot=card]:to-emerald-50/50 dark:*:data-[slot=card]:from-green-950/10 dark:*:data-[slot=card]:to-emerald-950/10 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      
      {/* Net Worth */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Net Worth</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatCurrency(netWorth)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-900 dark:text-green-300">
              <IconTrendingUp className="w-3 h-3" />
              +15.2%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Growing consistently <IconTrendingUp className="size-4 text-green-600" />
          </div>
          <div className="text-muted-foreground">
            Assets + Investments
          </div>
        </CardFooter>
      </Card>

      {/* Monthly Cash Flow */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Monthly Cash Flow</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatCurrency(monthlyCashFlow)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className={monthlyCashFlow >= 0 ? "border-green-200 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-900 dark:text-green-300" : "border-red-200 bg-red-50 text-red-700 dark:border-red-700 dark:bg-red-900 dark:text-red-300"}>
              {monthlyCashFlow >= 0 ? <IconTrendingUp className="w-3 h-3" /> : <IconTrendingDown className="w-3 h-3" />}
              {monthlyCashFlow >= 0 ? "Positive" : "Negative"}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Income - Expenses <IconCoin className="size-4 text-green-600" />
          </div>
          <div className="text-muted-foreground">
            {formatCurrency(monthlyIncome)} - {formatCurrency(monthlyExpenses)}
          </div>
        </CardFooter>
      </Card>

      {/* Total Assets */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Assets</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatCurrency(totalAssets)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-700 dark:bg-blue-900 dark:text-blue-300">
              <IconWallet className="w-3 h-3" />
              {data.assets.length} items
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Cash, Real Estate & More <IconWallet className="size-4 text-blue-600" />
          </div>
          <div className="text-muted-foreground">
            Liquid and fixed assets
          </div>
        </CardFooter>
      </Card>

      {/* Investment Performance */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Investment Gains</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatCurrency(investmentGain.gain)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className={investmentGain.gain >= 0 ? "border-green-200 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-900 dark:text-green-300" : "border-red-200 bg-red-50 text-red-700 dark:border-red-700 dark:bg-red-900 dark:text-red-300"}>
              {investmentGain.gain >= 0 ? <IconTrendingUp className="w-3 h-3" /> : <IconTrendingDown className="w-3 h-3" />}
              {investmentGain.percentage.toFixed(1)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {investmentGain.gain >= 0 ? "Strong portfolio performance" : "Market volatility"} <IconTrendingUp2 className="size-4 text-green-600" />
          </div>
          <div className="text-muted-foreground">
            Total portfolio value vs cost
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}