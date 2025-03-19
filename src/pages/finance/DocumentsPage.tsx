
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Search, 
  Upload, 
  FolderPlus,
  Download,
  Trash2,
  FileImage,
  FilePdf,
  FileSpreadsheet,
  FileIcon,
  Clock,
  Filter,
  ChevronDown,
  Eye
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'excel' | 'image' | 'doc' | 'other';
  size: string;
  category: 'invoice' | 'receipt' | 'contract' | 'report' | 'tax' | 'other';
  uploadDate: string;
  uploadedBy: string;
}

const documents: Document[] = [
  {
    id: 'DOC-001',
    name: 'Q3 Financial Report.pdf',
    type: 'pdf',
    size: '2.4 MB',
    category: 'report',
    uploadDate: '2023-11-10',
    uploadedBy: 'Jane Smith'
  },
  {
    id: 'DOC-002',
    name: 'Client Contract - TechCorp.pdf',
    type: 'pdf',
    size: '1.8 MB',
    category: 'contract',
    uploadDate: '2023-11-05',
    uploadedBy: 'John Doe'
  },
  {
    id: 'DOC-003',
    name: 'Marketing Expenses Oct 2023.xlsx',
    type: 'excel',
    size: '856 KB',
    category: 'report',
    uploadDate: '2023-11-02',
    uploadedBy: 'Jane Smith'
  },
  {
    id: 'DOC-004',
    name: 'Office Rent Receipt.pdf',
    type: 'pdf',
    size: '512 KB',
    category: 'receipt',
    uploadDate: '2023-10-28',
    uploadedBy: 'John Doe'
  },
  {
    id: 'DOC-005',
    name: 'Equipment Invoice #4582.pdf',
    type: 'pdf',
    size: '723 KB',
    category: 'invoice',
    uploadDate: '2023-10-25',
    uploadedBy: 'Jane Smith'
  },
  {
    id: 'DOC-006',
    name: 'Tax Filing Documentation.pdf',
    type: 'pdf',
    size: '3.2 MB',
    category: 'tax',
    uploadDate: '2023-10-20',
    uploadedBy: 'John Doe'
  },
  {
    id: 'DOC-007',
    name: 'Company Expense Policy.doc',
    type: 'doc',
    size: '1.1 MB',
    category: 'other',
    uploadDate: '2023-10-15',
    uploadedBy: 'Jane Smith'
  },
  {
    id: 'DOC-008',
    name: 'Software License Receipt.jpg',
    type: 'image',
    size: '980 KB',
    category: 'receipt',
    uploadDate: '2023-10-10',
    uploadedBy: 'John Doe'
  }
];

const documentIcons = {
  pdf: <FilePdf className="h-8 w-8 text-red-500" />,
  excel: <FileSpreadsheet className="h-8 w-8 text-green-600" />,
  image: <FileImage className="h-8 w-8 text-blue-500" />,
  doc: <FileText className="h-8 w-8 text-blue-600" />,
  other: <FileIcon className="h-8 w-8 text-gray-500" />
};

const categoryColors = {
  invoice: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  receipt: "bg-green-100 text-green-800 hover:bg-green-100",
  contract: "bg-purple-100 text-purple-800 hover:bg-purple-100",
  report: "bg-amber-100 text-amber-800 hover:bg-amber-100",
  tax: "bg-red-100 text-red-800 hover:bg-red-100",
  other: "bg-gray-100 text-gray-800 hover:bg-gray-100"
};

const DocumentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (categoryFilter === 'all') return matchesSearch;
    return matchesSearch && doc.category === categoryFilter;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Finance Documents</h1>
          <p className="text-muted-foreground">Manage and store financial documents securely</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button className="gap-2">
            <Upload className="h-4 w-4" />
            Upload
          </Button>
          <Button variant="outline" className="gap-2">
            <FolderPlus className="h-4 w-4" />
            New Folder
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>All Documents</CardTitle>
              <CardDescription>Browse and manage your financial documents</CardDescription>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input 
                  placeholder="Search documents..." 
                  className="pl-9 w-full sm:w-[240px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setCategoryFilter('all')}>
                    All Documents
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter('invoice')}>
                    Invoices
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter('receipt')}>
                    Receipts
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter('contract')}>
                    Contracts
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter('report')}>
                    Reports
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter('tax')}>
                    Tax Documents
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter('other')}>
                    Other
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Select defaultValue="newest">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="size">Size</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col">
                    <div className="bg-gray-50 p-4 flex items-center gap-3">
                      {documentIcons[doc.type]}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate" title={doc.name}>
                          {doc.name}
                        </h3>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>{doc.type.toUpperCase()}</span>
                        </p>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <Badge 
                          variant="outline" 
                          className={categoryColors[doc.category]}
                        >
                          {doc.category.charAt(0).toUpperCase() + doc.category.slice(1)}
                        </Badge>
                        
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(doc.uploadDate).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-xs text-gray-500">
                          Uploaded by: {doc.uploadedBy}
                        </span>
                        
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredDocuments.length === 0 && (
              <div className="col-span-full py-24 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-semibold">No documents found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentsPage;
