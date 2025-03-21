
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { getCategories, getBrands } from '@/types/product';
import { PlusCircle } from 'lucide-react';

interface AddProductFormProps {
  onProductAdded: (product: any) => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onProductAdded }) => {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: '',
    brand: '',
    price: '',
    stock: '',
    sku: '',
    image: ''
  });

  const categories = getCategories();
  const brands = getBrands();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Create product object
    const product = {
      id: Date.now().toString(),
      name: newProduct.name,
      description: newProduct.description,
      category: newProduct.category,
      brand: newProduct.brand || 'Generic',
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock) || 0,
      sku: newProduct.sku || `SKU-${Date.now()}`,
      image: newProduct.image || 'https://images.unsplash.com/photo-1592150621744-aca64f48394a',
      rating: 0,
      ratingCount: 0
    };
    
    onProductAdded(product);
    
    toast({
      title: "Success",
      description: "Product has been added to inventory",
    });
    
    // Reset form
    setNewProduct({
      name: '',
      description: '',
      category: '',
      brand: '',
      price: '',
      stock: '',
      sku: '',
      image: ''
    });
    
    setIsFormOpen(false);
  };

  return (
    <div className="mb-6">
      {!isFormOpen ? (
        <Button onClick={() => setIsFormOpen(true)} className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Product
        </Button>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={newProduct.name} 
                    onChange={handleInputChange} 
                    placeholder="Enter product name" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input 
                    id="sku" 
                    name="sku" 
                    value={newProduct.sku} 
                    onChange={handleInputChange} 
                    placeholder="Enter product SKU" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    name="category"
                    value={newProduct.category}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <select
                    id="brand"
                    name="brand"
                    value={newProduct.brand}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select Brand</option>
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($) *</Label>
                  <Input 
                    id="price" 
                    name="price" 
                    type="number" 
                    value={newProduct.price} 
                    onChange={handleInputChange} 
                    placeholder="0.00" 
                    min="0" 
                    step="0.01" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input 
                    id="stock" 
                    name="stock" 
                    type="number" 
                    value={newProduct.stock} 
                    onChange={handleInputChange} 
                    placeholder="0" 
                    min="0" 
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input 
                    id="image" 
                    name="image" 
                    value={newProduct.image} 
                    onChange={handleInputChange} 
                    placeholder="Enter image URL" 
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    value={newProduct.description} 
                    onChange={handleInputChange} 
                    placeholder="Enter product description" 
                    rows={3} 
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsFormOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Product</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AddProductForm;
