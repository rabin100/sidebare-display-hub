
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Tag, ShoppingBag, Laptop, Watch, ChevronRight, Home as HomeIcon, Shirt, Headphones, Camera, GameController } from 'lucide-react';

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
    icon: GameController,
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
      <h1 className="text-2xl font-semibold mb-6">Product Categories</h1>
      
      <section className="mb-12">
        <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
          <Tag className="h-5 w-5" />
          Featured Categories
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCategories.map((category) => (
            <Link to={`/products?category=${category.id}`} key={category.id}>
              <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                <div className="h-48 relative">
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h3 className="text-white text-xl font-medium">{category.name}</h3>
                  </div>
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">{category.productCount} products</p>
                    <category.icon className="h-5 w-5 text-gray-500" />
                  </div>
                  <p className="text-gray-700 mt-2">{category.description}</p>
                  <div className="mt-3 flex items-center text-blue-500 font-medium hover:text-blue-600">
                    <span>Browse products</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-medium mb-4">All Categories</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {otherCategories.map((category) => (
            <Link 
              to={`/products?category=${category.id}`} 
              key={category.id}
              className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-sm transition-all flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                <category.icon className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.productCount} products</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CategoriesPage;
