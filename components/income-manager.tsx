'use client';

export function IncomeManager() {
  return (
    <div className="rounded-lg border p-6">
      <h2 className="text-2xl font-semibold mb-4">Income Manager</h2>
      <p className="text-muted-foreground">
        Record your income from various sources including salary, freelance work, investments, 
        rental properties, business income, pensions, and other revenue streams.
      </p>
      <div className="mt-4 p-4 bg-muted rounded-lg">
        <p className="text-sm">
          <strong>Coming Soon:</strong> Comprehensive income tracking with source categorization, 
          recurring income setup, tax documentation, and income trend analysis.
        </p>
      </div>
    </div>
  );
}