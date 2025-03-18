
import React from 'react';
import { Outlet } from 'react-router-dom';
import EcommerceHeader from './EcommerceHeader';
import EcommerceSidebar from './EcommerceSidebar';
import EcommerceFooter from './EcommerceFooter';

const EcommerceLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <EcommerceSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <EcommerceHeader />
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          <Outlet />
        </main>
        <EcommerceFooter />
      </div>
    </div>
  );
};

export default EcommerceLayout;
