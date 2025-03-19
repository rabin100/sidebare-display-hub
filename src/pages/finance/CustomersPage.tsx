
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Search, 
  UserPlus, 
  ChevronDown, 
  Filter, 
  BarChart, 
  ExternalLink,
  Mail,
  Phone,
  DollarSign,
  Building,
  MoreVertical
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  totalSpent: number;
  status: 'active' | 'inactive' | 'pending';
  lastInvoice: string;
  country: string;
}

const customers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'Jane Cooper',
    company: 'TechCorp Inc.',
    email: 'jane@techcorp.com',
    phone: '(555) 123-4567',
    totalSpent: 12450.80,
    status: 'active',
    lastInvoice: '2023-11-08',
    country: 'United States'
  },
  {
    id: 'CUST-002',
    name: 'Robert Fox',
    company: 'Global Services LLC',
    email: 'robert@globalservices.com',
    phone: '(555) 234-5678',
    totalSpent: 8320.50,
    status: 'active',
    lastInvoice: '2023-11-02',
    country: 'Canada'
  },
  {
    id: 'CUST-003',
    name: 'Esther Howard',
    company: 'Retail Solutions',
    email: 'esther@retailsolutions.com',
    phone: '(555) 345-6789',
    totalSpent: 15680.25,
    status: 'inactive',
    lastInvoice: '2023-10-15',
    country: 'United Kingdom'
  },
  {
    id: 'CUST-004',
    name: 'Darlene Robertson',
    company: 'Creative Design Studio',
    email: 'darlene@creativedesign.com',
    phone: '(555) 456-7890',
    totalSpent: 5750.00,
    status: 'active',
    lastInvoice: '2023-10-28',
    country: 'Australia'
  },
  {
    id: 'CUST-005',
    name: 'Leslie Alexander',
    company: 'Health Innovations',
    email: 'leslie@healthinnovations.com',
    phone: '(555) 567-8901',
    totalSpent: 9320.75,
    status: 'active',
    lastInvoice: '2023-11-05',
    country: 'Germany'
  },
  {
    id: 'CUST-006',
    name: 'Jacob Jones',
    company: 'Education First',
    email: 'jacob@educationfirst.org',
    phone: '(555) 678-9012',
    totalSpent: 3150.40,
    status: 'pending',
    lastInvoice: '2023-11-10',
    country: 'France'
  },
  {
    id: 'CUST-007',
    name: 'Jenny Wilson',
    company: 'Construction Partners',
    email: 'jenny@constructionpartners.com',
    phone: '(555) 789-0123',
    totalSpent: 18250.00,
    status: 'active',
    lastInvoice: '2023-11-01',
    country: 'United States'
  },
  {
    id: 'CUST-008',
    name: 'Guy Hawkins',
    company: 'Food Delivery Inc',
    email: 'guy@fooddelivery.com',
    phone: '(555) 890-1234',
    totalSpent: 2750.30,
    status: 'inactive',
    lastInvoice: '2023-09-22',
    country: 'Spain'
  }
];

const statusColors = {
  active: "bg-green-100 text-green-800 hover:bg-green-100",
  inactive: "bg-gray-100 text-gray-800 hover:bg-gray-100",
  pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
};

const CustomerDetailView: React.FC<{ customer: Customer }> = ({ customer }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Customer ID</p>
                <p className="font-medium">{customer.id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Company</p>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-gray-500" />
                  <p className="font-medium">{customer.company}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Contact</p>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <p>{customer.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <p>{customer.phone}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Location</p>
                <p>{customer.country}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Status</p>
                <Badge 
                  variant="outline" 
                  className={statusColors[customer.status]}
                >
                  {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:w-2/3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
              <CardDescription>Customer financial activity and metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Total Spent</p>
                  <p className="text-2xl font-bold">${customer.totalSpent.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Last Invoice</p>
                  <p className="text-2xl font-bold">{new Date(customer.lastInvoice).toLocaleDateString()}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="text-2xl font-bold">Credit Card</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Recent Activity</h3>
                <div className="space-y-2">
                  <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-medium">Invoice #INV-001</p>
                      <p className="text-sm text-gray-500">{new Date(customer.lastInvoice).toLocaleDateString()}</p>
                    </div>
                    <p className="font-medium">${(customer.totalSpent * 0.2).toFixed(2)}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-medium">Invoice #INV-002</p>
                      <p className="text-sm text-gray-500">{new Date('2023-10-15').toLocaleDateString()}</p>
                    </div>
                    <p className="font-medium">${(customer.totalSpent * 0.35).toFixed(2)}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-medium">Invoice #INV-003</p>
                      <p className="text-sm text-gray-500">{new Date('2023-09-22').toLocaleDateString()}</p>
                    </div>
                    <p className="font-medium">${(customer.totalSpent * 0.45).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Tabs defaultValue="invoices">
        <TabsList className="w-full grid grid-cols-4">
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="invoices" className="pt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>INV-001</TableCell>
                    <TableCell>{new Date(customer.lastInvoice).toLocaleDateString()}</TableCell>
                    <TableCell>${(customer.totalSpent * 0.2).toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusColors.active}>Paid</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>INV-002</TableCell>
                    <TableCell>{new Date('2023-10-15').toLocaleDateString()}</TableCell>
                    <TableCell>${(customer.totalSpent * 0.35).toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusColors.active}>Paid</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>INV-003</TableCell>
                    <TableCell>{new Date('2023-09-22').toLocaleDateString()}</TableCell>
                    <TableCell>${(customer.totalSpent * 0.45).toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusColors.active}>Paid</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="payments" className="pt-4">
          <Card>
            <CardContent className="py-6 text-center">
              <DollarSign className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="mt-4 text-lg font-medium">Payment History</h3>
              <p className="text-muted-foreground mt-2">All payments are up to date.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="communications" className="pt-4">
          <Card>
            <CardContent className="py-6 text-center">
              <Mail className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="mt-4 text-lg font-medium">Communications Log</h3>
              <p className="text-muted-foreground mt-2">No recent communications.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents" className="pt-4">
          <Card>
            <CardContent className="py-6 text-center">
              <Users className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="mt-4 text-lg font-medium">Documents</h3>
              <p className="text-muted-foreground mt-2">No documents found for this customer.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const CustomersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && customer.status === statusFilter;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Customers</h1>
          <p className="text-muted-foreground">Manage your customer accounts and billing</p>
        </div>
        
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add Customer
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Customer List</CardTitle>
              <CardDescription>Manage and view customer information</CardDescription>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input 
                  placeholder="Search customers..." 
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
                  <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                    All Customers
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('active')}>
                    Active
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('inactive')}>
                    Inactive
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('pending')}>
                    Pending
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="outline" className="gap-2">
                <BarChart className="h-4 w-4" />
                Reports
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Last Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.company}</TableCell>
                    <TableCell>${customer.totalSpent.toLocaleString()}</TableCell>
                    <TableCell>{new Date(customer.lastInvoice).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={statusColors[customer.status]}
                      >
                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedCustomer(customer)}>
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <span>{customer.name}</span>
                                <Badge 
                                  variant="outline" 
                                  className={statusColors[customer.status]}
                                >
                                  {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                                </Badge>
                              </DialogTitle>
                              <DialogDescription>{customer.company}</DialogDescription>
                            </DialogHeader>
                            
                            {selectedCustomer && <CustomerDetailView customer={selectedCustomer} />}
                          </DialogContent>
                        </Dialog>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Invoices
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredCustomers.length === 0 && (
            <div className="py-24 text-center">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-semibold">No customers found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomersPage;
