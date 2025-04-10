
import React, { useState, useRef } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { FileText, BarChart3, Download, Calendar, Printer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Reports: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('sales');
  const reportContentRef = useRef<HTMLDivElement>(null);
  
  // Sample data for demonstration
  const salesData = [
    { date: '2023-05-01', revenue: 1254.87, orders: 42, avgOrderValue: 29.88 },
    { date: '2023-05-02', revenue: 1876.32, orders: 63, avgOrderValue: 29.78 },
    { date: '2023-05-03', revenue: 2145.67, orders: 71, avgOrderValue: 30.22 },
    { date: '2023-05-04', revenue: 1987.21, orders: 68, avgOrderValue: 29.22 },
    { date: '2023-05-05', revenue: 2356.45, orders: 78, avgOrderValue: 30.21 },
    { date: '2023-05-06', revenue: 1765.34, orders: 59, avgOrderValue: 29.92 },
    { date: '2023-05-07', revenue: 1432.67, orders: 48, avgOrderValue: 29.85 },
  ];
  
  const productData = [
    { id: '1', name: 'Product 1', sold: 145, revenue: 2899.55, stock: 42 },
    { id: '2', name: 'Product 2', sold: 87, revenue: 1739.13, stock: 65 },
    { id: '3', name: 'Product 3', sold: 213, revenue: 8518.87, stock: 31 },
    { id: '4', name: 'Product 4', sold: 76, revenue: 2279.24, stock: 89 },
    { id: '5', name: 'Product 5', sold: 54, revenue: 1079.46, stock: 12 },
  ];
  
  const customerData = [
    { id: '1', name: 'John Doe', orders: 12, spent: 2145.67, lastOrder: '2023-05-03' },
    { id: '2', name: 'Jane Smith', orders: 8, spent: 1432.89, lastOrder: '2023-05-01' },
    { id: '3', name: 'Mike Johnson', orders: 15, spent: 3456.78, lastOrder: '2023-05-06' },
    { id: '4', name: 'Sarah Williams', orders: 5, spent: 765.43, lastOrder: '2023-04-28' },
    { id: '5', name: 'David Brown', orders: 9, spent: 1876.54, lastOrder: '2023-05-04' },
  ];

  const handleDownloadReport = () => {
    toast({
      title: "Download started",
      description: `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} report is being downloaded.`,
    });
    
    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "Download complete",
        description: `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} report has been downloaded successfully.`,
      });
    }, 1500);
  };

  const handlePrintReport = () => {
    toast({
      title: "Preparing to print",
      description: `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} report is being prepared for printing.`,
    });
    
    let printContent = '';
    let title = '';
    
    // Create content based on active tab
    if (activeTab === 'sales') {
      title = 'Sales Report';
      printContent = `
        <table border="1" style="width:100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th>Date</th>
              <th>Revenue</th>
              <th>Orders</th>
              <th>Avg. Order Value</th>
            </tr>
          </thead>
          <tbody>
            ${salesData.map(day => `
              <tr>
                <td>${day.date}</td>
                <td>$${day.revenue.toFixed(2)}</td>
                <td>${day.orders}</td>
                <td>$${day.avgOrderValue.toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    } else if (activeTab === 'products') {
      title = 'Product Performance Report';
      printContent = `
        <table border="1" style="width:100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th>Product</th>
              <th>Units Sold</th>
              <th>Revenue</th>
              <th>Current Stock</th>
            </tr>
          </thead>
          <tbody>
            ${productData.map(product => `
              <tr>
                <td>${product.name}</td>
                <td>${product.sold}</td>
                <td>$${product.revenue.toFixed(2)}</td>
                <td>${product.stock}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    } else if (activeTab === 'customers') {
      title = 'Customer Insights Report';
      printContent = `
        <table border="1" style="width:100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Orders</th>
              <th>Total Spent</th>
              <th>Last Order</th>
            </tr>
          </thead>
          <tbody>
            ${customerData.map(customer => `
              <tr>
                <td>${customer.name}</td>
                <td>${customer.orders}</td>
                <td>$${customer.spent.toFixed(2)}</td>
                <td>${customer.lastOrder}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }
    
    const fullPrintContent = `
      <html>
        <head>
          <title>${title}</title>
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
            <h1>${title}</h1>
            <div class="report-meta">
              <p>Generated on: ${new Date().toLocaleDateString()}</p>
            </div>
          </div>
          <div class="report-content">
            ${printContent}
          </div>
        </body>
      </html>
    `;
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(fullPrintContent);
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reports</h1>
        <div className="flex gap-2">
          <Button onClick={handleDownloadReport}>
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
          <Button variant="outline" onClick={handlePrintReport}>
            <Printer className="mr-2 h-4 w-4" />
            Print Report
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Report Dashboard</CardTitle>
          <CardDescription>View and analyze your shop's performance.</CardDescription>
        </CardHeader>
        <CardContent ref={reportContentRef}>
          <Tabs 
            defaultValue="sales" 
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="sales">
                <BarChart3 className="mr-2 h-4 w-4" />
                Sales Report
              </TabsTrigger>
              <TabsTrigger value="products">
                <FileText className="mr-2 h-4 w-4" />
                Product Performance
              </TabsTrigger>
              <TabsTrigger value="customers">
                <Calendar className="mr-2 h-4 w-4" />
                Customer Insights
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="sales" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-xl font-medium">$13,818.53</div>
                    <p className="text-xs text-muted-foreground">Total Revenue</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-xl font-medium">429</div>
                    <p className="text-xs text-muted-foreground">Total Orders</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-xl font-medium">$32.21</div>
                    <p className="text-xs text-muted-foreground">Avg. Order Value</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-xl font-medium">$1,974.08</div>
                    <p className="text-xs text-muted-foreground">Avg. Daily Revenue</p>
                  </CardContent>
                </Card>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Avg. Order Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesData.map((day) => (
                    <TableRow key={day.date}>
                      <TableCell>{day.date}</TableCell>
                      <TableCell>${day.revenue.toFixed(2)}</TableCell>
                      <TableCell>{day.orders}</TableCell>
                      <TableCell>${day.avgOrderValue.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="products" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Units Sold</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Current Stock</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productData.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.sold}</TableCell>
                      <TableCell>${product.revenue.toFixed(2)}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="customers" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Last Order</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customerData.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.orders}</TableCell>
                      <TableCell>${customer.spent.toFixed(2)}</TableCell>
                      <TableCell>{customer.lastOrder}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
