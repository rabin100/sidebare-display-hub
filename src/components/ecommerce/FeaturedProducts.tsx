
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, ChevronRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { allProducts } from '@/types/product';

const FeaturedProducts: React.FC = () => {
  const { toast } = useToast();
  const featuredProducts = allProducts.slice(0, 8);

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: "This product has been added to your cart",
    });
  };

  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: "This product has been added to your wishlist",
    });
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <p className="text-gray-600 mt-2">Our most popular products this week</p>
          </div>
          <Link to="/products" className="flex items-center text-blue-600 hover:text-blue-800 gap-2 group">
            <span>View All Products</span>
            <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-shadow border border-gray-200 h-full">
              <div className="relative">
                <Link to={`/products/${product.id}`}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-60 object-contain bg-gray-50 p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                {product.onSale && (
                  <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
                    Sale
                  </Badge>
                )}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-3 right-3 bg-white/80 hover:bg-white h-8 w-8 rounded-full"
                  onClick={handleAddToWishlist}
                >
                  <Heart className="h-4 w-4 text-gray-700" />
                </Button>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-xs text-gray-500">({product.ratingCount})</span>
                </div>
                <h3 className="font-medium text-lg mb-1 line-clamp-2">{product.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  {product.onSale ? (
                    <>
                      <span className="font-semibold">ETB {product.salePrice?.toFixed(2)}</span>
                      <span className="text-gray-500 line-through text-sm">ETB {product.price.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="font-semibold">ETB {product.price.toFixed(2)}</span>
                  )}
                </div>
                <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700" onClick={handleAddToCart}>
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
