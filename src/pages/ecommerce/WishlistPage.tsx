
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Trash2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
}

const WishlistPage: React.FC = () => {
  const { toast } = useToast();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: '1',
      name: 'Wireless Headphones',
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b',
      inStock: true
    },
    {
      id: '2',
      name: 'Smart Watch',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
      inStock: true
    },
    {
      id: '3',
      name: 'Laptop Stand',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1611077544882-3a5b97f58309',
      inStock: false
    },
    {
      id: '4',
      name: 'Wireless Mouse',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7',
      inStock: true
    }
  ]);

  const removeFromWishlist = (id: string) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
    toast({
      title: "Item Removed",
      description: "The item has been removed from your wishlist."
    });
  };

  const addToCart = (item: WishlistItem) => {
    console.log('Added to cart:', item);
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`
    });
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    toast({
      title: "Wishlist Cleared",
      description: "All items have been removed from your wishlist."
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Wishlist</h1>
            <p className="text-gray-600 mt-1">{wishlistItems.length} items saved</p>
          </div>
          
          <div className="flex mt-4 md:mt-0">
            {wishlistItems.length > 0 && (
              <Button variant="outline" className="mr-2" onClick={clearWishlist}>
                <Trash2 className="mr-2 h-4 w-4" />
                Clear Wishlist
              </Button>
            )}
            <Button asChild>
              <Link to="/products">
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
        
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map(item => (
              <Card key={item.id} className="overflow-hidden h-full">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-48 object-cover"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 bg-white rounded-full hover:bg-red-50" 
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1 line-clamp-1">{item.name}</h3>
                  <p className="font-bold text-lg mb-3">${item.price.toFixed(2)}</p>
                  
                  {item.inStock ? (
                    <Button 
                      className="w-full" 
                      onClick={() => addToCart(item)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  ) : (
                    <Button disabled variant="outline" className="w-full">
                      <AlertCircle className="mr-2 h-4 w-4" />
                      Out of Stock
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <Heart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Add items you love to your wishlist. Review them anytime and easily move them to the cart.</p>
            <Button asChild>
              <Link to="/products">
                Start Shopping
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
