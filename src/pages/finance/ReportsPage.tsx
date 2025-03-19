import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  FileSpreadsheet, 
  FileText, 
  BarChart4, 
  PieChart, 
  Download, 
  Clock, 
  Calendar,
  RefreshCw,
  FileBarChart,
  FilePieChart,
  FileLineChart,
  ExternalLink
} from 'lucide-react';

interface ReportCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  lastUpdated: string;
  category: string;
}

const ReportCard: React.FC<ReportCardProps> = ({ title, description, icon, lastUpdated, category }) => (
  <Card className="h-full">
    <CardHeader className="pb-3">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
        {icon}
      </div>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent className="pb-2">
      <div className="flex items-center text-sm text-muted-foreground mt-2">
        <Clock className="mr-1 h-3 w-3" /> Last updated: {lastUpdated}
      </div>
    </CardContent>
    <CardFooter className="flex justify-between items-center pt-1">
      <Button variant="outline" size="sm" className="gap-2">
        <Download className="h-3 w-3" /> Download
      </Button>
      <Button size="sm" variant="ghost" className="gap-1 text-xs">
        View <ExternalLink className="h-3 w-3" />
      </Button>
    </CardFooter>
  </Card>
);

const ReportsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-muted-foreground">View and generate financial reports</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button className="gap-2">
            <FileBarChart className="h-4 w-4" />
            Generate Report
          </Button>
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="financial">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="tax">Tax</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
        </TabsList>
        
        <TabsContent value="financial" className="pt-6">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <ReportCard 
              title="Profit & Loss" 
              description="Monthly profit and loss statement" 
              icon={<FileBarChart className="h-5 w-5 text-primary" />} 
              lastUpdated="Today at 9:15 AM"
              category="financial"
            />
            <ReportCard 
              title="Balance Sheet" 
              description="Assets, liabilities and equity" 
              icon={<FileText className="h-5 w-5 text-primary" />} 
              lastUpdated="Yesterday at 3:45 PM"
              category="financial"
            />
            <ReportCard 
              title="Cash Flow" 
              description="Monthly cash flow statement" 
              icon={<FileLineChart className="h-5 w-5 text-primary" />} 
              lastUpdated="Nov 15, 2023"
              category="financial"
            />
            <ReportCard 
              title="Expense Report" 
              description="Detailed breakdown of expenses" 
              icon={<FilePieChart className="h-5 w-5 text-primary" />} 
              lastUpdated="Nov 12, 2023"
              category="financial"
            />
            <ReportCard 
              title="Revenue Analysis" 
              description="Revenue breakdown by channels" 
              icon={<FileBarChart className="h-5 w-5 text-primary" />} 
              lastUpdated="Nov 10, 2023"
              category="financial"
            />
            <ReportCard 
              title="Financial Ratios" 
              description="Key financial performance indicators" 
              icon={<FileSpreadsheet className="h-5 w-5 text-primary" />} 
              lastUpdated="Nov 5, 2023"
              category="financial"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="sales" className="pt-6">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <ReportCard 
              title="Sales Summary" 
              description="Overview of sales performance" 
              icon={<BarChart4 className="h-5 w-5 text-primary" />} 
              lastUpdated="Today at 10:30 AM"
              category="sales"
            />
            <ReportCard 
              title="Sales by Product" 
              description="Product-wise sales breakdown" 
              icon={<FileBarChart className="h-5 w-5 text-primary" />} 
              lastUpdated="Yesterday at 5:20 PM"
              category="sales"
            />
            <ReportCard 
              title="Customer Analysis" 
              description="Sales data by customer segments" 
              icon={<FilePieChart className="h-5 w-5 text-primary" />} 
              lastUpdated="Nov 14, 2023"
              category="sales"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="tax" className="pt-6">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <ReportCard 
              title="Tax Summary" 
              description="Summary of taxes paid and owed" 
              icon={<FileSpreadsheet className="h-5 w-5 text-primary" />} 
              lastUpdated="Nov 18, 2023"
              category="tax"
            />
            <ReportCard 
              title="Sales Tax Report" 
              description="Detailed sales tax breakdown" 
              icon={<FileText className="h-5 w-5 text-primary" />} 
              lastUpdated="Nov 5, 2023"
              category="tax"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="custom" className="pt-6">
          <div className="text-center py-20">
            <Calendar className="h-12 w-12 mx-auto text-gray-400" />
            <h3 className="mt-4 text-lg font-medium">No custom reports yet</h3>
            <p className="text-muted-foreground mt-2 mb-6">Generate your first custom report to see it here.</p>
            <Button className="gap-2">
              <FileBarChart className="h-4 w-4" />
              Create Custom Report
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage;
