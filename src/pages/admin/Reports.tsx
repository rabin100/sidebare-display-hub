
import React, { useState, useRef } from 'react';
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
  const reportTableRef = useRef<HTMLDivElement>(null);
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
    const reportToDownload = reports.find(report => report.id === reportId);
    if (!reportToDownload) return;
    
    toast({
      title: "Download started",
      description: `${reportToDownload.title} is being downloaded.`,
    });
    
    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "Download complete",
        description: `${reportToDownload.title} has been downloaded successfully.`,
      });
    }, 1500);
  };
  
  const handlePrint = (reportId: string) => {
    const reportToPrint = reports.find(report => report.id === reportId);
    if (!reportToPrint) return;
    
    toast({
      title: "Preparing to print",
      description: `${reportToPrint.title} is being prepared for printing.`,
    });
    
    // Create printable content
    const printContent = `
      <html>
        <head>
          <title>${reportToPrint.title}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #333; }
            .report-header { border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 20px; }
            .report-meta { color: #666; font-size: 14px; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <div class="report-header">
            <h1>${reportToPrint.title}</h1>
            <div class="report-meta">
              <p>Period: ${reportToPrint.period}</p>
              <p>Generated on: ${reportToPrint.created}</p>
              <p>Report ID: ${reportToPrint.id}</p>
            </div>
          </div>
          <div class="report-content">
            <p>This is a ${reportToPrint.type} report generated by the system.</p>
            <!-- Report content would be populated here in a real implementation -->
            <table>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Value</th>
                  <th>Change</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Total Users</td>
                  <td>1,245</td>
                  <td>+12%</td>
                </tr>
                <tr>
                  <td>Active Users</td>
                  <td>876</td>
                  <td>+8%</td>
                </tr>
                <tr>
                  <td>New Registrations</td>
                  <td>142</td>
                  <td>+15%</td>
                </tr>
                <tr>
                  <td>Average Session</td>
                  <td>24 min</td>
                  <td>+5%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </body>
      </html>
    `;
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      
      // Wait for content to load before printing
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
        
        toast({
          title: "Print prepared",
          description: "The report has been sent to the printer.",
        });
      }, 500);
    } else {
      toast({
        title: "Print error",
        description: "Unable to open print preview. Please check your popup settings.",
        variant: "destructive"
      });
    }
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
        <CardContent ref={reportTableRef}>
          {filteredReports.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="mb-4">
                <Calendar className="h-12 w-12 mx-auto text-gray-400" />
              </div>
              <p className="text-lg font-medium">No reports available for this category</p>
              <p className="text-muted-foreground mt-2 mb-6">Generate your first report by clicking the button above.</p>
              <Button onClick={handleGenerateReport}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
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
