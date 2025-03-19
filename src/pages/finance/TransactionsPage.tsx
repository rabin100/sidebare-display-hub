
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
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Download, 
  FileText, 
  Search, 
  Filter, 
  ArrowDownAZ, 
  CalendarRange, 
  CreditCard,
  Wallet,
  RefreshCw
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';

interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'sale' | 'refund' | 'payout' | 'expense';
  customer: string;
  method: string;
  reference: string;
  status: 'completed' | 'pending' | 'failed';
}

const TransactionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to?: Date }>({
    from: undefined
  });
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  const transactions: Transaction[] = [
    {
      id: "TX-1234",
      date: "2023-10-25",
      amount: 129.99,
      type: "sale",
      customer: "John Smith",
      method: "Credit Card",
      reference: "ORD-7890",
      status: "completed",
    },
    {
      id: "TX-1235",
      date: "2023-10-24",
      amount: 275.50,
      type: "sale",
      customer: "Emily Johnson",
      method: "PayPal",
      reference: "ORD-7891",
      status: "completed",
    },
    {
      id: "TX-1236",
      date: "2023-10-24",
      amount: 89.99,
      type: "sale",
      customer: "Michael Brown",
      method: "Credit Card",
      reference: "ORD-7892",
      status: "completed",
    },
    {
      id: "TX-1237",
      date: "2023-10-23",
      amount: 324.75,
      type: "refund",
      customer: "Jennifer Lee",
      method: "Bank Transfer",
      reference: "ORD-7880",
      status: "completed",
    },
    {
      id: "TX-1238",
      date: "2023-10-23",
      amount: 199.99,
      type: "sale",
      customer: "David Williams",
      method: "Credit Card",
      reference: "ORD-7893",
      status: "completed",
    },
    {
      id: "TX-1239",
      date: "2023-10-22",
      amount: 1500.00,
      type: "payout",
      customer: "Vendor Services Inc",
      method: "Bank Transfer",
      reference: "PAY-001",
      status: "completed",
    },
    {
      id: "TX-1240",
      date: "2023-10-21",
      amount: 149.99,
      type: "sale",
      customer: "Sarah Johnson",
      method: "Credit Card",
      reference: "ORD-7894",
      status: "completed",
    },
    {
      id: "TX-1241",
      date: "2023-10-21",
      amount: 350.25,
      type: "expense",
      customer: "Office Supplies Co",
      method: "Credit Card",
      reference: "EXP-110",
      status: "completed",
    },
    {
      id: "TX-1242",
      date: "2023-10-20",
      amount: 99.99,
      type: "sale",
      customer: "Robert Miller",
      method: "PayPal",
      reference: "ORD-7895",
      status: "pending",
    },
    {
      id: "TX-1243",
      date: "2023-10-20",
      amount: 75.50,
      type: "sale",
      customer: "Jessica Davis",
      method: "Credit Card",
      reference: "ORD-7896",
      status: "failed",
    },
    {
      id: "TX-1244",
      date: "2023-10-19",
      amount: 120.00,
      type: "refund",
      customer: "Thomas Anderson",
      method: "Credit Card",
      reference: "ORD-7870",
      status: "completed",
    },
    {
      id: "TX-1245",
      date: "2023-10-19",
      amount: 499.99,
      type: "sale",
      customer: "Lisa Wilson",
      method: "Bank Transfer",
      reference: "ORD-7897",
      status: "completed",
    },
    {
      id: "TX-1246",
      date: "2023-10-18",
      amount: 2000.00,
      type: "payout",
      customer: "Marketing Agency Ltd",
      method: "Bank Transfer",
      reference: "PAY-002",
      status: "pending",
    },
  ];

  let filteredTransactions = [...transactions];
  
  if (searchTerm) {
    filteredTransactions = filteredTransactions.filter(transaction => 
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  if (typeFilter !== 'all') {
    filteredTransactions = filteredTransactions.filter(transaction => transaction.type === typeFilter);
  }
  
  if (statusFilter !== 'all') {
    filteredTransactions = filteredTransactions.filter(transaction => transaction.status === statusFilter);
  }
  
  if (dateRange.from) {
    const fromDate = new Date(dateRange.from);
    fromDate.setHours(0, 0, 0, 0);
    
    filteredTransactions = filteredTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      transactionDate.setHours(0, 0, 0, 0);
      return transactionDate >= fromDate;
    });
  }
  
  if (dateRange.to) {
    const toDate = new Date(dateRange.to);
    toDate.setHours(23, 59, 59, 999);
    
    filteredTransactions = filteredTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      transactionDate.setHours(0, 0, 0, 0);
      return transactionDate <= toDate;
    });
  }
  
  filteredTransactions.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const handleExportTransactions = () => {
    console.log('Exporting transactions...');
    alert('Transaction export started. Your file will be ready to download shortly.');
  };
  
  const handleClearFilters = () => {
    setSearchTerm('');
    setTypeFilter('all');
    setStatusFilter('all');
    setDateRange({ from: undefined });
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const getTypeIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'sale':
        return <ArrowUpRight className="h-4 w-4 text-green-600" />;
      case 'refund':
        return <ArrowDownRight className="h-4 w-4 text-red-600" />;
      case 'payout':
        return <ArrowDownRight className="h-4 w-4 text-orange-600" />;
      case 'expense':
        return <ArrowDownRight className="h-4 w-4 text-purple-600" />;
      default:
        return null;
    }
  };
  
  const getTypeLabel = (type: Transaction['type']) => {
    switch (type) {
      case 'sale':
        return <Badge className="bg-green-100 text-green-800">Sale</Badge>;
      case 'refund':
        return <Badge className="bg-red-100 text-red-800">Refund</Badge>;
      case 'payout':
        return <Badge className="bg-orange-100 text-orange-800">Payout</Badge>;
      case 'expense':
        return <Badge className="bg-purple-100 text-purple-800">Expense</Badge>;
      default:
        return null;
    }
  };
  
  const getStatusBadge = (status: Transaction['status']) => {
    const statusStyles = {
      pending: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
    };
    
    return (
      <Badge className={statusStyles[status]} variant="outline">
        <span className="capitalize">{status}</span>
      </Badge>
    );
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'Credit Card':
        return <CreditCard className="h-4 w-4" />;
      case 'PayPal':
        return <Wallet className="h-4 w-4" />;
      case 'Bank Transfer':
        return <FileText className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">Manage and view all financial transactions</p>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={handleExportTransactions}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Filter Transactions</CardTitle>
          <CardDescription>Narrow down results by searching or filtering</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex w-full items-center space-x-2">
              <Input
                type="search"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" variant="secondary" className="shrink-0">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="sale">Sales</SelectItem>
                <SelectItem value="refund">Refunds</SelectItem>
                <SelectItem value="payout">Payouts</SelectItem>
                <SelectItem value="expense">Expenses</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full sm:w-[240px] justify-start text-left font-normal">
                  <CalendarRange className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    "Select date range"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  selected={dateRange.from ? dateRange : undefined}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            
            <Button variant="outline" onClick={handleClearFilters} className="shrink-0">
              <Filter className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center">
          <CardTitle>Transaction History</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleSortOrder}
            className="ml-auto"
          >
            <ArrowDownAZ className="h-4 w-4 mr-2" />
            {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Customer/Vendor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(transaction.type)}
                        {getTypeLabel(transaction.type)}
                      </div>
                    </TableCell>
                    <TableCell>{transaction.customer}</TableCell>
                    <TableCell className={
                      transaction.type === 'sale' ? 'text-green-600 font-medium' : 
                      'text-red-600 font-medium'
                    }>
                      {transaction.type === 'sale' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getPaymentMethodIcon(transaction.method)}
                        <span>{transaction.method}</span>
                      </div>
                    </TableCell>
                    <TableCell>{transaction.reference}</TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Transaction Summary</CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total Sales</span>
                <span className="font-semibold text-green-600">+$5,245.50</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span>Total Refunds</span>
                <span className="font-semibold text-red-600">-$445.00</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span>Total Expenses</span>
                <span className="font-semibold text-red-600">-$1,350.25</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span>Net Revenue</span>
                <span className="font-bold">$3,450.25</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Distribution by payment type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-blue-500" />
                  <span>Credit Card</span>
                </div>
                <span>65%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-yellow-500" />
                  <span>PayPal</span>
                </div>
                <span>23%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-green-500" />
                  <span>Bank Transfer</span>
                </div>
                <span>12%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Transaction Status</CardTitle>
            <CardDescription>Overview of transaction outcomes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  <span>Completed</span>
                </div>
                <span>92%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  <span>Pending</span>
                </div>
                <span>5%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span>Failed</span>
                </div>
                <span>3%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TransactionsPage;
