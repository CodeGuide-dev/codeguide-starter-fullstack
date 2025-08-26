"use client";

import { useState, useEffect } from "react";
import { FinanceSummaryCards } from "@/components/finance-summary-cards";
import { FinanceDataTable } from "@/components/finance-data-table";
import { FinanceFormModal } from "@/components/finance-form-modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Landmark, TrendingUp, Wallet, DollarSign } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Asset {
  id: string;
  name: string;
  type: string;
  value: string;
  purchaseDate?: string;
  description?: string;
  createdAt: string;
}

interface Investment {
  id: string;
  name: string;
  type: string;
  amount: string;
  currentValue: string;
  purchaseDate: string;
  tickerSymbol?: string;
  isActive: boolean;
  createdAt: string;
}

interface Expense {
  id: string;
  description: string;
  amount: string;
  category: string;
  date: string;
  isRecurring: boolean;
  createdAt: string;
}

interface Income {
  id: string;
  source: string;
  amount: string;
  frequency: string;
  date: string;
  isRecurring: boolean;
  createdAt: string;
}

export default function Page() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [income, setIncome] = useState<Income[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      
      // Fetch data from API endpoints
      const [assetsRes, investmentsRes, expensesRes, incomeRes] = await Promise.all([
        fetch('/api/finance/assets'),
        fetch('/api/finance/investments'),
        fetch('/api/finance/expenses'),
        fetch('/api/finance/income')
      ]);

      if (assetsRes.ok) {
        const assetsData = await assetsRes.json();
        setAssets(assetsData.data || []);
      }

      if (investmentsRes.ok) {
        const investmentsData = await investmentsRes.json();
        setInvestments(investmentsData.data || []);
      }

      if (expensesRes.ok) {
        const expensesData = await expensesRes.json();
        setExpenses(expensesData.data || []);
      }

      if (incomeRes.ok) {
        const incomeData = await incomeRes.json();
        setIncome(incomeData.data || []);
      }

    } catch {
      toast.error("Failed to load financial data");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (type: string, data: Record<string, unknown>) => {
    try {
      const response = await fetch(`/api/finance/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        
        // Update local state with the new item
        switch (type) {
          case "asset":
            setAssets(prev => [...prev, result.data]);
            break;
          case "investment":
            setInvestments(prev => [...prev, result.data]);
            break;
          case "expense":
            setExpenses(prev => [...prev, result.data]);
            break;
          case "income":
            setIncome(prev => [...prev, result.data]);
            break;
        }

        toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} created successfully`);
      } else {
        const error = await response.json();
        toast.error(error.error || `Failed to create ${type}`);
      }
    } catch {
      toast.error(`Failed to create ${type}`);
    }
  };

  const handleDelete = async (type: string, id: string) => {
    try {
      const response = await fetch(`/api/finance/${type}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Update local state by removing the deleted item
        switch (type) {
          case "asset":
            setAssets(prev => prev.filter(item => item.id !== id));
            break;
          case "investment":
            setInvestments(prev => prev.filter(item => item.id !== id));
            break;
          case "expense":
            setExpenses(prev => prev.filter(item => item.id !== id));
            break;
          case "income":
            setIncome(prev => prev.filter(item => item.id !== id));
            break;
        }

        toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`);
      } else {
        const error = await response.json();
        toast.error(error.error || `Failed to delete ${type}`);
      }
    } catch {
      toast.error(`Failed to delete ${type}`);
    }
  };

  // Column definitions for data tables
  const assetColumns: ColumnDef<Asset>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "type", header: "Type" },
    { 
      accessorKey: "value", 
      header: "Value",
      cell: ({ row }) => `$${parseFloat(row.getValue("value")).toLocaleString()}`
    },
    { accessorKey: "purchaseDate", header: "Purchase Date" },
    { accessorKey: "description", header: "Description" }
  ];

  const investmentColumns: ColumnDef<Investment>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "type", header: "Type" },
    { accessorKey: "tickerSymbol", header: "Symbol" },
    { 
      accessorKey: "amount", 
      header: "Invested",
      cell: ({ row }) => `$${parseFloat(row.getValue("amount")).toLocaleString()}`
    },
    { 
      accessorKey: "currentValue", 
      header: "Current Value",
      cell: ({ row }) => `$${parseFloat(row.getValue("currentValue")).toLocaleString()}`
    },
    { 
      accessorKey: "isActive", 
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.getValue("isActive") ? "default" : "secondary"}>
          {row.getValue("isActive") ? "Active" : "Inactive"}
        </Badge>
      )
    }
  ];

  const expenseColumns: ColumnDef<Expense>[] = [
    { accessorKey: "description", header: "Description" },
    { accessorKey: "category", header: "Category" },
    { 
      accessorKey: "amount", 
      header: "Amount",
      cell: ({ row }) => `$${parseFloat(row.getValue("amount")).toLocaleString()}`
    },
    { accessorKey: "date", header: "Date" },
    { 
      accessorKey: "isRecurring", 
      header: "Recurring",
      cell: ({ row }) => (row.getValue("isRecurring") ? "Yes" : "No")
    }
  ];

  const incomeColumns: ColumnDef<Income>[] = [
    { accessorKey: "source", header: "Source" },
    { accessorKey: "frequency", header: "Frequency" },
    { 
      accessorKey: "amount", 
      header: "Amount",
      cell: ({ row }) => `$${parseFloat(row.getValue("amount")).toLocaleString()}`
    },
    { accessorKey: "date", header: "Date" },
    { 
      accessorKey: "isRecurring", 
      header: "Recurring",
      cell: ({ row }) => (row.getValue("isRecurring") ? "Yes" : "No")
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        {/* Financial Summary Cards */}
        <FinanceSummaryCards />

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="px-4 lg:px-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Landmark className="w-5 h-5" />
                    Recent Assets
                  </CardTitle>
                  <CardDescription>Your most valuable possessions</CardDescription>
                </CardHeader>
                <CardContent>
                  {assets.length > 0 ? (
                    <div className="space-y-2">
                      {assets.slice(0, 3).map(asset => (
                        <div key={asset.id} className="flex justify-between items-center py-2 border-b">
                          <div>
                            <div className="font-medium">{asset.name}</div>
                            <div className="text-sm text-muted-foreground">{asset.type}</div>
                          </div>
                          <div className="font-semibold">
                            ${parseFloat(asset.value).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      <p>No assets added yet</p>
                    </div>
                  )}
                  <FinanceFormModal
                    type="asset"
                    trigger={
                      <Button variant="outline" size="sm" className="mt-4 w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Asset
                      </Button>
                    }
                    onSubmit={(data) => handleCreate("asset", data)}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Recent Investments
                  </CardTitle>
                  <CardDescription>Your investment portfolio</CardDescription>
                </CardHeader>
                <CardContent>
                  {investments.length > 0 ? (
                    <div className="space-y-2">
                      {investments.slice(0, 3).map(investment => (
                        <div key={investment.id} className="flex justify-between items-center py-2 border-b">
                          <div>
                            <div className="font-medium">{investment.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {investment.tickerSymbol && `(${investment.tickerSymbol}) `}
                              {investment.type}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">
                              ${parseFloat(investment.currentValue).toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              invested: ${parseFloat(investment.amount).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      <p>No investments added yet</p>
                    </div>
                  )}
                  <FinanceFormModal
                    type="investment"
                    trigger={
                      <Button variant="outline" size="sm" className="mt-4 w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Investment
                      </Button>
                    }
                    onSubmit={(data) => handleCreate("investment", data)}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="w-5 h-5" />
                    Recent Expenses
                  </CardTitle>
                  <CardDescription>Your spending activity</CardDescription>
                </CardHeader>
                <CardContent>
                  {expenses.length > 0 ? (
                    <div className="space-y-2">
                      {expenses.slice(0, 3).map(expense => (
                        <div key={expense.id} className="flex justify-between items-center py-2 border-b">
                          <div>
                            <div className="font-medium">{expense.description}</div>
                            <div className="text-sm text-muted-foreground">{expense.category}</div>
                          </div>
                          <div className="font-semibold text-destructive">
                            -${parseFloat(expense.amount).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      <p>No expenses added yet</p>
                    </div>
                  )}
                  <FinanceFormModal
                    type="expense"
                    trigger={
                      <Button variant="outline" size="sm" className="mt-4 w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Expense
                      </Button>
                    }
                    onSubmit={(data) => handleCreate("expense", data)}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Recent Income
                  </CardTitle>
                  <CardDescription>Your earnings</CardDescription>
                </CardHeader>
                <CardContent>
                  {income.length > 0 ? (
                    <div className="space-y-2">
                      {income.slice(0, 3).map(incomeItem => (
                        <div key={incomeItem.id} className="flex justify-between items-center py-2 border-b">
                          <div>
                            <div className="font-medium">{incomeItem.source}</div>
                            <div className="text-sm text-muted-foreground">{incomeItem.frequency}</div>
                          </div>
                          <div className="font-semibold text-green-600">
                            +${parseFloat(incomeItem.amount).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      <p>No income records added yet</p>
                    </div>
                  )}
                  <FinanceFormModal
                    type="income"
                    trigger={
                      <Button variant="outline" size="sm" className="mt-4 w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Income
                      </Button>
                    }
                    onSubmit={(data) => handleCreate("income", data)}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Assets Tab */}
          <TabsContent value="assets">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Assets Management</CardTitle>
                  <CardDescription>
                    Manage your assets including real estate, vehicles, and valuables
                  </CardDescription>
                </div>
                <FinanceFormModal
                  type="asset"
                  trigger={
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Asset
                    </Button>
                  }
                  onSubmit={(data) => handleCreate("asset", data)}
                />
              </CardHeader>
              <CardContent>
                <FinanceDataTable
                  columns={assetColumns}
                  data={assets}
                  title="Your Assets"
                  description="Track and manage all your valuable possessions"
                  onDelete={(id) => handleDelete("asset", id)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Investments Tab */}
          <TabsContent value="investments">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Investments Management</CardTitle>
                  <CardDescription>
                    Manage your investment portfolio including stocks, bonds, and crypto
                  </CardDescription>
                </div>
                <FinanceFormModal
                  type="investment"
                  trigger={
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Investment
                    </Button>
                  }
                  onSubmit={(data) => handleCreate("investment", data)}
                />
              </CardHeader>
              <CardContent>
                <FinanceDataTable
                  columns={investmentColumns}
                  data={investments}
                  title="Your Investments"
                  description="Monitor and manage your investment portfolio"
                  onDelete={(id) => handleDelete("investment", id)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Expenses Tab */}
          <TabsContent value="expenses">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Expenses Management</CardTitle>
                  <CardDescription>
                    Track and categorize your spending habits
                  </CardDescription>
                </div>
                <FinanceFormModal
                  type="expense"
                  trigger={
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Expense
                    </Button>
                  }
                  onSubmit={(data) => handleCreate("expense", data)}
                />
              </CardHeader>
              <CardContent>
                <FinanceDataTable
                  columns={expenseColumns}
                  data={expenses}
                  title="Your Expenses"
                  description="Track and analyze your spending patterns"
                  onDelete={(id) => handleDelete("expense", id)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Income Tab */}
          <TabsContent value="income">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Income Management</CardTitle>
                  <CardDescription>
                    Track your income sources and earnings
                  </CardDescription>
                </div>
                <FinanceFormModal
                  type="income"
                  trigger={
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Income
                    </Button>
                  }
                  onSubmit={(data) => handleCreate("income", data)}
                />
              </CardHeader>
              <CardContent>
                <FinanceDataTable
                  columns={incomeColumns}
                  data={income}
                  title="Your Income"
                  description="Track and manage your income sources"
                  onDelete={(id) => handleDelete("income", id)}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}