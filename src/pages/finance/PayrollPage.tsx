
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { 
  Calendar, 
  Search, 
  Download, 
  ChevronDown, 
  Clock,
  Users,
  Wallet,
  CreditCard,
  CheckCircle,
  CheckSquare
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PayrollRecord {
  id: string;
  period: string;
  employees: number;
  amount: number;
  status: 'scheduled' | 'processing' | 'completed' | 'failed';
  processDate: string;
  department?: string;
}

const payrollRecords: PayrollRecord[] = [
  {
    id: 'PAY-001',
    period: 'Nov 1-15, 2023',
    employees: 42,
    amount: 84500.00,
    status: 'completed',
    processDate: '2023-11-16'
  },
  {
    id: 'PAY-002',
    period: 'Oct 16-31, 2023',
    employees: 45,
    amount: 89200.00,
    status: 'completed',
    processDate: '2023-11-01'
  },
  {
    id: 'PAY-003',
    period: 'Oct 1-15, 2023',
    employees: 43,
    amount: 86300.00,
    status: 'completed',
    processDate: '2023-10-16'
  },
  {
    id: 'PAY-004',
    period: 'Sep 16-30, 2023',
    employees: 44,
    amount: 87500.00,
    status: 'completed',
    processDate: '2023-10-01'
  },
  {
    id: 'PAY-005',
    period: 'Nov 16-30, 2023',
    employees: 46,
    amount: 92000.00,
    status: 'scheduled',
    processDate: '2023-12-01'
  },
];

const departments = [
  { name: 'Engineering', employees: 15, avgSalary: 8500 },
  { name: 'Marketing', employees: 8, avgSalary: 7200 },
  { name: 'Sales', employees: 12, avgSalary: 6800 },
  { name: 'Operations', employees: 6, avgSalary: 5900 },
  { name: 'Finance', employees: 5, avgSalary: 7800 }
];

const statusColors = {
  completed: "bg-green-100 text-green-800 hover:bg-green-100",
  processing: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  scheduled: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  failed: "bg-red-100 text-red-800 hover:bg-red-100"
};

const PayrollPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [periodFilter, setPeriodFilter] = useState('all');
  
  const filteredRecords = payrollRecords.filter(record => 
    record.period.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Payroll</h1>
          <p className="text-muted-foreground">Manage employee payroll and compensation</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Calendar className="h-4 w-4" />
              Run Payroll
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Run Payroll</DialogTitle>
              <DialogDescription>
                Prepare and process payroll for the current period.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Pay Period</label>
                <Select defaultValue="current">
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Nov 16-30, 2023</SelectItem>
                    <SelectItem value="previous">Nov 1-15, 2023</SelectItem>
                    <SelectItem value="custom">Custom Period</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Process Date</label>
                <Input type="date" defaultValue="2023-12-01" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Include Departments</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="eng">Engineering</SelectItem>
                    <SelectItem value="mkt">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="ops">Operations</SelectItem>
                    <SelectItem value="fin">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Process Payroll</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Employees</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              <Users className="h-5 w-5 mr-1 text-primary" />
              46
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Across 5 departments</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Monthly Payroll</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              <Wallet className="h-5 w-5 mr-1 text-primary" />
              $184,500
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Average $4,011 per employee</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Next Payroll Date</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              <Calendar className="h-5 w-5 mr-1 text-primary" />
              Dec 1, 2023
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <Clock className="h-4 w-4" />
              <span>Scheduled in 10 days</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Payroll History</CardTitle>
              <CardDescription>View and manage payroll records</CardDescription>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input 
                  placeholder="Search records..." 
                  className="pl-9 w-full sm:w-[200px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select defaultValue="all" onValueChange={setPeriodFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Periods</SelectItem>
                  <SelectItem value="current">Current Month</SelectItem>
                  <SelectItem value="previous">Previous Month</SelectItem>
                  <SelectItem value="q4">Q4 2023</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Pay Period</TableHead>
                  <TableHead>Employees</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Process Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.id}</TableCell>
                    <TableCell>{record.period}</TableCell>
                    <TableCell>{record.employees}</TableCell>
                    <TableCell>${record.amount.toLocaleString()}</TableCell>
                    <TableCell>{new Date(record.processDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={statusColors[record.status]}
                      >
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" className="h-8 gap-1">
                          <CheckSquare className="h-4 w-4" />
                          Details
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 gap-1">
                          <Download className="h-4 w-4" />
                          Report
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Department Breakdown</CardTitle>
          <CardDescription>Employee distribution and compensation by department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Department</TableHead>
                  <TableHead>Employees</TableHead>
                  <TableHead>Average Salary</TableHead>
                  <TableHead>Total Monthly</TableHead>
                  <TableHead>Last Processed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departments.map((dept) => (
                  <TableRow key={dept.name}>
                    <TableCell className="font-medium">{dept.name}</TableCell>
                    <TableCell>{dept.employees}</TableCell>
                    <TableCell>${dept.avgSalary.toLocaleString()}</TableCell>
                    <TableCell>${(dept.employees * dept.avgSalary).toLocaleString()}</TableCell>
                    <TableCell className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Nov 16, 2023
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayrollPage;
