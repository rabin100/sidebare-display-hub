
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product, allProducts, getCategories, getBrands } from '@/types/product';

interface PriceRange {
  min: string;
  max: string;
}

interface Filters {
  categories: string[];
  brands: string[];
  onSale: boolean;
}

// Creating additional electronics products for our catalog
const additionalElectronicsProducts: Product[] = [
  {
    id: 1001,
    name: 'Professional DSLR Camera',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
    rating: 4.8,
    ratingCount: 256,
    onSale: true,
    salePrice: 799.99,
    category: 'Electronics',
    brand: 'PhotoMaster',
    description: 'High-resolution professional DSLR camera with advanced features for photography enthusiasts.',
    stock: 15,
    sku: 'PM-DSLR1001'
  },
  {
    id: 1002,
    name: 'Ultra-Thin Gaming Laptop',
    price: 1599.99,
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
    rating: 4.9,
    ratingCount: 342,
    onSale: false,
    category: 'Electronics',
    brand: 'TechPro',
    description: 'Powerful gaming laptop with dedicated graphics card and high refresh rate display.',
    stock: 8,
    sku: 'TP-GL1002'
  },
  {
    id: 1003,
    name: 'Smart Home Security System',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1558002038-1055e2de583b',
    rating: 4.7,
    ratingCount: 189,
    onSale: true,
    salePrice: 299.99,
    category: 'Electronics',
    brand: 'HomeConnect',
    description: 'Complete smart home security system with cameras, sensors, and mobile app control.',
    stock: 22,
    sku: 'HC-SS1003'
  },
  {
    id: 1004,
    name: 'Premium Noise-Cancelling Headphones',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb',
    rating: 4.8,
    ratingCount: 276,
    onSale: false,
    category: 'Electronics',
    brand: 'SoundBeats',
    description: 'Over-ear headphones with active noise cancellation and premium sound quality.',
    stock: 34,
    sku: 'SB-NCH1004'
  },
  {
    id: 1005,
    name: 'Ultra HD Smart TV',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6',
    rating: 4.6,
    ratingCount: 213,
    onSale: true,
    salePrice: 799.99,
    category: 'Electronics',
    brand: 'TechPro',
    description: '65-inch Ultra HD Smart TV with streaming apps and voice control.',
    stock: 12,
    sku: 'TP-TV1005'
  },
  {
    id: 1006,
    name: 'Portable SSD Drive',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1602664876866-d3b33b423a3e',
    rating: 4.7,
    ratingCount: 178,
    onSale: false,
    category: 'Electronics',
    brand: 'TechPro',
    description: 'Fast, compact portable SSD with 1TB storage capacity and USB-C connectivity.',
    stock: 45,
    sku: 'TP-SSD1006'
  },
  {
    id: 1007,
    name: 'Professional Drone with Camera',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f',
    rating: 4.8,
    ratingCount: 156,
    onSale: true,
    salePrice: 699.99,
    category: 'Electronics',
    brand: 'PhotoMaster',
    description: 'Professional drone with 4K camera, obstacle avoidance, and 30-minute flight time.',
    stock: 9,
    sku: 'PM-DR1007'
  },
  {
    id: 1008,
    name: 'Smart Fitness Watch',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1617043786394-f977fa12eddf',
    rating: 4.6,
    ratingCount: 223,
    onSale: false,
    category: 'Electronics',
    brand: 'SmartLife',
    description: 'Advanced fitness watch with heart rate monitoring, GPS, and sleep tracking.',
    stock: 37,
    sku: 'SL-FW1008'
  },
  {
    id: 1009,
    name: 'Wireless Gaming Mouse',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1563297007-0686b7003af7',
    rating: 4.7,
    ratingCount: 198,
    onSale: true,
    salePrice: 59.99,
    category: 'Electronics',
    brand: 'GameTech',
    description: 'High-precision wireless gaming mouse with customizable RGB lighting.',
    stock: 28,
    sku: 'GT-GM1009'
  },
  {
    id: 1010,
    name: 'Premium Bluetooth Speaker',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1',
    rating: 4.5,
    ratingCount: 167,
    onSale: false,
    category: 'Electronics',
    brand: 'SoundBeats',
    description: 'Portable Bluetooth speaker with rich bass and 24-hour battery life.',
    stock: 42,
    sku: 'SB-BS1010'
  }
];

export const useProductFilter = () => {
  const [searchParams] = useSearchParams();
  // Combine the existing allProducts with our additional electronics products
  const allProductsWithMore = [...allProducts, ...additionalElectronicsProducts];
  
  // Set initial products to just show Electronics category
  const [products, setProducts] = useState<Product[]>(
    allProductsWithMore.filter(p => p.category === 'Electronics')
  );
  
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: '', max: '' });
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = getCategories();
  const brands = getBrands();
  
  const [filters, setFilters] = useState<Filters>({
    categories: ['Electronics'],
    brands: [],
    onSale: false,
  });
  
  useEffect(() => {
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    
    let filteredProducts = [...allProductsWithMore];
    
    // Always filter to show only Electronics products
    filteredProducts = filteredProducts.filter(product => 
      product.category === 'Electronics'
    );
    
    if (search) {
      setSearchQuery(search);
      const lowercaseQuery = search.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(lowercaseQuery) || 
        product.category.toLowerCase().includes(lowercaseQuery) || 
        product.brand.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    if (category) {
      const updatedFilters = { ...filters };
      const categoryName = categories.find(c => c.toLowerCase() === category.toLowerCase());
      
      if (categoryName && !filters.categories.includes(categoryName)) {
        updatedFilters.categories = [categoryName];
        setFilters(updatedFilters);
      }
    }
    
    setProducts(filteredProducts);
  }, [searchParams]);
  
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
  
  const applyFilters = () => {
    // Always start with electronics products
    let filtered = allProductsWithMore.filter(p => p.category === 'Electronics');
    
    if (filters.brands.length > 0) {
      filtered = filtered.filter(p => filters.brands.includes(p.brand));
    }
    
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
    
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(lowercaseQuery) || 
        product.category.toLowerCase().includes(lowercaseQuery) || 
        product.brand.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    if (filters.onSale) {
      filtered = filtered.filter(p => p.onSale);
    }
    
    setProducts(filtered);
  };
  
  const resetFilters = () => {
    setFilters({
      categories: ['Electronics'],  // Keep only Electronics category
      brands: [],
      onSale: false,
    });
    setPriceRange({ min: '', max: '' });
    
    // Reset to all electronics products
    const electronicsProducts = allProductsWithMore.filter(p => p.category === 'Electronics');
    
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      const filtered = electronicsProducts.filter(product => 
        product.name.toLowerCase().includes(lowercaseQuery) || 
        product.brand.toLowerCase().includes(lowercaseQuery)
      );
      setProducts(filtered);
    } else {
      setProducts(electronicsProducts);
    }
  };

  return {
    products,
    showFilters,
    setShowFilters,
    searchQuery,
    priceRange,
    setPriceRange,
    filters,
    categories,
    brands,
    toggleFilter,
    applyFilters,
    resetFilters,
    setFilters
  };
};
