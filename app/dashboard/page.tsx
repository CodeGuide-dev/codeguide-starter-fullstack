"use client";

import { FinanceSummaryCards } from "@/components/finance-summary-cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Landmark, TrendingUp, Wallet, DollarSign } from "lucide-react";
import { FinanceFormModal } from "@/components/finance-form-modal";

export default function Page() {
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
                  <div className="text-center text-muted-foreground py-8">
                    <p>No assets added yet</p>
                    <FinanceFormModal
                      type="asset"
                      trigger={
                        <Button variant="outline" size="sm" className="mt-2">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Asset
                        </Button>
                      }
                      onSubmit={async () => {}}
                    />
                  </div>
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
                  <div className="text-center text-muted-foreground py-8">
                    <p>No investments added yet</p>
                    <FinanceFormModal
                      type="investment"
                      trigger={
                        <Button variant="outline" size="sm" className="mt-2">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Investment
                        </Button>
                      }
                      onSubmit={async () => {}}
                    />
                  </div>
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
                  <div className="text-center text-muted-foreground py-8">
                    <p>No expenses added yet</p>
                    <FinanceFormModal
                      type="expense"
                      trigger={
                        <Button variant="outline" size="sm" className="mt-2">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Expense
                        </Button>
                      }
                      onSubmit={async () => {}}
                    />
                  </div>
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
                  <div className="text-center text-muted-foreground py-8">
                    <p>No income records added yet</p>
                    <FinanceFormModal
                      type="income"
                      trigger={
                        <Button variant="outline" size="sm" className="mt-2">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Income
                        </Button>
                      }
                      onSubmit={async () => {}}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Individual Category Tabs */}
          <TabsContent value="assets">
            <Card>
              <CardHeader>
                <CardTitle>Assets Management</CardTitle>
                <CardDescription>
                  Manage your assets including real estate, vehicles, and valuables
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground py-12">
                  <p>Assets management interface coming soon</p>
                  <FinanceFormModal
                    type="asset"
                    trigger={
                      <Button className="mt-4">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Asset
                      </Button>
                    }
                    onSubmit={async () => {}}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="investments">
            <Card>
              <CardHeader>
                <CardTitle>Investments Management</CardTitle>
                <CardDescription>
                  Manage your investment portfolio including stocks, bonds, and crypto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground py-12">
                  <p>Investments management interface coming soon</p>
                  <FinanceFormModal
                    type="investment"
                    trigger={
                      <Button className="mt-4">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Investment
                      </Button>
                    }
                    onSubmit={async () => {}}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expenses">
            <Card>
              <CardHeader>
                <CardTitle>Expenses Management</CardTitle>
                <CardDescription>
                  Track and categorize your spending habits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground py-12">
                  <p>Expenses management interface coming soon</p>
                  <FinanceFormModal
                    type="expense"
                    trigger={
                      <Button className="mt-4">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Expense
                      </Button>
                    }
                    onSubmit={async () => {}}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="income">
            <Card>
              <CardHeader>
                <CardTitle>Income Management</CardTitle>
                <CardDescription>
                  Track your income sources and earnings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground py-12">
                  <p>Income management interface coming soon</p>
                  <FinanceFormModal
                    type="income"
                    trigger={
                      <Button className="mt-4">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Income
                      </Button>
                    }
                    onSubmit={async () => {}}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}