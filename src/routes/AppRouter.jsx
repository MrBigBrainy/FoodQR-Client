import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import MenuPage from "../pages/MenuPage";
import CartPage from "../pages/CartPage";
import SummaryPage from "../pages/SummaryPage";
import UserLayout from "../layouts/UserLayout";
import AuthPage from "../pages/AuthPage";

import AdminPage from "../pages/AdminPage";
import AdminDashboard from "../pages/AdminDashbord";
import AdminAddMenu from "../pages/AdminAddMenu";
import TableAdmin from "../pages/TableAdmin";
import LoginPage from "../pages/AdminLoginPage";
import BillingPage from "../pages/BillingPage";
import SuperAdminPage from "@/pages/superAdmin/SuperAdminPage";
import MenuBill from "../components/Billing/MenuBill";
import SummaryOfFood from "@/pages/SummaryOfFood";
import Billing from "@/pages/Billing";

const router = createBrowserRouter([
  // { path: "/billing", element: <BillingPage /> },
 {
  path: "/store/:storeId/table/:tableId/order/:orderId",
  element: <UserLayout />,
  children: [
    { index: true, element: <MenuPage /> },   
    { path: "cart", element: <CartPage /> },
    { path: "summary", element: <SummaryPage /> },
  ],
},
  { path: "/auth", element: <AuthPage /> },
  { path: "/superAdmin", element: <SuperAdminPage /> },
  {
    path: "/admin",
    element: <AdminPage />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "addmenu", element: <AdminAddMenu /> },
      { path: "table", element: <TableAdmin /> },
      { path: '*', element: <AdminDashboard /> }
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
