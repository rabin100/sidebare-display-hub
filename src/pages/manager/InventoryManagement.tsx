
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
import { Search, Edit, Trash, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AddProductForm from '@/components/manager/AddProductForm';
import { Product } from '@/types/product';

const InventoryManagement: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Product 1',
      description: 'This is a description for Product 1',
      category: 'Electronics',
      price: 199.99,
      stock: 45,
      sku: 'ELEC-001',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
      rating: 4.5,
      ratingCount: 156,
      brand: 'TechPro'
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'This is a description for Product 2',
      category: 'Clothing',
      price: 39.99,
      stock: 78,
      sku: 'CLTH-002',
      image: 'https://images.unsplash.com/photo-1588286840104-8957b019727f',
      rating: 4.2,
      ratingCount: 78,
      brand: 'UrbanStyle'
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'This is a description for Product 3',
      category: 'Home & Kitchen',
      price: 59.99,
      stock: 12,
      sku: 'HOME-003',
      image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a',
      rating: 4.7,
      ratingCount: 203,
      brand: 'HomeChef'
    },
    {
      id: 4,
      name: 'Product 4',
      description: 'This is a description for Product 4',
      category: 'Electronics',
      price: 299.99,
      stock: 30,
      sku: 'ELEC-004',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      rating: 4.8,
      ratingCount: 412,
      brand: 'TechPro'
    },
    {
      id: 5,
      name: 'Product 5',
      description: 'This is a description for Product 5',
      category: 'Books',
      price: 19.99,
      stock: 5,
      sku: 'BOOK-005',
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27',
      rating: 4.3,
      ratingCount: 89,
      brand: 'ArtVibe'
    }
  ]);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = (newProduct: Product) => {
    setProducts([...products, newProduct]);
  };

  const handleEditProduct = (id: number | string) => {
    const numericId = typeof id === 'string' ? parseInt(id) : id;
    console.log(`Editing product ${numericId}`);
    toast({
      title: "Edit Product",
      description: `Editing details for product ${numericId}`,
    });
  };

  const handleDeleteProduct = (id: number | string) => {
    const numericId = typeof id === 'string' ? parseInt(id) : id;
    console.log(`Deleting product ${numericId}`);
    
    // For demo purposes, just remove from the local state
    setProducts(products.filter(product => product.id !== numericId));
    
    toast({
      title: "Product Deleted",
      description: "The product has been removed from inventory",
    });
  };

  // Function to determine stock status and styling
  const getStockStatus = (stock: number) => {
    if (stock <= 5) {
      return {
        label: "Low",
        className: "text-red-600 bg-red-100 border-red-200"
      };
    } else if (stock <= 20) {
      return {
        label: "Medium",
        className: "text-yellow-600 bg-yellow-100 border-yellow-200"
      };
    } else {
      return {
        label: "Good",
        className: "text-green-600 bg-green-100 border-green-200"
      };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
      </div>
      
      <AddProductForm onProductAdded={handleAddProduct} />
      
      <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
        <Input
          type="search"
          placeholder="Search products..."
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
          <CardTitle>Products Inventory</CardTitle>
          <CardDescription>Manage your product inventory and stock levels.</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No products found matching your search.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => {
                  const stockStatus = getStockStatus(product.stock);
                  return (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.sku}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${stockStatus.className}`}>
                            {product.stock} - {stockStatus.label}
                          </span>
                          {product.stock <= 5 && (
                            <AlertTriangle className="h-4 w-4 ml-2 text-yellow-500" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditProduct(product.id)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Stats</CardTitle>
          <CardDescription>Quick overview of your inventory status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <div className="text-green-600 text-sm font-medium mb-1">In Stock</div>
              <div className="text-2xl font-bold">{products.filter(p => p.stock > 5).length} Products</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
              <div className="text-yellow-600 text-sm font-medium mb-1">Low Stock</div>
              <div className="text-2xl font-bold">{products.filter(p => p.stock > 0 && p.stock <= 5).length} Products</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
              <div className="text-red-600 text-sm font-medium mb-1">Out of Stock</div>
              <div className="text-2xl font-bold">{products.filter(p => p.stock === 0).length} Products</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryManagement;
