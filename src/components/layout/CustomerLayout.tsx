
import React from 'react';
import { Outlet } from 'react-router-dom';
import CustomerSidebar from './CustomerSidebar';
import AdminHeader from './AdminHeader';
import HeaderActions from './HeaderActions';

const CustomerLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full">
      <CustomerSidebar />
      <div className="flex-1 flex flex-col w-full">
        <div className="flex justify-between items-center">
          <AdminHeader title="Customer Dashboard" />
          <div className="pr-6">
            <HeaderActions profilePath="/customer/settings" />
          </div>
        </div>
        <main className="flex-1 bg-gray-50 p-6 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CustomerLayout;
