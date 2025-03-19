
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  ShoppingBag, 
  Clock, 
  CreditCard, 
  MessageSquare, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  UserCircle, 
  Settings 
} from 'lucide-react';

interface CustomerSidebarProps {
  className?: string;
}

const CustomerSidebar: React.FC<CustomerSidebarProps> = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside className={cn(
      "bg-white border-r border-gray-200 min-h-screen transition-all duration-300 ease-in-out flex flex-col sticky top-0",
      collapsed ? "w-[70px]" : "w-[240px]",
      className
    )}>
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        <div className={cn("overflow-hidden flex items-center", collapsed ? "justify-center w-full" : "")}>
          {!collapsed && (
            <span className="font-semibold text-lg tracking-tight animate-fade-in">Customer Panel</span>
          )}
          {collapsed && (
            <span className="font-semibold text-lg animate-fade-in">C</span>
          )}
        </div>
        <button 
          onClick={toggleSidebar}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-500"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {[
            { path: "/customer", icon: UserCircle, label: "Dashboard" },
            { path: "/customer/orders", icon: ShoppingBag, label: "My Orders" },
            { path: "/customer/order-history", icon: Clock, label: "Order History" },
            { path: "/customer/payments", icon: CreditCard, label: "Payments" },
            { path: "/customer/feedback", icon: MessageSquare, label: "Feedback" },
            { path: "/customer/browse-products", icon: Search, label: "Browse Products" },
            { path: "/customer/settings", icon: Settings, label: "Account Settings" },
          ].map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  collapsed ? "justify-center" : "",
                  isActive 
                    ? "bg-blue-50 text-blue-500 font-medium" 
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <item.icon className={cn("h-5 w-5", collapsed ? "" : "min-w-5")} />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default CustomerSidebar;
