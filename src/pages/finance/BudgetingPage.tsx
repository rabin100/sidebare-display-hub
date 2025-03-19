import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, LineChart } from '@/components/ui/charts';
import { 
  PiggyBank,
  Wallet,
  Banknote,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Plus,
  Edit,
  RefreshCw,
  ArrowRight,
  DollarSign
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BudgetItem {
  id: string;
  category: string;
  allocated: number;
  spent: number;
  remaining: number;
  status: 'on_track' | 'warning' | 'over_budget';
}

const budgetItems: BudgetItem[] = [
  {
    id: 'BUD-001',
    category: 'Marketing',
    allocated: 12000,
    spent: 8500,
    remaining: 3500,
    status: 'on_track'
  },
  {
    id: 'BUD-002',
    category: 'Rent',
    allocated: 5000,
    spent: 5000,
    remaining: 0,
    status: 'on_track'
  },
  {
    id: 'BUD-003',
    category: 'Salaries',
    allocated: 45000,
    spent: 45000,
    remaining: 0,
    status: 'on_track'
  },
  {
    id: 'BUD-004',
    category: 'Equipment',
    allocated: 8000,
    spent: 7200,
    remaining: 800,
    status: 'warning'
  },
  {
    id: 'BUD-005',
    category: 'Software',
    allocated: 3000,
    spent: 3400,
    remaining: -400,
    status: 'over_budget'
  },
  {
    id: 'BUD-006',
    category: 'Travel',
    allocated: 5000,
    spent: 2300,
    remaining: 2700,
    status: 'on_track'
  },
  {
    id: 'BUD-007',
    category: 'Utilities',
    allocated: 1200,
    spent: 850,
    remaining: 350,
    status: 'on_track'
  },
  {
    id: 'BUD-008',
    category: 'Training',
    allocated: 2500,
    spent: 1200,
    remaining: 1300,
    status: 'on_track'
  }
];

const statusColors = {
  on_track: "bg-green-100 text-green-800 hover:bg-green-100",
  warning: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  over_budget: "bg-red-100 text-red-800 hover:bg-red-100"
};

const statusLabels = {
  on_track: "On Track",
  warning: "Warning",
  over_budget: "Over Budget"
};

const monthlyData = [
  { month: 'Jan', budget: 70000, actual: 68500 },
  { month: 'Feb', budget: 72000, actual: 71200 },
  { month: 'Mar', budget: 74000, actual: 76500 },
  { month: 'Apr', budget: 75000, actual: 74800 },
  { month: 'May', budget: 76000, actual: 78200 },
  { month: 'Jun', budget: 78000, actual: 77500 },
  { month: 'Jul', budget: 80000, actual: 79800 },
  { month: 'Aug', budget: 82000, actual: 83600 },
  { month: 'Sep', budget: 81000, actual: 80200 },
  { month: 'Oct', budget: 79000, actual: 82500 },
  { month: 'Nov', budget: 81500, actual: 80000 },
  { month: 'Dec', budget: 85000, actual: 0 }
];

const BudgetingPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('current');
  const [filter, setFilter] = useState('all');
  
  const totalBudget = budgetItems.reduce((sum, item) => sum + item.allocated, 0);
  const totalSpent = budgetItems.reduce((sum, item) => sum + item.spent, 0);
  const totalRemaining = totalBudget - totalSpent;
  const percentSpent = (totalSpent / totalBudget) * 100;
  
  const filteredItems = filter === 'all' 
    ? budgetItems 
    : budgetItems.filter(item => item.status === filter);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Budgeting</h1>
          <p className="text-muted-foreground">Plan and track your financial resources</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Month</SelectItem>
              <SelectItem value="q4">Q4 2023</SelectItem>
              <SelectItem value="yearly">Yearly Budget</SelectItem>
            </SelectContent>
          </Select>
          
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Budget
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Budget</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              <PiggyBank className="h-5 w-5 mr-1 text-primary" />
              ${totalBudget.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>For {timeRange === 'current' ? 'November 2023' : timeRange === 'q4' ? 'Q4 2023' : '2023'}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Spent</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              <Wallet className="h-5 w-5 mr-1 text-primary" />
              ${totalSpent.toLocaleString()} <span className="text-sm text-gray-500 ml-2">({percentSpent.toFixed(1)}%)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={percentSpent} className="h-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Remaining Budget</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              <Banknote className="h-5 w-5 mr-1 text-primary" />
              ${totalRemaining.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{(100 - percentSpent).toFixed(1)}% of budget remaining</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Budget vs. Actual</CardTitle>
                <CardDescription>Monthly comparison for 2023</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Update
              </Button>
            </div>
          </CardHeader>
          <CardContent className="h-[300px]">
            <BarChart 
              data={monthlyData}
              index="month"
              categories={["budget", "actual"]}
              colors={["#4f46e5", "#10b981"]}
              valueFormatter={(value) => `$${value.toLocaleString()}`}
              yAxisWidth={65}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Budget Trends</CardTitle>
                <CardDescription>Budget utilization over time</CardDescription>
              </div>
              <Select defaultValue="6months">
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3months">3 Months</SelectItem>
                  <SelectItem value="6months">6 Months</SelectItem>
                  <SelectItem value="12months">12 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="h-[300px]">
            <LineChart 
              data={monthlyData.slice(-6)}
              index="month"
              categories={["budget", "actual"]}
              colors={["#4f46e5", "#10b981"]}
              valueFormatter={(value) => `$${value.toLocaleString()}`}
              yAxisWidth={65}
            />
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Budget Allocation</CardTitle>
              <CardDescription>Breakdown by category</CardDescription>
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="on_track">On Track</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="over_budget">Over Budget</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item.category}</span>
                    <Badge 
                      variant="outline" 
                      className={statusColors[item.status]}
                    >
                      {statusLabels[item.status]}
                    </Badge>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">${item.spent.toLocaleString()}</span>
                    <span className="text-gray-500"> / ${item.allocated.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Progress 
                    value={(item.spent / item.allocated) * 100} 
                    className={`h-2 flex-1 ${
                      item.status === 'over_budget' 
                        ? 'bg-red-100' 
                        : item.status === 'warning' 
                          ? 'bg-yellow-100' 
                          : 'bg-gray-100'
                    }`}
                  />
                  <div className="w-24 flex items-center gap-1 text-sm">
                    {item.remaining >= 0 ? (
                      <>
                        <span className="text-green-600 font-medium">${item.remaining.toLocaleString()}</span>
                        <TrendingUp className="h-3 w-3 text-green-600" />
                      </>
                    ) : (
                      <>
                        <span className="text-red-600 font-medium">-${Math.abs(item.remaining).toLocaleString()}</span>
                        <TrendingDown className="h-3 w-3 text-red-600" />
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {filteredItems.length === 0 && (
              <div className="py-12 text-center">
                <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500" />
                <h3 className="mt-4 text-lg font-semibold">No budget items found</h3>
                <p className="text-muted-foreground mt-2">No budget categories match your filter.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetingPage;
