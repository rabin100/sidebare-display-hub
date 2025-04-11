
import React from 'react';
import { Outlet } from 'react-router-dom';
import EcommerceHeader from './EcommerceHeader';
import EcommerceNavbar from './EcommerceNavbar';
import EcommerceFooter from './EcommerceFooter';

const EcommerceLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50">
      <EcommerceHeader />
      <EcommerceNavbar />
      <main className="flex-1 w-full bg-white">
        <Outlet />
      </main>
      <EcommerceFooter />
    </div>
  );
};

export default EcommerceLayout;
