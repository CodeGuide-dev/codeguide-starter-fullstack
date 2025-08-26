'use client';

export function FinanceOverview() {
  return (
    <div className="rounded-lg border p-6">
      <h2 className="text-2xl font-semibold mb-4">Financial Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border rounded-lg">
          <h3 className="font-medium mb-2">Recent Activity</h3>
          <p className="text-muted-foreground text-sm">
            Your financial dashboard is ready! Start by adding your assets, investments, 
            expenses, and income to see a complete overview of your financial health.
          </p>
        </div>
        
        <div className="p-4 border rounded-lg">
          <h3 className="font-medium mb-2">Quick Actions</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span>Add Asset</span>
              <span className="text-muted-foreground">Property, vehicles, savings</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Record Expense</span>
              <span className="text-muted-foreground">Track spending</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Add Income</span>
              <span className="text-muted-foreground">Salary, freelance, etc.</span>
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-medium mb-2">Financial Health</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span>Net Worth Trend</span>
              <span className="text-green-600">+0%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Savings Rate</span>
              <span className="text-muted-foreground">--%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Debt-to-Income</span>
              <span className="text-muted-foreground">--%</span>
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-medium mb-2">Upcoming</h3>
          <p className="text-muted-foreground text-sm">
            Set up recurring transactions, create budgets, and generate financial reports 
            to better manage your personal finances.
          </p>
        </div>
      </div>
    </div>
  );
}