
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Search, FileText, Download, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'refunded':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
      {status}
    </span>
  );
};

interface Transaction {
  id: string;
  date: string;
  customer: string;
  amount: number;
  status: string;
  paymentMethod: string;
  items: number;
}

const Transactions: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample transaction data
  const transactions: Transaction[] = [
    { 
      id: 'TRX-001', 
      date: '2023-05-15 14:30', 
      customer: 'John Doe', 
      amount: 154.99, 
      status: 'Completed', 
      paymentMethod: 'Credit Card',
      items: 3
    },
    { 
      id: 'TRX-002', 
      date: '2023-05-14 09:45', 
      customer: 'Jane Smith', 
      amount: 89.95, 
      status: 'Processing', 
      paymentMethod: 'PayPal',
      items: 2
    },
    { 
      id: 'TRX-003', 
      date: '2023-05-13 16:20', 
      customer: 'Mike Johnson', 
      amount: 245.50, 
      status: 'Completed', 
      paymentMethod: 'Credit Card',
      items: 4
    },
    { 
      id: 'TRX-004', 
      date: '2023-05-12 11:10', 
      customer: 'Sarah Williams', 
      amount: 76.25, 
      status: 'Refunded', 
      paymentMethod: 'Debit Card',
      items: 1
    },
    { 
      id: 'TRX-005', 
      date: '2023-05-11 13:55', 
      customer: 'David Brown', 
      amount: 189.75, 
      status: 'Pending', 
      paymentMethod: 'Bank Transfer',
      items: 3
    },
    { 
      id: 'TRX-006', 
      date: '2023-05-10 10:30', 
      customer: 'Emily Davis', 
      amount: 124.95, 
      status: 'Completed', 
      paymentMethod: 'Credit Card',
      items: 2
    },
    { 
      id: 'TRX-007', 
      date: '2023-05-09 15:40', 
      customer: 'Robert Wilson', 
      amount: 349.99, 
      status: 'Completed', 
      paymentMethod: 'PayPal',
      items: 5
    },
  ];

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewTransaction = (id: string) => {
    console.log(`Viewing transaction ${id}`);
    toast({
      title: "Transaction Details",
      description: `Viewing details for transaction ${id}`,
    });
  };

  const handleExportTransactions = () => {
    console.log('Exporting transactions...');
    toast({
      title: "Export Started",
      description: "Transactions are being exported to CSV.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Transaction History</h1>
        <Button onClick={handleExportTransactions}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
      
      <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
        <Input
          type="search"
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        <Button type="submit" variant="secondary">
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>View and manage your shop's transactions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.customer}</TableCell>
                  <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                  <TableCell>{transaction.items}</TableCell>
                  <TableCell>
                    <StatusBadge status={transaction.status} />
                  </TableCell>
                  <TableCell>{transaction.paymentMethod}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewTransaction(transaction.id)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">Receipt</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredTransactions.length === 0 && (
            <div className="text-center py-4">
              <p className="text-muted-foreground">No transactions found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;
