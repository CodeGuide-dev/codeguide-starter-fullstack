"use client";

import { Bar, BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ExpenseData {
  month: string;
  amount: number;
}

interface InvestmentData {
  name: string;
  value: number;
  purchaseValue: number;
}

interface CashFlowData {
  month: string;
  income: number;
  expenses: number;
}

export function ExpenseChart({ data }: { data: ExpenseData[] }) {
  return (
    <div className="h-80">
      <h3 className="text-lg font-semibold mb-4">Monthly Expenses</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
          <Legend />
          <Bar dataKey="amount" fill="#ef4444" name="Expenses" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function InvestmentChart({ data }: { data: InvestmentData[] }) {
  return (
    <div className="h-80">
      <h3 className="text-lg font-semibold mb-4">Investment Performance</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => [`$${value}`, 'Value']} />
          <Legend />
          <Bar dataKey="purchaseValue" fill="#94a3b8" name="Purchase Value" />
          <Bar dataKey="value" fill="#10b981" name="Current Value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CashFlowChart({ data }: { data: CashFlowData[] }) {
  return (
    <div className="h-80">
      <h3 className="text-lg font-semibold mb-4">Income vs Expenses</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#10b981" name="Income" strokeWidth={2} />
          <Line type="monotone" dataKey="expenses" stroke="#ef4444" name="Expenses" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}