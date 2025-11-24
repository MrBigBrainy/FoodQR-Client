import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import MenuPage from "../pages/MenuPage";
import CartPage from "../pages/CartPage";
import SummaryPage from "../pages/SummaryPage";
import UserLayout from "../layouts/UserLayout";

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
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
