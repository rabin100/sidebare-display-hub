
import React from 'react';
import { Outlet } from 'react-router-dom';
import CustomerSidebar from './CustomerSidebar';
import EcommerceHeader from './EcommerceHeader';
import EcommerceFooter from './EcommerceFooter';

const CustomerLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <CustomerSidebar />
      <div className="flex-1 flex flex-col">
        <EcommerceHeader />
        <main className="flex-1 bg-gray-50 p-6">
          <Outlet />
        </main>
        <EcommerceFooter />
      </div>
    </div>
  );
};

export default CustomerLayout;
