
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  DollarSign, 
  CreditCard, 
  PieChart, 
  FileText, 
  Users, 
  Settings,
  Receipt,
  TrendingUp,
  Activity,
  Banknote,
  Calculator,
  BadgeDollarSign
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, href, active }) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
        active 
          ? "bg-primary text-primary-foreground" 
          : "text-gray-600 hover:bg-gray-100"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const FinanceSidebar: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;
  
  const isActive = (path: string) => pathname === path;
  
  return (
    <div className="hidden md:flex w-64 flex-col border-r bg-white">
      <div className="p-6">
        <h2 className="flex items-center text-lg font-semibold">
          <DollarSign className="h-5 w-5 mr-2 text-primary" />
          Finance Portal
        </h2>
      </div>
      <div className="flex-1 px-4 space-y-1">
        <SidebarItem 
          icon={<PieChart className="h-4 w-4" />} 
          label="Dashboard" 
          href="/finance" 
          active={isActive('/finance')}
        />
        <SidebarItem 
          icon={<CreditCard className="h-4 w-4" />} 
          label="Transactions" 
          href="/finance/transactions" 
          active={isActive('/finance/transactions')}
        />
        <SidebarItem 
          icon={<Receipt className="h-4 w-4" />} 
          label="Invoices" 
          href="/finance/invoices" 
          active={isActive('/finance/invoices')}
        />
        <SidebarItem 
          icon={<TrendingUp className="h-4 w-4" />} 
          label="Revenue" 
          href="/finance/revenue" 
          active={isActive('/finance/revenue')}
        />
        <SidebarItem 
          icon={<Activity className="h-4 w-4" />} 
          label="Reports" 
          href="/finance/reports" 
          active={isActive('/finance/reports')}
        />
        <SidebarItem 
          icon={<Banknote className="h-4 w-4" />} 
          label="Expenses" 
          href="/finance/expenses" 
          active={isActive('/finance/expenses')}
        />
        <SidebarItem 
          icon={<BadgeDollarSign className="h-4 w-4" />} 
          label="Payroll" 
          href="/finance/payroll" 
          active={isActive('/finance/payroll')}
        />
        <SidebarItem 
          icon={<Calculator className="h-4 w-4" />} 
          label="Budgeting" 
          href="/finance/budgeting" 
          active={isActive('/finance/budgeting')}
        />
        <SidebarItem 
          icon={<FileText className="h-4 w-4" />} 
          label="Documents" 
          href="/finance/documents" 
          active={isActive('/finance/documents')}
        />
        <SidebarItem 
          icon={<Users className="h-4 w-4" />} 
          label="Customers" 
          href="/finance/customers" 
          active={isActive('/finance/customers')}
        />
        <SidebarItem 
          icon={<Settings className="h-4 w-4" />} 
          label="Settings" 
          href="/finance/settings" 
          active={isActive('/finance/settings')}
        />
      </div>
    </div>
  );
};

export default FinanceSidebar;
