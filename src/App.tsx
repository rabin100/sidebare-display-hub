
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { UserProvider } from './contexts/UserContext';

// Layouts
import EcommerceLayout from './components/layout/EcommerceLayout';
import AdminLayout from './components/layout/AdminLayout';
import ManagerLayout from './components/layout/ManagerLayout';
import CustomerLayout from './components/layout/CustomerLayout';
import FinanceLayout from './components/layout/FinanceLayout';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import CustomerLoginPage from './pages/auth/CustomerLoginPage';

// Ecommerce Pages
import HomePage from './pages/ecommerce/HomePage';
import AboutPage from './pages/ecommerce/AboutPage';
import ContactPage from './pages/ecommerce/ContactPage';
import ProductsPage from './pages/ecommerce/ProductsPage';
import CategoriesPage from './pages/ecommerce/CategoriesPage';
import WishlistPage from './pages/ecommerce/WishlistPage';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AccountRequests from './pages/admin/AccountRequests';
import Analytics from './pages/admin/Analytics';
import Reports from './pages/admin/Reports';
import AccountManagement from './pages/admin/AccountManagement';
import Profile from './pages/admin/Profile';

// Manager Pages
import InventoryManagement from './pages/manager/InventoryManagement';
import PriceManagement from './pages/manager/PriceManagement';
import Transactions from './pages/manager/Transactions';
import ManagerReports from './pages/manager/Reports';

// Customer Pages
import CustomerDashboard from './pages/customer/CustomerDashboard';
import OrdersPage from './pages/customer/OrdersPage';
import OrderDetailsPage from './pages/customer/OrderDetailsPage';
import OrderHistoryPage from './pages/customer/OrderHistoryPage';
import PaymentsPage from './pages/customer/PaymentsPage';
import FeedbackPage from './pages/customer/FeedbackPage';
import SettingsPage from './pages/customer/SettingsPage';
import CheckoutPage from './pages/customer/CheckoutPage';

// Finance Pages
import FinanceDashboard from './pages/finance/FinanceDashboard';
import TransactionsPage from './pages/finance/TransactionsPage';
import InvoicesPage from './pages/finance/InvoicesPage';
import RevenuePage from './pages/finance/RevenuePage';
import ReportsPage from './pages/finance/ReportsPage';
import ExpensesPage from './pages/finance/ExpensesPage';
import PayrollPage from './pages/finance/PayrollPage';
import BudgetingPage from './pages/finance/BudgetingPage';
import DocumentsPage from './pages/finance/DocumentsPage';
import CustomersPage from './pages/finance/CustomersPage';
import FinanceSettingsPage from './pages/finance/SettingsPage';

// Misc
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <EcommerceLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'categories', element: <CategoriesPage /> },
      { path: 'wishlist', element: <WishlistPage /> },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/customer-login',
    element: <CustomerLoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'account-requests', element: <AccountRequests /> },
      { path: 'analytics', element: <Analytics /> },
      { path: 'reports', element: <Reports /> },
      { path: 'account-management', element: <AccountManagement /> },
      { path: 'profile', element: <Profile /> },
    ],
  },
  {
    path: '/manager',
    element: <ManagerLayout />,
    children: [
      { index: true, element: <InventoryManagement /> },
      { path: 'price-management', element: <PriceManagement /> },
      { path: 'transactions', element: <Transactions /> },
      { path: 'reports', element: <ManagerReports /> },
      { path: 'profile', element: <Profile /> },
    ],
  },
  {
    path: '/customer',
    element: <CustomerLayout />,
    children: [
      { index: true, element: <CustomerDashboard /> },
      { path: 'orders', element: <OrdersPage /> },
      { path: 'orders/:id', element: <OrderDetailsPage /> },
      { path: 'history', element: <OrderHistoryPage /> },
      { path: 'payments', element: <PaymentsPage /> },
      { path: 'feedback', element: <FeedbackPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
    ],
  },
  {
    path: '/finance',
    element: <FinanceLayout />,
    children: [
      { index: true, element: <FinanceDashboard /> },
      { path: 'transactions', element: <TransactionsPage /> },
      { path: 'invoices', element: <InvoicesPage /> },
      { path: 'revenue', element: <RevenuePage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'expenses', element: <ExpensesPage /> },
      { path: 'payroll', element: <PayrollPage /> },
      { path: 'budgeting', element: <BudgetingPage /> },
      { path: 'documents', element: <DocumentsPage /> },
      { path: 'customers', element: <CustomersPage /> },
      { path: 'settings', element: <FinanceSettingsPage /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
