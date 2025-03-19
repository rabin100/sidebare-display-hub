
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AccountRequests from "./pages/admin/AccountRequests";
import EcommerceLayout from "./components/layout/EcommerceLayout";
import HomePage from "./pages/ecommerce/HomePage";
import ProductsPage from "./pages/ecommerce/ProductsPage";
import CategoriesPage from "./pages/ecommerce/CategoriesPage";
import AboutPage from "./pages/ecommerce/AboutPage";
import ContactPage from "./pages/ecommerce/ContactPage";
import WishlistPage from "./pages/ecommerce/WishlistPage";
import ManagerLayout from "./components/layout/ManagerLayout";
import InventoryManagement from "./pages/manager/InventoryManagement";
import PriceManagement from "./pages/manager/PriceManagement";
import Reports from "./pages/manager/Reports";
import Transactions from "./pages/manager/Transactions";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";

// Customer pages
import CustomerLayout from "./components/layout/CustomerLayout";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import OrdersPage from "./pages/customer/OrdersPage";
import OrderHistoryPage from "./pages/customer/OrderHistoryPage";
import OrderDetailsPage from "./pages/customer/OrderDetailsPage";
import PaymentsPage from "./pages/customer/PaymentsPage";
import FeedbackPage from "./pages/customer/FeedbackPage";
import BrowseProductsPage from "./pages/customer/BrowseProductsPage";
import SettingsPage from "./pages/customer/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* E-commerce Routes */}
          <Route path="/" element={<EcommerceLayout />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="wishlist" element={<WishlistPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
          
          {/* Customer Routes */}
          <Route path="/customer" element={<CustomerLayout />}>
            <Route index element={<CustomerDashboard />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="orders/:orderId" element={<OrderDetailsPage />} />
            <Route path="order-history" element={<OrderHistoryPage />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="feedback" element={<FeedbackPage />} />
            <Route path="browse-products" element={<BrowseProductsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/customer" replace />} />
          </Route>
          
          {/* Manager Routes */}
          <Route path="/manager" element={<ManagerLayout />}>
            <Route index element={<InventoryManagement />} />
            <Route path="inventory" element={<InventoryManagement />} />
            <Route path="pricing" element={<PriceManagement />} />
            <Route path="reports" element={<Reports />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="*" element={<Navigate to="/manager" replace />} />
          </Route>
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="account-requests" element={<AccountRequests />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
