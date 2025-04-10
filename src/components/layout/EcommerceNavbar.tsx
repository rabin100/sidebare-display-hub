
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, ShoppingBag, Tag, Heart, Info, Mail } from 'lucide-react';

const EcommerceNavbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200 py-4 px-6 w-full">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="font-bold text-2xl tracking-tight text-blue-600">ShopHub</span>
        </NavLink>
        
        <div className="hidden md:flex items-center space-x-8">
          {[
            { path: "/", icon: Home, label: "Home" },
            { path: "/products", icon: ShoppingBag, label: "Products" },
            { path: "/categories", icon: Tag, label: "Categories" },
            { path: "/wishlist", icon: Heart, label: "Wishlist" },
            { path: "/about", icon: Info, label: "About Us" },
            { path: "/contact", icon: Mail, label: "Contact Us" },
          ].map((item) => (
            <NavLink 
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-2 px-2 py-1 rounded-md transition-colors text-gray-700 hover:text-blue-600",
                isActive ? "text-blue-600 font-medium" : ""
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default EcommerceNavbar;
