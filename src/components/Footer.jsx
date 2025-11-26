import React from "react";
import { Link } from "react-router";
import useCartStore from "../stores/cartStore";

function Footer() {
  const totalCartItems = useCartStore((state) => state.totalCartItems);

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
          <span
            className="absolute  
                 transform translate-x-1/2 -translate-y-1/2
                 bg-red-600 text-white 
                 rounded-full text-xs font-bold 
                 w-5 h-5 flex items-center justify-center 
                 leading-none p-1"
          >
            {totalCartItems}
          </span>
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
