import React, { useState } from "react";

// ตัวเลือกการจ่ายเงิน
const paymentOptions = [
  "จ่ายรวม (ไม่แยกบิล)",
  "หารเท่า (ต่อคน)",
  "แยกตามรายการ",
];

function DividedCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(paymentOptions[0]);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 mx-5 my-5">
      <h3 className="text-lg font-bold mb-4">เลือกวิธีการชำระเงิน</h3>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full py-2 px-3 border border-gray-400 rounded-md bg-gray-100 flex justify-between items-center"
        >
          {selected}
          <span className="text-xl">{isOpen ? "▲" : "▼"}</span>
        </button>
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-400 rounded-md shadow-lg">
            {paymentOptions.map((option) => (
              <div
                key={option}
                onClick={() => handleSelect(option)}
                className="px-3 py-2 cursor-pointer hover:bg-blue-100"
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DividedCard;
