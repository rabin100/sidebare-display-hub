
import React from 'react';
import { Outlet } from 'react-router-dom';
import FinanceSidebar from './FinanceSidebar';
import AdminHeader from './AdminHeader';
import HeaderActions from './HeaderActions';

const FinanceLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <FinanceSidebar />
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center">
          <AdminHeader title="Finance Dashboard" />
          <div className="pr-6">
            <HeaderActions profilePath="/finance/settings" />
          </div>
        </div>
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
