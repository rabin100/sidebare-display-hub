
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, ChevronRight, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { allProducts } from '@/types/product';
import HomeSlider from '@/components/ecommerce/HomeSlider';

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
      {/* Hero Section with Slider */}
      <section className="relative w-full">
        <HomeSlider />
      </section>

      {/* Featured Categories with Modern Cards */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Popular Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our most popular tech categories and find exactly what you're looking for
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Laptops', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f', icon: '💻' },
              { name: 'Smartphones', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158', icon: '📱' },
              { name: 'Smart Home', image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81', icon: '🏠' },
              { name: 'Accessories', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5', icon: '🎧' }
            ].map((category, index) => (
              <Link to={`/products?category=${category.name}`} key={index} className="group">
                <div className="glass-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full">
                  <div className="h-48 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 text-white">
                      <span className="text-3xl mb-2">{category.icon}</span>
                      <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                      <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                        Shop now <ArrowRight className="h-4 w-4 ml-1 group-hover:ml-2 transition-all" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products with Improved Grid */}
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
                        <span className="font-semibold">${product.salePrice?.toFixed(2)}</span>
                        <span className="text-gray-500 line-through text-sm">${product.price.toFixed(2)}</span>
                      </>
                    ) : (
                      <span className="font-semibold">${product.price.toFixed(2)}</span>
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

      {/* About Our System Section - New */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-blue-500 hover:bg-blue-600 mb-4">About Our System</Badge>
            <h2 className="text-3xl font-bold mb-4">Your Complete Electronics Shopping Solution</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our comprehensive e-commerce platform delivers an intuitive shopping experience with
              secure transactions, detailed product information, and personalized recommendations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <ShoppingCart className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-xl mb-3">Easy Shopping</h3>
                <p className="text-gray-500">
                  Our intuitive interface makes browsing and purchasing electronics a seamless experience.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3">Secure Transactions</h3>
                <p className="text-gray-500">
                  All payments are encrypted and secure, ensuring your personal information stays protected.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <svg className="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3">Fast Delivery</h3>
                <p className="text-gray-500">
                  Get your electronics delivered quickly and efficiently to your doorstep.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                title: "Quality Guaranteed", 
                description: "All our electronics undergo rigorous quality checks before shipping.",
                icon: "⭐"
              },
              { 
                title: "Fast Shipping", 
                description: "Receive your order within 2-3 business days with our express shipping.",
                icon: "🚚"
              },
              { 
                title: "24/7 Support", 
                description: "Our customer service team is available around the clock to assist you.",
                icon: "🛠️"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 hover-lift hover:bg-blue-800/30 rounded-xl transition-all">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-xl mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2">What Our Customers Say</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Trusted by thousands of satisfied customers worldwide</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Tech Enthusiast",
                quote: "The quality of electronics I've purchased here exceeds my expectations. Fast shipping and excellent customer service!",
                rating: 5
              },
              {
                name: "Michael Chen",
                role: "Software Developer",
                quote: "I've been shopping for computer parts here for years. The prices are competitive and the selection is unbeatable.",
                rating: 5
              },
              {
                name: "Emma Rodriguez",
                role: "Smart Home Expert",
                quote: "Their smart home devices have transformed my living space. The team was incredibly helpful with installation advice.",
                rating: 4
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                    ))}
                  </div>
                  <p className="italic text-gray-600 mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold mr-4">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section - Redesigned */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="max-w-2xl mx-auto mb-8 text-blue-100">
            Subscribe to our newsletter for exclusive deals, new product announcements, and tech tips.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 text-gray-900 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <Button className="rounded-l-none bg-blue-900 hover:bg-blue-950">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
