
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, ChevronLeft, ChevronRight, Settings, BarChart3, FileText, Mail } from 'lucide-react';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside className={cn(
      "bg-white border-r border-admin-border h-screen transition-all duration-300 ease-in-out",
      collapsed ? "w-[70px]" : "w-[240px]",
      "flex flex-col",
      className
    )}>
      <div className="h-16 flex items-center justify-between px-4 border-b border-admin-border">
        <div className={cn("overflow-hidden flex items-center", collapsed ? "justify-center w-full" : "")}>
          {!collapsed && (
            <span className="font-semibold text-lg tracking-tight animate-fade-in">Admin</span>
          )}
          {collapsed && (
            <span className="font-semibold text-lg animate-fade-in">A</span>
          )}
        </div>
        <button 
          onClick={toggleSidebar}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-admin-accent premium-transition text-admin-secondary"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {[
            { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
            { path: "/admin/account-requests", icon: Users, label: "Account Requests" },
            { path: "/admin/analytics", icon: BarChart3, label: "Analytics" },
            { path: "/admin/reports", icon: FileText, label: "Reports" },
            { path: "/admin/messages", icon: Mail, label: "Messages" },
          ].map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md premium-transition",
                  collapsed ? "justify-center" : "",
                  isActive 
                    ? "bg-admin-accent text-admin-primary font-medium" 
                    : "text-admin-secondary hover:bg-admin-accent/60"
                )}
              >
                <item.icon className={cn("h-5 w-5", collapsed ? "" : "min-w-5")} />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
        
        <div className="mt-auto">
          <div className="border-t border-admin-border pt-4 mt-4 px-2">
            <NavLink 
              to="/admin/settings"
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 rounded-md premium-transition",
                collapsed ? "justify-center" : "",
                isActive 
                  ? "bg-admin-accent text-admin-primary font-medium" 
                  : "text-admin-secondary hover:bg-admin-accent/60"
              )}
            >
              <Settings className={cn("h-5 w-5", collapsed ? "" : "min-w-5")} />
              {!collapsed && <span className="truncate">Settings</span>}
            </NavLink>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
