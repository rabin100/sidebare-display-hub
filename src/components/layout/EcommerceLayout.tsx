
import React from 'react';
import { Outlet } from 'react-router-dom';
import EcommerceHeader from './EcommerceHeader';
import EcommerceNavbar from './EcommerceNavbar';
import EcommerceFooter from './EcommerceFooter';

const EcommerceLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <EcommerceHeader />
      <EcommerceNavbar />
      <main className="flex-1 bg-white max-w-[1600px] mx-auto w-full">
        <Outlet />
      </main>
      <EcommerceFooter />
    </div>
  );
};

export default EcommerceLayout;
