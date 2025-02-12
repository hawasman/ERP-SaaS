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

const inventory = [
  {
    id: 1,
    name: "Laptop Pro X1",
    category: "Electronics",
    quantity: 45,
    price: 1299.99,
    status: "In Stock",
  },
  {
    id: 2,
    name: "Office Chair Deluxe",
    category: "Furniture",
    quantity: 12,
    price: 299.99,
    status: "Low Stock",
  },
  {
    id: 3,
    name: "Wireless Mouse",
    category: "Accessories",
    quantity: 150,
    price: 49.99,
    status: "In Stock",
  },
  {
    id: 4,
    name: "Standing Desk",
    category: "Furniture",
    quantity: 0,
    price: 599.99,
    status: "Out of Stock",
  },
];


export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Inventory</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Items', value: '207' },
          { label: 'Low Stock Items', value: '12' },
          { label: 'Out of Stock', value: '3' },
          { label: 'Categories', value: '8' },
        ].map((stat) => (
          <Card key={stat.label} className="p-6">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search inventory..." className="pl-8" />
          </div>
          <Button variant="outline">Categories</Button>
          <Button variant="outline">Filters</Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button variant="ghost" className="p-0 h-8 font-medium">
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Category</TableHead>
                <TableHead>
                  <Button variant="ghost" className="p-0 h-8 font-medium">
                    Quantity
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" className="p-0 h-8 font-medium">
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === 'In Stock'
                      ? 'bg-green-100 text-green-800'
                      : item.status === 'Low Stock'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                      }`}>
                      {item.status}
                    </span>
                  </TableCell>
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
                        <DropdownMenuItem>Update Stock</DropdownMenuItem>
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