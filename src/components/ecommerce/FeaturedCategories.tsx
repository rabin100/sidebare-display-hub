
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const categories = [
  { name: 'Laptops', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f', icon: '💻' },
  { name: 'Smartphones', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158', icon: '📱' },
  { name: 'Smart Home', image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81', icon: '🏠' },
  { name: 'Accessories', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5', icon: '🎧' }
];

const FeaturedCategories: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Popular Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our most popular tech categories and find exactly what you're looking for
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
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
  );
};

export default FeaturedCategories;
