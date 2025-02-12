import { ArrowUpDown, MoreVertical, Plus, Search } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";

const expenseData = [
  { category: 'Office Supplies', amount: 2500 },
  { category: 'Marketing', amount: 5000 },
  { category: 'Utilities', amount: 1800 },
  { category: 'Rent', amount: 8000 },
  { category: 'Payroll', amount: 12000 },
  { category: 'Software', amount: 3000 },
];

const transactions = [
  {
    id: 1,
    description: "Office Rent Payment",
    type: "Expense",
    amount: 5000.00,
    category: "Rent",
    date: "2024-03-15",
  },
  {
    id: 2,
    description: "Client Payment - ABC Corp",
    type: "Income",
    amount: 12500.00,
    category: "Sales",
    date: "2024-03-14",
  },
  {
    id: 3,
    description: "Software Licenses",
    type: "Expense",
    amount: 2000.00,
    category: "Software",
    date: "2024-03-13",
  },
  {
    id: 4,
    description: "Utility Bills",
    type: "Expense",
    amount: 800.00,
    category: "Utilities",
    date: "2024-03-12",
  },
];

export default function FinancePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Finance</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Transaction
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: '$125,000', change: '+12.3%' },
          { label: 'Total Expenses', value: '$45,000', change: '-2.4%' },
          { label: 'Net Profit', value: '$80,000', change: '+15.8%' },
          { label: 'Pending Payments', value: '$12,500', status: '4 invoices' },
        ].map((stat) => (
          <Card key={stat.label} className="p-6">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
            <p className={`text-sm mt-2 ${stat.change?.startsWith('+') ? 'text-green-500' : 'text-red-500'
              }`}>
              {stat.change ?? stat.status}
            </p>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Expense Breakdown</h3>
        <div className="h-[300px]">
          {/* <ResponsiveContainer width="100%" height="100%">
            <BarChart data={expenseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer> */}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold">Recent Transactions</h3>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search transactions..." className="pl-8 w-[300px]" />
            </div>
            <Button variant="outline">Category</Button>
            <Button variant="outline">Date Range</Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>
                  <Button variant="ghost" className="p-0 h-8 font-medium">
                    Amount
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Category</TableHead>
                <TableHead>
                  <Button variant="ghost" className="p-0 h-8 font-medium">
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${transaction.type === 'Income'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                      }`}>
                      {transaction.type}
                    </span>
                  </TableCell>
                  <TableCell className={transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'}>
                    {transaction.type === 'Income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}