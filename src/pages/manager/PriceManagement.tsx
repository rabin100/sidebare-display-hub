
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
import { Tag, ArrowUp, ArrowDown, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  currentPrice: number;
  newPrice: number | null;
  priceChange: number;
  changeType: 'increase' | 'decrease' | 'unchanged';
}

const PriceManagement: React.FC = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([
    { 
      id: '1', 
      name: 'Product 1', 
      currentPrice: 19.99, 
      newPrice: null, 
      priceChange: 0,
      changeType: 'unchanged'
    },
    { 
      id: '2', 
      name: 'Product 2', 
      currentPrice: 29.99, 
      newPrice: null, 
      priceChange: 0,
      changeType: 'unchanged'
    },
    { 
      id: '3', 
      name: 'Product 3', 
      currentPrice: 39.99, 
      newPrice: null, 
      priceChange: 0,
      changeType: 'unchanged'
    },
  ]);

  const handlePriceChange = (id: string, value: string) => {
    setProducts(products.map(product => {
      if (product.id === id) {
        const newPrice = value === '' ? null : parseFloat(value);
        const priceChange = newPrice ? newPrice - product.currentPrice : 0;
        const changeType = priceChange > 0 ? 'increase' : priceChange < 0 ? 'decrease' : 'unchanged';
        
        return {
          ...product,
          newPrice,
          priceChange,
          changeType
        };
      }
      return product;
    }));
  };

  const handleApplyAll = () => {
    setProducts(products.map(product => {
      if (product.newPrice !== null) {
        return {
          ...product,
          currentPrice: product.newPrice,
          newPrice: null,
          priceChange: 0,
          changeType: 'unchanged'
        };
      }
      return product;
    }));
    
    toast({
      title: "Prices Updated",
      description: "All price changes have been applied successfully.",
    });
  };

  const handleConfirmPrice = (id: string) => {
    setProducts(products.map(product => {
      if (product.id === id && product.newPrice !== null) {
        return {
          ...product,
          currentPrice: product.newPrice,
          newPrice: null,
          priceChange: 0,
          changeType: 'unchanged'
        };
      }
      return product;
    }));
    
    toast({
      title: "Price Updated",
      description: "The product price has been updated successfully.",
    });
  };

  const handleCancelPrice = (id: string) => {
    setProducts(products.map(product => {
      if (product.id === id) {
        return {
          ...product,
          newPrice: null,
          priceChange: 0,
          changeType: 'unchanged'
        };
      }
      return product;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Price Management</h1>
        <Button onClick={handleApplyAll}>Apply All Changes</Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Update Product Prices</CardTitle>
          <CardDescription>Manage and update the prices of your products.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Current Price</TableHead>
                <TableHead>New Price</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>${product.currentPrice.toFixed(2)}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={product.newPrice === null ? '' : product.newPrice}
                      onChange={(e) => handlePriceChange(product.id, e.target.value)}
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell>
                    {product.priceChange !== 0 && (
                      <div className={`flex items-center ${
                        product.changeType === 'increase' ? 'text-green-600' : 
                        product.changeType === 'decrease' ? 'text-red-600' : ''
                      }`}>
                        {product.changeType === 'increase' ? (
                          <ArrowUp className="h-4 w-4 mr-1" />
                        ) : product.changeType === 'decrease' ? (
                          <ArrowDown className="h-4 w-4 mr-1" />
                        ) : null}
                        {Math.abs(product.priceChange).toFixed(2)}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {product.newPrice !== null && (
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleConfirmPrice(product.id)}
                        >
                          <Check className="h-4 w-4" />
                          <span className="sr-only">Confirm</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCancelPrice(product.id)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Cancel</span>
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Batch Price Actions</CardTitle>
          <CardDescription>Apply percentage-based price changes to multiple products.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium">Adjustment Type</label>
              <select className="h-10 rounded-md border border-input bg-background px-3 py-2">
                <option value="increase">Increase by</option>
                <option value="decrease">Decrease by</option>
                <option value="set">Set to</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Value</label>
              <Input type="number" min="0" placeholder="10" className="w-24" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <select className="h-10 rounded-md border border-input bg-background px-3 py-2">
                <option value="percentage">Percentage (%)</option>
                <option value="amount">Fixed Amount ($)</option>
              </select>
            </div>
            
            <Button className="mb-0">
              <Tag className="mr-2 h-4 w-4" />
              Apply
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PriceManagement;
