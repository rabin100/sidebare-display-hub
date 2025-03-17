
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const featuredProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    rating: 4.8,
    ratingCount: 356,
    onSale: true,
    salePrice: 129.99,
  },
  {
    id: 2,
    name: 'Premium Laptop',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    rating: 4.9,
    ratingCount: 412,
    onSale: false,
  },
  {
    id: 3,
    name: 'Smart Watch',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1549482199-bc1ca6f58502',
    rating: 4.7,
    ratingCount: 284,
    onSale: true,
    salePrice: 249.99,
  },
  {
    id: 4,
    name: 'Modern Desk Chair',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1596162954151-cdcb4c0f70a8',
    rating: 4.6,
    ratingCount: 178,
    onSale: false,
  },
];

const HomePage: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <section className="relative rounded-xl overflow-hidden h-[400px] flex items-center">
        <img 
          src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" 
          alt="E-commerce Banner" 
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
        <div className="relative z-10 ml-8 md:ml-16 max-w-xl text-white">
          <Badge className="bg-blue-500 hover:bg-blue-600 mb-4">New Collection</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Summer Collection 2023</h1>
          <p className="text-lg opacity-90 mb-6">
            Discover our latest products with amazing deals and discounts.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            Shop Now
          </Button>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Featured Products</h2>
          <Link to="/products" className="text-blue-500 hover:text-blue-700">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button className="absolute top-3 right-3 h-8 w-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors">
                  <Heart className="h-4 w-4" />
                </button>
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
                      <span className="font-semibold">${product.salePrice}</span>
                      <span className="text-gray-500 line-through text-sm">${product.price}</span>
                    </>
                  ) : (
                    <span className="font-semibold">${product.price}</span>
                  )}
                </div>
                <Button className="w-full gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <Card key={index} className="text-center p-6 hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default HomePage;
