
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  PlusCircle, 
  Search, 
  Filter, 
  ChevronDown, 
  Edit, 
  Trash2,
  Receipt,
  FileText,
  PieChart
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface Expense {
  id: string;
  date: string;
  category: string;
  vendor: string;
  amount: number;
  status: 'approved' | 'pending' | 'rejected';
  paymentMethod: string;
}

const expenses: Expense[] = [
  {
    id: 'EXP-001',
    date: '2023-11-05',
    category: 'Office Supplies',
    vendor: 'Office Depot',
    amount: 145.99,
    status: 'approved',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'EXP-002',
    date: '2023-11-10',
    category: 'Travel',
    vendor: 'Delta Airlines',
    amount: 450.00,
    status: 'approved',
    paymentMethod: 'Corporate Card'
  },
  {
    id: 'EXP-003',
    date: '2023-11-12',
    category: 'Utilities',
    vendor: 'Electric Company',
    amount: 210.75,
    status: 'approved',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: 'EXP-004',
    date: '2023-11-15',
    category: 'Software',
    vendor: 'Adobe',
    amount: 59.99,
    status: 'approved',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'EXP-005',
    date: '2023-11-18',
    category: 'Marketing',
    vendor: 'Facebook Ads',
    amount: 320.00,
    status: 'pending',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'EXP-006',
    date: '2023-11-20',
    category: 'Meals',
    vendor: 'Client Dinner',
    amount: 185.50,
    status: 'pending',
    paymentMethod: 'Cash'
  },
  {
    id: 'EXP-007',
    date: '2023-11-22',
    category: 'Equipment',
    vendor: 'Dell Computers',
    amount: 1250.00,
    status: 'rejected',
    paymentMethod: 'Purchase Order'
  },
  {
    id: 'EXP-008',
    date: '2023-11-25',
    category: 'Rent',
    vendor: 'Office Space Inc',
    amount: 3500.00,
    status: 'approved',
    paymentMethod: 'Bank Transfer'
  }
];

const statusColors = {
  approved: "bg-green-100 text-green-800 hover:bg-green-100",
  pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  rejected: "bg-red-100 text-red-800 hover:bg-red-100"
};

const ExpensesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  
  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          expense.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    return matchesSearch && expense.status === filter;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Expenses</h1>
          <p className="text-muted-foreground">Track and manage all your business expenses</p>
        </div>
        
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Expense
        </Button>
      </div>
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Expenses (This Month)</CardDescription>
            <CardTitle className="text-2xl">$6,122.23</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-red-600">
              <span>+12.5% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending Approvals</CardDescription>
            <CardTitle className="text-2xl">2</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>$505.50 total pending</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Top Expense Category</CardDescription>
            <CardTitle className="text-2xl">Rent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>57.2% of total expenses</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="list">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <TabsList>
            <TabsTrigger value="list" className="gap-2">
              <FileText className="h-4 w-4" /> List View
            </TabsTrigger>
            <TabsTrigger value="categories" className="gap-2">
              <PieChart className="h-4 w-4" /> Categories
            </TabsTrigger>
          </TabsList>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="Search expenses..." 
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
              <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilter('all')}>
                  All Expenses
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('approved')}>
                  Approved
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('pending')}>
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('rejected')}>
                  Rejected
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <TabsContent value="list">
          <Card>
            <CardContent className="p-0">
              <div className="relative overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredExpenses.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell className="font-medium">{expense.id}</TableCell>
                        <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                        <TableCell>{expense.category}</TableCell>
                        <TableCell>{expense.vendor}</TableCell>
                        <TableCell>${expense.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={statusColors[expense.status]}
                          >
                            {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{expense.paymentMethod}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Receipt className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {filteredExpenses.length === 0 && (
                <div className="py-24 text-center">
                  <Receipt className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-semibold">No expenses found</h3>
                  <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Expense by Category</CardTitle>
              <CardDescription>Breakdown of expenses by category</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <PieChart 
                data={[
                  { name: 'Rent', value: 3500 },
                  { name: 'Travel', value: 450 },
                  { name: 'Utilities', value: 210.75 },
                  { name: 'Office Supplies', value: 145.99 },
                  { name: 'Software', value: 59.99 },
                  { name: 'Marketing', value: 320 },
                  { name: 'Meals', value: 185.5 },
                  { name: 'Equipment', value: 1250 }
                ]}
                index="name"
                categories={["value"]}
                valueFormatter={(value) => `$${value.toLocaleString()}`}
                colors={["#4f46e5", "#60a5fa", "#e879f9", "#fbbf24", "#34d399", "#f43f5e", "#94a3b8", "#a3e635"]}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExpensesPage;
