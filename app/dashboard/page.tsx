import { DashboardCards } from "@/components/dashboard-cards"
import { FinanceChart } from "@/components/finance-chart"
import { RecentTransactions } from "@/components/recent-transactions"
import { FinancialSummary } from "@/components/financial-summary"

export default function DashboardPage() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <FinancialSummary />
        <DashboardCards />
        <div className="px-4 lg:px-6">
          <FinanceChart />
        </div>
        <RecentTransactions />
      </div>
    </div>
  )
}