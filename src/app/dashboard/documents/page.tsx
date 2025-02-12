import { Download, FileText, MoreVertical, Plus, Search } from "lucide-react";
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

const documents = [
  {
    id: 1,
    name: "Q4 Financial Report 2023",
    type: "PDF",
    size: "2.4 MB",
    owner: "John Doe",
    lastModified: "2024-03-15",
  },
  {
    id: 2,
    name: "Employee Handbook 2024",
    type: "DOCX",
    size: "1.8 MB",
    owner: "HR Department",
    lastModified: "2024-03-10",
  },
  {
    id: 3,
    name: "Project Proposal Template",
    type: "XLSX",
    size: "985 KB",
    owner: "Project Management",
    lastModified: "2024-03-08",
  },
  {
    id: 4,
    name: "Marketing Strategy 2024",
    type: "PPTX",
    size: "5.2 MB",
    owner: "Marketing Team",
    lastModified: "2024-03-05",
  },
];

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Documents</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Documents', value: '156' },
          { label: 'Recent Uploads', value: '12' },
          { label: 'Shared with me', value: '45' },
          { label: 'Storage Used', value: '75%' },
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
            <Input placeholder="Search documents..." className="pl-8" />
          </div>
          <Button variant="outline">File Type</Button>
          <Button variant="outline">Date Range</Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    {doc.name}
                  </TableCell>
                  <TableCell>{doc.type}</TableCell>
                  <TableCell>{doc.size}</TableCell>
                  <TableCell>{doc.owner}</TableCell>
                  <TableCell>{doc.lastModified}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View</DropdownMenuItem>
                          <DropdownMenuItem>Share</DropdownMenuItem>
                          <DropdownMenuItem>Rename</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
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