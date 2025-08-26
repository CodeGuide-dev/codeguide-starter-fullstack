import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Wallet, TrendingUp, Receipt } from "lucide-react"
import Link from "next/link"

export function DashboardCards() {
  return (
    <div className="grid gap-4 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-4">      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-normal">Assets</CardTitle>
          <CardDescription>
            Track your valuable possessions and cash holdings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild size="sm" className="w-full">
            <Link href="/dashboard/assets">
              <Wallet className="mr-2 h-4 w-4" />
              Manage Assets
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-normal">Investments</CardTitle>
          <CardDescription>
            Monitor your investment portfolio and performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild size="sm" className="w-full">
            <Link href="/dashboard/investments">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Portfolio
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-normal">Expenses</CardTitle>
          <CardDescription>
            Track and categorize your spending habits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild size="sm" className="w-full">
            <Link href="/dashboard/expenses">
              <Receipt className="mr-2 h-4 w-4" />
              Track Expenses
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-normal">Income</CardTitle>
          <CardDescription>
            Record all sources of income and revenue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild size="sm" className="w-full">
            <Link href="/dashboard/income">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Income
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}