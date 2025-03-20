
import React from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, X } from 'lucide-react';

interface PriceRange {
  min: string;
  max: string;
}

interface FilterState {
  categories: string[];
  brands: string[];
  onSale: boolean;
}

interface FilterSidebarProps {
  categories: string[];
  brands: string[];
  priceRange: PriceRange;
  filters: FilterState;
  onPriceRangeChange: (range: PriceRange) => void;
  onToggleFilter: (type: 'categories' | 'brands', value: string) => void;
  onSaleToggle: (value: boolean) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  brands,
  priceRange,
  filters,
  onPriceRangeChange,
  onToggleFilter,
  onSaleToggle,
  onApplyFilters,
  onResetFilters
}) => {
  return (
    <div className="w-full md:w-64 flex-shrink-0 bg-white p-5 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </h2>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
          onClick={onResetFilters}
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
              onChange={(e) => onPriceRangeChange({ ...priceRange, min: e.target.value })}
              className="h-9"
            />
            <span>-</span>
            <Input 
              type="number" 
              placeholder="Max" 
              value={priceRange.max}
              onChange={(e) => onPriceRangeChange({ ...priceRange, max: e.target.value })}
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
                  onCheckedChange={() => onToggleFilter('categories', category)}
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
                  onCheckedChange={() => onToggleFilter('brands', brand)}
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
            onCheckedChange={() => onSaleToggle(!filters.onSale)}
          />
          <label
            htmlFor="sale-only"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            On Sale Only
          </label>
        </div>
        
        <Button className="w-full" onClick={onApplyFilters}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;
