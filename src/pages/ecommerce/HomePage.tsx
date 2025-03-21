
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, ChevronRight, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { allProducts } from '@/types/product';

const HomePage: React.FC = () => {
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
    <div className="w-full animate-fade-in">
      {/* Hero Section - Full Screen */}
      <section className="relative w-full h-screen flex items-center">
        <img 
          src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" 
          alt="E-commerce Banner" 
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
        <div className="relative z-10 ml-8 md:ml-16 max-w-xl text-white">
          <Badge className="bg-blue-500 hover:bg-blue-600 mb-4">Summer Collection 2023</Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Discover Your Style</h1>
          <p className="text-xl opacity-90 mb-8">
            Shop the latest trends with amazing deals and exclusive offers.
          </p>
          <div className="flex gap-4">
            <Button size="lg" asChild className="bg-white text-blue-600 hover:bg-gray-100">
              <Link to="/products">Shop Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
              <Link to="/categories">Browse Categories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Shop by Category</h2>
            <Link to="/categories" className="flex items-center text-blue-600 hover:text-blue-800 gap-2 group">
              <span>View All Categories</span>
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Electronics', 'Clothing', 'Home', 'Accessories'].map((category, index) => (
              <Link to={`/products?category=${category}`} key={index} className="group">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/photo-${1500000000000 + index * 1000000}`} 
                      alt={category} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <h3 className="text-white text-xl font-bold p-6">{category}</h3>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/products" className="flex items-center text-blue-600 hover:text-blue-800 gap-2 group">
              <span>View All Products</span>
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden hover:shadow-md transition-shadow h-full">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
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
                  <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    {product.onSale ? (
                      <>
                        <span className="font-semibold">${product.salePrice?.toFixed(2)}</span>
                        <span className="text-gray-500 line-through text-sm">${product.price.toFixed(2)}</span>
                      </>
                    ) : (
                      <span className="font-semibold">${product.price.toFixed(2)}</span>
                    )}
                  </div>
                  <Button className="w-full gap-2" onClick={handleAddToCart}>
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Free Shipping", 
                description: "On all orders over $50",
                icon: "📦"
              },
              { 
                title: "Easy Returns", 
                description: "30-day money back guarantee",
                icon: "🔄"
              },
              { 
                title: "Secure Payments", 
                description: "Protected by industry-leading encryption",
                icon: "🔒"
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-md transition-shadow border-none bg-white">
                <CardContent className="p-0">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="max-w-2xl mx-auto mb-8 text-blue-100">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 text-gray-900 rounded-l-md focus:outline-none"
            />
            <Button className="rounded-l-none bg-blue-800 hover:bg-blue-900">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
