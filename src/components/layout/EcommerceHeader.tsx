
import React, { useState } from 'react';
import { Search, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface EcommerceHeaderProps {
  className?: string;
}

const EcommerceHeader: React.FC<EcommerceHeaderProps> = ({ className }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const isHomePage = location.pathname === '/';
  const isLoggedIn = localStorage.getItem('currentUser') !== null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    }
  };
  
  const handleLogout = () => {
    // In a real app, this would clear authentication tokens/cookies
    localStorage.removeItem('currentUser');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
    // Redirect to home page
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-10 h-10 rounded-full p-0">
              <User className="h-5 w-5 text-gray-700" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-1 bg-white">
            {!isLoggedIn ? (
              <>
                <DropdownMenuItem asChild className="cursor-pointer" onClick={handleLogin}>
                  <Link to="/login" className="flex items-center">
                    <span>Login</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/signup" className="flex items-center">
                    <span>Sign Up</span>
                  </Link>
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/customer/settings" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Edit Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default EcommerceHeader;
