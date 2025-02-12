"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { MoreVertical, Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { useForm } from "react-hook-form";
import type * as z from "zod";
import ViewEmployeeDialog, { useViewEmployeeDialogState } from "~/app/_components/employees/view-dialog";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { EmployeeInsertSchema } from "~/server/db/schema/employees";
import { api } from "~/trpc/react";



function AddEmployeeDialog({ onSuccess, onError }: { onSuccess: () => void, onError: () => void }) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof EmployeeInsertSchema>>({
    resolver: zodResolver(EmployeeInsertSchema),
    defaultValues: {
      name: "",
      position: "",
      department: "",
      status: "Active",
      joinDate: new Date().toISOString().split('T')[0],
      salary: 0,
    },
  });

  const createEmployee = api.Employee.create.useMutation(
    {
      onSuccess: async () => {
        onSuccess();
        form.reset();
        form.setFocus('name');
        setOpen(false);
      },
      onError: async (error) => {
        console.log(error)
      }
    }
  )

  function onSubmit(values: z.infer<typeof EmployeeInsertSchema>) {
    try {
      createEmployee.mutate(values)
    } catch (error) {
      console.log(error);
      onError();
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Employee</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="OnLeave">On Leave</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="joinDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Join Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Add Employee</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default function EmployeesPage() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const utils = api.useUtils();
  const [employees] = api.Employee.getAll.useSuspenseQuery();
  const { isOpen, toggleModal, data, setData } = useViewEmployeeDialogState();

  const filteredEmployees = employees?.filter(employee => employee?.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center ">
        <h2 className="text-3xl font-bold">Employees</h2>
        <AddEmployeeDialog onSuccess={() => utils.Employee.invalidate()} onError={() => console.log('success')} />
      </div>

      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search employees..." className="pl-8" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <Button variant="outline">Filters</Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees?.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${employee.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                      }`}>
                      {employee.status}
                    </span>
                  </TableCell>
                  <TableCell>{employee.joinDate}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {
                          setData(employee);
                          toggleModal();
                          console.log(isOpen);

                        }}>View Details</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/dashboard/employee/edit/${employee.id}`)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                      {data && <ViewEmployeeDialog data={data} isOpen={isOpen} toggleModal={toggleModal} />}
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