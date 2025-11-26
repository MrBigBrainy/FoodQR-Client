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

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { path: "/", element: <MenuPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/summary", element: <SummaryPage /> },
    ],
  },
  { path: "auth", element: <AuthPage /> },
  {
    path: "/admin",
    element: <AdminPage />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "addmenu", element: <AdminAddMenu /> },
      { path: "*", element: <AdminDashboard /> },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
