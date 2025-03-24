
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EcommerceHeaderProps {
  className?: string;
}

const EcommerceHeader: React.FC<EcommerceHeaderProps> = ({ className }) => {
  const { user, logout, isAuthenticated } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  return (
    <header className={cn("bg-white border-b border-gray-200", className)}>
      <div className="max-w-[1600px] mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-semibold text-xl">ShopHub</span>
          </Link>
          
          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Input 
                placeholder="Search for products..." 
                className="pl-10 py-2"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex md:hidden">
              <Button size="icon" variant="ghost">
                <Search className="h-5 w-5" />
              </Button>
            </div>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <User className="h-5 w-5" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="font-normal text-sm text-muted-foreground">Signed in as</div>
                    <div>{user?.name}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/customer">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/customer/orders">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/customer/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/customer-login')}
              >
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}
            
            <Link to="/products">
              <Button variant="default" size="sm">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default EcommerceHeader;
