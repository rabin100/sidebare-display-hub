
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number, productName: string) => void;
  onBuyNow: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onBuyNow }) => {
  return (
    <Card className="group overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />
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
              <span className="font-semibold">ETB {product.salePrice}</span>
              <span className="text-gray-500 line-through text-sm">ETB {product.price}</span>
            </>
          ) : (
            <span className="font-semibold">ETB {product.price}</span>
          )}
        </div>
        <div className="flex gap-2">
          <Button 
            className="flex-1 gap-2"
            onClick={() => onAddToCart(product.id, product.name)}
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
          <Button 
            variant="outline"
            onClick={() => onBuyNow(product.id)}
          >
            Buy Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
