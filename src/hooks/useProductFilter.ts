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

export const useProductFilter = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>(
    allProducts.filter(p => p.category === 'Electronics')
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
    
    let filteredProducts = [...allProducts];
    
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
        
        filteredProducts = filteredProducts.filter(p => 
          p.category.toLowerCase() === category.toLowerCase()
        );
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
    let filtered = [...allProducts];
    
    if (filters.categories.length > 0) {
      filtered = filtered.filter(p => filters.categories.includes(p.category));
    }
    
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
      categories: [],
      brands: [],
      onSale: false,
    });
    setPriceRange({ min: '', max: '' });
    
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      const filtered = allProducts.filter(product => 
        product.name.toLowerCase().includes(lowercaseQuery) || 
        product.category.toLowerCase().includes(lowercaseQuery) || 
        product.brand.toLowerCase().includes(lowercaseQuery)
      );
      setProducts(filtered);
    } else {
      setProducts(allProducts);
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
