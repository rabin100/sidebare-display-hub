
import React, { useState } from 'react';
import { Download, Filter, Calendar, Printer, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

type ReportType = 'users' | 'orders' | 'revenue' | 'inventory';

interface Report {
  id: string;
  title: string;
  type: ReportType;
  period: string;
  status: 'ready' | 'generating';
  created: string;
}

const Reports: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<ReportType>('users');
  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      title: 'Monthly User Growth Report',
      type: 'users',
      period: 'Jul 2023',
      status: 'ready',
      created: '2023-08-01',
    },
    {
      id: '2',
      title: 'Quarterly User Acquisition',
      type: 'users',
      period: 'Q2 2023',
      status: 'ready',
      created: '2023-07-02',
    },
    {
      id: '3',
      title: 'Monthly Sales Report',
      type: 'orders',
      period: 'Jul 2023',
      status: 'ready',
      created: '2023-08-01',
    },
    {
      id: '4',
      title: 'Weekly Sales Summary',
      type: 'orders',
      period: 'Week 31, 2023',
      status: 'ready',
      created: '2023-08-07',
    },
    {
      id: '5',
      title: 'Monthly Revenue Analysis',
      type: 'revenue',
      period: 'Jul 2023',
      status: 'ready',
      created: '2023-08-01',
    },
    {
      id: '6',
      title: 'Quarterly Financial Report',
      type: 'revenue',
      period: 'Q2 2023',
      status: 'ready',
      created: '2023-07-02',
    },
    {
      id: '7',
      title: 'Monthly Inventory Status',
      type: 'inventory',
      period: 'Jul 2023',
      status: 'ready',
      created: '2023-08-01',
    },
  ]);
  
  const handleGenerateReport = () => {
    const reportTypes = {
      users: 'User Activity',
      orders: 'Order Summary',
      revenue: 'Revenue Analysis',
      inventory: 'Inventory Status',
    };
    
    const newReport: Report = {
      id: Date.now().toString(),
      title: `New ${reportTypes[activeTab]} Report`,
      type: activeTab,
      period: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      status: 'generating',
      created: new Date().toISOString().split('T')[0],
    };
    
    setReports([newReport, ...reports]);
    
    toast({
      title: "Generating report",
      description: "Your report is being generated and will be ready shortly.",
    });
    
    // Simulate report generation completion
    setTimeout(() => {
      setReports(prev => 
        prev.map(report => 
          report.id === newReport.id 
            ? { ...report, status: 'ready' } 
            : report
        )
      );
      
      toast({
        title: "Report ready",
        description: "Your report has been generated and is ready to download.",
      });
    }, 3000);
  };
  
  const handleDownload = (reportId: string) => {
    toast({
      title: "Download started",
      description: "Your report is being downloaded.",
    });
  };
  
  const handlePrint = (reportId: string) => {
    toast({
      title: "Print prepared",
      description: "Your report is ready to print.",
    });
  };
  
  const filteredReports = reports.filter(report => report.type === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Reports Dashboard</h1>
        <Button onClick={handleGenerateReport}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>
      
      <div className="flex space-x-2 pb-4 border-b">
        {[
          { label: 'User Reports', value: 'users' },
          { label: 'Order Reports', value: 'orders' },
          { label: 'Revenue Reports', value: 'revenue' },
          { label: 'Inventory Reports', value: 'inventory' },
        ].map(tab => (
          <Button
            key={tab.value}
            variant={activeTab === tab.value ? 'default' : 'outline'}
            onClick={() => setActiveTab(tab.value as ReportType)}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Reports</CardTitle>
          <CardDescription>
            View and download {activeTab} reports for your business
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredReports.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No reports available for this category. Generate your first report.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Name</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Created On</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map(report => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.title}</TableCell>
                    <TableCell>{report.period}</TableCell>
                    <TableCell>{report.created}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        report.status === 'ready' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {report.status === 'ready' ? 'Ready' : 'Generating...'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          disabled={report.status !== 'ready'}
                          onClick={() => handleDownload(report.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          disabled={report.status !== 'ready'}
                          onClick={() => handlePrint(report.id)}
                        >
                          <Printer className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
