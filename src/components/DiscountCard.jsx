import { useState } from "react";

function DiscountCard() {
    const [discountCode, setDiscountCode] = useState("");
  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 mx-5 my-5 ">
      <div className="flex items-center mb-4">
        <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 text-lg font-semibold">
          %
        </span>
        <h3 className="text-base font-semibold text-gray-800">ใส่โค้ดส่วนลด</h3>
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="กรอกโค้ดส่วนลดที่นี่"
          className="flex-grow py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-base"
          
        />
        <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 font-semibold text-base whitespace-nowrap">
          ใช้
        </button>
      </div>
    </div>
  );
}

export default DiscountCard;
