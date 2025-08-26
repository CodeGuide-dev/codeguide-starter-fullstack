import { FinanceOverviewCards } from "@/components/finance-overview-cards"
import { FinanceDataTables } from "@/components/finance-data-tables"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { loadFinanceData } from "@/lib/finance-utils"
import { FinanceProvider } from "@/contexts/finance-context"

export default async function DashboardPage() {
  const financeData = await loadFinanceData()

  return (
    <FinanceProvider initialData={financeData}>
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <FinanceOverviewCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <FinanceDataTables />
        </div>
      </div>
    </FinanceProvider>
  )
}