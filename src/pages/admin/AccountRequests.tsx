
import React, { useState } from 'react';
import { Check, X, User, Search, Filter, ChevronDown, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

// Sample data for account requests
const mockAccountRequests = [
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john.doe@example.com', 
    role: 'Admin', 
    department: 'Engineering',
    requestDate: '2023-06-15T10:30:00Z',
    status: 'pending'
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane.smith@example.com', 
    role: 'User', 
    department: 'Marketing',
    requestDate: '2023-06-14T09:45:00Z',
    status: 'pending'
  },
  { 
    id: 3, 
    name: 'Mike Johnson', 
    email: 'mike.johnson@example.com', 
    role: 'Editor', 
    department: 'Content',
    requestDate: '2023-06-14T08:15:00Z',
    status: 'pending'
  },
  { 
    id: 4, 
    name: 'Sarah Williams', 
    email: 'sarah.williams@example.com', 
    role: 'User', 
    department: 'Sales',
    requestDate: '2023-06-13T16:20:00Z',
    status: 'approved'
  },
  { 
    id: 5, 
    name: 'David Brown', 
    email: 'david.brown@example.com', 
    role: 'User', 
    department: 'Support',
    requestDate: '2023-06-13T14:10:00Z',
    status: 'rejected'
  },
  { 
    id: 6, 
    name: 'Emily Davis', 
    email: 'emily.davis@example.com', 
    role: 'Admin', 
    department: 'HR',
    requestDate: '2023-06-12T11:05:00Z',
    status: 'approved'
  },
  { 
    id: 7, 
    name: 'Robert Wilson', 
    email: 'robert.wilson@example.com', 
    role: 'Editor', 
    department: 'Design',
    requestDate: '2023-06-12T10:30:00Z',
    status: 'rejected'
  },
];

const AccountRequests: React.FC = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState(mockAccountRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  const handleStatusChange = (id: number, newStatus: 'approved' | 'rejected') => {
    setRequests(prevRequests => 
      prevRequests.map(request => 
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
    
    const request = requests.find(r => r.id === id);
    
    toast({
      title: `Request ${newStatus}`,
      description: `${request?.name}'s account request has been ${newStatus}.`,
      variant: newStatus === 'approved' ? 'default' : 'destructive',
    });
  };
  
  const filteredRequests = requests.filter(request => {
    // Filter by search term
    const matchesSearch = 
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by tab
    const matchesTab = 
      activeTab === 'all' ||
      (activeTab === 'pending' && request.status === 'pending') ||
      (activeTab === 'approved' && request.status === 'approved') ||
      (activeTab === 'rejected' && request.status === 'rejected');
    
    return matchesSearch && matchesTab;
  });
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-amber-50 text-amber-500';
      case 'approved': return 'bg-emerald-50 text-emerald-500';
      case 'rejected': return 'bg-red-50 text-red-500';
      default: return 'bg-gray-50 text-gray-500';
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Account Requests</h1>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Account Requests</CardTitle>
              <CardDescription>View and manage user account requests</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-secondary h-4 w-4" />
              <input 
                type="text" 
                placeholder="Search requests..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 px-9 min-w-[220px] rounded-md border border-admin-border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary"
              />
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList>
              <TabsTrigger value="all" className="relative">
                All
                <Badge className="ml-1 h-5 px-1.5 text-xs bg-admin-secondary/20 text-admin-secondary">{requests.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending
                <Badge className="ml-1 h-5 px-1.5 text-xs bg-amber-100 text-amber-700">{requests.filter(r => r.status === 'pending').length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="approved">
                Approved
                <Badge className="ml-1 h-5 px-1.5 text-xs bg-emerald-100 text-emerald-700">{requests.filter(r => r.status === 'approved').length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Rejected
                <Badge className="ml-1 h-5 px-1.5 text-xs bg-red-100 text-red-700">{requests.filter(r => r.status === 'rejected').length}</Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-admin-accent/50 text-admin-secondary text-sm">
                <tr>
                  <th className="text-left font-medium px-4 py-3 rounded-tl-md">Name</th>
                  <th className="text-left font-medium px-4 py-3">Role</th>
                  <th className="text-left font-medium px-4 py-3">Department</th>
                  <th className="text-left font-medium px-4 py-3">Request Date</th>
                  <th className="text-left font-medium px-4 py-3">Status</th>
                  <th className="text-right font-medium px-4 py-3 rounded-tr-md">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border">
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <tr key={request.id} className="premium-transition hover:bg-admin-accent/30">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-admin-primary/10 flex items-center justify-center">
                            <User className="h-4 w-4 text-admin-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{request.name}</div>
                            <div className="text-sm text-admin-secondary">{request.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">{request.role}</td>
                      <td className="px-4 py-3">{request.department}</td>
                      <td className="px-4 py-3">{formatDate(request.requestDate)}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(request.status)}`}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 w-8 p-0"
                            asChild
                          >
                            <a href={`#details-${request.id}`}><ExternalLink className="h-4 w-4" /></a>
                          </Button>
                          
                          {request.status === 'pending' && (
                            <>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-8 w-8 p-0 text-emerald-500 hover:text-emerald-600 hover:bg-emerald-50"
                                onClick={() => handleStatusChange(request.id, 'approved')}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                                onClick={() => handleStatusChange(request.id, 'rejected')}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-admin-secondary">
                      No account requests found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountRequests;
