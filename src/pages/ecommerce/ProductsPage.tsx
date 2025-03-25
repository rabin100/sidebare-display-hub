import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Filter, ShoppingCart } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/useCart';
import { useProductFilter } from '@/hooks/useProductFilter';
import ProductCard from '@/components/ecommerce/ProductCard';
import FilterSidebar from '@/components/ecommerce/FilterSidebar';
import CartDialog from '@/components/ecommerce/CartDialog';
import ProductQuantityDialog from '@/components/ecommerce/ProductQuantityDialog';
import { Product } from '@/types/product';

const ProductsPage: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
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
  } = useProductFilter();

  const {
    cart,
    showCheckoutDialog,
    setShowCheckoutDialog,
    cartTotal,
    cartItemCount,
    handleAddToCart,
    handleViewCart,
    handleClearCart,
    handleRemoveItem,
    handleUpdateQuantity,
    handleCheckout,
    handlePlaceOrderDirectly,
    handleBuyNow
  } = useCart();

  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [quantity, setQuantity] = React.useState(1);
  const [sortOption, setSortOption] = React.useState("featured");

  const handleAddToCartClick = (productId: number, productName: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setQuantity(1);
    } else {
      toast({
        title: "Added to cart",
        description: `${productName} has been added to your cart.`,
      });
    }
  };
  
  const confirmAddToCart = () => {
    if (!selectedProduct) return;
    handleAddToCart(selectedProduct, quantity);
    setSelectedProduct(null);
    setQuantity(1);
  };
  
  const handleBuyNowClick = (productId: number) => {
    const isLoggedIn = false;

    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please log in to purchase products",
        variant: "default"
      });
      navigate('/login');
      return;
    }

    const product = products.find(p => p.id === productId);
    if (product) {
      handleBuyNow(product);
    }
  };

  const handleSaleToggle = (value: boolean) => {
    setFilters(prev => ({ ...prev, onSale: value }));
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  const sortedProducts = React.useMemo(() => {
    let sorted = [...products];
    
    switch(sortOption) {
      case "price-low":
        sorted.sort((a, b) => {
          const aPrice = a.onSale ? (a.salePrice || a.price) : a.price;
          const bPrice = b.onSale ? (b.salePrice || b.price) : b.price;
          return aPrice - bPrice;
        });
        break;
      case "price-high":
        sorted.sort((a, b) => {
          const aPrice = a.onSale ? (a.salePrice || a.price) : a.price;
          const bPrice = b.onSale ? (b.salePrice || b.price) : b.price;
          return bPrice - aPrice;
        });
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        sorted.sort((a, b) => b.id - a.id);
        break;
      default: // "featured"
        break;
    }
    
    return sorted;
  }, [products, sortOption]);

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Electronics Products</h1>
          <p className="text-gray-500">{sortedProducts.length} products found</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {cart.length > 0 && (
            <Button 
              className="gap-2"
              onClick={handleViewCart}
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Cart ({cartItemCount})</span>
              <span className="font-bold">${cartTotal.toFixed(2)}</span>
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
          </Button>
          
          <Select value={sortOption} onValueChange={handleSortChange}>
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
          <FilterSidebar
            categories={['Electronics']}
            brands={brands}
            priceRange={priceRange}
            filters={filters}
            onPriceRangeChange={setPriceRange}
            onToggleFilter={toggleFilter}
            onSaleToggle={handleSaleToggle}
            onApplyFilters={applyFilters}
            onResetFilters={resetFilters}
          />
        )}
        
        <div className="flex-1">
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCartClick}
                  onBuyNow={handleBuyNowClick}
                />
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

      <ProductQuantityDialog
        product={selectedProduct}
        quantity={quantity}
        onQuantityChange={setQuantity}
        onConfirm={confirmAddToCart}
        onCancel={() => setSelectedProduct(null)}
      />

      <CartDialog
        open={showCheckoutDialog}
        onOpenChange={setShowCheckoutDialog}
        cart={cart}
        onClearCart={handleClearCart}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
        onPlaceOrderDirectly={handlePlaceOrderDirectly}
        cartTotal={cartTotal}
      />
    </div>
  );
};

export default ProductsPage;
