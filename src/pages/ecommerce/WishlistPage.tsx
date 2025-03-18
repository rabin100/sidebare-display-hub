
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

// Sample data for wishlist items
const initialWishlistItems = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 129.99,
    image: "/placeholder.svg",
    category: "Electronics",
    inStock: true
  },
  {
    id: 2,
    name: "Leather Backpack",
    price: 89.99,
    image: "/placeholder.svg",
    category: "Fashion",
    inStock: true
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 199.99,
    image: "/placeholder.svg",
    category: "Electronics",
    inStock: false
  },
  {
    id: 4,
    name: "Organic Cotton T-Shirt",
    price: 34.99,
    image: "/placeholder.svg",
    category: "Clothing",
    inStock: true
  }
];

const WishlistPage: React.FC = () => {
  const { toast } = useToast();
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);

  const handleRemoveFromWishlist = (id: number) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "Item has been removed from your wishlist.",
    });
  };

  const handleAddToCart = (id: number, name: string) => {
    // In a real app, this would add the item to the cart
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <p className="text-gray-600 mt-1">Items you've saved for later</p>
        </div>
        <Badge variant="outline" className="px-3 py-1 text-sm">
          <Heart className="h-4 w-4 text-red-500 mr-1.5" />
          {wishlistItems.length} items
        </Badge>
      </div>

      {wishlistItems.length === 0 ? (
        <Card className="text-center p-12">
          <CardContent>
            <div className="flex justify-center mb-4">
              <Heart className="h-16 w-16 text-gray-300" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">
              Browse our products and add your favorites to your wishlist!
            </p>
            <Button asChild>
              <a href="/products">Browse Products</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white rounded-full h-8 w-8"
                  onClick={() => handleRemoveFromWishlist(item.id)}
                >
                  <Trash2 className="h-4 w-4 text-gray-600" />
                </Button>
              </div>
              <CardContent className="p-4">
                <Badge variant="secondary" className="mb-2">
                  {item.category}
                </Badge>
                <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                <p className="font-bold text-blue-600">${item.price.toFixed(2)}</p>
                <div className="mt-1">
                  {item.inStock ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      In Stock
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      Out of Stock
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button 
                  className="w-full" 
                  disabled={!item.inStock}
                  onClick={() => handleAddToCart(item.id, item.name)}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
