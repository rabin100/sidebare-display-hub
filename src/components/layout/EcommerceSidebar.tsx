
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, ShoppingBag, Tag, Heart, ChevronLeft, ChevronRight, User, Settings } from 'lucide-react';

interface EcommerceSidebarProps {
  className?: string;
}

const EcommerceSidebar: React.FC<EcommerceSidebarProps> = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside className={cn(
      "bg-white border-r border-gray-200 h-screen transition-all duration-300 ease-in-out",
      collapsed ? "w-[70px]" : "w-[240px]",
      "flex flex-col",
      className
    )}>
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        <div className={cn("overflow-hidden flex items-center", collapsed ? "justify-center w-full" : "")}>
          {!collapsed && (
            <span className="font-semibold text-lg tracking-tight animate-fade-in">ShopHub</span>
          )}
          {collapsed && (
            <span className="font-semibold text-lg animate-fade-in">S</span>
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
            { path: "/", icon: Home, label: "Home" },
            { path: "/products", icon: ShoppingBag, label: "Products" },
            { path: "/categories", icon: Tag, label: "Categories" },
            { path: "/wishlist", icon: Heart, label: "Wishlist" },
            { path: "/account", icon: User, label: "My Account" },
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
        
        <div className="mt-auto">
          <div className="border-t border-gray-200 pt-4 mt-4 px-2">
            <NavLink 
              to="/admin"
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                collapsed ? "justify-center" : "",
                isActive 
                  ? "bg-blue-50 text-blue-500 font-medium" 
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <Settings className={cn("h-5 w-5", collapsed ? "" : "min-w-5")} />
              {!collapsed && <span className="truncate">Admin Portal</span>}
            </NavLink>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default EcommerceSidebar;
