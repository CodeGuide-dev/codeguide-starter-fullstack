import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { month: "Jan", income: 4000, expenses: 2400, savings: 1600 },
  { month: "Feb", income: 3000, expenses: 1398, savings: 1602 },
  { month: "Mar", income: 2000, expenses: 9800, savings: -7800 },
  { month: "Apr", income: 2780, expenses: 3908, savings: -1128 },
  { month: "May", income: 1890, expenses: 4800, savings: -2910 },
  { month: "Jun", income: 2390, expenses: 3800, savings: -1410 },
  { month: "Jul", income: 3490, expenses: 4300, savings: -810 },
  { month: "Aug", income: 4200, expenses: 2800, savings: 1400 },
  { month: "Sep", income: 5100, expenses: 3200, savings: 1900 },
  { month: "Oct", income: 4800, expenses: 2900, savings: 1900 },
  { month: "Nov", income: 5200, expenses: 3100, savings: 2100 },
  { month: "Dec", income: 5800, expenses: 3500, savings: 2300 },
]

export function FinanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Overview</CardTitle>
        <CardDescription>
          Income vs Expenses vs Savings over the past 12 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            income: {
              label: "Income",
              color: "hsl(var(--chart-1))",
            },
            expenses: {
              label: "Expenses",
              color: "hsl(var(--chart-2))",
            },
            savings: {
              label: "Savings",
              color: "hsl(var(--chart-3))",
            },
          }}
        >
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="income"
                stackId="1"
                stroke="var(--color-income)"
                fill="var(--color-income)"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stackId="1"
                stroke="var(--color-expenses)"
                fill="var(--color-expenses)"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="savings"
                stackId="1"
                stroke="var(--color-savings)"
                fill="var(--color-savings)"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}