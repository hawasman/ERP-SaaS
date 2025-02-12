import { ArrowUpDown, MoreVertical, Plus, Search } from "lucide-react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
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

const salesData = [
    { month: 'Jan', sales: 4000 },
    { month: 'Feb', sales: 3000 },
    { month: 'Mar', sales: 5000 },
    { month: 'Apr', sales: 4500 },
    { month: 'May', sales: 6000 },
    { month: 'Jun', sales: 5500 },
];

const recentSales = [
    {
        id: 1,
        customer: "Acme Corp",
        amount: 12500.00,
        status: "Completed",
        date: "2024-03-15",
    },
    {
        id: 2,
        customer: "TechStart Inc",
        amount: 8750.00,
        status: "Pending",
        date: "2024-03-14",
    },
    {
        id: 3,
        customer: "Global Solutions",
        amount: 15000.00,
        status: "Completed",
        date: "2024-03-13",
    },
    {
        id: 4,
        customer: "Innovate LLC",
        amount: 6250.00,
        status: "Failed",
        date: "2024-03-12",
    },
];
export default function SalesPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Sales</h2>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Sale
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Revenue', value: '$45,231.89', change: '+20.1% from last month' },
                    { label: 'Sales Count', value: '145', change: '+12.5% from last month' },
                    { label: 'Average Order Value', value: '$312.24', change: '+5.4% from last month' },
                    { label: 'Conversion Rate', value: '3.2%', change: '+1.2% from last month' },
                ].map((stat) => (
                    <Card key={stat.label} className="p-6">
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold mt-2">{stat.value}</p>
                        <p className="text-sm text-green-500 mt-2">{stat.change}</p>
                    </Card>
                ))}
            </div>

            <Card className="p-6">
                <h3 className="font-semibold mb-4">Sales Overview</h3>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold">Recent Sales</h3>
                    <div className="flex gap-4">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search sales..." className="pl-8 w-[300px]" />
                        </div>
                        <Button variant="outline">Filter</Button>
                    </div>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>
                                    <Button variant="ghost" className="p-0 h-8 font-medium">
                                        Amount
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                                <TableHead>Status</TableHead>
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
                            {recentSales.map((sale) => <SaleRow key={sale.id} {...sale} />)}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    );
}

const SaleRow = ({ customer, amount, status, date }: {
    customer: string;
    amount: number;
    status: string;
    date: string;
}) => {
    return (
        <TableRow>
            <TableCell>{customer}</TableCell>
            <TableCell>${amount.toFixed(2)}</TableCell>
            <TableCell>
                <span className={
                    `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                    }`
                }>
                    {status}
                </span>
            </TableCell>
            <TableCell>{date}</TableCell>
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
                        <DropdownMenuItem>Download Invoice</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Cancel</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
};