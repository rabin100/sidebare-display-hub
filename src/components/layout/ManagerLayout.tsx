
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import AdminHeader from './AdminHeader';
import HeaderActions from './HeaderActions';

const ManagerLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <div className="flex justify-between items-center">
          <AdminHeader title="Manager Dashboard" />
          <div className="pr-6">
            <HeaderActions profilePath="/manager/profile" />
          </div>
        </div>
        <main className="flex-1 overflow-auto bg-admin-bg p-6 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ManagerLayout;
