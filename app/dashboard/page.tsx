"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { FinanceSummary } from "@/components/finance/finance-summary";
import { FinanceTable } from "@/components/finance/finance-table";
import { FinanceForm } from "@/components/finance/finance-form";
import { ExpenseChart, InvestmentChart, CashFlowChart } from "@/components/finance/finance-charts";
import { BudgetProgressIndicator, NetWorthProgressIndicator } from "@/components/finance/progress-indicators";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Download } from "lucide-react";

// Mock data - in a real app, this would come from API calls
const mockAssets = [
  { id: '1', name: 'Primary Residence', description: 'Family home', value: 350000, currency: 'USD', purchaseDate: '2020-01-15', category: 'Real Estate' },
  { id: '2', name: 'Car', description: '2022 Honda Civic', value: 22000, currency: 'USD', purchaseDate: '2022-03-10', category: 'Vehicle' },
];

const mockInvestments = [
  { id: '1', name: 'Apple Inc', description: 'Tech stocks', type: 'Stock', quantity: 10, purchasePrice: 150, currentPrice: 180, purchaseDate: '2023-01-15', currency: 'USD', category: 'Equity' },
  { id: '2', name: 'Vanguard Index Fund', description: 'S&P 500 Index', type: 'Mutual Fund', quantity: 50, purchasePrice: 400, currentPrice: 420, purchaseDate: '2022-06-01', currency: 'USD', category: 'Equity' },
];

const mockExpenses = [
  { id: '1', name: 'Groceries', description: 'Weekly shopping', amount: 150, currency: 'USD', date: '2023-06-15', category: 'Food', paymentMethod: 'Credit Card' },
  { id: '2', name: 'Electricity Bill', description: 'Monthly utility', amount: 85, currency: 'USD', date: '2023-06-10', category: 'Utilities', paymentMethod: 'Bank Transfer' },
];

const mockIncome = [
  { id: '1', name: 'Salary', description: 'Monthly salary', amount: 5000, currency: 'USD', date: '2023-06-01', category: 'Salary', frequency: 'Monthly' },
  { id: '2', name: 'Freelance Work', description: 'Website design project', amount: 1200, currency: 'USD', date: '2023-06-20', category: 'Freelance', frequency: 'One-time' },
];

// Mock analytics data
const mockExpenseData = [
  { month: 'Jan', amount: 1200 },
  { month: 'Feb', amount: 1100 },
  { month: 'Mar', amount: 1300 },
  { month: 'Apr', amount: 1250 },
  { month: 'May', amount: 1400 },
  { month: 'Jun', amount: 1350 },
];

const mockInvestmentData = [
  { name: 'Apple Inc', value: 1800, purchaseValue: 1500 },
  { name: 'Vanguard Fund', value: 21000, purchaseValue: 20000 },
];

const mockCashFlowData = [
  { month: 'Jan', income: 5000, expenses: 1200 },
  { month: 'Feb', income: 5000, expenses: 1100 },
  { month: 'Mar', income: 5000, expenses: 1300 },
  { month: 'Apr', income: 5000, expenses: 1250 },
  { month: 'May', income: 5000, expenses: 1400 },
  { month: 'Jun', income: 6200, expenses: 1350 },
];

const mockBudgetProgress = [
  { category: 'Housing', spent: 800, budget: 1000, percentage: 80 },
  { category: 'Food', spent: 400, budget: 500, percentage: 80 },
  { category: 'Transportation', spent: 200, budget: 300, percentage: 67 },
  { category: 'Entertainment', spent: 150, budget: 200, percentage: 75 },
];

const mockNetWorthProgress = {
  current: 394000,
  previous: 380000,
  target: 500000,
};

export default function FinanceDashboard() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('overview');
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<'asset' | 'investment' | 'expense' | 'income'>('asset');
  const [editingItem, setEditingItem] = useState<any>(null);
  
  // Mock data state
  const [assets, setAssets] = useState(mockAssets);
  const [investments, setInvestments] = useState(mockInvestments);
  const [expenses, setExpenses] = useState(mockExpenses);
  const [income, setIncome] = useState(mockIncome);

  // Calculate totals
  const assetsTotal = assets.reduce((sum, asset) => sum + asset.value, 0);
  const investmentsTotal = investments.reduce((sum, investment) => sum + (investment.quantity * investment.currentPrice), 0);
  const expensesTotal = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const incomeTotal = income.reduce((sum, inc) => sum + inc.amount, 0);

  const handleAddNew = (type: 'asset' | 'investment' | 'expense' | 'income') => {
    setFormType(type);
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEdit = (type: 'asset' | 'investment' | 'expense' | 'income', item: any) => {
    setFormType(type);
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = (type: 'asset' | 'investment' | 'expense' | 'income', id: string) => {
    switch (type) {
      case 'asset':
        setAssets(assets.filter(asset => asset.id !== id));
        break;
      case 'investment':
        setInvestments(investments.filter(investment => investment.id !== id));
        break;
      case 'expense':
        setExpenses(expenses.filter(expense => expense.id !== id));
        break;
      case 'income':
        setIncome(income.filter(inc => inc.id !== id));
        break;
    }
  };

  const handleSubmit = (data: any) => {
    if (editingItem) {
      // Update existing item
      switch (formType) {
        case 'asset':
          setAssets(assets.map(asset => asset.id === editingItem.id ? { ...data, id: editingItem.id } : asset));
          break;
        case 'investment':
          setInvestments(investments.map(investment => investment.id === editingItem.id ? { ...data, id: editingItem.id } : investment));
          break;
        case 'expense':
          setExpenses(expenses.map(expense => expense.id === editingItem.id ? { ...data, id: editingItem.id } : expense));
          break;
        case 'income':
          setIncome(income.map(inc => inc.id === editingItem.id ? { ...data, id: editingItem.id } : inc));
          break;
      }
    } else {
      // Add new item
      const newItem = { ...data, id: Date.now().toString() };
      switch (formType) {
        case 'asset':
          setAssets([...assets, newItem]);
          break;
        case 'investment':
          setInvestments([...investments, newItem]);
          break;
        case 'expense':
          setExpenses([...expenses, newItem]);
          break;
        case 'income':
          setIncome([...income, newItem]);
          break;
      }
    }
    setShowForm(false);
    setEditingItem(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  if (!session) {
    return <div>Loading...</div>;
  }

  if (showForm) {
    return (
      <FinanceForm
        title={formType.charAt(0).toUpperCase() + formType.slice(1)}
        initialData={editingItem}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        type={formType}
      />
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Finance Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {session.user.name}. Manage your assets, investments, expenses, and income.
        </p>
      </div>

      <FinanceSummary
        assetsTotal={assetsTotal}
        investmentsTotal={investmentsTotal}
        expensesTotal={expensesTotal}
        incomeTotal={incomeTotal}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <CashFlowChart data={mockCashFlowData} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ExpenseChart data={mockExpenseData} />
                <InvestmentChart data={mockInvestmentData} />
              </div>
            </div>
            <div className="space-y-6">
              <NetWorthProgressIndicator data={mockNetWorthProgress} />
              <BudgetProgressIndicator data={mockBudgetProgress} />
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Recent Transactions</CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  ...mockIncome.map(income => ({ ...income, type: 'income' })),
                  ...mockExpenses.map(expense => ({ ...expense, type: 'expense' }))
                ]
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .slice(0, 5)
                  .map((transaction, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b">
                      <div>
                        <div className="font-medium">{transaction.name}</div>
                        <div className="text-sm text-muted-foreground">{transaction.date}</div>
                      </div>
                      <div className={`font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assets" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Assets</h2>
            <Button onClick={() => handleAddNew('asset')}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Asset
            </Button>
          </div>
          <FinanceTable
            title="Assets"
            data={assets}
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'category', label: 'Category' },
              { key: 'value', label: 'Value', format: (value) => `$${value.toLocaleString()}` },
              { key: 'purchaseDate', label: 'Purchase Date' },
            ]}
            onEdit={(item) => handleEdit('asset', item)}
            onDelete={(id) => handleDelete('asset', id)}
          />
        </TabsContent>

        <TabsContent value="investments" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Investments</h2>
            <Button onClick={() => handleAddNew('investment')}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Investment
            </Button>
          </div>
          <FinanceTable
            title="Investments"
            data={investments}
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'type', label: 'Type' },
              { key: 'quantity', label: 'Quantity' },
              { key: 'purchasePrice', label: 'Purchase Price', format: (value) => `$${value.toLocaleString()}` },
              { key: 'currentPrice', label: 'Current Price', format: (value) => `$${value.toLocaleString()}` },
              { key: 'purchaseDate', label: 'Purchase Date' },
            ]}
            onEdit={(item) => handleEdit('investment', item)}
            onDelete={(id) => handleDelete('investment', id)}
          />
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Income</h2>
                <Button onClick={() => handleAddNew('income')}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Income
                </Button>
              </div>
              <FinanceTable
                title="Income"
                data={income}
                columns={[
                  { key: 'name', label: 'Name' },
                  { key: 'category', label: 'Category' },
                  { key: 'amount', label: 'Amount', format: (value) => `$${value.toLocaleString()}` },
                  { key: 'date', label: 'Date' },
                ]}
                onEdit={(item) => handleEdit('income', item)}
                onDelete={(id) => handleDelete('income', id)}
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Expenses</h2>
                <Button onClick={() => handleAddNew('expense')}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Expense
                </Button>
              </div>
              <FinanceTable
                title="Expenses"
                data={expenses}
                columns={[
                  { key: 'name', label: 'Name' },
                  { key: 'category', label: 'Category' },
                  { key: 'amount', label: 'Amount', format: (value) => `$${value.toLocaleString()}` },
                  { key: 'date', label: 'Date' },
                ]}
                onEdit={(item) => handleEdit('expense', item)}
                onDelete={(id) => handleDelete('expense', id)}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}