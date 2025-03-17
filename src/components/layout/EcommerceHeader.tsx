
import React from 'react';
import { Bell, Search, User, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface EcommerceHeaderProps {
  className?: string;
}

const EcommerceHeader: React.FC<EcommerceHeaderProps> = ({ className }) => {
  return (
    <header className={cn(
      "h-16 px-6 border-b border-gray-200 bg-white flex items-center justify-between",
      "sticky top-0 z-10 w-full",
      className
    )}>
      <div className="flex items-center gap-4">
        <Link to="/" className="font-semibold text-xl tracking-tight">ShopHub</Link>
        <div className="hidden md:flex items-center gap-2 ml-8 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="h-9 w-64 rounded-full bg-gray-100 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Link to="/cart" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors relative">
          <ShoppingCart className="h-5 w-5 text-gray-700" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">2</Badge>
        </Link>
        <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors relative">
          <Bell className="h-5 w-5 text-gray-700" />
          <span className="absolute top-1 right-1.5 w-2 h-2 bg-blue-500 rounded-full"></span>
        </button>
        <Link to="/account" className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
          <User className="h-5 w-5" />
        </Link>
      </div>
    </header>
  );
};

export default EcommerceHeader;
