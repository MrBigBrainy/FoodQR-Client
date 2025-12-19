import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';

import MenuPage from '../pages/MenuPage';
import CartPage from '../pages/CartPage';
import SummaryPage from '../pages/SummaryPage';
import UserLayout from '../layouts/UserLayout';
import HistoryCard from '../components/HistoryCard';
import AuthPage from '../pages/AuthPage';
import Billing from '@/pages/Billing';
import AdminPage from '../pages/AdminPage';
import AdminDashboard from '../pages/AdminDashbord';
import AdminAddMenu from '../pages/AdminAddMenu';
import TableAdmin from '../pages/TableAdmin';
import LoginPage from '../pages/AdminLoginPage';
import SuperAdminPage from '@/pages/superAdmin/SuperAdminPage';
import AdminShopSettingPage from '@/pages/AdminShopSettingPage';
import AdminDiscount from "@/pages/AdminDiscount";
import MenuBill from "../components/Billing/MenuBill";
import CoffeeLoader from "@/components/loader/coffeeLoader";
import RedWineLoader from "@/components/loader/RedWineLoader";
import PaymentQRPage from "@/pages/PaymentQRPage";
import PaymentStatusPage from "@/pages/PaymentStatusPage";
import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter([
  { path: "/store/:storeId/table/:tableName/:tableId/order/:orderId/bill", element: <MenuBill /> },
  { path: '/', element: <Navigate to="/login" replace /> },

  {
    path: '/menu-qr',
    element: <UserLayout />,
    children: [
      { index: true, element: <MenuPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'history', element: <HistoryCard /> },
      { path: 'summary', element: <SummaryPage /> },
    ],
  },
  // {
  //   path: '/store/:storeId/table/:tableId/order/:orderId',
  //   element: <UserLayout />,
  //   children: [
  //     { index: true, element: <MenuPage /> },
  //     { path: 'cart', element: <CartPage /> },
  //     { path: 'summary', element: <SummaryPage /> },
  //   ],
  // },
  { path: '/auth', element: <AuthPage /> },
  { path: '/superAdmin', element: <SuperAdminPage /> },
   { path: "/test", element: <CoffeeLoader /> },
   { path: "/test2", element: <Billing /> },
   { path: "/test3", element: <PaymentQRPage /> },
  { path: "/test4", element: <PaymentStatusPage /> },
   { path: "/test5", element: <RedWineLoader /> },
  {
    path: '/admin/store/:storeId',
    element: <AdminPage />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'addmenu', element: <AdminAddMenu /> },
      { path: 'table', element: <TableAdmin /> },
      { path: 'discount', element: <AdminDiscount /> },
      { path: 'settings', element: <AdminShopSettingPage /> },
      { path: '*', element: <AdminDashboard /> }, // fallback admin
    ],
  },

  { path: '/login', element: <LoginPage /> },

  // ✅ 404 Not Found Page
  { path: '*', element: <NotFoundPage /> },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
