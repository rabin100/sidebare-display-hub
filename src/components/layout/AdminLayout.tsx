
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import AdminHeader from './AdminHeader';
import HeaderActions from './HeaderActions';

const AdminLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex justify-between items-center">
          <AdminHeader title="Admin Dashboard" />
          <div className="pr-6">
            <HeaderActions profilePath="/admin/profile" />
          </div>
        </div>
        <main className="flex-1 overflow-auto bg-admin-bg p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
