"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatCurrencyDetailed, formatDate, getCategoryColor } from "@/lib/finance-utils"
import { IconPlus, IconTrendingUp, IconTrendingDown, IconEdit } from "@tabler/icons-react"
import { useFinance } from "@/contexts/finance-context"
import { AddExpenseDialog } from "@/components/add-expense-dialog"
import { AddAssetDialog } from "@/components/add-asset-dialog"
import { AddIncomeDialog } from "@/components/add-income-dialog"

export function FinanceDataTables() {
  const { data } = useFinance()
  const [expenseDialogOpen, setExpenseDialogOpen] = useState(false)
  const [assetDialogOpen, setAssetDialogOpen] = useState(false)
  const [incomeDialogOpen, setIncomeDialogOpen] = useState(false)
  return (
    <div className="px-4 lg:px-6">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Recent Expenses */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Expenses</CardTitle>
                  <CardDescription>Latest spending activity</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setExpenseDialogOpen(true)}>
                  <IconPlus className="w-4 h-4" />
                  Add Expense
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.expenses.slice(0, 5).map((expense) => (
                    <div key={expense.id} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{expense.name}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className={getCategoryColor(expense.category)}>
                            {expense.category.replace('_', ' ')}
                          </Badge>
                          <p className="text-xs text-muted-foreground">{formatDate(expense.date)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{formatCurrencyDetailed(expense.amount)}</p>
                        {expense.isRecurring && (
                          <p className="text-xs text-muted-foreground">{expense.recurringFrequency}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Investments */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Top Performers</CardTitle>
                  <CardDescription>Best investment gains</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <IconPlus className="w-4 h-4" />
                  Add Investment
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.investments
                    .map(inv => ({ ...inv, gain: inv.totalValue - inv.costBasis, gainPercent: ((inv.totalValue - inv.costBasis) / inv.costBasis) * 100 }))
                    .sort((a, b) => b.gainPercent - a.gainPercent)
                    .slice(0, 5)
                    .map((investment) => (
                    <div key={investment.id} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{investment.name}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className={getCategoryColor(investment.category)}>
                            {investment.category.replace('_', ' ')}
                          </Badge>
                          {investment.symbol && (
                            <p className="text-xs text-muted-foreground">{investment.symbol}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{formatCurrencyDetailed(investment.totalValue)}</p>
                        <div className="flex items-center gap-1">
                          {investment.gain >= 0 ? (
                            <IconTrendingUp className="w-3 h-3 text-green-600" />
                          ) : (
                            <IconTrendingDown className="w-3 h-3 text-red-600" />
                          )}
                          <p className={`text-xs ${investment.gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {investment.gainPercent > 0 ? '+' : ''}{investment.gainPercent.toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="assets">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Assets</CardTitle>
                <CardDescription>Your cash, property, and valuables</CardDescription>
              </div>
              <Button onClick={() => setAssetDialogOpen(true)}>
                <IconPlus className="w-4 h-4" />
                Add Asset
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Current Value</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.assets.map((asset) => (
                    <TableRow key={asset.id}>
                      <TableCell className="font-medium">{asset.name}</TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(asset.category)}>
                          {asset.category.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono">{formatCurrencyDetailed(asset.currentValue)}</TableCell>
                      <TableCell>{asset.location || 'N/A'}</TableCell>
                      <TableCell>{formatDate(asset.lastUpdated)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="investments">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Investments</CardTitle>
                <CardDescription>Your portfolio and retirement accounts</CardDescription>
              </div>
              <Button>
                <IconPlus className="w-4 h-4" />
                Add Investment
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Current Value</TableHead>
                    <TableHead>Gain/Loss</TableHead>
                    <TableHead>Broker</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.investments.map((investment) => {
                    const gain = investment.totalValue - investment.costBasis;
                    const gainPercent = (gain / investment.costBasis) * 100;
                    
                    return (
                      <TableRow key={investment.id}>
                        <TableCell className="font-medium">
                          <div>
                            {investment.name}
                            {investment.symbol && (
                              <div className="text-sm text-muted-foreground">{investment.symbol}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getCategoryColor(investment.category)}>
                            {investment.category.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono">{formatCurrencyDetailed(investment.totalValue)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {gain >= 0 ? (
                              <IconTrendingUp className="w-4 h-4 text-green-600" />
                            ) : (
                              <IconTrendingDown className="w-4 h-4 text-red-600" />
                            )}
                            <span className={`font-mono ${gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {formatCurrencyDetailed(gain)} ({gainPercent > 0 ? '+' : ''}{gainPercent.toFixed(1)}%)
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{investment.broker}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Expenses</CardTitle>
                <CardDescription>Your spending and recurring payments</CardDescription>
              </div>
              <Button>
                <IconPlus className="w-4 h-4" />
                Add Expense
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell className="font-medium">{expense.name}</TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(expense.category)}>
                          {expense.category.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono">{formatCurrencyDetailed(expense.amount)}</TableCell>
                      <TableCell>
                        {expense.isRecurring ? (
                          <Badge variant="outline">
                            {expense.recurringFrequency?.replace('_', ' ')}
                          </Badge>
                        ) : (
                          <Badge variant="secondary">One-time</Badge>
                        )}
                      </TableCell>
                      <TableCell>{formatDate(expense.date)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Income</CardTitle>
                <CardDescription>Your earnings and revenue streams</CardDescription>
              </div>
              <Button onClick={() => setIncomeDialogOpen(true)}>
                <IconPlus className="w-4 h-4" />
                Add Income
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Source</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>After Tax</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.income.map((income) => (
                    <TableRow key={income.id}>
                      <TableCell className="font-medium">{income.source}</TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(income.category)}>
                          {income.category.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono">{formatCurrencyDetailed(income.amount)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {income.frequency.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {income.isAfterTax ? (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            After Tax
                          </Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                            Pre-Tax
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Dialogs */}
      <AddExpenseDialog 
        open={expenseDialogOpen} 
        onOpenChange={setExpenseDialogOpen} 
      />
      <AddAssetDialog 
        open={assetDialogOpen} 
        onOpenChange={setAssetDialogOpen} 
      />
      <AddIncomeDialog 
        open={incomeDialogOpen} 
        onOpenChange={setIncomeDialogOpen} 
      />
    </div>
  )
}