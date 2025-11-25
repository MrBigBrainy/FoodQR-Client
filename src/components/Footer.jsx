import React from "react";
import { Link } from "react-router";
import useCartStore from "../stores/cartStore";

function Footer() {
  const items = useCartStore((state) => state.items);
  const totalCartItems = items.reduce((currentTotal, item) => {
    return currentTotal + item.amount;
  }, 0);
  return (
    <footer className="fixed bottom-0 left-0 right-0 w-full bg-white shadow-xl border-t border-gray-200 z-50 sm:hidden lg:hidden">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        <Link
          to="/"
          className="flex flex-col items-center justify-center text-xs font-medium text-gray-700 hover:text-red-500 transition duration-150 p-2"
        >
          <span>เมนู</span>
        </Link>
        <Link
          to="/cart"
          className="flex flex-col items-center justify-center text-xs font-medium text-gray-700 hover:text-red-500 transition duration-150 p-2"
        >
          <span>ตะกร้า</span>
        </Link>
        <Link
          to="/summary"
          className="flex flex-col items-center justify-center text-xs font-medium text-gray-700 hover:text-red-500 transition duration-150 p-2"
        >
          <span>ชำระเงิน</span>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
