
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Tag, ShoppingBag, Laptop, Watch, ChevronRight, Home as HomeIcon, Shirt, Headphones, Camera, Gamepad } from 'lucide-react';
import { getCategories } from '@/types/product';

const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Computers, phones, and other electronic devices',
    icon: Laptop,
    productCount: 24,
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661',
    featured: true
  },
  {
    id: 'wearables',
    name: 'Wearables',
    description: 'Smart watches, fitness trackers, and wearable tech',
    icon: Watch,
    productCount: 18,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
    featured: true
  },
  {
    id: 'furniture',
    name: 'Furniture',
    description: 'Home furniture, office chairs, and tables',
    icon: HomeIcon,
    productCount: 16,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
    featured: true
  },
  {
    id: 'clothing',
    name: 'Clothing',
    description: 'Men\'s and women\'s fashion, casual wear',
    icon: Shirt,
    productCount: 32,
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f',
    featured: true
  },
  {
    id: 'audio',
    name: 'Audio',
    description: 'Headphones, speakers, and audio equipment',
    icon: Headphones,
    productCount: 14,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b',
    featured: false
  },
  {
    id: 'cameras',
    name: 'Cameras',
    description: 'Digital cameras, lenses, and photography gear',
    icon: Camera,
    productCount: 9,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
    featured: false
  },
  {
    id: 'gaming',
    name: 'Gaming',
    description: 'Video games, consoles, and gaming accessories',
    icon: Gamepad,
    productCount: 21,
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf',
    featured: false
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    description: 'Appliances, utensils, and kitchen gadgets',
    icon: ShoppingBag,
    productCount: 27,
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba',
    featured: false
  },
];

const CategoriesPage: React.FC = () => {
  // Featured categories are the ones we want to highlight
  const featuredCategories = categories.filter(cat => cat.featured);
  const otherCategories = categories.filter(cat => !cat.featured);
  
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative py-20 bg-blue-600">
        <div className="absolute inset-0 opacity-10 bg-pattern"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Browse Our Categories</h1>
            <p className="text-xl text-blue-100 mb-8">
              Explore our wide range of products organized by category to find exactly what you're looking for.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-8 flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Featured Categories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category) => (
              <Link to={`/products?category=${category.id}`} key={category.id} className="group">
                <Card className="overflow-hidden h-full hover:shadow-md transition-shadow border-none">
                  <div className="h-48 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 flex items-end">
                      <div className="p-6">
                        <h3 className="text-white text-xl font-medium">{category.name}</h3>
                        <p className="text-white/80 text-sm mt-1">{category.productCount} products</p>
                      </div>
                    </div>
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <p className="text-gray-700">{category.description}</p>
                      <category.icon className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="mt-3 flex items-center text-blue-600 font-medium group-hover:text-blue-800">
                      <span>Browse products</span>
                      <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-8">All Categories</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {otherCategories.map((category) => (
              <Link 
                to={`/products?category=${category.id}`} 
                key={category.id}
                className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-sm transition-all flex items-center gap-3 group"
              >
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <category.icon className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium group-hover:text-blue-600 transition-colors">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.productCount} products</p>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 ml-auto group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoriesPage;
