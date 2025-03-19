
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Clock, CreditCard, MessageSquare, UserCircle, Mail, Calendar, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const CustomerDashboard: React.FC = () => {
  const customerInfo = {
    name: "John Doe",
    email: "john.doe@example.com",
    memberSince: "Jan 2023",
    totalOrders: 12,
    pendingOrders: 2,
    recentPurchases: [
      { id: "ORD-1234", date: "2023-06-15", amount: 129.99, status: "Delivered" },
      { id: "ORD-1235", date: "2023-06-02", amount: 79.95, status: "Processing" }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Welcome, {customerInfo.name}</h1>
        <Link to="/customer/settings">
          <Button variant="outline">Account Settings</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{customerInfo.totalOrders}</div>
              <ShoppingBag className="text-blue-500 h-5 w-5" />
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/customer/orders" className="text-sm text-blue-500 hover:underline">View all orders</Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{customerInfo.pendingOrders}</div>
              <Clock className="text-yellow-500 h-5 w-5" />
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/customer/orders" className="text-sm text-blue-500 hover:underline">Track orders</Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">2</div>
              <CreditCard className="text-green-500 h-5 w-5" />
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/customer/payments" className="text-sm text-blue-500 hover:underline">Manage payments</Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">My Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">5</div>
              <MessageSquare className="text-purple-500 h-5 w-5" />
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/customer/feedback" className="text-sm text-blue-500 hover:underline">View reviews</Link>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Your most recent purchases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {customerInfo.recentPurchases.map(order => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${order.amount}</p>
                  <p className={`text-sm ${
                    order.status === "Delivered" ? "text-green-500" : 
                    order.status === "Processing" ? "text-yellow-500" : "text-blue-500"
                  }`}>{order.status}</p>
                </div>
                <Link to={`/customer/orders/${order.id}`}>
                  <Button variant="ghost" size="sm">View</Button>
                </Link>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Link to="/customer/order-history">
            <Button variant="outline">View All Order History</Button>
          </Link>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <UserCircle className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700">{customerInfo.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700">{customerInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700">Member since: {customerInfo.memberSince}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/customer/settings">
              <Button variant="outline">Edit Profile</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/products">
                <Button className="w-full" variant="outline">
                  <Search className="mr-2 h-4 w-4" />
                  Browse Products
                </Button>
              </Link>
              <Link to="/customer/orders">
                <Button className="w-full" variant="outline">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Track Orders
                </Button>
              </Link>
              <Link to="/customer/payments/add">
                <Button className="w-full" variant="outline">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Add Payment Method
                </Button>
              </Link>
              <Link to="/customer/feedback/new">
                <Button className="w-full" variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Write a Review
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerDashboard;
