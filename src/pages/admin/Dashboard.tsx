
import React from 'react';
import { BarChart3, Users, ArrowUpRight, Clock, User, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Sample data for charts
const activityData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 400 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 800 },
  { name: 'Jul', value: 700 },
];

const userTypeData = [
  { name: 'Admin', value: 20 },
  { name: 'Staff', value: 40 },
  { name: 'User', value: 100 },
];

const recentActivities = [
  { id: 1, user: 'John Doe', action: 'Account created', time: '15m ago' },
  { id: 2, user: 'Mike Johnson', action: 'Updated profile', time: '2h ago' },
  { id: 3, user: 'Sarah Wilson', action: 'Requested access', time: '3h ago' },
  { id: 4, user: 'Emma Roberts', action: 'Logged in', time: '5h ago' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-admin-secondary">Last updated:</span>
          <span className="text-sm font-medium">Today, 2:30 PM</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Users', value: '3,721', change: '+2.5%', icon: Users, color: 'bg-blue-50 text-blue-500' },
          { title: 'Account Requests', value: '24', change: '+12%', icon: User, color: 'bg-purple-50 text-purple-500' },
          { title: 'Active Sessions', value: '482', change: '-3.1%', icon: Clock, color: 'bg-amber-50 text-amber-500' },
          { title: 'This Month', value: '162', change: '+18.2%', icon: Calendar, color: 'bg-emerald-50 text-emerald-500' },
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
        <Card className="col-span-2 hover-lift">
          <CardHeader className="pb-2">
            <CardTitle>User Activity</CardTitle>
            <CardDescription>Total users activity over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0071e3" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0071e3" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="name" stroke="#86868b" axisLine={false} tickLine={false} />
                  <YAxis stroke="#86868b" axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Area type="monotone" dataKey="value" stroke="#0071e3" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardTitle>User Types</CardTitle>
            <CardDescription>Distribution by role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userTypeData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="name" stroke="#86868b" axisLine={false} tickLine={false} />
                  <YAxis stroke="#86868b" axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="value" fill="#0071e3" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Latest user actions in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-admin-border last:border-0 last:pb-0">
                <div className="w-8 h-8 rounded-full bg-admin-accent flex items-center justify-center text-admin-primary">
                  <User className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{activity.user}</h4>
                    <span className="text-xs text-admin-secondary">{activity.time}</span>
                  </div>
                  <p className="text-sm text-admin-secondary mt-1">{activity.action}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
