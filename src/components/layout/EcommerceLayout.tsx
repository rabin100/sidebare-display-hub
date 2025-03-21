
import React from 'react';
import { Outlet } from 'react-router-dom';
import EcommerceHeader from './EcommerceHeader';
import EcommerceSidebar from './EcommerceSidebar';
import EcommerceFooter from './EcommerceFooter';

const EcommerceLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <EcommerceSidebar />
      <div className="flex-1 flex flex-col">
        <EcommerceHeader />
        <main className="flex-1 bg-white">
          <Outlet />
        </main>
        <EcommerceFooter />
      </div>
    </div>
  );
};

export default EcommerceLayout;
