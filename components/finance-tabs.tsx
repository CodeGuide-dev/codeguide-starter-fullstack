'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FinanceOverview } from './finance-overview';
import { AssetsManager } from './assets-manager';
import { InvestmentsManager } from './investments-manager';
import { ExpensesManager } from './expenses-manager';
import { IncomeManager } from './income-manager';

interface FinanceTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function FinanceTabs({ activeTab, onTabChange }: FinanceTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="assets">Assets</TabsTrigger>
        <TabsTrigger value="investments">Investments</TabsTrigger>
        <TabsTrigger value="expenses">Expenses</TabsTrigger>
        <TabsTrigger value="income">Income</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <FinanceOverview />
      </TabsContent>

      <TabsContent value="assets">
        <AssetsManager />
      </TabsContent>

      <TabsContent value="investments">
        <InvestmentsManager />
      </TabsContent>

      <TabsContent value="expenses">
        <ExpensesManager />
      </TabsContent>

      <TabsContent value="income">
        <IncomeManager />
      </TabsContent>
    </Tabs>
  );
}