import React from "react";
import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CartIcon from "../components/CartIcon";

function UserLayout() {
  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
      <CartIcon />
      <Footer />
    </div>
  );
}

export default UserLayout;
