
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Package, 
  ArrowLeft, 
  Truck, 
  Home, 
  CreditCard, 
  Calendar, 
  MessageCircle, 
  AlertTriangle,
  RefreshCw,
  Download,
  Check
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineDot,
  TimelineConnector,
  TimelineSeparator,
} from '@/components/timeline';

// Define the Order Timeline component
const OrderTimeline: React.FC<{ 
  events: { 
    date: string; 
    title: string; 
    description: string;
    status: 'completed' | 'current' | 'upcoming';
  }[] 
}> = ({ events }) => {
  return (
    <Timeline>
      {events.map((event, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot className={
              event.status === 'completed' ? 'bg-green-500' : 
              event.status === 'current' ? 'bg-blue-500' : 'bg-gray-300'
            }>
              {event.status === 'completed' && <Check className="h-4 w-4 text-white" />}
            </TimelineDot>
            {index < events.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <p className="font-medium">{event.title}</p>
            <p className="text-sm text-muted-foreground">{event.date}</p>
            <p className="text-sm">{event.description}</p>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

const OrderDetailsPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { toast } = useToast();
  
  // Mock order data (in a real app, fetch from backend)
  const order = {
    id: orderId || "ORD-1234",
    date: "2023-06-15 14:30",
    status: "shipped",
    statusText: "In Transit",
    estimatedDelivery: "June 25, 2023",
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      country: "USA",
    },
    paymentMethod: "Visa ending in 4242",
    items: [
      {
        id: "ITEM-1",
        name: "Wireless Headphones",
        quantity: 1,
        price: 129.99,
        image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      },
      {
        id: "ITEM-2",
        name: "Bluetooth Speaker",
        quantity: 1,
        price: 79.99,
        image: "https://images.unsplash.com/photo-1589003077984-894e133dabab",
      },
    ],
    subtotal: 209.98,
    shipping: 9.99,
    tax: 18.90,
    total: 238.87,
    timelineEvents: [
      {
        date: "June 15, 2023",
        title: "Order Placed",
        description: "Your order has been confirmed and is being processed.",
        status: "completed" as const,
      },
      {
        date: "June 16, 2023",
        title: "Order Processed",
        description: "Your order has been prepared for shipping.",
        status: "completed" as const,
      },
      {
        date: "June 18, 2023",
        title: "Order Shipped",
        description: "Your order is on the way. Tracking number: TRK-567890.",
        status: "current" as const,
      },
      {
        date: "June 25, 2023 (Estimated)",
        title: "Order Delivery",
        description: "Expected delivery to your shipping address.",
        status: "upcoming" as const,
      },
    ],
    trackingNumber: "TRK-567890",
    carrier: "FedEx",
  };
  
  const handleTrackOrder = () => {
    toast({
      title: "Tracking Information",
      description: `Tracking number: ${order.trackingNumber}. Carrier: ${order.carrier}. ${order.estimatedDelivery ? `Expected delivery: ${order.estimatedDelivery}` : ''}`,
    });
  };
  
  const handleReturnRequest = () => {
    toast({
      title: "Return Request Initiated",
      description: "Your return request has been initiated. Check your email for further instructions.",
    });
  };
  
  const handleDownloadInvoice = () => {
    toast({
      title: "Invoice Download",
      description: "Your invoice is being generated and will download shortly.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/customer/orders">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Order Details</h1>
        <Badge 
          className={`ml-auto ${
            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
            order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
            order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}
        >
          {order.statusText}
        </Badge>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order {order.id}
              </CardTitle>
              <CardDescription>
                Placed on {order.date}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-md overflow-hidden border">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${item.price.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">
                      ${(item.quantity * item.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Subtotal</p>
                  <p>${order.subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Shipping</p>
                  <p>${order.shipping.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Tax</p>
                  <p>${order.tax.toFixed(2)}</p>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <p>Total</p>
                  <p>${order.total.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              {order.status === 'shipped' && (
                <Button onClick={handleTrackOrder}>
                  <Truck className="mr-2 h-4 w-4" />
                  Track Order
                </Button>
              )}
              <Button variant="outline" onClick={handleDownloadInvoice}>
                <Download className="mr-2 h-4 w-4" />
                Download Invoice
              </Button>
              {(order.status === 'delivered' || order.status === 'shipped') && (
                <Button variant="outline" onClick={handleReturnRequest}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Return Items
                </Button>
              )}
              <Button variant="outline">
                <MessageCircle className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </CardFooter>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="font-medium">{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.street}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>
                
                {order.trackingNumber && (
                  <div className="mt-4">
                    <p className="text-sm font-medium">Tracking Information</p>
                    <p className="text-sm">
                      {order.carrier}: {order.trackingNumber}
                    </p>
                  </div>
                )}
                
                {order.estimatedDelivery && (
                  <div className="mt-2 flex items-center gap-1 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Estimated delivery: {order.estimatedDelivery}</span>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p><span className="font-medium">Method:</span> {order.paymentMethod}</p>
                  <p><span className="font-medium">Status:</span> <Badge variant="outline" className="ml-1 bg-green-100 text-green-800">Paid</Badge></p>
                  <p><span className="font-medium">Date:</span> {order.date}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="w-full lg:w-[300px] space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <OrderTimeline events={order.timelineEvents} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                If you have any questions or concerns about your order, please don't hesitate to contact our customer support team.
              </p>
              <Button variant="outline" className="w-full">
                <MessageCircle className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
              <div className="text-sm space-y-2">
                <p className="flex items-center gap-1">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <span className="font-medium">Report an Issue</span>
                </p>
                <p className="text-muted-foreground">
                  Something wrong with your order? Let us know immediately.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
