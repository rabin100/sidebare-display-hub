import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Filter, 
  ChevronDown, 
  SlidersHorizontal, 
  X,
  Check 
} from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { useSearchParams } from 'react-router-dom';

const allProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    rating: 4.8,
    ratingCount: 356,
    onSale: true,
    salePrice: 129.99,
    category: 'Electronics',
    brand: 'SoundBeats'
  },
  {
    id: 2,
    name: 'Premium Laptop',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    rating: 4.9,
    ratingCount: 412,
    onSale: false,
    category: 'Electronics',
    brand: 'TechPro'
  },
  {
    id: 3,
    name: 'Smart Watch',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1549482199-bc1ca6f58502',
    rating: 4.7,
    ratingCount: 284,
    onSale: true,
    salePrice: 249.99,
    category: 'Wearables',
    brand: 'SmartLife'
  },
  {
    id: 4,
    name: 'Modern Desk Chair',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1596162954151-cdcb4c0f70a8',
    rating: 4.6,
    ratingCount: 178,
    onSale: false,
    category: 'Furniture',
    brand: 'ComfortPlus'
  },
  {
    id: 5,
    name: 'Wireless Mouse',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1611366652918-63ec707e5c3e',
    rating: 4.5,
    ratingCount: 156,
    onSale: false,
    category: 'Electronics',
    brand: 'TechPro'
  },
  {
    id: 6,
    name: 'Mechanical Keyboard',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef',
    rating: 4.8,
    ratingCount: 203,
    onSale: true,
    salePrice: 99.99,
    category: 'Electronics',
    brand: 'KeyMaster'
  },
  {
    id: 7,
    name: 'Coffee Table',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1588784189346-9eb9d5509303',
    rating: 4.4,
    ratingCount: 124,
    onSale: false,
    category: 'Furniture',
    brand: 'HomeDesign'
  },
  {
    id: 8,
    name: 'Fitness Tracker',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6',
    rating: 4.6,
    ratingCount: 187,
    onSale: true,
    salePrice: 69.99,
    category: 'Wearables',
    brand: 'FitLife'
  },
];

const ProductsPage: React.FC = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState(allProducts);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({ min: '', max: '' });
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = [...new Set(allProducts.map(p => p.category))];
  const brands = [...new Set(allProducts.map(p => p.brand))];
  
  const [filters, setFilters] = useState({
    categories: [] as string[],
    brands: [] as string[],
    onSale: false,
  });
  
  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setSearchQuery(search);
      filterProductsBySearch(search);
    } else {
      setProducts(allProducts);
    }
  }, [searchParams]);
  
  const filterProductsBySearch = (query: string) => {
    if (!query.trim()) return allProducts;
    
    const lowercaseQuery = query.toLowerCase();
    const filtered = allProducts.filter(product => 
      product.name.toLowerCase().includes(lowercaseQuery) || 
      product.category.toLowerCase().includes(lowercaseQuery) || 
      product.brand.toLowerCase().includes(lowercaseQuery)
    );
    
    setProducts(filtered);
  };
  
  const toggleFilter = (type: 'categories' | 'brands', value: string) => {
    setFilters(prev => {
      const currentValues = [...prev[type]];
      const index = currentValues.indexOf(value);
      
      if (index === -1) {
        currentValues.push(value);
      } else {
        currentValues.splice(index, 1);
      }
      
      return {
        ...prev,
        [type]: currentValues
      };
    });
  };
  
  const handleAddToCart = (productId: number, productName: string) => {
    toast({
      title: "Added to cart",
      description: `${productName} has been added to your cart.`,
    });
  };
  
  const handleAddToWishlist = (productId: number, productName: string) => {
    toast({
      title: "Added to wishlist",
      description: `${productName} has been added to your wishlist.`,
    });
  };
  
  const applyFilters = () => {
    let filtered = searchQuery ? [...products] : [...allProducts];
    
    // Filter by categories
    if (filters.categories.length > 0) {
      filtered = filtered.filter(p => filters.categories.includes(p.category));
    }
    
    // Filter by brands
    if (filters.brands.length > 0) {
      filtered = filtered.filter(p => filters.brands.includes(p.brand));
    }
    
    // Filter by price range
    if (priceRange.min && priceRange.max) {
      const min = parseFloat(priceRange.min);
      const max = parseFloat(priceRange.max);
      
      if (!isNaN(min) && !isNaN(max)) {
        filtered = filtered.filter(p => {
          const priceToCheck = p.onSale ? p.salePrice! : p.price;
          return priceToCheck >= min && priceToCheck <= max;
        });
      }
    } else if (priceRange.min) {
      const min = parseFloat(priceRange.min);
      if (!isNaN(min)) {
        filtered = filtered.filter(p => {
          const priceToCheck = p.onSale ? p.salePrice! : p.price;
          return priceToCheck >= min;
        });
      }
    } else if (priceRange.max) {
      const max = parseFloat(priceRange.max);
      if (!isNaN(max)) {
        filtered = filtered.filter(p => {
          const priceToCheck = p.onSale ? p.salePrice! : p.price;
          return priceToCheck <= max;
        });
      }
    }
    
    // Filter by sale status
    if (filters.onSale) {
      filtered = filtered.filter(p => p.onSale);
    }
    
    setProducts(filtered);
  };
  
  const resetFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      onSale: false,
    });
    setPriceRange({ min: '', max: '' });
    
    if (searchQuery) {
      filterProductsBySearch(searchQuery);
    } else {
      setProducts(allProducts);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
          </h1>
          <p className="text-gray-500">{products.length} products found</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
          </Button>
          
          <Select defaultValue="featured">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {showFilters && (
          <div className="w-full md:w-64 flex-shrink-0 bg-white p-5 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </h2>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0"
                onClick={resetFilters}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="flex items-center gap-2">
                  <Input 
                    type="number" 
                    placeholder="Min" 
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                    className="h-9"
                  />
                  <span>-</span>
                  <Input 
                    type="number" 
                    placeholder="Max" 
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                    className="h-9"
                  />
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`category-${category}`} 
                        checked={filters.categories.includes(category)}
                        onCheckedChange={() => toggleFilter('categories', category)}
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-3">Brands</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`brand-${brand}`} 
                        checked={filters.brands.includes(brand)}
                        onCheckedChange={() => toggleFilter('brands', brand)}
                      />
                      <label
                        htmlFor={`brand-${brand}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="sale-only" 
                  checked={filters.onSale}
                  onCheckedChange={() => setFilters(prev => ({ ...prev, onSale: !prev.onSale }))}
                />
                <label
                  htmlFor="sale-only"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  On Sale Only
                </label>
              </div>
              
              <Button className="w-full" onClick={applyFilters}>
                Apply Filters
              </Button>
            </div>
          </div>
        )}
        
        <div className="flex-1">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="group overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button 
                      className="absolute top-3 right-3 h-8 w-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors"
                      onClick={() => handleAddToWishlist(product.id, product.name)}
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                    {product.onSale && (
                      <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
                        Sale
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-xs text-gray-500">({product.ratingCount})</span>
                    </div>
                    <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      {product.onSale ? (
                        <>
                          <span className="font-semibold">${product.salePrice}</span>
                          <span className="text-gray-500 line-through text-sm">${product.price}</span>
                        </>
                      ) : (
                        <span className="font-semibold">${product.price}</span>
                      )}
                    </div>
                    <Button 
                      className="w-full gap-2"
                      onClick={() => handleAddToCart(product.id, product.name)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-white p-10 rounded-lg text-center">
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your filters or search criteria</p>
              <Button variant="outline" onClick={resetFilters}>Reset Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
