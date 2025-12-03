import React, { useState } from "react";
import { Users } from "lucide-react";

function DividedCard() {
  const [selected, setSelected] = useState("pay-all");

  const options = [
    {
      id: "pay-all",
      title: "หารเท่า (จ่ายรวม)",
      subtitle: "ชำระเงินพร้อมกันทั้งหมด",
      price: "฿374.50",
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
          <div
            key={option.id}
            onClick={() => setSelected(option.id)}
            className={`relative p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer flex items-center justify-between ${
              selected === option.id
                ? "border-red-500 bg-red-50/30"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selected === option.id
                    ? "border-blue-500"
                    : "border-gray-400"
                }`}
              >
                {selected === option.id && (
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
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
        ))}
      </div>
    </div>
  );
}

export default DividedCard;
