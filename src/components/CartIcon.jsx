//ปุ่ม icon ของ cart navigate ไปหน้า cart
import React from "react";
import { useNavigate } from "react-router";
import useCartStore from "../stores/cartStore";

function CartIcon() {
  const totalCartItems = useCartStore((state) => state.totalCartItems);
  const totalAmount = useCartStore((state) => state.totalAmount);
  const navigate = useNavigate();
  const navigateToCart = () => {
    navigate("/cart");
  };
  return (
    <button
      className="fixed bottom-20 left-0 right-0 mx-auto
                 bg-red-600 hover:bg-red-700 
                 text-white font-bold py-3 px-5 
                 rounded-full shadow-xl 
                 flex items-center space-x-3 
                 transition duration-300 
                 z-50 w-[90%]"
      onClick={navigateToCart}
    >
      <div className="flex items-center space-x-2 relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
        </svg>
        <span className="bg-white text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-black absolute top-[-5px] right-[-5px]">
          {totalCartItems}
        </span>
      </div>
      <span>฿{totalAmount}</span>
    </button>
  );
}

export default CartIcon;
