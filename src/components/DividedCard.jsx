import React, { useState, useEffect } from "react";
import { Users } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import useUserStore from "@/stores/userStore";

function DividedCard({selectedNetPrice, userOrder, paymentMethod, setPaymentMethod, splitCount, setSplitCount}) {

  const { lineId: currentLineId } = useUserStore();



  const handleIncrement = (e) => {
    e.stopPropagation();
    setSplitCount((prev) => prev + 1);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    if (splitCount > 1) {
      setSplitCount((prev) => prev - 1);
    }
  };

  const pricePerPerson = (selectedNetPrice / splitCount).toFixed(2);

  const options = [
    {
      id: "pay-all",
      title: "จ่ายรวม",
      subtitle: "ชำระเงินพร้อมกันทั้งหมด",
      price: null,
    },
    {
      id: "split-item",
      title: "หารแยก (ตามรายการ)",
      subtitle: "แบ่งจ่ายตามรายการที่สั่ง",
      price: null,
    },
    {
      id: "split-equal",
      title: "หารเท่า (แบ่งเท่า ๆ กัน)",
      subtitle: "แบ่งจ่ายเท่า ๆ กัน",
      price: null,
    },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mx-5 my-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
          <Users className="w-5 h-5 text-red-500" />
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-900">รูปแบบการชำระเงิน</h3>
          <p className="text-xs text-gray-500">เลือกวิธีการจ่ายเงิน</p>
        </div>
      </div>

      <div className="space-y-3">
        {options.map((option) => (
          <div key={option.id}>
            <div
              onClick={() => setPaymentMethod(option.id)}
              className={`relative p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer flex items-center justify-between ${
                paymentMethod === option.id
                  ? "border-red-500 bg-red-50/30"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === option.id
                      ? "border-red-500"
                      : "border-gray-400"
                  }`}
                >
                  {paymentMethod === option.id && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2.5 h-2.5 rounded-full bg-red-500" 
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">{option.title}</h4>
                  <p className="text-xs text-gray-500">{option.subtitle}</p>
                </div>
              </div>
              {option.price && (
                <span className="font-bold text-gray-900">{option.price}</span>
              )}
            </div>

            <AnimatePresence>
              {paymentMethod === "split-equal" && option.id === "split-equal" && (
                <motion.div
                  key="split-content"
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="mt-3 overflow-hidden"
                >
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-center justify-between gap-4">
                    
                    {/* Counter Section */}
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <span className="text-xs font-medium text-gray-500">จำนวนคน</span>
                      <div className="flex items-center gap-3 bg-white rounded-full p-1 shadow-sm border border-gray-200">
                        <button
                          onClick={handleDecrement}
                          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-red-100 hover:text-red-600 active:scale-95 transition-all"
                        >
                          -
                        </button>
                        <span className="text-lg font-bold text-gray-900 w-6 text-center">{splitCount}</span>
                        <button
                          onClick={handleIncrement}
                          className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-red-700 active:scale-95 transition-all shadow-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-px h-12 bg-gray-200"></div>

                    {/* Price Section */}
                    <div className="flex flex-col items-center gap-1 flex-1">
                      <span className="text-xs font-medium text-gray-500">จ่ายคนละ</span>
                      <span className="text-xl font-bold text-red-600">฿{pricePerPerson}</span>
                    </div>

                  </div>
                </motion.div>
              )}

              {paymentMethod === "split-item" && option.id === "split-item" && (
                <motion.div
                  key="split-item-content"
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="mt-3 overflow-hidden"
                >
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-gray-700">ยอดรวมบิลหลังหักส่วนลด (รวมภาษี) แยกตามลูกค้า:</p>
                    <div className="space-y-2">
                      {userOrder && userOrder
                        .filter(([lineId, items]) => {
                          // Check if the group belongs to the current user
                          // items[0].lineId should match currentLineId
                          return items[0].lineId === currentLineId;
                        })
                        .map(([lineId, items], index) => {
                         const userTotal = items.reduce((acc, item) => acc + (item.quantity * item.menu.netPrice), 0);
                         const user = items[0];
                         const isCurrentUser = true; // Since we filtered, it is always the current user

                         return (
                          <div key={index} className="rounded-xl p-3 flex items-center justify-between border bg-white border-red-200 shadow-sm">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                                <img 
                                  src={user.imageUrl || "https://via.placeholder.com/150"} 
                                  alt={user.displayName || lineId} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex flex-col">
                                <span className="font-bold text-gray-800 text-sm">{user.displayName || lineId}</span>
                                <span className="text-[10px] text-red-500 font-medium">คุณ</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="font-bold text-red-600 text-lg">฿{userTotal.toFixed(2)}</span>
                              <span className="text-[10px] text-gray-500 block">(ยอดของคุณ)</span>
                            </div>
                          </div>
                         );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DividedCard;
