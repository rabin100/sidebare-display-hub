
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Trash2, ChevronLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { allProducts } from '@/types/product';

// Get some products for wishlist items from our product data
const initialWishlistItems = [
  {
    id: 1,
    name: allProducts[0].name,
    price: allProducts[0].price,
    image: allProducts[0].image,
    category: allProducts[0].category,
    inStock: true
  },
  {
    id: 3,
    name: allProducts[2].name,
    price: allProducts[2].price,
    image: allProducts[2].image,
    category: allProducts[2].category,
    inStock: true
  },
  {
    id: 8,
    name: allProducts[7].name,
    price: allProducts[7].price,
    image: allProducts[7].image,
    category: allProducts[7].category,
    inStock: false
  },
  {
    id: 16,
    name: allProducts[15].name,
    price: allProducts[15].price,
    image: allProducts[15].image,
    category: allProducts[15].category,
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
    <div className="w-full animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
                <ChevronLeft className="h-4 w-4 rotate-180" />
                <span>Wishlist</span>
              </div>
              <h1 className="text-3xl font-bold">My Wishlist</h1>
              <p className="text-gray-600 mt-1">Items you've saved for later</p>
            </div>
            <Badge variant="outline" className="px-3 py-1.5 text-sm">
              <Heart className="h-4 w-4 text-red-500 mr-1.5" />
              {wishlistItems.length} items
            </Badge>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {wishlistItems.length === 0 ? (
            <Card className="text-center p-12 max-w-lg mx-auto">
              <CardContent>
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
                    <Heart className="h-10 w-10 text-gray-300" />
                  </div>
                </div>
                <h2 className="text-2xl font-semibold mb-3">Your wishlist is empty</h2>
                <p className="text-gray-600 mb-8">
                  Browse our products and add your favorites to your wishlist!
                </p>
                <Button asChild size="lg">
                  <Link to="/products">Browse Products</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {wishlistItems.map((item) => (
                <Card key={item.id} className="overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 bg-white rounded-full h-8 w-8 opacity-90 hover:opacity-100"
                      onClick={() => handleRemoveFromWishlist(item.id)}
                    >
                      <Trash2 className="h-4 w-4 text-gray-700" />
                    </Button>
                  </div>
                  <CardContent className="p-5">
                    <Badge variant="secondary" className="mb-2">
                      {item.category}
                    </Badge>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-1">{item.name}</h3>
                    <p className="font-bold text-blue-600 mb-3">${item.price.toFixed(2)}</p>
                    <div className="mb-4">
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
                    <Button 
                      className="w-full" 
                      disabled={!item.inStock}
                      onClick={() => handleAddToCart(item.id, item.name)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Product Recommendations */}
      {wishlistItems.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {allProducts.slice(10, 14).map(product => (
                <Card key={product.id} className="overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 bg-white rounded-full h-8 w-8 opacity-90 hover:opacity-100"
                    >
                      <Heart className="h-4 w-4 text-gray-700" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-1">{product.name}</h3>
                    <p className="font-bold text-blue-600">${product.price.toFixed(2)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default WishlistPage;
