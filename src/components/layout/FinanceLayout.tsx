
import React from 'react';
import { Outlet } from 'react-router-dom';
import FinanceSidebar from './FinanceSidebar';
import { Bell, User, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const FinanceLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <FinanceSidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b h-16 flex items-center justify-between px-6">
          <div className="flex items-center gap-4 w-full max-w-md">
            <Search className="h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search transactions, invoices..." 
              className="border-none shadow-none focus-visible:ring-0 bg-gray-50 h-9"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>FM</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 bg-gray-50 p-6">
          <Outlet />
        </main>
        <footer className="bg-white border-t py-4 px-6 text-center text-sm text-gray-500">
          <p>© 2023 Finance Portal. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default FinanceLayout;
