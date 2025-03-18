
import React, { useState } from 'react';
import { Bell, Search, ShoppingCart, User, LogIn, UserPlus, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

interface EcommerceHeaderProps {
  className?: string;
}

const EcommerceHeader: React.FC<EcommerceHeaderProps> = ({ className }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className={cn(
      "h-16 px-6 border-b border-gray-200 bg-white flex items-center justify-between",
      "sticky top-0 z-10 w-full",
      className
    )}>
      <div className="flex items-center gap-4">
        <Link to="/" className="font-semibold text-xl tracking-tight">ShopHub</Link>
        <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2 ml-8 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="h-9 w-64 rounded-full bg-gray-100 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>
      
      <div className="flex items-center gap-4">
        <Link to="/wishlist" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
          <Badge variant="outline" className="p-0">
            <Heart className="h-5 w-5 text-gray-700" />
          </Badge>
        </Link>
        <Link to="/cart" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors relative">
          <ShoppingCart className="h-5 w-5 text-gray-700" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">2</Badge>
        </Link>
        <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors relative">
          <Bell className="h-5 w-5 text-gray-700" />
          <span className="absolute top-1 right-1.5 w-2 h-2 bg-blue-500 rounded-full"></span>
        </button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-10 h-10 rounded-full p-0">
              <User className="h-5 w-5 text-gray-700" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-1 bg-white">
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/login" className="flex items-center">
                <LogIn className="mr-2 h-4 w-4" />
                <span>Login</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/signup" className="flex items-center">
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Sign Up</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/admin" className="flex items-center">
                <span>Admin Dashboard</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/manager" className="flex items-center">
                <span>Manager Dashboard</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default EcommerceHeader;
