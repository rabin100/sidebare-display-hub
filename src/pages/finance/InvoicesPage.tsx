
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  Download, 
  Search, 
  Plus, 
  Filter, 
  ChevronDown,
  Eye,
  Mail
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const invoices = [
  {
    id: 'INV-001',
    customer: 'TechCorp Inc.',
    amount: 1250.99,
    date: '2023-11-15',
    status: 'paid',
    email: 'billing@techcorp.com'
  },
  {
    id: 'INV-002',
    customer: 'Global Services LLC',
    amount: 850.50,
    date: '2023-11-10',
    status: 'pending',
    email: 'accounts@globalservices.com'
  },
  {
    id: 'INV-003',
    customer: 'Retail Solutions',
    amount: 3450.00,
    date: '2023-11-05',
    status: 'paid',
    email: 'finance@retailsolutions.com'
  },
  {
    id: 'INV-004',
    customer: 'Creative Design Studio',
    amount: 1200.00,
    date: '2023-11-01',
    status: 'overdue',
    email: 'billing@creativedesign.com'
  },
  {
    id: 'INV-005',
    customer: 'Health Innovations',
    amount: 5750.25,
    date: '2023-10-25',
    status: 'paid',
    email: 'accounts@healthinnovations.com'
  },
  {
    id: 'INV-006',
    customer: 'Education First',
    amount: 2100.00,
    date: '2023-10-20',
    status: 'draft',
    email: 'finance@educationfirst.org'
  },
  {
    id: 'INV-007',
    customer: 'Construction Partners',
    amount: 8900.75,
    date: '2023-10-15',
    status: 'paid',
    email: 'billing@constructionpartners.com'
  },
  {
    id: 'INV-008',
    customer: 'Food Delivery Inc',
    amount: 750.50,
    date: '2023-10-10',
    status: 'pending',
    email: 'accounts@fooddelivery.com'
  }
];

const statusColors = {
  paid: "bg-green-100 text-green-800 hover:bg-green-100",
  pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  overdue: "bg-red-100 text-red-800 hover:bg-red-100",
  draft: "bg-gray-100 text-gray-800 hover:bg-gray-100"
};

const InvoicesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredInvoices = invoices.filter(invoice => 
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Invoices</h1>
          <p className="text-muted-foreground">Manage and track your customer invoices</p>
        </div>
        
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Invoice
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>All Invoices</CardTitle>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input 
                  placeholder="Search invoices..." 
                  className="pl-9 w-full sm:w-[240px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>All Invoices</DropdownMenuItem>
                  <DropdownMenuItem>Paid</DropdownMenuItem>
                  <DropdownMenuItem>Pending</DropdownMenuItem>
                  <DropdownMenuItem>Overdue</DropdownMenuItem>
                  <DropdownMenuItem>Draft</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.customer}</TableCell>
                    <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                    <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={statusColors[invoice.status as keyof typeof statusColors]}
                      >
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredInvoices.length === 0 && (
            <div className="py-24 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-semibold">No invoices found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoicesPage;
