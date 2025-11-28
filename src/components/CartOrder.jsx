import useCartStore from "@/stores/cartStore";
import React from "react";

function CartOrder() {
  const { totalAmount, totalCartItems } = useCartStore.getState();
  return (
    <div className="fixed inset-x-0 bottom-0 bg-white p-4 pb-20 shadow-2xl border-t border-gray-100">
      <div className="flex justify-between text-sm text-gray-700 mb-2">
        <span className="font-medium">จำนวนรายการ</span>
        <span className="font-semibold">{totalCartItems} รายการ</span>
      </div>
      <div className="flex justify-between text-base font-bold mb-4">
        <span className="text-gray-900">ยอดรวมทั้งหมด</span>
        <span className="text-red-600">฿ {totalAmount}</span>
      </div>
      <button
        disabled={totalCartItems === 0}
        className={`w-full py-3 text-lg font-bold rounded-xl transition ${
          totalCartItems > 0
            ? "bg-green-600 hover:bg-green-700 text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        ยืนยันสั่งอาหาร
      </button>
    </div>
  );
}

export default CartOrder;
