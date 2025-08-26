import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const transactions = [
  {
    id: "TRX001",
    type: "income",
    description: "Monthly Salary",
    amount: 5000.00,
    category: "Salary",
    date: "2024-01-15",
    status: "completed"
  },
  {
    id: "TRX002",
    type: "expense",
    description: "Grocery Shopping",
    amount: -125.50,
    category: "Food",
    date: "2024-01-14",
    status: "completed"
  },
  {
    id: "TRX003",
    type: "expense",
    description: "Electric Bill",
    amount: -89.75,
    category: "Utilities",
    date: "2024-01-13",
    status: "completed"
  },
  {
    id: "TRX004",
    type: "income",
    description: "Stock Dividend",
    amount: 234.50,
    category: "Investment",
    date: "2024-01-12",
    status: "completed"
  },
  {
    id: "TRX005",
    type: "expense",
    description: "Netflix Subscription",
    amount: -15.99,
    category: "Entertainment",
    date: "2024-01-11",
    status: "completed"
  }
]

export function RecentTransactions() {
  return (
    <Card className="px-4 lg:px-6">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>
          Your latest financial activities and transactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.description}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell className={transaction.amount > 0 ? "text-green-600" : "text-red-600"}>
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </TableCell>
                <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge variant={transaction.status === "completed" ? "default" : "secondary"}>
                    {transaction.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}