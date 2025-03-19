
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  FileText, 
  Eye, 
  ArrowDownAZ,
  CalendarRange,
  Download,
  Filter
} from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

interface Order {
  id: string;
  date: string;
  items: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
}

const OrderHistoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<{
    from?: Date;
    to?: Date;
  }>({});
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Sample order history data
  const orders: Order[] = [
    {
      id: "ORD-1234",
      date: "2023-06-15",
      items: 1,
      total: 129.99,
      status: "delivered",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-1235",
      date: "2023-06-02",
      items: 2,
      total: 289.98,
      status: "delivered",
      paymentMethod: "PayPal",
    },
    {
      id: "ORD-1236",
      date: "2023-05-28",
      items: 1,
      total: 79.99,
      status: "delivered",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-1237",
      date: "2023-05-20",
      items: 1,
      total: 129.99,
      status: "cancelled",
      paymentMethod: "Bank Transfer",
    },
    {
      id: "ORD-1238",
      date: "2023-05-10",
      items: 3,
      total: 349.97,
      status: "delivered",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-1239",
      date: "2023-04-25",
      items: 2,
      total: 159.98,
      status: "delivered",
      paymentMethod: "PayPal",
    },
    {
      id: "ORD-1240",
      date: "2023-04-15",
      items: 1,
      total: 49.99,
      status: "delivered",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-1241",
      date: "2023-04-05",
      items: 4,
      total: 399.96,
      status: "delivered",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-1242",
      date: "2023-03-20",
      items: 1,
      total: 199.99,
      status: "delivered",
      paymentMethod: "PayPal",
    },
  ];

  // Filter orders
  let filteredOrders = [...orders];
  
  // Apply search filter
  if (searchTerm) {
    filteredOrders = filteredOrders.filter(order => 
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  // Apply status filter
  if (statusFilter !== 'all') {
    filteredOrders = filteredOrders.filter(order => order.status === statusFilter);
  }
  
  // Apply date range filter
  if (dateRange.from) {
    const fromDate = new Date(dateRange.from);
    fromDate.setHours(0, 0, 0, 0);
    
    filteredOrders = filteredOrders.filter(order => {
      const orderDate = new Date(order.date);
      orderDate.setHours(0, 0, 0, 0);
      return orderDate >= fromDate;
    });
  }
  
  if (dateRange.to) {
    const toDate = new Date(dateRange.to);
    toDate.setHours(23, 59, 59, 999);
    
    filteredOrders = filteredOrders.filter(order => {
      const orderDate = new Date(order.date);
      orderDate.setHours(0, 0, 0, 0);
      return orderDate <= toDate;
    });
  }
  
  // Apply sorting
  filteredOrders.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const handleExportHistory = () => {
    console.log('Exporting order history...');
    // In a real app, you'd implement CSV or PDF export functionality here
    alert('Order history export started. Your file will be ready to download shortly.');
  };
  
  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setDateRange({});
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const getStatusBadge = (status: Order['status']) => {
    const statusStyles = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    
    return (
      <Badge className={statusStyles[status]} variant="outline">
        <span className="capitalize">{status}</span>
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Order History</h1>
          <p className="text-muted-foreground">View your complete order history</p>
        </div>
        
        <Button onClick={handleExportHistory}>
          <Download className="mr-2 h-4 w-4" />
          Export History
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Filter & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex w-full items-center space-x-2">
              <Input
                type="search"
                placeholder="Search by order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit" variant="secondary" className="shrink-0">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
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
                  selected={dateRange}
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
          <CardTitle>Order History</CardTitle>
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
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>{order.paymentMethod}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Link to={`/customer/orders/${order.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4" />
                          <span className="sr-only">Invoice</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="bg-muted rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Order Status Guide</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { status: 'pending', label: 'Pending', description: 'Order received, awaiting payment confirmation' },
            { status: 'processing', label: 'Processing', description: 'Payment confirmed, preparing your order' },
            { status: 'shipped', label: 'Shipped', description: 'Order has been shipped and is on its way' },
            { status: 'delivered', label: 'Delivered', description: 'Order has been delivered successfully' },
            { status: 'cancelled', label: 'Cancelled', description: 'Order has been cancelled' },
          ].map((item) => (
            <div key={item.status} className="flex flex-col items-center text-center">
              <Badge className={`mb-2 ${
                item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                item.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                item.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                item.status === 'delivered' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`} variant="outline">
                <span className="capitalize">{item.label}</span>
              </Badge>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
