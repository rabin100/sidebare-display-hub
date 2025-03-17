
import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminHeaderProps {
  className?: string;
  title?: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ className, title }) => {
  return (
    <header className={cn(
      "h-16 px-6 border-b border-admin-border bg-white flex items-center justify-between",
      "sticky top-0 z-10 w-full",
      className
    )}>
      <div className="flex items-center gap-4">
        <div className="font-semibold text-xl tracking-tight">{title || "Admin Portal"}</div>
        <div className="hidden md:flex items-center gap-2 ml-8 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-secondary h-4 w-4" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="h-9 w-64 rounded-full bg-admin-accent pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-admin-accent premium-transition relative">
          <Bell className="h-5 w-5 text-admin-secondary" />
          <span className="absolute top-1 right-1.5 w-2 h-2 bg-admin-primary rounded-full"></span>
        </button>
        <div className="w-10 h-10 rounded-full bg-admin-primary flex items-center justify-center text-white">
          <User className="h-5 w-5" />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
