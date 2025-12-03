import useCartStore from "@/stores/cartStore";
import useUserStore from "@/stores/userStore";
import React from "react";
import api from "@/api/axios";
import { useEffect } from "react";

function CartOrder() {
  const {lineId} = useUserStore.getState();
  const cart = useCartStore.getState();
  async function handleSubmitOrder() {
    try {
      cart.items.forEach(async (item) => {
        const response = await api.post("/userOrder/createOrder", {
         menuId: item.id, quantity: item.amount, note: item.note, lineId: lineId, orderId: 1
      });
      })
      
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  }

  const { totalAmount, totalCartItems } = useCartStore.getState();

  useEffect(() => {
    console.log(cart.items);
  }, [cart.items]);

  return (
    <div className="fixed inset-x-0 bottom-0 bg-white p-4 pb-28 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] border-t border-gray-100 z-40">
      <div className="flex justify-between text-sm text-gray-700 mb-2">
        <span className="font-medium">จำนวนรายการ</span>
        <span className="font-semibold">{totalCartItems} รายการ</span>
      </div>
      <div className="flex justify-between text-base font-bold mb-4">
        <span className="text-gray-900">ยอดรวมทั้งหมด</span>
        <span className="text-red-600">฿ {totalAmount}</span>
      </div>
      <button
        onClick={handleSubmitOrder}
        disabled={totalCartItems === 0}
        className={`w-full py-3 text-lg font-bold rounded-xl transition ${
          totalCartItems > 0
            ? "bg-[#C10007] hover:bg-[#a30006] text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        ยืนยันสั่งอาหาร
      </button>
    </div>
  );
}

export default CartOrder;
