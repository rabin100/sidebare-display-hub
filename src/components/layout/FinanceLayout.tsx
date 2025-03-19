
import React from 'react';
import { Outlet } from 'react-router-dom';
import FinanceSidebar from './FinanceSidebar';
import EcommerceHeader from './EcommerceHeader';
import EcommerceFooter from './EcommerceFooter';

const FinanceLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <FinanceSidebar />
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

export default FinanceLayout;
