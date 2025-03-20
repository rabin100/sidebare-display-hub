
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  ShoppingBag, 
  Package, 
  Truck, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  CreditCard, 
  Eye, 
  FileText 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { getOrders, Order } from '@/utils/orderUtils';

const OrderStatusBadge: React.FC<{ status: Order['status'] }> = ({ status }) => {
  const statusConfig = {
    pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
    processing: { color: "bg-blue-100 text-blue-800", icon: Package },
    shipped: { color: "bg-purple-100 text-purple-800", icon: Truck },
    delivered: { color: "bg-green-100 text-green-800", icon: CheckCircle },
    cancelled: { color: "bg-red-100 text-red-800", icon: AlertCircle },
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <Badge className={`gap-1 ${config.color}`} variant="outline">
      <StatusIcon className="h-3.5 w-3.5" />
      <span className="capitalize">{status}</span>
    </Badge>
  );
};

const OrdersPage: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [orders, setOrders] = useState<Order[]>([]);
  
  useEffect(() => {
    // Get orders from localStorage
    const customerOrders = getOrders();
    setOrders(customerOrders);
  }, []);

  // Filter orders by search term
  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Filter orders by tab
  const filteredByTab = activeTab === 'all' 
    ? filteredOrders 
    : filteredOrders.filter(order => order.status === activeTab);

  const handleTrackOrder = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      toast({
        title: "Tracking Information",
        description: order.status === 'shipped' 
          ? `Your order is on the way. Expected delivery in 3-5 business days.`
          : `Your order is being processed and will ship soon.`,
      });
    } else {
      toast({
        title: "Tracking Unavailable",
        description: "Tracking information is not available for this order yet.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Orders</h1>
          <p className="text-muted-foreground">View and manage your orders</p>
        </div>
        
        <div className="flex w-full sm:w-auto items-center space-x-2">
          <Input
            type="search"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="sm:w-[300px]"
          />
          <Button type="submit" variant="secondary" className="shrink-0">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-6">
          {filteredByTab.length > 0 ? (
            filteredByTab.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-muted/50">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <CardTitle className="text-lg">{order.id}</CardTitle>
                      <CardDescription>Ordered on {order.date}</CardDescription>
                    </div>
                    <OrderStatusBadge status={order.status} />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-6 border-b">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 py-3">
                        <div className="h-16 w-16 rounded-md overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity} × ${(item.onSale ? item.salePrice : item.price)?.toFixed(2)}
                          </p>
                        </div>
                        <div className="text-right text-sm">
                          ${((item.onSale ? item.salePrice! : item.price) * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{order.paymentMethod}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:items-end">
                      <span className="text-sm text-muted-foreground">Total</span>
                      <span className="font-semibold text-lg">${order.total.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Link to={`/customer/orders/${order.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          Order Details
                        </Button>
                      </Link>
                      {(order.status === "shipped" || order.status === "processing") && (
                        <Button variant="outline" size="sm" onClick={() => handleTrackOrder(order.id)}>
                          <Truck className="mr-2 h-4 w-4" />
                          Track Order
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        Invoice
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="p-6 text-center">
              <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-3" />
              <p className="font-medium">No orders found</p>
              <p className="text-muted-foreground mb-6">
                {searchTerm ? "Try a different search term" : "You don't have any orders yet"}
              </p>
              <Link to="/products">
                <Button>Browse Products</Button>
              </Link>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrdersPage;
