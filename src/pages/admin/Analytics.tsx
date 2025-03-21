
import React from 'react';
import { ArrowUpRight, TrendingUp, Users, ShoppingCart, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  PieChart,
  Pie,
  Legend,
  Cell
} from 'recharts';

// Sample data for charts
const monthlyData = [
  { name: 'Jan', users: 100, orders: 40, revenue: 5000 },
  { name: 'Feb', users: 120, orders: 50, revenue: 6200 },
  { name: 'Mar', users: 140, orders: 70, revenue: 8500 },
  { name: 'Apr', users: 160, orders: 90, revenue: 10000 },
  { name: 'May', users: 180, orders: 120, revenue: 12000 },
  { name: 'Jun', users: 210, orders: 140, revenue: 15000 },
  { name: 'Jul', users: 250, orders: 150, revenue: 18000 },
];

const userTypeData = [
  { name: 'Finance', value: 10 },
  { name: 'Manager', value: 20 },
  { name: 'Customer', value: 350 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Analytics Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-admin-secondary">Last updated:</span>
          <span className="text-sm font-medium">Today, 2:30 PM</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Total Users', value: '725', change: '+8.2%', icon: Users, color: 'bg-blue-50 text-blue-500' },
          { title: 'Total Orders', value: '648', change: '+12.3%', icon: ShoppingCart, color: 'bg-purple-50 text-purple-500' },
          { title: 'Revenue', value: '$74,592', change: '+24.5%', icon: DollarSign, color: 'bg-emerald-50 text-emerald-500' },
        ].map((item, index) => (
          <Card key={index} className="hover-lift">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-admin-secondary mb-1">{item.title}</p>
                  <h3 className="text-2xl font-bold">{item.value}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                    <span className="text-xs font-medium text-emerald-500">{item.change} from last month</span>
                  </div>
                </div>
                <div className={`rounded-full p-2 ${item.color}`}>
                  <item.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-3 lg:col-span-2 hover-lift">
          <CardHeader className="pb-2">
            <CardTitle>Performance Trends</CardTitle>
            <CardDescription>Revenue, orders and user growth over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ffc658" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#8884d8" 
                    fillOpacity={1} 
                    fill="url(#colorUsers)" 
                    name="Users"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="orders" 
                    stroke="#82ca9d" 
                    fillOpacity={1} 
                    fill="url(#colorOrders)" 
                    name="Orders"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#ffc658" 
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                    name="Revenue ($)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3 lg:col-span-1 hover-lift">
          <CardHeader className="pb-2">
            <CardTitle>User Distribution</CardTitle>
            <CardDescription>User types across platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip />
                  <Legend />
                  <Pie
                    data={userTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {userTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>Growth Metrics</CardTitle>
            <CardDescription>Monthly comparison of key metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" fill="#8884d8" name="New Users" />
                  <Bar dataKey="orders" fill="#82ca9d" name="Orders" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
