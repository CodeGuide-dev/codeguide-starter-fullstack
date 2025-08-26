'use client';

export function InvestmentsManager() {
  return (
    <div className="rounded-lg border p-6">
      <h2 className="text-2xl font-semibold mb-4">Investments Manager</h2>
      <p className="text-muted-foreground">
        Manage your investment portfolio including stocks, bonds, mutual funds, ETFs, and cryptocurrencies.
        Track purchase prices, quantities, and current values to monitor your investment performance.
      </p>
      <div className="mt-4 p-4 bg-muted rounded-lg">
        <p className="text-sm">
          <strong>Coming Soon:</strong> Full investment tracking with performance analytics, 
          dividend tracking, and portfolio diversification insights.
        </p>
      </div>
    </div>
  );
}