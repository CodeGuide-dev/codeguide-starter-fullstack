'use client';

import { useState } from 'react';
import { FinanceCards } from '@/components/finance-cards';
import { FinanceTabs } from '@/components/finance-tabs';

export default function Page() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <FinanceCards />
        <div className="px-4 lg:px-6">
          <FinanceTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>
    </div>
  )
}