'use client';

export function ExpensesManager() {
  return (
    <div className="rounded-lg border p-6">
      <h2 className="text-2xl font-semibold mb-4">Expenses Manager</h2>
      <p className="text-muted-foreground">
        Track your expenses across different categories like housing, utilities, food, transportation, 
        healthcare, entertainment, and more. Monitor your spending patterns and identify areas for savings.
      </p>
      <div className="mt-4 p-4 bg-muted rounded-lg">
        <p className="text-sm">
          <strong>Coming Soon:</strong> Complete expense tracking with category breakdowns, 
          monthly budgeting, spending trends, and receipt upload functionality.
        </p>
      </div>
    </div>
  );
}