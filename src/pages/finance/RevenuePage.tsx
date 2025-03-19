
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { BarChart, LineChart, PieChart } from '@/components/ui/charts';
import { 
  BarChart3, 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon, 
  Download, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  ArrowUpRight,
  Users
} from 'lucide-react';

// Sample data for charts
const revenueData = [
  { month: 'Jan', revenue: 12500 },
  { month: 'Feb', revenue: 18200 },
  { month: 'Mar', revenue: 15800 },
  { month: 'Apr', revenue: 22000 },
  { month: 'May', revenue: 19500 },
  { month: 'Jun', revenue: 27000 },
  { month: 'Jul', revenue: 24300 },
  { month: 'Aug', revenue: 28800 },
  { month: 'Sep', revenue: 29100 },
  { month: 'Oct', revenue: 32400 },
  { month: 'Nov', revenue: 35200 },
  { month: 'Dec', revenue: 39800 }
];

const sourcesData = [
  { name: 'Online Store', value: 64 },
  { name: 'Marketplaces', value: 21 },
  { name: 'Social Media', value: 10 },
  { name: 'Referrals', value: 5 }
];

const RevenuePage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('yearly');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Revenue Analytics</h1>
          <p className="text-muted-foreground">Track and analyze your revenue streams</p>
        </div>

        <div className="flex items-center gap-2">
          <Select defaultValue="yearly" onValueChange={setTimeRange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              <DollarSign className="h-5 w-5 mr-1 text-primary" />
              $285,240
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              <span>12.4% from previous {timeRange === 'yearly' ? 'year' : 'period'}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Average Order Value</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              <DollarSign className="h-5 w-5 mr-1 text-primary" />
              $87.50
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              <span>3.2% from previous {timeRange === 'yearly' ? 'year' : 'period'}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Customers</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              <Users className="h-5 w-5 mr-1 text-primary" />
              3,261
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              <span>8.7% from previous {timeRange === 'yearly' ? 'year' : 'period'}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue breakdown for the current year</CardDescription>
            </div>

            <Tabs defaultValue="bar">
              <TabsList>
                <TabsTrigger value="bar" className="gap-2">
                  <BarChart3 className="h-4 w-4" /> Bar
                </TabsTrigger>
                <TabsTrigger value="line" className="gap-2">
                  <LineChartIcon className="h-4 w-4" /> Line
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="bar" className="h-[350px]">
            <TabsContent value="bar" className="h-full">
              <BarChart 
                data={revenueData}
                index="month"
                categories={["revenue"]}
                colors={["#4f46e5"]}
                valueFormatter={(value) => `$${value.toLocaleString()}`}
                showLegend={false}
              />
            </TabsContent>
            <TabsContent value="line" className="h-full">
              <LineChart 
                data={revenueData}
                index="month"
                categories={["revenue"]}
                colors={["#4f46e5"]}
                valueFormatter={(value) => `$${value.toLocaleString()}`}
                showLegend={false}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Sources</CardTitle>
            <CardDescription>Revenue distribution by channel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <PieChart 
                data={sourcesData}
                index="name"
                categories={["value"]}
                colors={["#4f46e5", "#60a5fa", "#e879f9", "#fbbf24"]}
                valueFormatter={(value) => `${value}%`}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>Year-over-year revenue comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <LineChart 
                data={[
                  { month: 'Jan', "2022": 10500, "2023": 12500 },
                  { month: 'Feb', "2022": 16100, "2023": 18200 },
                  { month: 'Mar', "2022": 14200, "2023": 15800 },
                  { month: 'Apr', "2022": 19100, "2023": 22000 },
                  { month: 'May', "2022": 17800, "2023": 19500 },
                  { month: 'Jun', "2022": 24500, "2023": 27000 },
                  { month: 'Jul', "2022": 21900, "2023": 24300 },
                  { month: 'Aug', "2022": 26300, "2023": 28800 },
                  { month: 'Sep', "2022": 26800, "2023": 29100 },
                  { month: 'Oct', "2022": 29500, "2023": 32400 },
                  { month: 'Nov', "2022": 32100, "2023": 35200 },
                  { month: 'Dec', "2022": 36200, "2023": 39800 }
                ]}
                index="month"
                categories={["2022", "2023"]}
                colors={["#94a3b8", "#4f46e5"]}
                valueFormatter={(value) => `$${value.toLocaleString()}`}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RevenuePage;
